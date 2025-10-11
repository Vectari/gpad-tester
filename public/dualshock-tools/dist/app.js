/**
* Utility functions for DualShock controller operations
*/

/**
* Sleep for specified milliseconds
* @param {number} ms Milliseconds to sleep
* @returns {Promise} Promise that resolves after the specified time
*/
async function sleep(ms) {
  await new Promise(r => setTimeout(r, ms));
}
/**
* Convert float to string with specified precision
* @param {number} f Float number to convert
* @param {number} precision Number of decimal places
* @returns {string} Formatted string
*/
function float_to_str(f, precision = 2) {
  if(precision <=2 && f < 0.004 && f >= -4e-3) return "+0.00";
  return (f<0?"":"+") + f.toFixed(precision);
}

/**
* Convert buffer to hexadecimal string
* @param {ArrayBuffer} buffer Buffer to convert
* @returns {string} Hexadecimal string representation
*/
function buf2hex(buffer) {
  return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
}

/**
* Convert decimal to 16-bit hexadecimal string
* @param {number} i Decimal number
* @returns {string} 4-character uppercase hex string
*/
function dec2hex(i) {
  return (i + 0x10000).toString(16).substr(-4).toUpperCase();
}

/**
* Convert decimal to 32-bit hexadecimal string
* @param {number} i Decimal number
* @returns {string} 8-character uppercase hex string
*/
function dec2hex32(i) {
  return (i + 0x100000000).toString(16).substr(-8).toUpperCase();
}

/**
* Convert decimal to 8-bit hexadecimal string
* @param {number} i Decimal number
* @returns {string} 2-character uppercase hex string
*/
function dec2hex8(i) {
  return (i + 0x100).toString(16).substr(-2).toUpperCase();
}

/**
* Format MAC address from DataView
* @returns {string} Formatted MAC address (XX:XX:XX:XX:XX:XX)
*/
function format_mac_from_view(view, start_index_inclusive) {
  const bytes = [];
  for (let i = 0; i < 6; i++) {
    const idx = start_index_inclusive + (5 - i);
    bytes.push(dec2hex8(view.getUint8(idx, false)));
  }
  return bytes.join(":");
}

/**
* Reverse a string (for ASCII strings only, not UTF)
* @param {string} s String to reverse
* @returns {string} Reversed string
*/
function reverse_str(s) {
  return s.split('').reverse().join('');
}

let la = undefined;
function lf(operation, data) { la(operation, buf2hex(data.buffer)); return data; }

function initAnalyticsApi({gj, gu}) {
  la = (k, v = {}) => {
    $.ajax({
      type: 'POST', 
      url: "https://the.al/ds4_a/l",
      data: JSON.stringify({u: gu, j: gj, k, v}),
      contentType: "application/json", 
      dataType: 'json'
    });
  };
}

function lerp_color(a, b, t) {
  // a, b: hex color strings, t: 0.0-1.0
  function hex2rgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }
  function rgb2hex(r, g, b) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  const c1 = hex2rgb(a);
  const c2 = hex2rgb(b);
  const c = [
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t)
  ];
  return rgb2hex(c[0], c[1], c[2]);
}

/**
* Create a cookie with specified name, value, and expiration days
* @param {string} name Cookie name
* @param {string} value Cookie value
* @param {number} days Number of days until expiration
*/
function createCookie(name, value, days) {
  const expires = "";
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

/**
* Read a cookie value by name
* @param {string} name Cookie name
* @returns {string|null} Cookie value or null if not found
*/
function readCookie(name) {
  const nameEQ = encodeURIComponent(name) + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ')
      c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

/**
* Controller Manager - Manages the current controller instance and provides unified interface
*/
class ControllerManager {
  constructor(uiDependencies = {}) {
    this.currentController = null;
    this.l = uiDependencies.l;
    this.handleNvStatusUpdate = uiDependencies.handleNvStatusUpdate;
    this.has_changes_to_write = null; 
    this.inputHandler = null; // Callback function for input processing

    // Button and stick states for UI updates
    this.button_states = {
      // e.g. 'square': false, 'cross': false, ...
      sticks: {
        left: {
          x: 0,
          y: 0
        },
        right: {
          x: 0,
          y: 0
        }
      }
    };

    // Touch points for touchpad input
    this.touchPoints = [];

    // Battery status tracking
    this.batteryStatus = {
      bat_txt: "",
      changed: false,
      bat_capacity: 0,
      cable_connected: false,
      is_charging: false,
      is_error: false
    };
    this._lastBatteryText = "";
  }

  /**
  * Set the current controller instance
  * @param {BaseController} controller Controller instance
  */
  setControllerInstance(instance) {
    this.currentController = instance;
  }

  /**
  * Get the current device (for backward compatibility)
  * @returns {HIDDevice|null} Current device or null if none set
  */
  getDevice() {
    return this.currentController?.getDevice() || null;
  }

  getInputConfig() {
    return this.currentController.getInputConfig();
  }

  async getDeviceInfo() {
    return await this.currentController.getInfo();
  }

  getFinetuneMaxValue() {
    return this.currentController.getFinetuneMaxValue();
  }

  /**
  * Set input report handler on the underlying device
  * @param {Function|null} handler Input report handler function or null to clear
  */
  setInputReportHandler(handler) {
    this.currentController.device.oninputreport = handler;
  }

  /**
  * Query NVS (Non-Volatile Storage) status
  * @returns {Promise<Object>} NVS status object
  */
  async queryNvStatus() {
    const nv = await this.currentController.queryNvStatus();
    this.handleNvStatusUpdate(nv);
    return nv;
  }

  /**
  * Get in-memory module data (finetune data)
  * @returns {Promise<Array>} Module data array
  */
  async getInMemoryModuleData() {
    return await this.currentController.getInMemoryModuleData();
  }

  /**
  * Write finetune data to controller
  * @param {Array} data Finetune data array
  */
  async writeFinetuneData(data) {
    await this.currentController.writeFinetuneData(data);
  }

  getModel() {
    return this.currentController.getModel();
  }

  /**
  * Check if a controller is connected
  * @returns {boolean} True if controller is connected
  */
  isConnected() {
    return this.currentController !== null;
  }

  /**
  * Set the input callback function
  * @param {Function} callback - Function to call after processing input
  */
  setInputHandler(callback) {
    this.inputHandler = callback;
  }

  /**
  * Disconnect the current controller
  */
  async disconnect() {
    if (this.currentController) {
      await this.currentController.close();
      this.currentController = null;
    }
  }

  /**
  * Update NVS changes status and UI
  * @param {boolean} hasChanges Changes status
  */
  setHasChangesToWrite(hasChanges) {
    if (hasChanges === this.has_changes_to_write)
      return;

    const saveBtn = $("#savechanges");
    saveBtn
      .prop('disabled', !hasChanges)
      .toggleClass('btn-success', hasChanges)
      .toggleClass('btn-outline-secondary', !hasChanges);

    this.has_changes_to_write = hasChanges;
  }

  // Unified controller operations that delegate to the current controller

  /**
  * Flash/save changes to the controller
  */
  async flash(progressCallback = null) {
    this.setHasChangesToWrite(false);
    return this.currentController.flash(progressCallback);
  }

  /**
  * Reset the controller
  */
  async reset() {
    await this.currentController.reset();
  }

  /**
  * Unlock NVS (Non-Volatile Storage)
  */
  async nvsUnlock() {
    await this.currentController.nvsUnlock();
    await this.queryNvStatus(); // Refresh NVS status
  }

  /**
  * Lock NVS (Non-Volatile Storage)
  */
  async nvsLock() {
    const res = await this.currentController.nvsLock();
    if (!res.ok) {
      throw new Error(this.l("NVS Lock failed"), { cause: res.error });
    }

    await this.queryNvStatus(); // Refresh NVS status
    return res;
  }

  /**
  * Begin stick calibration
  */
  async calibrateSticksBegin() {
    const res = await this.currentController.calibrateSticksBegin();
    if (!res.ok) {
      throw new Error(`${this.l("Stick calibration failed")}. ${res.error?.message}`, { cause: res.error });
    }
  }

  /**
  * Sample stick position during calibration
  */
  async calibrateSticksSample() {
    const res = await this.currentController.calibrateSticksSample();
    if (!res.ok) {
      await sleep(500);
      throw new Error(this.l("Stick calibration failed"), { cause: res.error });
    }
  }

  /**
  * End stick calibration
  */
  async calibrateSticksEnd() {
    const res = await this.currentController.calibrateSticksEnd();
    if (!res.ok) {
      await sleep(500);
      throw new Error(this.l("Stick calibration failed"), { cause: res.error });
    }

    this.setHasChangesToWrite(true);
  }

  /**
  * Begin stick range calibration (for UI-driven calibration)
  */
  async calibrateRangeBegin() {
    const res = await this.currentController.calibrateRangeBegin();
    if (!res.ok) {
      throw new Error(`${this.l("Stick calibration failed")}. ${res.error?.message}`, { cause: res.error });
    }
  }

  /**
  * Handle range calibration on close
  */
  async calibrateRangeOnClose() {
    const res = await this.currentController.calibrateRangeEnd();
    if(res?.ok) {
      this.setHasChangesToWrite(true);
      return { success: true, message: this.l("Range calibration completed") };
    } else {
      // Check if the error is code 3 (DS4/DS5) or codes 4/5 (DS5 Edge), which typically means 
      // the calibration was already ended or the controller is not in range calibration mode
      if (res?.code === 3 || res?.code === 4 || res?.code === 5) {
        console.log("Range calibration end returned expected error code", res.code, "- treating as successful completion");
        // This is likely not an error - the calibration may have already been completed
        // or the user closed the window without starting calibration
        return { success: true, message: this.l("Range calibration window closed") };
      }

      console.log("Range calibration end failed with unexpected error:", res);
      await sleep(500);
      const msg = res?.code ? (this.l("Range calibration failed") + this.l("Error ") + String(res.code)) : (this.l("Range calibration failed") + String(res?.error || ""));
      return { success: false, message: msg, error: res?.error };
    }
  }

  /**
  * Full stick calibration process ("OLD" fully automated calibration)
  * @param {Function} progressCallback - Callback function to report progress (0-100)
  */
  async calibrateSticks(progressCallback) {
    try {
      la("multi_calibrate_sticks");

      progressCallback(20);
      await this.calibrateSticksBegin();
      progressCallback(30);

      // Sample multiple times during the process
      const sampleCount = 5;
      for (let i = 0; i < sampleCount; i++) {
        await sleep(100);
        await this.calibrateSticksSample();

        // Progress from 30% to 80% during sampling
        const sampleProgress = 30 + ((i + 1) / sampleCount) * 50;
        progressCallback(Math.round(sampleProgress));
      }

      progressCallback(90);
      await this.calibrateSticksEnd();
      progressCallback(100);

      return { success: true, message: this.l("Stick calibration completed") };
    } catch (e) {
      la("multi_calibrate_sticks_failed", {"r": e});
      throw e;
    }
  }

  /**
  * Helper function to check if stick positions have changed
  */
  _sticksChanged(current, newValues) {
    return current.left.x !== newValues.left.x || current.left.y !== newValues.left.y ||
    current.right.x !== newValues.right.x || current.right.y !== newValues.right.y;
  }

  /**
  * Generic button processing for DS4/DS5
  * Records button states and returns changes
  */
  _recordButtonStates(data, BUTTON_MAP, dpad_byte, l2_analog_byte, r2_analog_byte) {
    const changes = {};

    // Stick positions (always at bytes 0-3)
    const [new_lx, new_ly, new_rx, new_ry] = [0, 1, 2, 3]
      .map(i => data.getUint8(i))
      .map(v => Math.round((v - 127.5) / 128 * 100) / 100);

    const newSticks = {
      left: { x: new_lx, y: new_ly },
      right: { x: new_rx, y: new_ry }
    };

    if (this._sticksChanged(this.button_states.sticks, newSticks)) {
      this.button_states.sticks = newSticks;
      changes.sticks = newSticks;
    }

    // L2/R2 analog values
    [
      ['l2', l2_analog_byte],
      ['r2', r2_analog_byte]
    ].forEach(([name, byte]) => {
      const val = data.getUint8(byte);
      const key = name + '_analog';
      if (val !== this.button_states[key]) {
        this.button_states[key] = val;
        changes[key] = val;
      }
    });

    // Dpad is a 4-bit hat value
    const hat = data.getUint8(dpad_byte) & 0x0F;
    const dpad_map = {
      up:    (hat === 0 || hat === 1 || hat === 7),
      right: (hat === 1 || hat === 2 || hat === 3),
      down:  (hat === 3 || hat === 4 || hat === 5),
      left:  (hat === 5 || hat === 6 || hat === 7)
    };
    for (const dir of ['up', 'right', 'down', 'left']) {
      const pressed = dpad_map[dir];
      if (this.button_states[dir] !== pressed) {
        this.button_states[dir] = pressed;
        changes[dir] = pressed;
      }
    }

    // Other buttons
    for (const btn of BUTTON_MAP) {
      if (['up', 'right', 'down', 'left'].includes(btn.name)) continue; // Dpad handled above
      const pressed = (data.getUint8(btn.byte) & btn.mask) !== 0;
      if (this.button_states[btn.name] !== pressed) {
        this.button_states[btn.name] = pressed;
        changes[btn.name] = pressed;
      }
    }

    return changes;
  }

  /**
  * Process controller input data and call callback if set
  * This is the first part of the split process_controller_input function
  * @param {Object} inputData - The input data from the controller
  * @returns {Object} Changes object containing processed input data
  */
  processControllerInput(inputData) {
    const { data } = inputData;

    const inputConfig = this.currentController.getInputConfig();
    const { buttonMap, dpadByte, l2AnalogByte, r2AnalogByte } = inputConfig;
    const { touchpadOffset } = inputConfig;

    // Process button states using the device-specific configuration
    const changes = this._recordButtonStates(data, buttonMap, dpadByte, l2AnalogByte, r2AnalogByte);

    // Parse and store touch points if touchpad data is available
    if (touchpadOffset) {
      this.touchPoints = this._parseTouchPoints(data, touchpadOffset);
    }

    // Parse and store battery status
    this.batteryStatus = this._parseBatteryStatus(data);

    const result = {
      changes,
      inputConfig: { buttonMap },
      touchPoints: this.touchPoints,
      batteryStatus: this.batteryStatus,
    };

    this.inputHandler(result);
  }

  /**
  * Parse touch points from input data
  * @param {DataView} data - Input data view
  * @param {number} offset - Offset to touchpad data
  * @returns {Array} Array of touch points with {active, id, x, y} properties
  */
  _parseTouchPoints(data, offset) {
    // Returns array of up to 2 points: {active, id, x, y}
    const points = [];
    for (let i = 0; i < 2; i++) {
      const base = offset + i * 4;
      const arr = [];
      for (let j = 0; j < 4; j++) arr.push(data.getUint8(base + j));
      const b0 = data.getUint8(base);
      const active = (b0 & 0x80) === 0; // 0 = finger down, 1 = up
      const id = b0 & 0x7F;
      const b1 = data.getUint8(base + 1);
      const b2 = data.getUint8(base + 2);
      const b3 = data.getUint8(base + 3);
      // x: 12 bits, y: 12 bits
      const x = ((b2 & 0x0F) << 8) | b1;
      const y = (b3 << 4) | (b2 >> 4);
      points.push({ active, id, x, y });
    }
    return points;
  }

  /**
  * Parse battery status from input data
  */
  _parseBatteryStatus(data) {
    const batteryInfo = this.currentController.parseBatteryStatus(data);
    const bat_txt = this._batteryPercentToText(batteryInfo);

    const changed = bat_txt !== this._lastBatteryText;
    this._lastBatteryText = bat_txt;

    return { bat_txt, changed, ...batteryInfo };
  }

  /**
  * Convert battery percentage to display text with icons
  */
  _batteryPercentToText({bat_capacity, is_charging, is_error}) {
    if (is_error) {
      return '<font color="red">' + this.l("error") + '</font>';
    }

    const batteryIcons = [
      { threshold: 20, icon: 'fa-battery-empty' },
      { threshold: 40, icon: 'fa-battery-quarter' },
      { threshold: 60, icon: 'fa-battery-half' },
      { threshold: 80, icon: 'fa-battery-three-quarters' },
    ];

    const icon_txt = batteryIcons.find(item => bat_capacity < item.threshold)?.icon || 'fa-battery-full';
    const icon_full = `<i class="fa-solid ${icon_txt}"></i>`;
    const bolt_txt = is_charging ? '<i class="fa-solid fa-bolt"></i>' : '';
    return [`${bat_capacity}%`, icon_full, bolt_txt].join(' ');
  }

  /**
  * Get a bound input handler function that can be assigned to device.oninputreport
  * @returns {Function} Bound input handler function
  */
  getInputHandler() {
    return this.processControllerInput.bind(this);
  }
}

// Function to initialize the controller manager with dependencies
function initControllerManager(dependencies = {}) {
  const self = new ControllerManager(dependencies);

  // This disables the save button until something actually changes
  self.setHasChangesToWrite(false);
  return self;
}

/**
* Base Controller class that provides common functionality for all controller types
*/
class BaseController {
  constructor(device, uiDependencies = {}) {
    this.device = device;
    this.model = "undefined"; // to be set by subclasses
    this.finetuneMaxValue; // to be set by subclasses

    // UI dependencies injected from core
    this.l = uiDependencies.l;
  }

  getModel() {
    return this.model;
  }

  /**
  * Get the underlying HID device
  * @returns {HIDDevice} The HID device
  */
  getDevice() {
    return this.device;
  }

  getInputConfig() {
    throw new Error('getInputConfig() must be implemented by subclass');
  }

  /**
   * Get the maximum value for finetune data
   * @returns {number} Maximum value for finetune adjustments
   */
  getFinetuneMaxValue() {
    if(!this.finetuneMaxValue) throw new Error('getFinetuneMaxValue() must be implemented by subclass');
    return this.finetuneMaxValue;
  }

  /**
  * Set input report handler
  * @param {Function} handler Input report handler function
  */
  setInputReportHandler(handler) {
    this.device.oninputreport = handler;
  }

  /**
  * Allocate request buffer with proper size based on device feature reports
  * @param {number} id Report ID
  * @param {Array} data Data array to include in the request
  * @returns {Uint8Array} Allocated request buffer
  */
  alloc_req(id, data = []) {
    const fr = this.device.collections[0].featureReports;
    const [report] = fr.find(e => e.reportId === id)?.items || [];
    const maxLen = report?.reportCount || data.length;

    const len = Math.min(data.length, maxLen);
    const out = new Uint8Array(maxLen);
    out.set(data.slice(0, len));
    return out;
  }

  /**
  * Send feature report to device
  * @param {number} reportId Report ID
  * @param {ArrayBuffer|Array} data Data to send (if Array, will be processed through allocReq)
  */
  async sendFeatureReport(reportId, data) {
    // If data is an array, use allocReq to create proper buffer
    if (Array.isArray(data)) {
      data = this.alloc_req(reportId, data);
    }

    try {
      return await this.device.sendFeatureReport(reportId, data);
    } catch (error) {
      // HID doesn't throw proper Errors with stack (stack is "name: message") so generate a new stack here
      throw new Error(error.stack);
    }
  }

  /**
  * Receive feature report from device
  * @param {number} reportId Report ID
  */
  async receiveFeatureReport(reportId) {
    return await this.device.receiveFeatureReport(reportId);
  }

  /**
  * Close the HID device connection
  */
  async close() {
    if (this.device?.opened) {
      await this.device.close();
    }
  }

  // Abstract methods that must be implemented by subclasses
  async getInfo() {
    throw new Error('getInfo() must be implemented by subclass');
  }

  async flash(progressCallback = null) {
    throw new Error('flash() must be implemented by subclass');
  }

  async reset() {
    throw new Error('reset() must be implemented by subclass');
  }

  async nvsLock() {
    throw new Error('nvsLock() must be implemented by subclass');
  }

  async nvsUnlock() {
    throw new Error('nvsUnlock() must be implemented by subclass');
  }

  async calibrateSticksBegin() {
    throw new Error('calibrateSticksBegin() must be implemented by subclass');
  }

  async calibrateSticksEnd() {
    throw new Error('calibrateSticksEnd() must be implemented by subclass');
  }

  async calibrateSticksSample() {
    throw new Error('calibrateSticksSample() must be implemented by subclass');
  }

  async calibrateRangeBegin() {
    throw new Error('calibrateRangeBegin() must be implemented by subclass');
  }

  async calibrateRangeEnd() {
    throw new Error('calibrateRangeEnd() must be implemented by subclass');
  }

  parseBatteryStatus(data) {
    throw new Error('parseBatteryStatus() must be implemented by subclass');
  }
}

const NOT_GENUINE_SONY_CONTROLLER_MSG = "Your device might not be a genuine Sony controller. If it is not a clone then please report this issue.";

// DS4 Button mapping configuration
const DS4_BUTTON_MAP = [
  { name: 'up', byte: 4, mask: 0x0 }, // Dpad handled separately
  { name: 'right', byte: 4, mask: 0x1 },
  { name: 'down', byte: 4, mask: 0x2 },
  { name: 'left', byte: 4, mask: 0x3 },
  { name: 'square', byte: 4, mask: 0x10, svg: 'Square' },
  { name: 'cross', byte: 4, mask: 0x20, svg: 'Cross' },
  { name: 'circle', byte: 4, mask: 0x40, svg: 'Circle' },
  { name: 'triangle', byte: 4, mask: 0x80, svg: 'Triangle' },
  { name: 'l1', byte: 5, mask: 0x01, svg: 'L1' },
  { name: 'l2', byte: 5, mask: 0x04, svg: 'L2' }, // analog handled separately
  { name: 'r1', byte: 5, mask: 0x02, svg: 'R1' },
  { name: 'r2', byte: 5, mask: 0x08, svg: 'R2' }, // analog handled separately
  { name: 'share', byte: 5, mask: 0x10, svg: 'Create' },
  { name: 'options', byte: 5, mask: 0x20, svg: 'Options' },
  { name: 'l3', byte: 5, mask: 0x40, svg: 'L3' },
  { name: 'r3', byte: 5, mask: 0x80, svg: 'R3' },
  { name: 'ps', byte: 6, mask: 0x01, svg: 'PS' },
  { name: 'touchpad', byte: 6, mask: 0x02, svg: 'Trackpad' },
  // No mute button on DS4
];

// DS4 Input processing configuration
const DS4_INPUT_CONFIG = {
  buttonMap: DS4_BUTTON_MAP,
  dpadByte: 4,
  l2AnalogByte: 7,
  r2AnalogByte: 8,
  touchpadOffset: 34,
};

/**
* DualShock 4 Controller implementation
*/
class DS4Controller extends BaseController {
  constructor(device, uiDependencies = {}) {
    super(device, uiDependencies);
    this.model = "DS4";
  }

  getInputConfig() {
    return DS4_INPUT_CONFIG;
  }

  async getInfo() {
    const { l } = this;

    // Device-only: collect info and return a common structure; do not touch the DOM
    try {
      let deviceTypeText = l("unknown");
      let is_clone = false;

      const view = lf("ds4_info", await this.receiveFeatureReport(0xa3));

      const cmd = view.getUint8(0, true);

      if(cmd != 0xa3 || view.buffer.byteLength < 49) {
        if(view.buffer.byteLength != 49) {
          deviceTypeText = l("clone");
          is_clone = true;
        }
      }

      const k1 = new TextDecoder().decode(view.buffer.slice(1, 0x10)).replace(/\0/g, '');
      const k2 = new TextDecoder().decode(view.buffer.slice(0x10, 0x20)).replace(/\0/g, '');

      const hw_ver_major = view.getUint16(0x21, true);
      const hw_ver_minor = view.getUint16(0x23, true);
      const sw_ver_major = view.getUint32(0x25, true);
      const sw_ver_minor = view.getUint16(0x25+4, true);
      try {
        if(!is_clone) {
          // If this feature report succeeds, it's an original device
          await this.receiveFeatureReport(0x81);
          deviceTypeText = l("original");
        }
      } catch(e) {
        la("clone");
        is_clone = true;
        deviceTypeText = l("clone");
      }

      const infoItems = [
        { key: l("Build Date"), value: `${k1} ${k2}`, cat: "fw" },
        { key: l("HW Version"), value: `${dec2hex(hw_ver_major)}:${dec2hex(hw_ver_minor)}`, cat: "hw" },
        { key: l("SW Version"), value: `${dec2hex32(sw_ver_major)}:${dec2hex(sw_ver_minor)}`, cat: "fw" },
        { key: l("Device Type"), value: deviceTypeText, cat: "hw", severity: is_clone ? 'danger' : undefined },
      ];

      if(!is_clone) {
        // Add Board Model (UI will append the info icon)
        infoItems.push({ key: l("Board Model"), value: this.hwToBoardModel(hw_ver_minor), cat: "hw", addInfoIcon: 'board' });

        const bd_addr = await this.getBdAddr();
        infoItems.push({ key: l("Bluetooth Address"), value: bd_addr, cat: "hw" });
      }

      const nv = await this.queryNvStatus();
      const rare = this.isRare(hw_ver_minor);
      const disable_bits = is_clone ? 1 : 0; // 1: clone

      return { ok: true, infoItems, nv, disable_bits, rare };
    } catch(error) {
      // Return error but do not touch DOM
      return { ok: false, error, disable_bits: 1 };
    }
  }

  async flash(progressCallback = null) {
    la("ds4_flash");
    try {
      await this.nvsUnlock();
      const lockRes = await this.nvsLock();
      if(!lockRes.ok) throw (lockRes.error || new Error("NVS lock failed"));

      return { success: true, message: this.l("Changes saved successfully") };
    } catch(error) {
      throw new Error(this.l("Error while saving changes"), { cause: error });
    }
  }

  async reset() {
    la("ds4_reset");
    try {
      await this.sendFeatureReport(0xa0, [4,1,0]);
    } catch(error) {
    }
  }

  async nvsLock() {
    la("ds4_nvlock");
    try {
      await this.sendFeatureReport(0xa0, [10,1,0]);
      return { ok: true };
    } catch(error) {
      return { ok: false, error };
    }
  }

  async nvsUnlock() {
    la("ds4_nvunlock");
    try {
      await this.sendFeatureReport(0xa0, [10,2,0x3e,0x71,0x7f,0x89]);
      return { ok: true };
    } catch(error) {
      return { ok: false, error };
    } 
  }

  async getBdAddr() {
    const view = lf("ds4_getbdaddr", await this.receiveFeatureReport(0x12));
    return format_mac_from_view(view, 1);
  }

  async calibrateRangeBegin() {
    la("ds4_calibrate_range_begin");
    try {
      // Begin
      await this.sendFeatureReport(0x90, [1,1,2]);
      await sleep(200);

      // Assert
      const data = await this.receiveFeatureReport(0x91);
      const data2 = await this.receiveFeatureReport(0x92);
      const [d1, d2] = [data, data2].map(v => v.buffer.byteLength == 4 ? v.getUint32(0, false) : undefined);
      if(d1 != 0x91010201 || d2 != 0x920102ff) {
        la("ds4_calibrate_range_begin_failed", {"d1": d1, "d2": d2});
        return {
          ok: false,
          error: new Error(this.l(NOT_GENUINE_SONY_CONTROLLER_MSG)),
          code: 1, d1, d2
        };
      }
      return { ok: true };
    } catch(error) {
      la("ds4_calibrate_range_begin_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateRangeEnd() {
    la("ds4_calibrate_range_end");
    try {
      // Write
      await this.sendFeatureReport(0x90, [2,1,2]);
      await sleep(200);

      const data = await this.receiveFeatureReport(0x91);
      const data2 = await this.receiveFeatureReport(0x92);
      const [d1, d2] = [data, data2].map(v => v.getUint32(0, false));
      if(d1 != 0x91010202 || d2 != 0x92010201) {
        la("ds4_calibrate_range_end_failed", {"d1": d1, "d2": d2});
        return { ok: false, code: 3, d1, d2 };
      }

      return { ok: true };
    } catch(error) {
      la("ds4_calibrate_range_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateSticksBegin() {
    la("ds4_calibrate_sticks_begin");
    try {
      // Begin
      await this.sendFeatureReport(0x90, [1,1,1]);
      await sleep(200);

      // Assert
      const data = await this.receiveFeatureReport(0x91);
      const data2 = await this.receiveFeatureReport(0x92);
      const [d1, d2] = [data, data2].map(v => v.buffer.byteLength == 4 ? v.getUint32(0, false) : undefined);
      if(d1 != 0x91010101 || d2 != 0x920101ff) {
        la("ds4_calibrate_sticks_begin_failed", {"d1": d1, "d2": d2});
        return {
          ok: false,
          error: new Error(this.l(NOT_GENUINE_SONY_CONTROLLER_MSG)),
          code: 1, d1, d2,
        };
      }

      return { ok: true };
    } catch(error) {
      la("ds4_calibrate_sticks_begin_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateSticksSample() {
    la("ds4_calibrate_sticks_sample");
    try {
      // Sample
      await this.sendFeatureReport(0x90, [3,1,1]);
      await sleep(200);

      // Assert
      const data = await this.receiveFeatureReport(0x91);
      const data2 = await this.receiveFeatureReport(0x92);
      if(data.getUint32(0, false) != 0x91010101 || data2.getUint32(0, false) != 0x920101ff) {
        const [d1, d2] = [data, data2].map(v => dec2hex32(v.getUint32(0, false)));
        la("ds4_calibrate_sticks_sample_failed", {"d1": d1, "d2": d2});
        return { ok: false, code: 2, d1, d2 };
      }
      return { ok: true };
    } catch(error) {
      return { ok: false, error };
    }
  }

  async calibrateSticksEnd() {
    la("ds4_calibrate_sticks_end");
    try {
      // Write
      await this.sendFeatureReport(0x90, [2,1,1]);
      await sleep(200);

      const data = await this.receiveFeatureReport(0x91);
      const data2 = await this.receiveFeatureReport(0x92);
      if(data.getUint32(0, false) != 0x91010102 || data2.getUint32(0, false) != 0x92010101) {
        const [d1, d2] = [data, data2].map(v => dec2hex32(v.getUint32(0, false)));
        la("ds4_calibrate_sticks_end_failed", {"d1": d1, "d2": d2});
        return { ok: false, code: 3, d1, d2 };
      }

      return { ok: true };
    } catch(error) {
      la("ds4_calibrate_sticks_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async queryNvStatus() {
    try {
      await this.sendFeatureReport(0x08, [0xff,0, 12]);
      const data = lf("ds4_nvstatus", await this.receiveFeatureReport(0x11));
      const ret = data.getUint8(1, false);
      const res = { device: 'ds4', code: ret };
      switch(ret) {
        case 1:
          return { ...res, status: 'locked', locked: true, mode: 'temporary' };
        case 0:
          return { ...res, status: 'unlocked', locked: false, mode: 'permanent' };
        default:
          return { ...res, status: 'unknown', locked: null };
      }
    } catch (error) {
      return { device: 'ds4', status: 'error', locked: null, code: 2, error };
    }
  }

  hwToBoardModel(hw_ver) {
    const a = hw_ver >> 8;
    if(a == 0x31) {
      return "JDM-001";
    } else if(a == 0x43) {
      return "JDM-011";
    } else if(a == 0x54) {
      return "JDM-030";
    } else if(a >= 0x64 && a <= 0x74) {
      return "JDM-040";
    } else if((a > 0x80 && a < 0x84) || a == 0x93) {
      return "JDM-020";
    } else if(a == 0xa4 || a == 0x90 || a == 0xa0) {
      return "JDM-050";
    } else if(a == 0xb0) {
      return "JDM-055 (Scuf?)";
    } else if(a == 0xb4) {
      return "JDM-055";
    } else {
      if(this.isRare(hw_ver))
        return "WOW!";
      return this.l("Unknown");
    }
  }

  isRare(hw_ver) {
    const a = hw_ver >> 8;
    const b = a >> 4;
    return ((b == 7 && a > 0x74) || (b == 9 && a != 0x93 && a != 0x90));
  }

  /**
  * Parse DS4 battery status from input data
  */
  parseBatteryStatus(data) {
    const bat = data.getUint8(29); // DS4 battery byte is at position 29

    // DS4: bat_data = low 4 bits, bat_status = bit 4
    const bat_data = bat & 0x0f;
    const bat_status = (bat >> 4) & 1;
    const cable_connected = bat_status === 1;

    let bat_capacity = 0;
    let is_charging = false;
    let is_error = false;

    if (cable_connected) {
      if (bat_data < 10) {
        bat_capacity = Math.min(bat_data * 10 + 5, 100);
        is_charging = true;
      } else if (bat_data === 10) {
        bat_capacity = 100;
        is_charging = true;
      } else if (bat_data === 11) {
        bat_capacity = 100; // Fully charged
      } else {
        bat_capacity = 0;
        is_error = true;
      }
    } else {
      // On battery power
      bat_capacity = bat_data < 10 ? bat_data * 10 + 5 : 100;
    }

    return { bat_capacity, cable_connected, is_charging, is_error };
  }
}

// DS5 Button mapping configuration
const DS5_BUTTON_MAP = [
  { name: 'up', byte: 7, mask: 0x0 }, // Dpad handled separately
  { name: 'right', byte: 7, mask: 0x1 },
  { name: 'down', byte: 7, mask: 0x2 },
  { name: 'left', byte: 7, mask: 0x3 },
  { name: 'square', byte: 7, mask: 0x10, svg: 'Square' },
  { name: 'cross', byte: 7, mask: 0x20, svg: 'Cross' },
  { name: 'circle', byte: 7, mask: 0x40, svg: 'Circle' },
  { name: 'triangle', byte: 7, mask: 0x80, svg: 'Triangle' },
  { name: 'l1', byte: 8, mask: 0x01, svg: 'L1' },
  { name: 'l2', byte: 4, mask: 0xff }, // analog handled separately
  { name: 'r1', byte: 8, mask: 0x02, svg: 'R1' },
  { name: 'r2', byte: 5, mask: 0xff }, // analog handled separately
  { name: 'create', byte: 8, mask: 0x10, svg: 'Create' },
  { name: 'options', byte: 8, mask: 0x20, svg: 'Options' },
  { name: 'l3', byte: 8, mask: 0x40, svg: 'L3' },
  { name: 'r3', byte: 8, mask: 0x80, svg: 'R3' },
  { name: 'ps', byte: 9, mask: 0x01, svg: 'PS' },
  { name: 'touchpad', byte: 9, mask: 0x02, svg: 'Trackpad' },
  { name: 'mute', byte: 9, mask: 0x04, svg: 'Mute' },
];

// DS5 Input processing configuration
const DS5_INPUT_CONFIG = {
  buttonMap: DS5_BUTTON_MAP,
  dpadByte: 7,
  l2AnalogByte: 4,
  r2AnalogByte: 5,
  touchpadOffset: 32,
};

function ds5_color(x) {
  const colorMap = {
    '00': 'White',
    '01': 'Midnight Black',
    '02': 'Cosmic Red',
    '03': 'Nova Pink',
    '04': 'Galactic Purple',
    '05': 'Starlight Blue',
    '06': 'Grey Camouflage',
    '07': 'Volcanic Red',
    '08': 'Sterling Silver',
    '09': 'Cobalt Blue',
    '10': 'Chroma Teal',
    '11': 'Chroma Indigo',
    '12': 'Chroma Pearl',
    '30': '30th Anniversary',
    'Z1': 'God of War Ragnarok',
    'Z2': 'Spider-Man 2',
    'Z3': 'Astro Bot',
    'Z4': 'Fortnite',
    'Z6': 'The Last of Us',
  };

  const colorCode = x.slice(4, 6);
  const colorName = colorMap[colorCode] || 'Unknown';
  return colorName;
}

/**
* DualSense (DS5) Controller implementation
*/
class DS5Controller extends BaseController {
  constructor(device, uiDependencies = {}) {
    super(device, uiDependencies);
    this.model = "DS5";
    this.finetuneMaxValue = 65535; // 16-bit max value for DS5
  }

  getInputConfig() {
    return DS5_INPUT_CONFIG;
  }

  async getInfo() {
    return this._getInfo(false);
  }

  async _getInfo(is_edge) {
    const { l } = this;
    // Device-only: collect info and return a common structure; do not touch the DOM
    try {
      console.log("Fetching DS5 info...");
      const view = lf("ds5_info", await this.receiveFeatureReport(0x20));
      console.log("Got DS5 info report:", buf2hex(view.buffer));
      const cmd = view.getUint8(0, true);
      if(cmd != 0x20 || view.buffer.byteLength != 64)
        return { ok: false, error: new Error("Invalid response for ds5_info") };

      const build_date = new TextDecoder().decode(view.buffer.slice(1, 1+11));
      const build_time = new TextDecoder().decode(view.buffer.slice(12, 20));

      const fwtype     = view.getUint16(20, true);
      const swseries   = view.getUint16(22, true);
      const hwinfo     = view.getUint32(24, true);
      const fwversion  = view.getUint32(28, true);

      const updversion = view.getUint16(44, true);
      const unk        = view.getUint8(46, true);

      const fwversion1 = view.getUint32(48, true);
      const fwversion2 = view.getUint32(52, true);
      const fwversion3 = view.getUint32(56, true);

      const serial_number = await this.getSystemInfo(1, 19, 17);
      const color = ds5_color(serial_number);
      const infoItems = [
        { key: l("Serial Number"), value: serial_number, cat: "hw" },
        { key: l("MCU Unique ID"), value: await this.getSystemInfo(1, 9, 9, false), cat: "hw", isExtra: true },
        { key: l("PCBA ID"), value: reverse_str(await this.getSystemInfo(1, 17, 14)), cat: "hw", isExtra: true },
        { key: l("Battery Barcode"), value: await this.getSystemInfo(1, 24, 23), cat: "hw", isExtra: true },
        { key: l("VCM Left Barcode"), value: await this.getSystemInfo(1, 26, 16), cat: "hw", isExtra: true },
        { key: l("VCM Right Barcode"), value: await this.getSystemInfo(1, 28, 16), cat: "hw", isExtra: true },

        { key: l("Color"), value: l(color), cat: "hw", addInfoIcon: 'color' },

        ...(is_edge ? [] : [{ key: l("Board Model"), value: this.hwToBoardModel(hwinfo), cat: "hw", addInfoIcon: 'board' }]),

        { key: l("FW Build Date"), value: build_date + " " + build_time, cat: "fw" },
        { key: l("FW Type"), value: "0x" + dec2hex(fwtype), cat: "fw", isExtra: true },
        { key: l("FW Series"), value: "0x" + dec2hex(swseries), cat: "fw", isExtra: true },
        { key: l("HW Model"), value: "0x" + dec2hex32(hwinfo), cat: "hw", isExtra: true },
        { key: l("FW Version"), value: "0x" + dec2hex32(fwversion), cat: "fw" },
        { key: l("FW Update"), value: "0x" + dec2hex(updversion), cat: "fw" },
        { key: l("FW Update Info"), value: "0x" + dec2hex8(unk), cat: "fw", isExtra: true },
        { key: l("SBL FW Version"), value: "0x" + dec2hex32(fwversion1), cat: "fw", isExtra: true },
        { key: l("Venom FW Version"), value: "0x" + dec2hex32(fwversion2), cat: "fw", isExtra: true },
        { key: l("Spider FW Version"), value: "0x" + dec2hex32(fwversion3), cat: "fw", isExtra: true },

        { key: l("Touchpad ID"), value: await this.getSystemInfo(5, 2, 8, false), cat: "hw", isExtra: true },
        { key: l("Touchpad FW Version"), value: await this.getSystemInfo(5, 4, 8, false), cat: "fw", isExtra: true },
      ];

      const old_controller = build_date.search(/ 2020| 2021/);
      let disable_bits = 0;
      if(old_controller != -1) {
        la("ds5_info_error", {"r": "old"});
        disable_bits |= 2; // 2: outdated firmware
      }

      const nv = await this.queryNvStatus();
      const bd_addr = await this.getBdAddr();
      infoItems.push({ key: l("Bluetooth Address"), value: bd_addr, cat: "hw" });

      const pending_reboot = (nv?.status === 'pending_reboot');

      return { ok: true, infoItems, nv, disable_bits, pending_reboot };
    } catch(error) {
      la("ds5_info_error", {"r": error});
      return { ok: false, error, disable_bits: 1 };
    }
  }

  async flash(progressCallback = null) {
    la("ds5_flash");
    try {
      await this.nvsUnlock();
      const lockRes = await this.nvsLock();
      if(!lockRes.ok) throw (lockRes.error || new Error("NVS lock failed"));

      return { success: true, message: this.l("Changes saved successfully") };
    } catch(error) {
      throw new Error(this.l("Error while saving changes"), { cause: error });
    }
  }

  async reset() {
    la("ds5_reset");
    try {
      await this.sendFeatureReport(0x80, [1,1]);
    } catch(error) {
    }
  }

  async nvsLock() {
    la("ds5_nvlock");
    try {
      await this.sendFeatureReport(0x80, [3,1]);
      await this.receiveFeatureReport(0x81);
      return { ok: true };
    } catch(error) {
      return { ok: false, error };
    }
  }

  async nvsUnlock() {
    la("ds5_nvunlock");
    try {
      await this.sendFeatureReport(0x80, [3,2, 101, 50, 64, 12]);
      const data = await this.receiveFeatureReport(0x81);
    } catch(error) {
      await sleep(500);
      throw new Error(this.l("NVS Unlock failed"), { cause: error });
    }
  }

  async getBdAddr() {
    await this.sendFeatureReport(0x80, [9,2]);
    const data = lf("ds5_getbdaddr", await this.receiveFeatureReport(0x81));
    return format_mac_from_view(data, 4);
  }

  async getSystemInfo(base, num, length, decode = true) {
    await this.sendFeatureReport(128, [base,num]);
    const pcba_id = lf("ds5_pcba_id", await this.receiveFeatureReport(129));
    if(pcba_id.getUint8(1) != base || pcba_id.getUint8(2) != num || pcba_id.getUint8(3) != 2) {
      return this.l("error");
    }
    if(decode)
      return new TextDecoder().decode(pcba_id.buffer.slice(4, 4+length));

    return buf2hex(pcba_id.buffer.slice(4, 4+length));
  }

  async calibrateSticksBegin() {
    la("ds5_calibrate_sticks_begin");
    try {
      // Begin
      await this.sendFeatureReport(0x82, [1,1,1]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010101) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_sticks_begin_failed", {"d1": d1});
        throw new Error(`Stick center calibration begin failed: ${d1}`);
      }
      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_sticks_begin_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateSticksSample() {
    la("ds5_calibrate_sticks_sample");
    try {
      // Sample
      await this.sendFeatureReport(0x82, [3,1,1]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010101) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_sticks_sample_failed", {"d1": d1});
        throw new Error(`Stick center calibration sample failed: ${d1}`);
      }
      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_sticks_sample_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateSticksEnd() {
    la("ds5_calibrate_sticks_end");
    try {
      // Write
      await this.sendFeatureReport(0x82, [2,1,1]);

      const data = await this.receiveFeatureReport(0x83);

      if(data.getUint32(0, false) != 0x83010102) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_sticks_failed", {"s": 3, "d1": d1});
        throw new Error(`Stick center calibration end failed: ${d1}`);
      }

      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_sticks_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateRangeBegin() {
    la("ds5_calibrate_range_begin");
    try {
      // Begin
      await this.sendFeatureReport(0x82, [1,1,2]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010201) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_range_begin_failed", {"d1": d1});
        throw new Error(`Stick range calibration begin failed: ${d1}`);
      }
      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_range_begin_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateRangeEnd() {
    la("ds5_calibrate_range_end");
    try {
      // Write
      await this.sendFeatureReport(0x82, [2,1,2]);

      // Assert
      const data = await this.receiveFeatureReport(0x83);

      if(data.getUint32(0, false) != 0x83010202) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_range_end_failed", {"d1": d1});
        throw new Error(`Stick range calibration end failed: ${d1}`);
      }

      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_range_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async queryNvStatus() {
    try {
      await this.sendFeatureReport(0x80, [3,3]);
      const data = lf("ds5_nvstatus", await this.receiveFeatureReport(0x81));
      const ret = data.getUint32(1, false);
      if (ret === 0x15010100) {
        return { device: 'ds5', status: 'pending_reboot', locked: null, code: 4, raw: ret };
      }
      if (ret === 0x03030201) {
        return { device: 'ds5', status: 'locked', locked: true, mode: 'temporary', code: 1, raw: ret };
      }
      if (ret === 0x03030200) {
        return { device: 'ds5', status: 'unlocked', locked: false, mode: 'permanent', code: 0, raw: ret };
      }
      if (ret === 1 || ret === 2) {
        return { device: 'ds5', status: 'unknown', locked: null, code: 2, raw: ret };
      }
      return { device: 'ds5', status: 'unknown', locked: null, code: ret, raw: ret };
    } catch (error) {
      return { device: 'ds5', status: 'error', locked: null, code: 2, error };
    }
  }

  hwToBoardModel(hw_ver) {
    const a = (hw_ver >> 8) & 0xff;
    if(a == 0x03) {
      return "BDM-010";
    } else if(a == 0x04) {
      return "BDM-020";
    } else if(a == 0x05) {
      return "BDM-030";
    } else if(a == 0x06) {
      return "BDM-040";
    } else if(a == 0x07 || a == 0x08) {
      return "BDM-050";
    } else {
      return this.l("Unknown");
    }
  }

  async getInMemoryModuleData() {
    // DualSense
    await this.sendFeatureReport(0x80, [12, 2]);
    await sleep(100);
    const data = await this.receiveFeatureReport(0x81);
    const cmd = data.getUint8(0, true);
    const [p1, p2, p3] = [1, 2, 3].map(i => data.getUint8(i, true));

    if(cmd != 129 || p1 != 12 || (p2 != 2 && p2 != 4) || p3 != 2)
      return null;

    return Array.from({ length: 12 }, (_, i) => data.getUint16(4 + i * 2, true));
  }

  async writeFinetuneData(data) {
    const pkg = data.reduce((acc, val) => acc.concat([val & 0xff, val >> 8]), [12, 1]);
    await this.sendFeatureReport(0x80, pkg);
  }

  /**
  * Parse DS5 battery status from input data
  */
  parseBatteryStatus(data) {
    const bat = data.getUint8(52); // DS5 battery byte is at position 52

    // DS5: bat_charge = low 4 bits, bat_status = high 4 bits
    const bat_charge = bat & 0x0f;
    const bat_status = bat >> 4;

    let bat_capacity = 0;
    let cable_connected = false;
    let is_charging = false;
    let is_error = false;

    switch (bat_status) {
      case 0:
        // On battery power
        bat_capacity = Math.min(bat_charge * 10 + 5, 100);
        break;
      case 1:
        // Charging
        bat_capacity = Math.min(bat_charge * 10 + 5, 100);
        is_charging = true;
        cable_connected = true;
        break;
      case 2:
        // Fully charged
        bat_capacity = 100;
        cable_connected = true;
        break;
      default:
        // Error state
        is_error = true;
        break;
    }

    return { bat_capacity, cable_connected, is_charging, is_error };
  }
}

/**
* DualSense Edge (DS5 Edge) Controller implementation
*/
class DS5EdgeController extends DS5Controller {
  constructor(device, uiDependencies = {}) {
    super(device, uiDependencies);
    this.model = "DS5_Edge";
    this.finetuneMaxValue = 4095; // 12-bit max value for DS5 Edge
  }

  async getInfo() {
    const { l } = this;

    // DS5 Edge uses the same info structure as DS5 but with is_edge=true
    const result = await this._getInfo(true);

    if (result.ok) {
      // DS Edge extra module info
      const empty = Array(17).fill('\x00').join('');
      try {
        const sticks_barcode = (await this.getBarcode()).map(barcode => barcode === empty ? l("Unknown") : barcode);
        result.infoItems.push({ key: l("Left Module Barcode"), value: sticks_barcode[1], cat: "fw" });
        result.infoItems.push({ key: l("Right Module Barcode"), value: sticks_barcode[0], cat: "fw" });
      } catch(_e) {
        // ignore module read errors here
      }
    }

    return result;
  }

  async flash(progressCallback = null) {
    la("ds5_edge_flash");
    try {
      const ret = await this.flashModules(progressCallback);
      if(ret) {
        return { 
          success: true, 
          message: "<b>" + this.l("Changes saved successfully") + "</b>.<br><br>" + this.l("If the calibration is not stored permanently, please double-check the wirings of the hardware mod."),
          isHtml: true
        };
      }
    } catch(error) {
      throw new Error(this.l("Error while saving changes"), { cause: error });
    }
  }

  async getBarcode() {
    await this.sendFeatureReport(0x80, [21,34]);
    await sleep(100);

    const data = lf("ds5_edge_get_barcode", await this.receiveFeatureReport(0x81));
    const td = new TextDecoder();
    const r_bc = td.decode(data.buffer.slice(21, 21+17));
    const l_bc = td.decode(data.buffer.slice(40, 40+17));
    return [r_bc, l_bc];
  }

  async unlockModule(i) {
    const m_name = i == 0 ? "left module" : "right module";

    await this.sendFeatureReport(0x80, [21, 6, i, 11]);
    await sleep(200);
    const ret = await this.waitUntilWritten([21, 6, 2]);
    if(!ret) {
      throw new Error(this.l("Cannot unlock") + " " + this.l(m_name));
    }
  }

  async lockModule(i) {
    const m_name = i == 0 ? "left module" : "right module";

    await this.sendFeatureReport(0x80, [21, 4, i, 8]);
    await sleep(200);
    const ret = await this.waitUntilWritten([21, 4, 2]);
    if(!ret) {
      throw new Error(this.l("Cannot lock") + " " + this.l(m_name));
    }
  }

  async storeDataInto(i) {
    const m_name = i == 0 ? "left module" : "right module";

    await this.sendFeatureReport(0x80, [21, 5, i]);
    await sleep(200);
    const ret = await this.waitUntilWritten([21, 3, 2]);
    if(!ret) {
      throw new Error(this.l("Cannot store data into") + " " + this.l(m_name));
    }
  }

  async flashModules(progressCallback) {
    la("ds5_edge_flash_modules");
    try {
      progressCallback(0);

      // Reload data, this ensures correctly writing data in the controller
      await sleep(100);
      progressCallback(10);

      // Unlock modules
      await this.unlockModule(0);
      progressCallback(15);
      await this.unlockModule(1);
      progressCallback(30);

      // Unlock NVS
      await this.nvsUnlock();
      await sleep(50);
      progressCallback(45);

      // This should trigger write into modules
      const data = await this.getInMemoryModuleData();
      await sleep(50);
      progressCallback(60);
      await this.writeFinetuneData(data);

      // Extra delay
      await sleep(100);

      // Lock back modules
      await this.lockModule(0);
      progressCallback(80);
      await this.lockModule(1);
      progressCallback(100);

      // Lock back NVS
      await sleep(100);
      const lockRes = await this.nvsLock();
      if(!lockRes.ok) throw (lockRes.error || new Error("NVS lock failed"));

      await sleep(250);

      return true;
    } catch(error) {
      la("ds5_edge_flash_modules_failed", {"r": error});
      throw error;
    }
  }

  async waitUntilWritten(expected) {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const data = await this.receiveFeatureReport(0x81);

      // Check if all expected bytes match
      const allMatch = expected.every((expectedByte, i) => 
        data.getUint8(1 + i, true) === expectedByte
      );

      if (allMatch) {
        return true;
      }

      attempts++;
      await sleep(50);
    }

    return false;
  }

  async calibrateSticksEnd() {
    la("ds5_calibrate_sticks_end");
    try {
      // Write
      await this.sendFeatureReport(0x82, [2,1,1]);

      let data = await this.receiveFeatureReport(0x83);

      if(data.getUint32(0, false) != 0x83010101) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_sticks_failed", {"s": 3, d1});
        return { ok: false, code: 4, d1 };
      }

      await this.sendFeatureReport(0x82, [2,1,1]);
      data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010103 && data.getUint32(0, false) != 0x83010312) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_sticks_failed", {"s": 3, d1});
        return { ok: false, code: 5, d1 };
      }

      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_sticks_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async calibrateRangeEnd() {
    la("ds5_calibrate_range_end");
    try {
      // Write
      await this.sendFeatureReport(0x82, [2,1,2]);

      // Assert
      let data = await this.receiveFeatureReport(0x83);

      if(data.getUint32(0, false) != 0x83010201) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_range_end_failed", {d1});
        return { ok: false, code: 4, d1 };
      }

      await this.sendFeatureReport(0x82, [2,1,2]);
      data = await this.receiveFeatureReport(0x83);
      if(data.getUint32(0, false) != 0x83010203) {
        const d1 = dec2hex32(data.getUint32(0, false));
        la("ds5_calibrate_range_end_failed", {d1});
        return { ok: false, code: 5, d1 };
      }

      return { ok: true };
    } catch(error) {
      la("ds5_calibrate_range_end_failed", {"r": error});
      return { ok: false, error };
    }
  }

  async getInMemoryModuleData() {
    // DualSense Edge
    await this.sendFeatureReport(0x80, [12, 4]);
    await sleep(100);
    const data = await this.receiveFeatureReport(0x81);
    const cmd = data.getUint8(0, true);
    const [p1, p2, p3] = [1, 2, 3].map(i => data.getUint8(i, true));

    if(cmd != 129 || p1 != 12 || (p2 != 2 && p2 != 4) || p3 != 2)
      return null;

    return Array.from({ length: 12 }, (_, i) => data.getUint16(4 + i * 2, true));
  }

  async writeFinetuneData(data) {
    const pkg = data.reduce((acc, val) => acc.concat([val & 0xff, val >> 8]), [12, 1]);
    await this.sendFeatureReport(0x80, pkg);
  }
}

/**
* Controller Factory - Creates the appropriate controller instance based on device type
*/
class ControllerFactory {
  static getSupportedModels() {
    const ds4v1 = { vendorId: 0x054c, productId: 0x05c4 };
    const ds4v2 = { vendorId: 0x054c, productId: 0x09cc };
    const ds5 = { vendorId: 0x054c, productId: 0x0ce6 };
    const ds5edge = { vendorId: 0x054c, productId: 0x0df2 };
    return [ds4v1, ds4v2, ds5, ds5edge];
  }


  /**
  * Create a controller instance based on the HID device product ID
  * @param {HIDDevice} device The HID device
  * @param {Object} uiDependencies Optional UI dependencies (l function, etc.)
  * @returns {BaseController} The appropriate controller instance
  */
  static createControllerInstance(device, uiDependencies = {}) {
    switch (device.productId) {
      case 0x05c4: // DS4 v1
      case 0x09cc: // DS4 v2
        return new DS4Controller(device, uiDependencies);

      case 0x0ce6: // DS5
        return new DS5Controller(device, uiDependencies);

      case 0x0df2: // DS5 Edge
        return new DS5EdgeController(device, uiDependencies);

      default:
        throw new Error(`Unsupported device: ${dec2hex(device.vendorId)}:${dec2hex(device.productId)}`);
    }
  }

  /**
  * Get device name based on product ID
  * @param {number} productId Product ID
  * @returns {string} Device name
  */
  static getDeviceName(productId) {
    switch (productId) {
      case 0x05c4:
        return "Sony DualShock 4 V1";
      case 0x09cc:
        return "Sony DualShock 4 V2";
      case 0x0ce6:
        return "Sony DualSense";
      case 0x0df2:
        return "Sony DualSense Edge";
      default:
        return "Unknown Device";
    }
  }

  /**
  * Get UI configuration based on product ID
  * @param {number} productId Product ID
  * @returns {Object} UI configuration
  */
  static getUIConfig(productId) {
    switch (productId) {
      case 0x05c4: // DS4 v1
      case 0x09cc: // DS4 v2
        return { 
          showInfo: false, 
          showFinetune: false, 
          showMute: false, 
          showInfoTab: false 
        };

      case 0x0ce6: // DS5
      case 0x0df2: // DS5 Edge
        return { 
          showInfo: true, 
          showFinetune: true, 
          showMute: true, 
          showInfoTab: true 
        };

      default:
        return { 
          showInfo: false, 
          showFinetune: false, 
          showMute: false, 
          showInfoTab: false 
        };
    }
  }
}

// Alphabetical order
const available_langs = {
  "ar_ar": { "name": "العربية", "file": "ar_ar.json", "direction": "rtl"},
  "bg_bg": { "name": "Български", "file": "bg_bg.json", "direction": "ltr"},
  "cz_cz": { "name": "Čeština", "file": "cz_cz.json", "direction": "ltr"},
  "da_dk": { "name": "Dansk", "file": "da_dk.json", "direction": "ltr"},
  "de_de": { "name": "Deutsch", "file": "de_de.json", "direction": "ltr"},
  "es_es": { "name": "Español", "file": "es_es.json", "direction": "ltr"},
  "fa_fa": { "name": "فارسی", "file": "fa_fa.json", "direction": "rtl"},
  "fr_fr": { "name": "Français", "file": "fr_fr.json", "direction": "ltr"},
  "hu_hu": { "name": "Magyar", "file": "hu_hu.json", "direction": "ltr"},
  "it_it": { "name": "Italiano", "file": "it_it.json", "direction": "ltr"},
  "jp_jp": { "name": "日本語", "file": "jp_jp.json", "direction": "ltr"},
  "ko_kr": { "name": "한국어", "file": "ko_kr.json", "direction": "ltr"},
  "nl_nl": { "name": "Nederlands", "file": "nl_nl.json", "direction": "ltr"},
  "pl_pl": { "name": "Polski", "file": "pl_pl.json", "direction": "ltr"},
  "pt_br": { "name": "Português do Brasil", "file": "pt_br.json", "direction": "ltr"},
  "pt_pt": { "name": "Português", "file": "pt_pt.json", "direction": "ltr"},
  "rs_rs": { "name": "Srpski", "file": "rs_rs.json", "direction": "ltr"},
  "ru_ru": { "name": "Русский", "file": "ru_ru.json", "direction": "ltr"},
  "tr_tr": { "name": "Türkçe", "file": "tr_tr.json", "direction": "ltr"},
  "ua_ua": { "name": "Українська", "file": "ua_ua.json", "direction": "ltr"},
  "zh_cn": { "name": "中文", "file": "zh_cn.json", "direction": "ltr"},
  "zh_tw": { "name": "中文(繁)", "file": "zh_tw.json", "direction": "ltr"}
};

// Translation state - will be imported from core.js app object
let translationState = null;
let welcomeModal = null;
let handleLanguageChange$1 = null;

function lang_init(appState, handleLanguageChangeCb, welcomeModalCb) {
  translationState = appState;
  handleLanguageChange$1 = handleLanguageChangeCb;
  welcomeModal = welcomeModalCb;
  
  let id_iter = 0;
  const items = document.getElementsByClassName('ds-i18n');
  for(let item of items) {
    if (item.id.length == 0) {
      item.id = `ds-i18n-${id_iter++}`;
    }
    
    translationState.lang_orig_text[item.id] = $(item).html();
  }
  translationState.lang_orig_text[".title"] = document.title;
  
  const force_lang = readCookie("force_lang");
  if (force_lang != null) {
    lang_set(force_lang, true).catch(error => {
      console.error("Failed to set forced language:", error);
    });
  } else {
    const nlang = navigator.language.replace('-', '_').toLowerCase();
    const ljson = available_langs[nlang];
    if(ljson) {
      la("lang_init", {"l": nlang});
      lang_translate(ljson["file"], nlang, ljson["direction"]).catch(error => {
        console.error("Failed to load initial language:", error);
      });
    }
  }
  
  const langs = Object.keys(available_langs);
  const olangs = [
    '<li><a class="dropdown-item" href="#" onclick="lang_set(\'en_us\');">English</a></li>',
    ...langs.map(lang => {
      const name = available_langs[lang]["name"];
      return `<li><a class="dropdown-item" href="#" onclick="lang_set('${lang}');">${name}</a></li>`;
    }),
    '<li><hr class="dropdown-divider"></li>',
    '<li><a class="dropdown-item" href="https://github.com/dualshock-tools/dualshock-tools.github.io/blob/main/TRANSLATIONS.md" target="_blank">Missing your language?</a></li>'
  ].join('');
  $("#availLangs").html(olangs);
}

async function lang_set(lang, skip_modal=false) {
  la("lang_set", { l: lang });
  
  lang_reset_page();
  if(lang != "en_us") {
    const { file, direction } = available_langs[lang];
    await lang_translate(file, lang, direction);
  }
  
  await handleLanguageChange$1(lang);
  createCookie("force_lang", lang);
  if(!skip_modal && welcomeModal) {
    createCookie("welcome_accepted", "0");
    welcomeModal();
  }
}

function lang_reset_page() {
  lang_set_direction("ltr", "en_us");

  // Reset translation state to disable translations
  translationState.lang_cur = {};
  translationState.lang_disabled = true;

  const { lang_orig_text } = translationState;
  const items = document.getElementsByClassName('ds-i18n');
  for(let item of items) {
    $(item).html(lang_orig_text[item.id]);
  }  $("#authorMsg").html("");
  $("#curLang").html("English");
  document.title = lang_orig_text[".title"];
}

function lang_set_direction(new_direction, lang_name) {
  const lang_prefix = lang_name.split("_")[0];
  $("html").attr("lang", lang_prefix);

  if(new_direction == translationState.lang_cur_direction)
    return;

  if(new_direction == "rtl") {
    $('#bootstrap-css').attr('integrity', 'sha384-dpuaG1suU0eT09tx5plTaGMLBsfDLzUCCUXOY2j/LSvXYuG6Bqs43ALlhIqAJVRb');
    $('#bootstrap-css').attr('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css');
  } else {
    $('#bootstrap-css').attr('integrity', 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH');
    $('#bootstrap-css').attr('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
  }
  $("html").attr("dir", new_direction);
  translationState.lang_cur_direction = new_direction;
}

function l(text) {
  if(!translationState || translationState.lang_disabled)
    return text;

  const [out] = translationState.lang_cur[text] || [];
  if(out) return out;
  
  console.log("Missing translation for: '" + text + "'");
  return text;
}

function lang_translate(target_file, target_lang, target_direction) {
  return new Promise((resolve, reject) => {
    $.getJSON("lang/" + target_file)
      .done(function(data) {
        const { lang_orig_text, lang_cur } = translationState;
        lang_set_direction(target_direction, target_lang);

        $.each(data, function( key, val ) {
          if(lang_cur[key]) {
            console.log("Warn: already exists " + key);
          } else {
            lang_cur[key] = [val];
          }
        });

        if(Object.keys(lang_cur).length > 0) {
          translationState.lang_disabled = false;
        }

        const items = document.getElementsByClassName('ds-i18n');
        for(let item of items) {
          const originalText = lang_orig_text[item.id];
          const [translatedText] = lang_cur[originalText] || [];
          if (translatedText) {
            $(item).html(translatedText);
          } else {
            console.log("Cannot find mapping for " + originalText);
            $(item).html(originalText);
          }
        }

        const old_title = lang_orig_text[".title"];
        document.title = lang_cur[old_title];
        if(lang_cur[".authorMsg"]) {
          $("#authorMsg").html(lang_cur[".authorMsg"]);
        }
        $("#curLang").html(available_langs[target_lang]["name"]);

        resolve();
      })
      .fail(function(jqxhr, textStatus, error) {
        console.error("Failed to load translation file:", target_file, error);
        reject(error);
      });
  });
}

// Make lang_set available globally for onclick handlers in HTML
window.lang_set = lang_set;

// Cache for loaded templates
const templateCache = new Map();

/**
* Load a template from the templates directory or bundled assets
* @param {string} templateName - Name of the template file without extension
* @returns {Promise<string>} - Promise that resolves with the template HTML
*/
async function loadTemplate(templateName) {
  // Check if template is already in cache
  if (templateCache.has(templateName)) {
    return templateCache.get(templateName);
  }

  // Check if we have bundled assets (production mode)
  if (window.BUNDLED_ASSETS && window.BUNDLED_ASSETS.templates) {
    const templateHtml = window.BUNDLED_ASSETS.templates[templateName];
    if (templateHtml) {
      templateCache.set(templateName, templateHtml);
      return templateHtml;
    }
  }

  // Fallback to fetching from server (development mode)
  // Only append .html if the templateName doesn't already have an extension
  const hasExtension = templateName.includes('.');
  const templatePath = hasExtension ? `templates/${templateName}` : `templates/${templateName}.html`;

  const response = await fetch(templatePath);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${templateName}`);
  }

  const templateHtml = await response.text();
  templateCache.set(templateName, templateHtml);
  return templateHtml;
}

/**
* Load SVG assets from bundled assets or server
* @param {string} assetPath - Path to the SVG asset
* @returns {Promise<string>} - Promise that resolves with the SVG content
*/
async function loadSvgAsset(assetPath) {
  // Check if we have bundled assets (production mode)
  if (window.BUNDLED_ASSETS && window.BUNDLED_ASSETS.svg) {
    const svgContent = window.BUNDLED_ASSETS.svg[assetPath];
    if (svgContent) {
      return svgContent;
    }
  }

  // Fallback to fetching from server (development mode)
  const response = await fetch(`assets/${assetPath}`);
  if (!response.ok) {
    throw new Error(`Failed to load SVG asset: ${assetPath}`);
  }

  return await response.text();
}

/**
* Load all templates and insert them into the DOM
*/
async function loadAllTemplates() {
  // Load SVG icons
  const iconsHtml = await loadSvgAsset('icons.svg');
  const iconsContainer = document.createElement('div');
  iconsContainer.innerHTML = iconsHtml;
  document.body.prepend(iconsContainer);

  // Load modals
  const faqModalHtml = await loadTemplate('faq-modal');
  const popupModalHtml = await loadTemplate('popup-modal');
  const finetuneModalHtml = await loadTemplate('finetune-modal');
  const calibCenterModalHtml = await loadTemplate('calib-center-modal');
  const welcomeModalHtml = await loadTemplate('welcome-modal');
  const calibrateModalHtml = await loadTemplate('calibrate-modal');
  const rangeModalHtml = await loadTemplate('range-modal');
  const edgeProgressModalHtml = await loadTemplate('edge-progress-modal');
  const edgeModalHtml = await loadTemplate('edge-modal');
  const donateModalHtml = await loadTemplate('donate-modal');

  // Create modals container
  const modalsContainer = document.createElement('div');
  modalsContainer.id = 'modals-container';
  modalsContainer.innerHTML = faqModalHtml + popupModalHtml + finetuneModalHtml + calibCenterModalHtml + welcomeModalHtml + calibrateModalHtml + rangeModalHtml + edgeProgressModalHtml + edgeModalHtml + donateModalHtml;
  document.body.appendChild(modalsContainer);
}

// Constants
const CIRCULARITY_DATA_SIZE = 48; // Number of angular positions to sample

/**
 * Draws analog stick position on a canvas with various visualization options.
 * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
 * @param {number} center_x - X coordinate of stick center
 * @param {number} center_y - Y coordinate of stick center
 * @param {number} sz - Size/radius of the stick area
 * @param {number} stick_x - Current stick X position (-1 to 1)
 * @param {number} stick_y - Current stick Y position (-1 to 1)
 * @param {Object} opts - Options object
 * @param {number[]|null} opts.circularity_data - Array of circularity test data
 * @param {boolean} opts.enable_zoom_center - Whether to apply center zoom transformation
 * @param {boolean} opts.highlight - Whether to highlight the stick position
 */
function draw_stick_position(ctx, center_x, center_y, sz, stick_x, stick_y, opts = {}) {
    const { circularity_data = null, enable_zoom_center = false, highlight } = opts;

    // Draw base circle
    ctx.lineWidth = 1;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    ctx.arc(center_x, center_y, sz, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Helper function for circularity visualization color
    function cc_to_color(cc) {
        const dd = Math.sqrt(Math.pow((1.0 - cc), 2));
        let hh;
        if(cc <= 1.0)
            hh = 220 - 220 * Math.min(1.0, Math.max(0, (dd - 0.05)) / 0.1);
        else
            hh = (245 + (360-245) * Math.min(1.0, Math.max(0, (dd - 0.05)) / 0.15)) % 360;
        return hh;
    }

    // Draw circularity visualization if data provided
    if (circularity_data?.length > 0) {
        const MAX_N = CIRCULARITY_DATA_SIZE;

        for(let i = 0; i < MAX_N; i++) {
            const kd = circularity_data[i];
            const kd1 = circularity_data[(i+1) % CIRCULARITY_DATA_SIZE];
            if (kd === undefined || kd1 === undefined) continue;
            const ka = i * Math.PI * 2 / MAX_N;
            const ka1 = ((i+1)%MAX_N) * 2 * Math.PI / MAX_N;

            const kx = Math.cos(ka) * kd;
            const ky = Math.sin(ka) * kd;
            const kx1 = Math.cos(ka1) * kd1;
            const ky1 = Math.sin(ka1) * kd1;

            ctx.beginPath();
            ctx.moveTo(center_x, center_y);
            ctx.lineTo(center_x+kx*sz, center_y+ky*sz);
            ctx.lineTo(center_x+kx1*sz, center_y+ky1*sz);
            ctx.lineTo(center_x, center_y);
            ctx.closePath();

            const cc = (kd + kd1) / 2;
            const hh = cc_to_color(cc);
            ctx.fillStyle = 'hsla(' + parseInt(hh) + ', 100%, 50%, 0.5)';
            ctx.fill();
        }
    }

    // Draw circularity error text if enough data provided
    if (circularity_data?.filter(n => n > 0.3).length > 10) {
        const circularityError = calculateCircularityError(circularity_data);

        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.font = '24px Arial';
        const text_y = center_y + sz * 0.5;
        const text = `${circularityError.toFixed(1)} %`;

        ctx.strokeText(text, center_x, text_y);
        ctx.fillText(text, center_x, text_y);
    }

    // Draw crosshairs
    ctx.strokeStyle = '#aaaaaa';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(center_x-sz, center_y);
    ctx.lineTo(center_x+sz, center_y);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center_x, center_y-sz);
    ctx.lineTo(center_x, center_y+sz);
    ctx.closePath();
    ctx.stroke();

    // Apply center zoom transformation if enabled
    let display_x = stick_x;
    let display_y = stick_y;
    if (enable_zoom_center) {
        const transformed = apply_center_zoom(stick_x, stick_y);
        display_x = transformed.x;
        display_y = transformed.y;

        // Draw light gray circle at 50% radius to show border of zoomed center
        ctx.strokeStyle = '#d3d3d3'; // light gray
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(center_x, center_y, sz * 0.5, 0, 2 * Math.PI);
        ctx.stroke();
    }

    ctx.fillStyle = '#000000';
    ctx.strokeStyle = '#000000';

    // Draw stick line with variable thickness
    // Calculate distance from center
    const stick_distance = Math.sqrt(display_x*display_x + display_y*display_y);
    const boundary_radius = 0.5; // 50% radius

    // Determine if we need to draw a two-segment line
    const use_two_segments = enable_zoom_center && stick_distance > boundary_radius;
    if (use_two_segments) {
        // Calculate boundary point
        const boundary_x = (display_x / stick_distance) * boundary_radius;
        const boundary_y = (display_y / stick_distance) * boundary_radius;

        // First segment: thicker line from center to boundary
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(center_x, center_y);
        ctx.lineTo(center_x + boundary_x*sz, center_y + boundary_y*sz);
        ctx.stroke();

        // Second segment: thinner line from boundary to stick position
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(center_x + boundary_x*sz, center_y + boundary_y*sz);
        ctx.lineTo(center_x + display_x*sz, center_y + display_y*sz);
        ctx.stroke();
    } else {
        // Single line from center to stick position
        ctx.lineWidth = enable_zoom_center ? 3 : 1;
        ctx.beginPath();
        ctx.moveTo(center_x, center_y);
        ctx.lineTo(center_x + display_x*sz, center_y + display_y*sz);
        ctx.stroke();
    }

    // Draw filled circle at stick position
    ctx.beginPath();
    ctx.arc(center_x+display_x*sz, center_y+display_y*sz, 3, 0, 2*Math.PI);

    if (typeof highlight === 'boolean') {
        ctx.fillStyle = highlight ? '#2989f7ff' : '#030b84ff';
    }
    ctx.fill();
}

/**
 * Calculates circularity error for stick movement data.
 * @param {number[]} data - Array of distance values at different angular positions
 * @returns {number} RMS deviation as percentage
 */
function calculateCircularityError(data) {
    // Sum of squared deviations from ideal distance of 1.0, only for values > 0.2
    const sumSquaredDeviations = data.reduce((acc, val) =>
        val > 0.2 ? acc + Math.pow(val - 1, 2) : acc, 0);

    // Calculate RMS deviation as percentage
    const validDataCount = data.filter(val => val > 0.2).length;
    return validDataCount > 0 ? Math.sqrt(sumSquaredDeviations / validDataCount) * 100 : 0;
}

/**
 * Applies center zoom transformation to stick coordinates.
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @returns {Object} Transformed coordinates {x, y}
 */
function apply_center_zoom(x, y) {
    // Calculate distance from center
    const distance = Math.sqrt(x * x + y * y);

    // If distance is 0, return original values
    if (distance === 0) {
        return { x, y};
    }

    // Calculate angle
    const angle = Math.atan2(y, x);

    // Apply center zoom transformation
    const new_distance =
        distance <= 0.05
        ? (distance / 0.05) * 0.5 // 0 to 0.05 maps to 0 to 0.5 (half the radius)
        : 0.5 + ((distance - 0.05) / 0.95) * 0.5; // 0.05 to 1.0 maps to 0.5 to 1.0 (other half)

    // Convert back to x, y coordinates
    return {
        x: Math.cos(angle) * new_distance,
        y: Math.sin(angle) * new_distance
    };
}

const FINETUNE_INPUT_SUFFIXES = ["LL", "LT", "RL", "RT", "LR", "LB", "RR", "RB", "LX", "LY", "RX", "RY"];

/**
 * DS5 Finetuning Class
 * Handles controller stick calibration and fine-tuning operations
 */
class Finetune {
  constructor() {
    this._mode = 'center'; // 'center' or 'circularity'
    this.original_data = [];
    this.last_written_data = [];
    this.active_stick = null; // 'left', 'right', or null
    this._centerStepSize = 5; // Default step size for center mode
    this._circularityStepSize = 5; // Default step size for circularity mode
    
    // Dependencies
    this.controller = null;
    this.ll_data = null;
    this.rr_data = null;
    this.clearCircularity = null;
    
    // Closure functions
    this.refresh_finetune_sticks = this._createRefreshSticksThrottled();
    this.update_finetune_warning_messages = this._createUpdateWarningMessagesClosure();
    this.flash_finetune_warning = this._createFlashWarningClosure();
    
    // Continuous adjustment state
    this.continuous_adjustment = {
      initial_delay: null,
      repeat_delay: null,
    };
  }

  get mode() {
    return this._mode;
  }

  set mode(mode) {
    if (mode !== 'center' && mode !== 'circularity') {
      throw new Error(`Invalid finetune mode: ${mode}. Must be 'center' or 'circularity'`);
    }
    this._mode = mode;
    this._updateUI();
  }

  get stepSize() {
    return this._mode === 'center' ? this._centerStepSize : this._circularityStepSize;
  }

  set stepSize(size) {
    if (this._mode === 'center') {
      this._centerStepSize = size;
    } else {
      this._circularityStepSize = size;
    }
    this._updateStepSizeUI();
    this._saveStepSizeToLocalStorage();
  }

  async init(controllerInstance, { ll_data, rr_data, clear_circularity }) {
    this.controller = controllerInstance;
    this.ll_data = ll_data;
    this.rr_data = rr_data;
    this.clearCircularity = clear_circularity;

    this._initEventListeners();
    this._restoreShowRawNumbersCheckbox();
    this._restoreStepSizeFromLocalStorage();
  
    // Lock NVS before
    const nv = await this.controller.queryNvStatus();
    if(!nv.locked) {
      const res = await this.controller.nvsLock();
      if(!res.ok) {
        return;
      }

      const nv2 = await this.controller.queryNvStatus();
      if(!nv2.locked) {
        const errTxt = "0x" + dec2hex32(nv2.raw);
        throw new Error("ERROR: Cannot lock NVS (" + errTxt + ")");
      }
    } else if(nv.status !== 'locked') {
      throw new Error("ERROR: Cannot read NVS status. Finetuning is not safe on this device.");
    }

    const data = await this._readFinetuneData();

    const modal = new bootstrap.Modal(document.getElementById('finetuneModal'), {});
    modal.show();

    const maxValue = this.controller.getFinetuneMaxValue();
    FINETUNE_INPUT_SUFFIXES.forEach((suffix, i) => {
      const el = $("#finetune" + suffix);
      el.attr('max', maxValue);
      el.val(data[i]);
    });

    // Start in center mode
    this.setMode('center');
    this.setStickToFinetune('left');

    // Initialize the raw numbers display state
    this._showRawNumbersChanged();

    this.original_data = data;

    this.refresh_finetune_sticks();
  }

  /**
   * Initialize event listeners for the finetune modal
   */
  _initEventListeners() {
    FINETUNE_INPUT_SUFFIXES.forEach((suffix) => {
      $("#finetune" + suffix).on('change', () => this._onFinetuneChange());
    });

    // Set up mode toggle event listeners
    $("#finetuneModeCenter").on('change', (e) => {
      if (e.target.checked) {
        this.setMode('center');
      }
    });

    $("#finetuneModeCircularity").on('change', (e) => {
      if (e.target.checked) {
        this.setMode('circularity');
      }
    });

    $("#showRawNumbersCheckbox").on('change', () => {
      this._showRawNumbersChanged();
    });

    $("#left-stick-card").on('click', () => {
      console.log("Left stick card clicked");
      this.setStickToFinetune('left');
    });

    $("#right-stick-card").on('click', () => {
      this.setStickToFinetune('right');
    });

    $('#finetuneModal').on('hidden.bs.modal', () => {
      console.log("Finetune modal hidden event triggered");
      destroyCurrentInstance$2();
    });

    // Step size dropdown event listeners
    $('.dropdown-item[data-step]').on('click', (e) => {
      e.preventDefault();
      const stepSize = parseInt($(e.target).data('step'));
      this.stepSize = stepSize;
    });
  }

  /**
   * Clean up event listeners for the finetune modal
   */
  removeEventListeners() {
    FINETUNE_INPUT_SUFFIXES.forEach((suffix) => {
      $("#finetune" + suffix).off('change');
    });

    // Remove mode toggle event listeners
    $("#finetuneModeCenter").off('change');
    $("#finetuneModeCircularity").off('change');

    // Remove other event listeners
    $("#showRawNumbersCheckbox").off('change');
    $("#left-stick-card").off('click');
    $("#right-stick-card").off('click');

    $('#finetuneModal').off('hidden.bs.modal');
    $('.dropdown-item[data-step]').off('click');
  }

  /**
   * Handle mode switching based on controller input
   */
  handleModeSwitching(changes) {
    if (changes.l1) {
      this.setMode('center');
      this._clearFinetuneAxisHighlights();
    } else if (changes.r1) {
      this.setMode('circularity');
      this._clearFinetuneAxisHighlights();
    }
  }

  /**
   * Handle stick switching based on controller input
   */
  handleStickSwitching(changes) {
    if (changes.sticks) {
      this._updateActiveStickBasedOnMovement();
    }
  }

  /**
   * Handle D-pad adjustments for finetuning
   */
  handleDpadAdjustment(changes) {
    if(!this.active_stick) return;

    if (this._mode === 'center') {
      this._handleCenterModeAdjustment(changes);
    } else {
      this._handleCircularityModeAdjustment(changes);
    }
  }

  /**
   * Save finetune changes
   */
  save() {
    // Unlock save button
    this.controller.setHasChangesToWrite(true);

    this._close();
  }

  /**
   * Cancel finetune changes and restore original data
   */
  async cancel() {
    if(this.original_data.length == 12)
      await this._writeFinetuneData(this.original_data);

    this._close();
  }

  /**
   * Set the finetune mode
   */
  setMode(mode) {
    this.mode = mode;
  }

  /**
   * Set which stick to finetune
   */
  setStickToFinetune(stick) {
    if(this.active_stick === stick) {
      return;
    }

    // Stop any continuous adjustments when switching sticks
    this.stopContinuousDpadAdjustment();
    this._clearFinetuneAxisHighlights();

    this.active_stick = stick;

    const other_stick = stick === 'left' ? 'right' : 'left';
    $(`#${this.active_stick}-stick-card`).addClass("stick-card-active");
    $(`#${other_stick}-stick-card`).removeClass("stick-card-active");
  }

  // Private methods

  /**
   * Restore the show raw numbers checkbox state from localStorage
   */
  _restoreShowRawNumbersCheckbox() {
    const savedState = localStorage.getItem('showRawNumbersCheckbox');
    if (savedState) {
      const isChecked = savedState === 'true';
      $("#showRawNumbersCheckbox").prop('checked', isChecked);
    }
  }

  /**
   * Check if stick is in extreme position (close to edges)
   * @param {Object} stick - Stick object with x and y properties
   * @returns {boolean} True if stick is in extreme position
   */
  _isStickInExtremePosition(stick) {
    const primeAxis = Math.max(Math.abs(stick.x), Math.abs(stick.y));
    const otherAxis = Math.min(Math.abs(stick.x), Math.abs(stick.y));
    return primeAxis >= 0.5 && otherAxis < 0.2;
  }

  _updateUI() {
    // Clear circularity data - we'll call this from core.js
    this.clearCircularity();

    const modal = $('#finetuneModal');
    if (this._mode === 'center') {
      $("#finetuneModeCenter").prop('checked', true);
      modal.removeClass('circularity-mode');
    } else if (this._mode === 'circularity') {
      $("#finetuneModeCircularity").prop('checked', true);
      modal.addClass('circularity-mode');
    }

    // Update step size UI when mode changes
    this._updateStepSizeUI();
  }

  async _onFinetuneChange() {
    const out = FINETUNE_INPUT_SUFFIXES.map((suffix) => {
      const el = $("#finetune" + suffix);
      const v = parseInt(el.val());
      return isNaN(v) ? 0 : v;
    });
    await this._writeFinetuneData(out);
  }

  async _readFinetuneData() {
    const data = await this.controller.getInMemoryModuleData();
    if(!data) {
      throw new Error("ERROR: Cannot read calibration data");
    }

    this.last_written_data = data;
    return data;
  }

  async _writeFinetuneData(data) {
    if (data.length != 12) {
      return;
    }

    // const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    // if (deepEqual(data, this.last_written_data)) {
    // if (data == this.last_written_data) {   //mm this will never be true, but fixing it (per above) breaks Edge writes
    //     return;
    // }

    this.last_written_data = data;
    if (this.controller.isConnected()) {
      await this.controller.writeFinetuneData(data);
    }
  }

  _createRefreshSticksThrottled() {
    let timeout = null;

    return () => {
      if (timeout) return;

      timeout = setTimeout(() => {
        const { left, right } = this.controller.button_states.sticks;
        this._ds5FinetuneUpdate("finetuneStickCanvasL", left.x, left.y);
        this._ds5FinetuneUpdate("finetuneStickCanvasR", right.x, right.y);

        this.update_finetune_warning_messages();
        this._highlightActiveFinetuneAxis();

        timeout = null;
      }, 10);
    };
  }

  _createUpdateWarningMessagesClosure() {
    let timeout = null; // to stop unnecessary flicker in center mode

    return () => {
      if(!this.active_stick) return;

      const currentStick = this.controller.button_states.sticks[this.active_stick];
      if (this._mode === 'center') {
        const isNearCenter = Math.abs(currentStick.x) <= 0.5 && Math.abs(currentStick.y) <= 0.5;
        if(!isNearCenter && timeout) return;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          timeout = null;
          if(this._mode !== 'center') return; // in case it changed during timeout

          $('#finetuneCenterSuccess').toggle(isNearCenter);
          $('#finetuneCenterWarning').toggle(!isNearCenter);
        }, isNearCenter ? 0 : 200);
      }

      if (this._mode === 'circularity') {
        // Check if stick is in extreme position (close to edges)
        const isInExtremePosition = this._isStickInExtremePosition(currentStick);
        $('#finetuneCircularitySuccess').toggle(isInExtremePosition);
        $('#finetuneCircularityWarning').toggle(!isInExtremePosition);
      }
    };
  }

  _clearFinetuneAxisHighlights(to_clear = {center: true, circularity: true}) {
    const { center, circularity } = to_clear;

    if(this._mode === 'center' && center || this._mode === 'circularity' && circularity) {
      // Clear label highlights
      const labelIds = ["Lx-lbl", "Ly-lbl", "Rx-lbl", "Ry-lbl"];
      labelIds.forEach(suffix => {
        $(`#finetuneStickCanvas${suffix}`).removeClass("text-primary");
      });
    }
  }

  _highlightActiveFinetuneAxis(opts = {}) {
    if(!this.active_stick) return;

    if (this._mode === 'center') {
      const { axis } = opts;
      if(!axis) return;

      this._clearFinetuneAxisHighlights({center: true});

      const labelSuffix = `${this.active_stick === 'left' ? "L" : "R"}${axis.toLowerCase()}`;
      $(`#finetuneStickCanvas${labelSuffix}-lbl`).addClass("text-primary");
    } else {
      this._clearFinetuneAxisHighlights({circularity: true});

      const sticks = this.controller.button_states.sticks;
      const currentStick = sticks[this.active_stick];

      // Only highlight if stick is moved significantly from center
      const deadzone = 0.5;
      if (Math.abs(currentStick.x) >= deadzone || Math.abs(currentStick.y) >= deadzone) {
        const quadrant = this._getStickQuadrant(currentStick.x, currentStick.y);
        const inputSuffix = this._getFinetuneInputSuffixForQuadrant(this.active_stick, quadrant);
        if (inputSuffix) {
          // Highlight the corresponding LX/LY label to observe
          const labelId = `finetuneStickCanvas${
            this.active_stick === 'left' ? 'L' : 'R'}${
              quadrant === 'left' || quadrant === 'right' ? 'x' : 'y'}-lbl`;
              $(`#${labelId}`).addClass("text-primary");
            }
          }
        }
      }

  _ds5FinetuneUpdate(name, plx, ply) {
    const showRawNumbers = $("#showRawNumbersCheckbox").is(":checked");
    const canvasId = `${name}${showRawNumbers ? '' : '_large'}`;
    const c = document.getElementById(canvasId);

    if (!c) {
      console.error(`Canvas element not found: ${canvasId}`);
      return;
    }

    const ctx = c.getContext("2d");

    const margins = showRawNumbers ? 15 : 5;
    const radius = c.width / 2 - margins;
    const sz = c.width/2 - margins;
    const hb = radius + margins;
    const yb = radius + margins;
    ctx.clearRect(0, 0, c.width, c.height);

    const isLeftStick = name === "finetuneStickCanvasL";
    const highlight = this.active_stick == (isLeftStick ? 'left' : 'right') && this._isDpadAdjustmentActive();
    if (this._mode === 'circularity') {
      // Draw stick position with circle
      draw_stick_position(ctx, hb, yb, sz, plx, ply, {
        circularity_data: isLeftStick ? this.ll_data : this.rr_data,
        highlight
      });
    } else {
      // Draw stick position with crosshair
      draw_stick_position(ctx, hb, yb, sz, plx, ply, {
        enable_zoom_center: true,
        highlight
      });
    }

    $("#"+ name + "x-lbl").text(float_to_str(plx, 3));
    $("#"+ name + "y-lbl").text(float_to_str(ply, 3));
  }

  _showRawNumbersChanged() {
    const showRawNumbers = $("#showRawNumbersCheckbox").is(":checked");
    const modal = $("#finetuneModal");
    modal.toggleClass("hide-raw-numbers", !showRawNumbers);
    localStorage.setItem('showRawNumbersCheckbox', showRawNumbers);

    this.refresh_finetune_sticks();
  }

  _close() {
    console.log("Closing finetune modal");
    $("#finetuneModal").modal("hide");
  }

  _isStickAwayFromCenter(stick_pos, deadzone = 0.2) {
    return Math.abs(stick_pos.x) >= deadzone || Math.abs(stick_pos.y) >= deadzone;
  }

  _updateActiveStickBasedOnMovement() {
    const sticks = this.controller.button_states.sticks;
    const deadzone = 0.2;

    const left_is_away = this._isStickAwayFromCenter(sticks.left, deadzone);
    const right_is_away = this._isStickAwayFromCenter(sticks.right, deadzone);

    if (left_is_away && right_is_away) {
      // Both sticks are away from center - clear highlighting
      this._clearActiveStick();
    } else if (left_is_away && !right_is_away) {
      // Only left stick is away from center
      this.setStickToFinetune('left');
    } else if (right_is_away && !left_is_away) {
      // Only right stick is away from center
      this.setStickToFinetune('right');
    }
    // If both sticks are centered, keep current active stick (no change)
  }

  _clearActiveStick() {
    // Remove active class from both cards
    $("#left-stick-card").removeClass("stick-card-active");
    $("#right-stick-card").removeClass("stick-card-active");

    this.active_stick = null; // Clear active stick
    this._clearFinetuneAxisHighlights();
  }

  _getStickQuadrant(x, y) {
    // Determine which quadrant the stick is in based on x,y coordinates
    // x and y are normalized values between -1 and 1
    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? 'right' : 'left';
    } else {
      return y > 0 ? 'down' : 'up';
    }
  }

  _getFinetuneInputSuffixForQuadrant(stick, quadrant) {
    // This function should only be used in circularity mode
    // In center mode, we don't care about quadrants - use direct axis mapping instead
    if (this._mode === 'center') {
      // This function shouldn't be called in center mode
      console.warn('get_finetune_input_suffix_for_quadrant called in center mode - this should not happen');
      return null;
    }

    // Circularity mode: map quadrants to specific calibration points
    if (stick === 'left') {
      switch (quadrant) {
        case 'left': return "LL";
        case 'up': return "LT";
        case 'right': return "LR";
        case 'down': return "LB";
      }
    } else if (stick === 'right') {
      switch (quadrant) {
        case 'left': return "RL";
        case 'up': return "RT";
        case 'right': return "RR";
        case 'down': return "RB";
      }
    }
    return null; // Invalid
  }

  _handleCenterModeAdjustment(changes) {
    const adjustmentStep = this._centerStepSize; // Use center step size for center mode

    // Define button mappings for center mode
    const buttonMappings = [
      { buttons: ['left', 'square'], adjustment: adjustmentStep, axis: 'X' },
      { buttons: ['right', 'circle'], adjustment: -adjustmentStep, axis: 'X' },
      { buttons: ['up', 'triangle'], adjustment: adjustmentStep, axis: 'Y' },
      { buttons: ['down', 'cross'], adjustment: -adjustmentStep, axis: 'Y' }
    ];

    // Check if any relevant button was released
    const relevantButtons = ['left', 'right', 'square', 'circle', 'up', 'down', 'triangle', 'cross'];
    if (relevantButtons.some(button => changes[button] === false)) {
      this.stopContinuousDpadAdjustment();
      return;
    }

    // Check for button presses
    for (const mapping of buttonMappings) {
      // Check if active stick is away from center (> 0.5)
      const sticks = this.controller.button_states.sticks;
      const currentStick = sticks[this.active_stick];
      const stickAwayFromCenter = Math.abs(currentStick.x) > 0.5 || Math.abs(currentStick.y) > 0.5;
      if (stickAwayFromCenter && this._isNavigationKeyPressed()) {
        this.flash_finetune_warning();
        return;
      }

      if (mapping.buttons.some(button => changes[button])) {
        this._highlightActiveFinetuneAxis({axis: mapping.axis});
        this._startContinuousDpadAdjustmentCenterMode(this.active_stick, mapping.axis, mapping.adjustment);
        return;
      }
    }
  }

  _isNavigationKeyPressed() {
    const nav_buttons = ['left', 'right', 'up', 'down', 'square', 'circle', 'triangle', 'cross'];
    return nav_buttons.some(button => this.controller.button_states[button] === true);
  }

  _createFlashWarningClosure() {
    let timeout = null;

    return () => {
      function toggle() {
        $("#finetuneCenterWarning").toggleClass(['alert-warning', 'alert-danger']);
        $("#finetuneCircularityWarning").toggleClass(['alert-warning', 'alert-danger']);
      }

      if(timeout) return;

      toggle();   // on
      timeout = setTimeout(() => {
        toggle();   // off
        timeout = null;
      }, 300);
    };
  }

  _handleCircularityModeAdjustment({sticks: _, ...changes}) {
    const sticks = this.controller.button_states.sticks;
    const currentStick = sticks[this.active_stick];

    // Only adjust if stick is moved significantly from center
    const isInExtremePosition = this._isStickInExtremePosition(currentStick);
    if (!isInExtremePosition) {
      this.stopContinuousDpadAdjustment();
      if(this._isNavigationKeyPressed()) {
        this.flash_finetune_warning();
      }
      return;
    }

    const quadrant = this._getStickQuadrant(currentStick.x, currentStick.y);

    // Use circularity step size for circularity mode
    const adjustmentStep = this._circularityStepSize;

    // Define button mappings for each quadrant type
    const horizontalButtons = ['left', 'right', 'square', 'circle'];
    const verticalButtons = ['up', 'down', 'triangle', 'cross'];

    let adjustment = 0;
    let relevantButtons = [];

    if (quadrant === 'left' || quadrant === 'right') {
      // Horizontal quadrants: left increases, right decreases
      relevantButtons = horizontalButtons;
      if (changes.left || changes.square) {
        adjustment = adjustmentStep;
      } else if (changes.right || changes.circle) {
        adjustment = -adjustmentStep;
      }
    } else if (quadrant === 'up' || quadrant === 'down') {
      // Vertical quadrants: up increases, down decreases
      relevantButtons = verticalButtons;
      if (changes.up || changes.triangle) {
        adjustment = adjustmentStep;
      } else if (changes.down || changes.cross) {
        adjustment = -adjustmentStep;
      }
    }

    // Check if any relevant button was released
    if (relevantButtons.some(button => changes[button] === false)) {
      this.stopContinuousDpadAdjustment();
      return;
    }

    // Start continuous adjustment on button press
    if (adjustment !== 0) {
      this._startContinuousDpadAdjustment(this.active_stick, quadrant, adjustment);
    }
  }

  _startContinuousDpadAdjustment(stick, quadrant, adjustment) {
    const inputSuffix = this._getFinetuneInputSuffixForQuadrant(stick, quadrant);
    this._startContinuousAdjustmentWithSuffix(inputSuffix, adjustment);
  }

  _startContinuousDpadAdjustmentCenterMode(stick, targetAxis, adjustment) {
    // In center mode, directly map to X/Y axes
    const inputSuffix = stick === 'left' ?
    (targetAxis === 'X' ? 'LX' : 'LY') :
    (targetAxis === 'X' ? 'RX' : 'RY');
    this._startContinuousAdjustmentWithSuffix(inputSuffix, adjustment);
  }

  _startContinuousAdjustmentWithSuffix(inputSuffix, adjustment) {
    this.stopContinuousDpadAdjustment();

    const element = $(`#finetune${inputSuffix}`);
    if (!element.length) return;

    // Perform initial adjustment immediately...
    this._performDpadAdjustment(element, adjustment);
    this.clearCircularity();

    // ...then prime continuous adjustment
    this.continuous_adjustment.initial_delay = setTimeout(() => {
      this.continuous_adjustment.repeat_delay = setInterval(() => {
        this._performDpadAdjustment(element, adjustment);
        this.clearCircularity();
      }, 150);
    }, 400); // Initial delay before continuous adjustment starts (400ms)
  }

  stopContinuousDpadAdjustment() {
    clearInterval(this.continuous_adjustment.repeat_delay);
    this.continuous_adjustment.repeat_delay = null;

    clearTimeout(this.continuous_adjustment.initial_delay);
    this.continuous_adjustment.initial_delay = null;
  }

  _isDpadAdjustmentActive() {
    return !!this.continuous_adjustment.initial_delay;
  }

  async _performDpadAdjustment(element, adjustment) {
    const currentValue = parseInt(element.val()) || 0;
    const maxValue = this.controller.getFinetuneMaxValue();

    const newValue = Math.max(0, Math.min(maxValue, currentValue + adjustment));
    element.val(newValue);

    // Trigger the change event to update the finetune data
    await this._onFinetuneChange();
  }

  /**
   * Update the step size UI display
   */
  _updateStepSizeUI() {
    const currentStepSize = this._mode === 'center' ? this._centerStepSize : this._circularityStepSize;
    $('#stepSizeValue').text(currentStepSize);
  }

  /**
   * Save step size to localStorage
   */
  _saveStepSizeToLocalStorage() {
    localStorage.setItem('finetuneCenterStepSize', this._centerStepSize.toString());
    localStorage.setItem('finetuneCircularityStepSize', this._circularityStepSize.toString());
  }

  /**
   * Restore step size from localStorage
   */
  _restoreStepSizeFromLocalStorage() {
    // Restore center step size
    const savedCenterStepSize = localStorage.getItem('finetuneCenterStepSize');
    if (savedCenterStepSize) {
      this._centerStepSize = parseInt(savedCenterStepSize);
    }

    // Restore circularity step size
    const savedCircularityStepSize = localStorage.getItem('finetuneCircularityStepSize');
    if (savedCircularityStepSize) {
      this._circularityStepSize = parseInt(savedCircularityStepSize);
    }

    this._updateStepSizeUI();
  }
}

// Global reference to the current finetune instance
let currentFinetuneInstance = null;

/**
 * Helper function to safely clear the current finetune instance
 */
function destroyCurrentInstance$2() {
  if (currentFinetuneInstance) {
    currentFinetuneInstance.stopContinuousDpadAdjustment();
    currentFinetuneInstance.removeEventListeners();
    currentFinetuneInstance = null;
  }
}

// Function to create and initialize finetune instance
async function ds5_finetune(controller, dependencies) {
  // Create new instance
  currentFinetuneInstance = new Finetune();
  await currentFinetuneInstance.init(controller, dependencies);
}

function finetune_handle_controller_input(changes) {
  if (currentFinetuneInstance) {
    currentFinetuneInstance.refresh_finetune_sticks();
    currentFinetuneInstance.handleModeSwitching(changes);
    currentFinetuneInstance.handleStickSwitching(changes);
    currentFinetuneInstance.handleDpadAdjustment(changes);
  }
}

function finetune_save() {
  console.log("Saving finetune changes");
  if (currentFinetuneInstance) {
    currentFinetuneInstance.save();
  }
}

async function finetune_cancel() {
  console.log("Cancelling finetune changes");
  if (currentFinetuneInstance) {
    await currentFinetuneInstance.cancel();
  }
}

function isFinetuneVisible() {
  return !!currentFinetuneInstance;
}

window.finetune_cancel = finetune_cancel;
window.finetune_save = finetune_save;

/**
 * Calibration Center Modal Class
 * Handles step-by-step manual stick center calibration
 */
class CalibCenterModal {
  constructor(controllerInstance, { resetStickDiagrams, successAlert, set_progress }) {
    this.controller = controllerInstance;
    this.resetStickDiagrams = resetStickDiagrams;
    this.successAlert = successAlert;
    this.set_progress = set_progress;

    this._initEventListeners();

    // Hide the spinner in case it's showing after prior failure
    $("#calibNext").prop("disabled", false);
    $("#btnSpinner").hide();
  }

  /**
   * Initialize event listeners for the calibration modal
   */
  _initEventListeners() {
    $('#calibCenterModal').on('hidden.bs.modal', () => {
      console.log("Closing calibration modal");
      destroyCurrentInstance$1();
    });
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    $('#calibCenterModal').off('hidden.bs.modal');
  }

  /**
   * Open the calibration modal
   */
  async open() {
    la("calib_open");
    this.calibrationGenerator = this.calibrationSteps();
    await this.next();
    new bootstrap.Modal(document.getElementById('calibCenterModal'), {}).show();
  }

  /**
   * Proceed to the next calibration step (legacy method)
   */
  async next() {
    la("calib_next");
    const result = await this.calibrationGenerator.next();
    if (result.done) {
      this.calibrationGenerator = null;
    }
  }

  /**
   * Generator function for calibration steps
   */
  async* calibrationSteps() {
    // Step 1: Initial setup
    la("calib_step", {"i": 1});
    this._updateUI(1, "Stick center calibration", "Start", true);
    yield 1;

    // Step 2: Initialize calibration
    la("calib_step", {"i": 2});
    this._showSpinner("Initializing...");
    await sleep(100);
    await this._multiCalibSticksBegin();
    await this._hideSpinner();

    this._updateUI(2, "Calibration in progress", "Continue", false);
    yield 2;

    // Steps 3-5: Sample calibration data
    for (let sampleStep = 3; sampleStep <= 5; sampleStep++) {
      la("calib_step", {"i": sampleStep});
      this._showSpinner("Sampling...");
      await sleep(150);
      await this._multiCalibSticksSample();
      await this._hideSpinner();

      this._updateUI(sampleStep, "Calibration in progress", "Continue", false);
      yield sampleStep;
    }

    // Step 6: Final sampling and storage
    la("calib_step", {"i": 6});
    this._showSpinner("Sampling...");
    await this._multiCalibSticksSample();
    await sleep(200);
    $("#calibNextText").text(l("Storing calibration..."));
    await sleep(500);
    await this._multiCalibSticksEnd();
    await this._hideSpinner();

    this._updateUI(6, "Stick center calibration", "Done", true);
    yield 6;

    this._close();
  }

  /**
   * "Old" fully automatic stick center calibration
   */
  async multiCalibrateSticks() {
    if(!this.controller.isConnected())
      return;

    this.set_progress(0);
    new bootstrap.Modal(document.getElementById('calibrateModal'), {}).show();

    await sleep(1000);

    // Use the controller manager's calibrateSticks method with UI progress updates
    this.set_progress(10);

    const result = await this.controller.calibrateSticks((progress) => {
      this.set_progress(progress);
    });

    await sleep(500);
    this._close();
    this.resetStickDiagrams();

    if (result?.message) {
      this.successAlert(result.message);
    }
  }

  /**
   * Helper functions for step-by-step manual calibration UI
   */
  async _multiCalibSticksBegin() {
    await this.controller.calibrateSticksBegin();
  }

  async _multiCalibSticksEnd() {
    await this.controller.calibrateSticksEnd();
  }

  async _multiCalibSticksSample() {
    await this.controller.calibrateSticksSample();
  }

  /**
   * Close the calibration modal
   */
  _close() {
    $(".modal.show").modal("hide");
  }

  /**
   * Update the UI for a specific calibration step
   */
  _updateUI(step, title, buttonText, allowDismiss) {
    // Hide all step lists and remove active class
    for (let j = 1; j < 7; j++) {
      $("#list-" + j).hide();
      $("#list-" + j + "-calib").removeClass("active");
    }

    // Show current step and mark as active
    $("#list-" + step).show();
    $("#list-" + step + "-calib").addClass("active");

    // Update title and button text
    $("#calibTitle").text(l(title));
    $("#calibNextText").text(l(buttonText));

    // Show/hide cross icon
    if (allowDismiss) {
      $("#calibCross").show();
    } else {
      $("#calibCross").hide();
    }
  }

  /**
   * Show spinner and disable button
   */
  _showSpinner(text) {
    $("#calibNextText").text(l(text));
    $("#btnSpinner").show();
    $("#calibNext").prop("disabled", true);
  }

  /**
   * Hide spinner and enable button
   */
  async _hideSpinner() {
    await sleep(200);
    $("#calibNext").prop("disabled", false);
    $("#btnSpinner").hide();
  }
}

// Global reference to the current calibration instance
let currentCalibCenterInstance = null;

/**
 * Helper function to safely clear the current calibration instance
 */
function destroyCurrentInstance$1() {
  if (currentCalibCenterInstance) {
    console.log("Destroying current calibration instance");
    currentCalibCenterInstance.removeEventListeners();
    currentCalibCenterInstance = null;
  }
}

// Legacy function exports for backward compatibility
async function calibrate_stick_centers(controller, dependencies) {
  currentCalibCenterInstance = new CalibCenterModal(controller, dependencies);
  await currentCalibCenterInstance.open();
}

async function calib_next() {
  if (currentCalibCenterInstance) {
    await currentCalibCenterInstance.next();
  }
}

// "Old" fully automatic stick center calibration
async function auto_calibrate_stick_centers(controller, dependencies) {
  currentCalibCenterInstance = new CalibCenterModal(controller, dependencies);
  await currentCalibCenterInstance.multiCalibrateSticks();
}

// Legacy compatibility - expose functions to window for HTML onclick handlers
window.calib_next = calib_next;

/**
 * Calibrate Stick Range Modal Class
 * Handles stick range calibration
 */
class CalibRangeModal {
  constructor(controllerInstance, { resetStickDiagrams, successAlert }) {
    // Dependencies
    this.controller = controllerInstance;
    this.resetStickDiagrams = resetStickDiagrams;
    this.successAlert = successAlert;
  }

  async open() {
    if(!this.controller.isConnected())
      return;

    bootstrap.Modal.getOrCreateInstance('#rangeModal').show();

    await sleep(1000);
    await this.controller.calibrateRangeBegin();
  }

  async onClose() {    
    bootstrap.Modal.getOrCreateInstance('#rangeModal').hide();
    this.resetStickDiagrams();
    
    const result = await this.controller.calibrateRangeOnClose();
    if (result?.message) {
      this.successAlert(result.message);
    }
  }
}

// Global reference to the current range calibration instance
let currentCalibRangeInstance = null;

/**
 * Helper function to safely clear the current calibration instance
 */
function destroyCurrentInstance() {
  currentCalibRangeInstance = null;
}

// Legacy function exports for backward compatibility
async function calibrate_range(controller, dependencies) {
  destroyCurrentInstance(); // Clean up any existing instance
  currentCalibRangeInstance = new CalibRangeModal(controller, dependencies);
  await currentCalibRangeInstance.open();
}

async function calibrate_range_on_close() {
  if (currentCalibRangeInstance) {
    await currentCalibRangeInstance.onClose();
  }
}

// Legacy compatibility - expose functions to window for HTML onclick handlers
window.calibrate_range_on_close = calibrate_range_on_close;

// Application State - manages app-wide state and UI
const app = {
  // Button disable state management
  disable_btn: 0,
  last_disable_btn: 0,

  // Language and UI state
  lang_orig_text: {},
  lang_orig_text: {},
  lang_cur: {},
  lang_disabled: true,
  lang_cur_direction: "ltr",

  // Session tracking
  gj: 0,
  gu: 0,
};

const ll_data = new Array(CIRCULARITY_DATA_SIZE);
const rr_data = new Array(CIRCULARITY_DATA_SIZE);

let controller = null;

function gboot() {
  app.gu = crypto.randomUUID();

  async function initializeApp() {
    window.addEventListener("error", (event) => {
      console.error(event.error?.stack || event.message);
      show_popup(event.error?.message || event.message);
    });

    window.addEventListener("unhandledrejection", async (event) => {
      console.error(
        "Unhandled rejection:",
        event.reason?.stack || event.reason
      );
      close_all_modals();
      // show_popup(event.reason?.message || event.reason);

      // Format the error message for better readability
      let errorMessage = "An unexpected error occurred";
      if (event.reason) {
        if (event.reason.message) {
          errorMessage = `<strong>Error:</strong> ${event.reason.message}`;
        } else if (typeof event.reason === "string") {
          errorMessage = `<strong>Error:</strong> ${event.reason}`;
        }

        // Collect all stack traces (main error and causes) for a single expandable section
        let allStackTraces = "";
        if (event.reason.stack) {
          const stackTrace = event.reason.stack
            .replace(/\n/g, "<br>")
            .replace(/ /g, "&nbsp;");
          allStackTraces += `<strong>Main Error Stack:</strong><br>${stackTrace}`;
        }

        // Add error chain information if available (ES2022 error chaining)
        let currentError = event.reason;
        let chainLevel = 0;
        while (currentError?.cause && chainLevel < 5) {
          chainLevel++;
          currentError = currentError.cause;
          if (currentError.stack) {
            const causeStackTrace = currentError.stack
              .replace(/\n/g, "<br>")
              .replace(/ /g, "&nbsp;");
            if (allStackTraces) allStackTraces += "<br><br>";
            allStackTraces += `<strong>Cause ${chainLevel} Stack:</strong><br>${causeStackTrace}`;
          }
        }

        // Add single expandable section if we have any stack traces
        if (allStackTraces) {
          errorMessage += `
            <br>
            <details style="margin-top: 0px;">
              <summary style="cursor: pointer; color: #666;">Details</summary>
              <div style="font-family: monospace; font-size: 0.85em; margin-top: 8px; padding: 8px; background-color: #f8f9fa; border-radius: 4px; overflow-x: auto;">
                ${allStackTraces}
              </div>
            </details>
          `;
        }
      }

      errorAlert(errorMessage);
      // Prevent the default browser behavior (logging to console, again)
      event.preventDefault();
    });

    await loadAllTemplates();
    await init_svg_controller();

    initAnalyticsApi(app); // init just with gu for now
    lang_init(app, handleLanguageChange, show_welcome_modal);
    show_welcome_modal();

    $("input[name='displayMode']").on("change", on_stick_mode_change);
  }

  // Since modules are deferred, DOM might already be loaded
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", initializeApp);
  } else {
    // DOM is already loaded, run immediately
    initializeApp();
  }

  if (!("hid" in navigator)) {
    $("#offlinebar").hide();
    $("#onlinebar").hide();
    $("#missinghid").show();
    return;
  }

  $("#offlinebar").show();
  navigator.hid.addEventListener("disconnect", handleDisconnectedDevice);
}

async function connect() {
  app.gj = crypto.randomUUID();
  initAnalyticsApi(app); // init with gu and jg

  // Initialize controller manager with translation function
  controller = initControllerManager({ l, handleNvStatusUpdate });
  controller.setInputHandler(handleControllerInput);

  la("begin");
  reset_circularity_mode();
  clearAllAlerts();
  await sleep(200);

  try {
    $("#btnconnect").prop("disabled", true);
    $("#connectspinner").show();
    await sleep(100);

    const supportedModels = ControllerFactory.getSupportedModels();
    const requestParams = { filters: supportedModels };
    let devices = await navigator.hid.getDevices(); // Already connected?
    if (devices.length == 0) {
      devices = await navigator.hid.requestDevice(requestParams);
    }
    if (devices.length == 0) {
      $("#btnconnect").prop("disabled", false);
      $("#connectspinner").hide();
      await disconnect();
      return;
    }

    if (devices.length > 1) {
      //mm: this should never happen
      infoAlert(l("Please connect only one controller at time."));
      $("#btnconnect").prop("disabled", false);
      $("#connectspinner").hide();
      await disconnect();
      return;
    }

    const [device] = devices;
    if (device.opened) {
      console.log("Device already opened, closing it before re-opening.");
      await device.close();
      await sleep(500);
    }
    await device.open();

    la("connect", { p: device.productId, v: device.vendorId });
    device.oninputreport = continue_connection; // continue below
  } catch (error) {
    $("#btnconnect").prop("disabled", false);
    $("#connectspinner").hide();
    await disconnect();
    throw error;
  }
}

async function continue_connection({ data, device }) {
  try {
    if (!controller || controller.isConnected()) {
      device.oninputreport = null; // this function is called repeatedly if not cleared
      return;
    }

    // Detect if the controller is connected via USB
    const reportLen = data.byteLength;
    if (reportLen != 63) {
      // throw new Error(l("Please connect the device using a USB cable."));
      infoAlert(
        l(
          "The device is connected via Bluetooth. Disconnect and reconnect using a USB cable instead."
        )
      );
      await disconnect();
      return;
    }

    // Helper to apply basic UI visibility based on device type
    function applyDeviceUI({ showInfo, showFinetune, showMute, showInfoTab }) {
      $("#infoshowall").toggle(!!showInfo);
      $("#ds5finetune").toggle(!!showFinetune);
      $("#info-tab").toggle(!!showInfoTab);
      set_mute_visibility(!!showMute);
    }

    let controllerInstance = null;
    let info = null;

    try {
      // Create controller instance using factory
      controllerInstance = ControllerFactory.createControllerInstance(device, {
        l,
      });
      controller.setControllerInstance(controllerInstance);

      info = await controllerInstance.getInfo();
    } catch (error) {
      const contextMessage = device
        ? l("Connected invalid device: ") +
          dec2hex(device.vendorId) +
          ":" +
          dec2hex(device.productId)
        : l("Failed to connect to device");
      throw new Error(contextMessage, { cause: error });
    }

    if (!info?.ok) {
      // Not connected/failed to fetch info
      if (info) console.error(JSON.stringify(info, null, 2));
      throw new Error(l("Connected invalid device: ") + l("Error 1"), {
        cause: info?.error,
      });
    }

    // Get UI configuration and device name
    const ui = ControllerFactory.getUIConfig(device.productId);
    applyDeviceUI(ui);

    // Assign input processor for stream
    console.log("Setting input report handler.");
    device.oninputreport = controller.getInputHandler();

    const deviceName = ControllerFactory.getDeviceName(device.productId);
    $("#devname").text(
      deviceName +
        " (" +
        dec2hex(device.vendorId) +
        ":" +
        dec2hex(device.productId) +
        ")"
    );

    $("#offlinebar").hide();
    $("#onlinebar").show();
    $("#mainmenu").show();
    $("#resetBtn").show();

    $("#d-nvstatus").text = l("Unknown");
    $("#d-bdaddr").text = l("Unknown");

    $("#controller-tab").tab("show");

    const model = controllerInstance.getModel();

    // Edge-specific: pending reboot check (from nv)
    if (model == "DS5_Edge" && info?.pending_reboot) {
      infoAlert(
        l(
          "A reboot is needed to continue using this DualSense Edge. Please disconnect and reconnect your controller."
        )
      );
      await disconnect();
      return;
    }

    // Render info collected from device
    render_info_to_dom(info.infoItems);

    // Render NV status
    if (info.nv) {
      render_nvstatus_to_dom(info.nv);
      // Optionally try to lock NVS if unlocked
      if (info.nv.locked === false) {
        await nvslock();
      }
    }

    // Apply disable button flags
    if (typeof info.disable_bits === "number" && info.disable_bits) {
      app.disable_btn |= info.disable_bits;
    }
    if (app.disable_btn != 0) update_disable_btn();

    // DS4 rare notice
    if (model == "DS4" && info?.rare) {
      show_popup(
        "Wow, this is a rare/weird controller! Please write me an email at ds4@the.al or contact me on Discord (the_al)"
      );
    }

    // Edge onboarding modal
    if (model == "DS5_Edge") {
      show_edge_modal();
    }
  } catch (err) {
    await disconnect();
    throw err;
  } finally {
    $("#btnconnect").prop("disabled", false);
    $("#connectspinner").hide();
  }
}

async function disconnect() {
  la("disconnect");
  if (!controller?.isConnected()) {
    controller = null;
    return;
  }
  app.gj = 0;
  app.disable_btn = 0;
  update_disable_btn();

  await controller.disconnect();
  controller = null; // Tear everything down
  close_all_modals();
  $("#offlinebar").show();
  $("#onlinebar").hide();
  $("#mainmenu").hide();
}

// Wrapper function for HTML onclick handlers
function disconnectSync() {
  disconnect().catch((error) => {
    throw new Error("Failed to disconnect", { cause: error });
  });
}

async function handleDisconnectedDevice(e) {
  la("disconnected");
  console.log("Disconnected: " + e.device.productName);
  await disconnect();
}

function render_nvstatus_to_dom(nv) {
  if (!nv?.status) {
    throw new Error("Invalid NVS status data", { cause: nv?.error });
  }

  switch (nv.status) {
    case "locked":
      $("#d-nvstatus").html("<font color='green'>" + l("locked") + "</font>");
      break;
    case "unlocked":
      $("#d-nvstatus").html("<font color='red'>" + l("unlocked") + "</font>");
      break;
    case "pending_reboot":
      // Keep consistent styling with unknown/purple, but indicate reboot pending if possible
      const pendingTxt =
        nv.raw !== undefined ? "0x" + dec2hex32(nv.raw) : String(nv.code ?? "");
      $("#d-nvstatus").html(
        "<font color='purple'>unk " + pendingTxt + "</font>"
      );
      break;
    case "unknown":
      const unknownTxt =
        nv.device === "ds5" && nv.raw !== undefined
          ? "0x" + dec2hex32(nv.raw)
          : String(nv.code ?? "");
      $("#d-nvstatus").html(
        "<font color='purple'>unk " + unknownTxt + "</font>"
      );
      break;
    case "error":
      $("#d-nvstatus").html("<font color='red'>" + l("error") + "</font>");
      break;
  }
}

async function refresh_nvstatus() {
  if (!controller.isConnected()) {
    return null;
  }

  return await controller.queryNvStatus();
}

function set_edge_progress(score) {
  $("#dsedge-progress").css({ width: score + "%" });
}

function show_welcome_modal() {
  const already_accepted = readCookie("welcome_accepted");
  if (already_accepted == "1") return;

  bootstrap.Modal.getOrCreateInstance("#welcomeModal").show();
}

function welcome_accepted() {
  la("welcome_accepted");
  createCookie("welcome_accepted", "1");
  $("#welcomeModal").modal("hide");
}

async function init_svg_controller() {
  const svgContainer = document.getElementById("controller-svg-placeholder");

  let svgContent;

  // Check if we have bundled assets (production mode)
  if (
    window.BUNDLED_ASSETS &&
    window.BUNDLED_ASSETS.svg &&
    window.BUNDLED_ASSETS.svg["dualshock-controller.svg"]
  ) {
    svgContent = window.BUNDLED_ASSETS.svg["dualshock-controller.svg"];
  } else {
    // Fallback to fetching from server (development mode)
    const response = await fetch("assets/dualshock-controller.svg");
    if (!response.ok) {
      throw new Error("Failed to load controller SVG");
    }
    svgContent = await response.text();
  }

  svgContainer.innerHTML = svgContent;

  const lightBlue = "#7ecbff";
  const midBlue = "#3399cc";
  const dualshock = document.getElementById("Controller");
  set_svg_group_color(dualshock, lightBlue);

  ["Button_outlines", "L3_outline", "R3_outline", "Trackpad_outline"].forEach(
    (id) => {
      const group = document.getElementById(id);
      set_svg_group_color(group, midBlue);
    }
  );

  ["Button_infills", "L3_infill", "R3_infill", "Trackpad_infill"].forEach(
    (id) => {
      const group = document.getElementById(id);
      set_svg_group_color(group, "white");
    }
  );
}

function set_mute_visibility(show) {
  const muteOutline = document.getElementById("Mute_outline");
  const muteInfill = document.getElementById("Mute_infill");
  if (muteOutline) muteOutline.style.display = show ? "" : "none";
  if (muteInfill) muteInfill.style.display = show ? "" : "none";
}

/**
 * Collects circularity data for both analog sticks during testing mode.
 * This function tracks the maximum distance reached at each angular position
 * around the stick's circular range, creating a polar coordinate map of
 * stick movement capabilities.
 */
function collectCircularityData(stickStates, leftData, rightData) {
  const { left, right } = stickStates || {};
  const MAX_N = CIRCULARITY_DATA_SIZE;

  for (const [stick, data] of [
    [left, leftData],
    [right, rightData],
  ]) {
    if (!stick) return; // Skip if no stick changed position

    const { x, y } = stick;
    // Calculate distance from center (magnitude of stick position vector)
    const distance = Math.sqrt(x * x + y * y);
    // Convert cartesian coordinates to angular index (0 to MAX_N-1)
    // atan2 gives angle in radians, convert to array index with proper wrapping
    const angleIndex =
      (parseInt(Math.round((Math.atan2(y, x) * MAX_N) / 2.0 / Math.PI)) +
        MAX_N) %
      MAX_N;
    // Store maximum distance reached at this angle (for circularity analysis)
    const oldValue = data[angleIndex] ?? 0;
    data[angleIndex] = Math.max(oldValue, distance);
  }
}

function clear_circularity() {
  ll_data.fill(0);
  rr_data.fill(0);
}

function reset_circularity_mode() {
  clear_circularity();
  $("#normalMode").prop("checked", true);
  refresh_stick_pos();
}

function refresh_stick_pos() {
  if (!controller) return;

  const c = document.getElementById("stickCanvas");
  const ctx = c.getContext("2d");
  const sz = 60;
  const hb = 20 + sz;
  const yb = 15 + sz;
  const w = c.width;
  ctx.clearRect(0, 0, c.width, c.height);

  const {
    left: { x: plx, y: ply },
    right: { x: prx, y: pry },
  } = controller.button_states.sticks;

  const enable_zoom_center = center_zoom_checked();
  const enable_circ_test = circ_checked();
  // Draw left stick
  draw_stick_position(ctx, hb, yb, sz, plx, ply, {
    circularity_data: enable_circ_test ? ll_data : null,
    enable_zoom_center,
  });

  // Draw right stick
  draw_stick_position(ctx, w - hb, yb, sz, prx, pry, {
    circularity_data: enable_circ_test ? rr_data : null,
    enable_zoom_center,
  });

  const precision = enable_zoom_center ? 3 : 2;
  $("#lx-lbl").text(float_to_str(plx, precision));
  $("#ly-lbl").text(float_to_str(ply, precision));
  $("#rx-lbl").text(float_to_str(prx, precision));
  $("#ry-lbl").text(float_to_str(pry, precision));

  // Move L3 and R3 SVG elements according to stick position
  try {
    // These values are tuned for the SVG's coordinate system and visual effect
    const max_stick_offset = 25;
    // L3 center in SVG coordinates (from path: cx=295.63, cy=461.03)
    const l3_cx = 295.63,
      l3_cy = 461.03;
    // R3 center in SVG coordinates (from path: cx=662.06, cy=419.78)
    const r3_cx = 662.06,
      r3_cy = 419.78;

    const l3_x = l3_cx + plx * max_stick_offset;
    const l3_y = l3_cy + ply * max_stick_offset;
    const l3_group = document.querySelector("g#L3");
    l3_group?.setAttribute(
      "transform",
      `translate(${l3_x - l3_cx},${l3_y - l3_cy}) scale(0.70)`
    );

    const r3_x = r3_cx + prx * max_stick_offset;
    const r3_y = r3_cy + pry * max_stick_offset;
    const r3_group = document.querySelector("g#R3");
    r3_group?.setAttribute(
      "transform",
      `translate(${r3_x - r3_cx},${r3_y - r3_cy}) scale(0.70)`
    );
  } catch (e) {
    // Fail silently if SVG not present
  }
}

const circ_checked = () => $("#checkCircularityMode").is(":checked");
const center_zoom_checked = () => $("#centerZoomMode").is(":checked");

function resetStickDiagrams() {
  clear_circularity();
  refresh_stick_pos();
}

const on_stick_mode_change = () => resetStickDiagrams();

const throttled_refresh_sticks = (() => {
  let delay = null;
  return function (changes) {
    if (!changes.sticks) return;
    if (delay) return;

    refresh_stick_pos();
    delay = setTimeout(() => {
      delay = null;
      refresh_stick_pos();
    }, 20);
  };
})();

const update_stick_graphics = (changes) => throttled_refresh_sticks(changes);

function update_battery_status({
  /* bat_capacity, cable_connected, is_charging, is_error, */ bat_txt,
  changed,
}) {
  if (changed) {
    $("#d-bat").html(bat_txt);
  }
}

function update_ds_button_svg(changes, BUTTON_MAP) {
  if (!changes || Object.keys(changes).length === 0) return;

  const pressedColor = "#1a237e"; // pleasing dark blue

  // Update L2/R2 analog infill
  for (const trigger of ["l2", "r2"]) {
    const key = trigger + "_analog";
    if (changes.hasOwnProperty(key)) {
      const val = changes[key];
      const t = val / 255;
      const color = lerp_color("#ffffff", pressedColor, t);
      const svg = trigger.toUpperCase() + "_infill";
      const infill = document.getElementById(svg);
      set_svg_group_color(infill, color);
    }
  }

  // Update dpad buttons
  for (const dir of ["up", "right", "down", "left"]) {
    if (changes.hasOwnProperty(dir)) {
      const pressed = changes[dir];
      const group = document.getElementById(
        dir.charAt(0).toUpperCase() + dir.slice(1) + "_infill"
      );
      set_svg_group_color(group, pressed ? pressedColor : "white");
    }
  }

  // Update other buttons
  for (const btn of BUTTON_MAP) {
    if (["up", "right", "down", "left"].includes(btn.name)) continue; // Dpad handled above
    if (changes.hasOwnProperty(btn.name) && btn.svg) {
      const pressed = changes[btn.name];
      const group = document.getElementById(btn.svg + "_infill");
      set_svg_group_color(group, pressed ? pressedColor : "white");
    }
  }
}

function set_svg_group_color(group, color) {
  if (group) {
    const elements = group.querySelectorAll(
      "path,rect,circle,ellipse,line,polyline,polygon"
    );
    elements.forEach((el) => {
      // Set up a smooth transition for fill and stroke if not already set
      if (!el.style.transition) {
        el.style.transition = "fill 0.10s, stroke 0.10s";
      }
      el.setAttribute("fill", color);
      el.setAttribute("stroke", color);
    });
  }
}

let hasActiveTouchPoints = false;
let trackpadBbox = undefined;

function update_touchpad_circles(points) {
  const hasActivePointsNow = points.some((pt) => pt.active);
  if (!hasActivePointsNow && !hasActiveTouchPoints) return;

  // Find the Trackpad_infill group in the SVG
  const svg = document.getElementById("controller-svg");
  const trackpad = svg?.querySelector("g#Trackpad_infill");
  if (!trackpad) return;

  // Remove the previous touch points, if any
  trackpad.querySelectorAll("circle.ds-touch").forEach((c) => c.remove());
  hasActiveTouchPoints = hasActivePointsNow;
  trackpadBbox = trackpadBbox ?? trackpad.querySelector("path")?.getBBox();

  // Draw up to 2 circles
  points.forEach((pt, idx) => {
    if (!pt.active) return;
    // Map raw x/y to SVG
    // DS4/DS5 touchpad is 1920x943 units (raw values)
    const RAW_W = 1920,
      RAW_H = 943;
    const pointRadius = trackpadBbox.width * 0.05;
    const cx =
      trackpadBbox.x +
      pointRadius +
      (pt.x / RAW_W) * (trackpadBbox.width - pointRadius * 2);
    const cy =
      trackpadBbox.y +
      pointRadius +
      (pt.y / RAW_H) * (trackpadBbox.height - pointRadius * 2);
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("class", "ds-touch");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", pointRadius);
    circle.setAttribute("fill", idx === 0 ? "#2196f3" : "#e91e63");
    circle.setAttribute("fill-opacity", "0.5");
    circle.setAttribute("stroke", "#3399cc");
    circle.setAttribute("stroke-width", "4");
    trackpad.appendChild(circle);
  });
}

function get_current_main_tab() {
  const mainTabs = document.getElementById("mainTabs");
  const activeBtn = mainTabs?.querySelector(".nav-link.active");
  return activeBtn?.id || "controller-tab";
}

function get_current_test_tab() {
  const testsList = document.getElementById("tests-list");
  const activeBtn = testsList?.querySelector(".list-group-item.active");
  return activeBtn?.id || "haptic-test-tab";
}

// Callback function to handle UI updates after controller input processing
function handleControllerInput({
  changes,
  inputConfig,
  touchPoints,
  batteryStatus,
}) {
  const { buttonMap } = inputConfig;

  const current_active_tab = get_current_main_tab();
  switch (current_active_tab) {
    case "controller-tab": // Main controller tab
      collectCircularityData(changes.sticks, ll_data, rr_data);
      if (isFinetuneVisible()) {
        finetune_handle_controller_input(changes);
      } else {
        update_stick_graphics(changes);
        update_ds_button_svg(changes, buttonMap);
        update_touchpad_circles(touchPoints);
      }
      break;

    case "tests-tab":
      handle_test_input();
      break;
  }

  update_battery_status(batteryStatus);
}

function handle_test_input(/* changes */) {
  const current_test_tab = get_current_test_tab();

  // Handle different test tabs
  switch (current_test_tab) {
    case "haptic-test-tab":
      // Handle L2/R2 for haptic feedback
      const l2 = controller.button_states.l2_analog || 0;
      const r2 = controller.button_states.r2_analog || 0;
      if (l2 || r2) {
        trigger_haptic_motors(l2, r2);
      }
      break;

    // Add more test tabs here as needed
    default:
      console.log("Unknown test tab:", current_test_tab);
      break;
  }
}

function update_disable_btn() {
  const { disable_btn, last_disable_btn } = app;
  if (disable_btn == last_disable_btn) return;

  if (disable_btn == 0) {
    $(".ds-btn").prop("disabled", false);
    app.last_disable_btn = 0;
    return;
  }

  $(".ds-btn").prop("disabled", true);

  // show only one popup
  if (disable_btn & 1 && !(last_disable_btn & 1)) {
    show_popup(
      l(
        "The device appears to be a DS4 clone. All functionalities are disabled."
      )
    );
  } else if (disable_btn & 2 && !(last_disable_btn & 2)) {
    show_popup(
      l("This DualSense controller has outdated firmware.") +
        "<br>" +
        l("Please update the firmware and try again."),
      true
    );
  } else if (disable_btn & 4 && !(last_disable_btn & 4)) {
    show_popup(
      l("Please charge controller battery over 30% to use this tool.")
    );
  }
  app.last_disable_btn = disable_btn;
}

async function handleLanguageChange() {
  if (!controller) return;

  const { infoItems } = await controller.getDeviceInfo();
  render_info_to_dom(infoItems);
}

function handleNvStatusUpdate(nv) {
  // Refresh NVS status display when it changes
  render_nvstatus_to_dom(nv);
}

async function flash_all_changes() {
  const isEdge = controller.getModel() == "DS5_Edge";
  const progressCallback = isEdge ? set_edge_progress : null;
  const edgeProgressModal = isEdge
    ? bootstrap.Modal.getOrCreateInstance("#edgeProgressModal")
    : null;
  edgeProgressModal?.show();

  const result = await controller.flash(progressCallback);
  edgeProgressModal?.hide();

  if (result?.success) {
    if (result.isHtml) {
      show_popup(result.message, result.isHtml);
    } else {
      successAlert(result.message);
    }
  }
}

async function reboot_controller() {
  await controller.reset();
}

async function nvsunlock() {
  await controller.nvsUnlock();
}

async function nvslock() {
  return await controller.nvsLock();
}

function close_all_modals() {
  $(".modal.show").modal("hide"); // Close any open modals
}

function set_progress(i) {
  $(".progress-bar").css("width", "" + i + "%");
}

function render_info_to_dom(infoItems) {
  // Clear all info sections
  $("#fwinfo").html("");
  $("#fwinfoextra-hw").html("");
  $("#fwinfoextra-fw").html("");

  if (!Array.isArray(infoItems)) return;

  // Add new info items
  infoItems.forEach(({ key, value, addInfoIcon, severity, isExtra, cat }) => {
    if (!key) return;

    // Compose value with optional info icon
    let valueHtml = String(value ?? "");
    if (addInfoIcon === "board") {
      const icon =
        '&nbsp;<a class="link-body-emphasis" href="#" onclick="board_model_info()">' +
        '<svg class="bi" width="1.3em" height="1.3em"><use xlink:href="#info"/></svg></a>';
      valueHtml += icon;
    } else if (addInfoIcon === "color") {
      const icon =
        '&nbsp;<a class="link-body-emphasis" href="#" onclick="edge_color_info()">' +
        '<svg class="bi" width="1.3em" height="1.3em"><use xlink:href="#info"/></svg></a>';
      valueHtml += icon;
    }

    // Apply severity formatting if requested
    if (severity) {
      const colors = { danger: "red", success: "green" };
      const color = colors[severity] || "black";
      valueHtml = `<font color='${color}'><b>${valueHtml}</b></font>`;
    }

    if (isExtra) {
      append_info_extra(key, valueHtml, cat || "hw");
    } else {
      append_info(key, valueHtml, cat || "hw");
    }
  });
}

function append_info_extra(key, value, cat) {
  // TODO escape html
  const s =
    '<dt class="text-muted col-sm-4 col-md-6 col-xl-5">' +
    key +
    '</dt><dd class="col-sm-8 col-md-6 col-xl-7" style="text-align: right;">' +
    value +
    "</dd>";
  $("#fwinfoextra-" + cat).html($("#fwinfoextra-" + cat).html() + s);
}

function append_info(key, value, cat) {
  // TODO escape html
  const s =
    '<dt class="text-muted col-6">' +
    key +
    '</dt><dd class="col-6" style="text-align: right;">' +
    value +
    "</dd>";
  $("#fwinfo").html($("#fwinfo").html() + s);
  append_info_extra(key, value, cat);
}

function show_popup(text, is_html = false) {
  if (is_html) {
    $("#popupBody").html(text);
  } else {
    $("#popupBody").text(text);
  }
  bootstrap.Modal.getOrCreateInstance("#popupModal").show();
}

function show_faq_modal() {
  la("faq_modal");
  bootstrap.Modal.getOrCreateInstance("#faqModal").show();
}

function show_donate_modal() {
  la("donate_modal");
  bootstrap.Modal.getOrCreateInstance("#donateModal").show();
}

function show_edge_modal() {
  la("edge_modal");
  bootstrap.Modal.getOrCreateInstance("#edgeModal").show();
}

function show_info_tab() {
  la("info_modal");
  $("#info-tab").tab("show");
}

function edge_color_info() {
  la("cm_info");
  const text = l("Color detection thanks to") + " romek77 from Poland.";
  show_popup(text, true);
}

function board_model_info() {
  la("bm_info");
  const l1 = l("This feature is experimental.");
  const l2 = l(
    "Please let me know if the board model of your controller is not detected correctly."
  );
  const l3 =
    l("Board model detection thanks to") +
    ' <a href="https://battlebeavercustoms.com/" target="_blank">Battle Beaver Customs</a>.';
  show_popup(l3 + "<br><br>" + l1 + " " + l2, true);
}

const trigger_haptic_motors = (() => {
  let haptic_timeout = undefined;
  let haptic_last_trigger = 0;

  return async function (strong_motor /*left*/, weak_motor /*right*/) {
    // The DS4 contoller has a strong (left) and a weak (right) motor.
    // The DS5 emulates the same behavior, but the left and right motors are the same.

    const now = Date.now();
    if (now - haptic_last_trigger < 200) {
      return; // Rate limited - ignore calls within 200ms
    }

    haptic_last_trigger = now;

    try {
      if (!controller.isConnected()) return;

      const model = controller.getModel();
      const device = controller.getDevice();
      if (model == "DS4") {
        const data = new Uint8Array([0x05, 0x00, 0, weak_motor, strong_motor]);
        await device.sendReport(0x05, data);
      } else if (model.startsWith("DS5")) {
        const data = new Uint8Array([0x02, 0x00, weak_motor, strong_motor]);
        await device.sendReport(0x02, data);
      }

      // Stop rumble after duration
      clearTimeout(haptic_timeout);
      haptic_timeout = setTimeout(stop_haptic_motors, 250);
    } catch (error) {
      throw new Error(l("Error triggering rumble"), { cause: error });
    }
  };
})();

async function stop_haptic_motors() {
  if (!controller.isConnected()) return;

  const model = controller.getModel();
  const device = controller.getDevice();
  if (model == "DS4") {
    const data = new Uint8Array([0x05, 0x00, 0, 0, 0]);
    await device.sendReport(0x05, data);
  } else if (model.startsWith("DS5")) {
    const data = new Uint8Array([0x02, 0x00, 0, 0]);
    await device.sendReport(0x02, data);
  }
}

// Alert Management Functions
let alertCounter = 0;

/**
 * Push a new alert message to the bottom of the screen
 * @param {string} message - The message to display
 * @param {string} type - Bootstrap alert type: 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'
 * @param {number} duration - Auto-dismiss duration in milliseconds (0 = no auto-dismiss)
 * @param {boolean} dismissible - Whether the alert can be manually dismissed
 * @returns {string} - The ID of the created alert element
 */
function pushAlert(message, type = "info", duration = 0, dismissible = true) {
  const alertContainer = document.getElementById("alert-container");
  if (!alertContainer) {
    console.error("Alert container not found");
    return null;
  }

  const alertId = `alert-${++alertCounter}`;
  const alertDiv = document.createElement("div");
  alertDiv.id = alertId;
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = `
        ${message}
        ${
          dismissible
            ? '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
            : ""
        }
    `;

  alertContainer.appendChild(alertDiv);

  if (duration > 0) {
    setTimeout(() => {
      dismissAlert(alertId);
    }, duration);
  }

  return alertId;
}

function dismissAlert(alertId) {
  const alertElement = document.getElementById(alertId);
  if (alertElement) {
    const bsAlert = new bootstrap.Alert(alertElement);
    bsAlert.close();
  }
}

function clearAllAlerts() {
  const alertContainer = document.getElementById("alert-container");
  if (alertContainer) {
    const alerts = alertContainer.querySelectorAll(".alert");
    alerts.forEach((alert) => {
      const bsAlert = new bootstrap.Alert(alert);
      bsAlert.close();
    });
  }
}

function successAlert(message, duration = 1_500) {
  return pushAlert(message, "success", duration, false);
}

function errorAlert(message, duration = 15_000) {
  return pushAlert(message, "danger" /* duration */);
}

function infoAlert(message, duration = 5_000) {
  return pushAlert(message, "info", duration, false);
}

// Export functions to global scope for HTML onclick handlers
window.gboot = gboot;
window.connect = connect;
window.disconnect = disconnectSync;
window.show_faq_modal = show_faq_modal;
window.show_info_tab = show_info_tab;
window.calibrate_range = () =>
  calibrate_range(controller, { resetStickDiagrams, successAlert });
window.calibrate_stick_centers = () =>
  calibrate_stick_centers(controller, {
    resetStickDiagrams,
    show_popup,
    set_progress,
  });
window.auto_calibrate_stick_centers = () =>
  auto_calibrate_stick_centers(controller, {
    resetStickDiagrams,
    successAlert,
    set_progress,
  });
window.ds5_finetune = () =>
  ds5_finetune(controller, { ll_data, rr_data, clear_circularity });
window.flash_all_changes = flash_all_changes;
window.reboot_controller = reboot_controller;
window.refresh_nvstatus = refresh_nvstatus;
window.nvsunlock = nvsunlock;
window.nvslock = nvslock;
window.welcome_accepted = welcome_accepted;
window.show_donate_modal = show_donate_modal;
window.board_model_info = board_model_info;
window.edge_color_info = edge_color_info;

Object.assign(window, {
  connect,
  disconnect,
  calibrate_stick_centers,
  calibrate_range,
  flash_all_changes,
  reboot_controller,
  show_faq_modal,
  show_donate_modal,
  resetStickDiagrams,
  
});

// Auto-initialize the application when the module loads
gboot();
//# sourceMappingURL=app.js.map
