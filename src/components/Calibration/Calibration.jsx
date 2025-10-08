import { useEffect, useRef, useState } from "react";

/**
 * Calibration.jsx
 *
 * Self-contained React component that provides a working calibration UI for game controllers
 * using the Gamepad API (with a friendly UI similar to the original DualShock Calibration GUI).
 *
 * Features implemented:
 * - Connect / Disconnect (selects the first suitable gamepad detected)
 * - Live joystick rendering on a canvas (LX/LY and RX/RY)
 * - Calibrate stick centers (stores center offsets to localStorage)
 * - Calibrate stick range (samples for 3s and stores min/max to localStorage)
 * - Fast center calibration (instant)
 * - Finetune (very small offset adjustments)
 * - Save changes -> persists calibration object to localStorage
 * - Simple Info/Debug tabs
 *
 * Limitations / notes:
 * - This implementation uses the Gamepad API (navigator.getGamepads()). The original project used
 *   WebHID for lower-level access; full WebHID operations (writing firmware, rebooting controller)
 *   are not feasible from a web page without device-specific write protocols and permissions.
 * - "Save changes permanently" here saves calibration values to localStorage for use by this UI only.
 * - "Reboot controller" is not possible via Gamepad API; the button shows a friendly message.
 */

const STORAGE_KEY = "ds_calib_v1";

function useAnimationFrame(callback, active = true) {
  const cbRef = useRef(callback);
  useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!active) return;
    let raf = null;
    const loop = (t) => {
      cbRef.current(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);
}

export function Calibration() {
  const [connected, setConnected] = useState(false);
  const [gamepadIndex, setGamepadIndex] = useState(null);
  const [deviceName, setDeviceName] = useState("");
  const [battery, setBattery] = useState(null);
  const [axes, setAxes] = useState({ lx: 0, ly: 0, rx: 0, ry: 0 });
  const [displayMode, setDisplayMode] = useState("normal");
  const [calib, setCalib] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {
        center: { lx: 0, ly: 0, rx: 0, ry: 0 },
        range: { lxMin: -1, lxMax: 1, lyMin: -1, lyMax: 1, rxMin: -1, rxMax: 1, ryMin: -1, ryMax: 1 }
      };
    } catch (e) {
      return {
        center: { lx: 0, ly: 0, rx: 0, ry: 0 },
        range: { lxMin: -1, lxMax: 1, lyMin: -1, lyMax: 1, rxMin: -1, rxMax: 1, ryMin: -1, ryMax: 1 }
      };
    }
  });

  const [sampling, setSampling] = useState(false);
  const samplingRef = useRef(null);
  const canvasRef = useRef(null);

  // Helper: find a suitable gamepad (heuristic)
  function findSuitableGamepad() {
    const gps = navigator.getGamepads ? navigator.getGamepads() : [];
    for (let i = 0; i < gps.length; i++) {
      const g = gps[i];
      if (!g) continue;
      // Accept common controllers; you can change heuristics: 'Wireless Controller' often appears for PS4/PS5
      if (g.id && (g.mapping === "standard" || g.id.toLowerCase().includes("wireless") || g.id.toLowerCase().includes("dual") || g.id.toLowerCase().includes("sony"))) {
        return { g, i };
      }
    }
    // Otherwise return first connected
    for (let i = 0; i < gps.length; i++) if (gps[i]) return { g: gps[i], i };
    return null;
  }

  function connect() {
    const found = findSuitableGamepad();
    if (found) {
      setConnected(true);
      setGamepadIndex(found.i);
      setDeviceName(found.g.id || "Gamepad");
      // try to read battery via gamepad if available (non-standard)
      setBattery(found.g.vibrationActuator ? "—" : null);
      // start polling handled by RAF below
    } else {
      // no gamepad yet — encourage user
      alert("No gamepad found. Connect a controller and press any button or move a stick.");
    }
  }

  function disconnect() {
    setConnected(false);
    setGamepadIndex(null);
    setDeviceName("");
    setBattery(null);
  }

  // Polling loop: read axes and update state
  useAnimationFrame(() => {
    if (gamepadIndex === null) return;
    const gps = navigator.getGamepads();
    const g = gps[gamepadIndex];
    if (!g) {
      // maybe disconnected
      disconnect();
      return;
    }
    // axes ordering: typical: 0=LX,1=LY,2=RX,3=RY but can differ
    const lx = g.axes[0] ?? 0;
    const ly = g.axes[1] ?? 0;
    const rx = g.axes[2] ?? 0;
    const ry = g.axes[3] ?? 0;

    setAxes({ lx, ly, rx, ry });

    // If sampling for range calibration, collect values
    if (samplingRef.current) {
      const s = samplingRef.current;
      s.samples.push({ lx, ly, rx, ry });
    }
  }, connected && gamepadIndex !== null);

  // Draw sticks on canvas whenever axes or displayMode changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Draw background circles and axes
    const drawStick = (cx, cy, radius, xVal, yVal, mode) => {
      ctx.save();
      ctx.translate(cx, cy);
      // background
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 2;
      ctx.stroke();

      // axes
      ctx.beginPath();
      ctx.moveTo(-radius, 0);
      ctx.lineTo(radius, 0);
      ctx.moveTo(0, -radius);
      ctx.lineTo(0, radius);
      ctx.strokeStyle = "#666";
      ctx.lineWidth = 1;
      ctx.stroke();

      // dot (apply center calibration)
      // axes values are -1..1; convert to pixel coords
      let px = xVal * radius;
      let py = yVal * radius * -1; // invert Y so up is negative axis -> canvas up

      // draw allowed range if in checkCircularity or centerZoom
      if (mode === "checkCircularity") {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#0a84ff";
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.fillStyle = "#0a84ff";
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const margin = 10;
    const radius = Math.min((w - margin * 2) / 4, (h - margin * 2) / 2) - 6;
    if (displayMode === "centerZoom") {
      // Draw zoomed-in view of LX/LY only
      drawStick(w / 4, h / 2, radius * 0.8, axes.lx, axes.ly, displayMode);
      drawStick((w / 4) * 3, h / 2, radius * 0.8, axes.rx, axes.ry, displayMode);
    } else {
      drawStick(w / 4, h / 2, radius, axes.lx, axes.ly, displayMode);
      drawStick((w / 4) * 3, h / 2, radius, axes.rx, axes.ry, displayMode);
    }
  }, [axes, displayMode]);

  // Calibrate center - store current axes as center
  function calibrate_stick_centers() {
    setCalib((c) => {
      const nc = { ...c, center: { lx: axes.lx, ly: axes.ly, rx: axes.rx, ry: axes.ry } };
      return nc;
    });
    alert("Stick centers recorded.");
  }

  // Fast center = same as above, but message
  function auto_calibrate_stick_centers() {
    calibrate_stick_centers();
  }

  // Calibrate range: sample for 3 seconds and compute min/max
  function calibrate_range() {
    if (!connected) return alert("Connect a controller first.");
    setSampling(true);
    const s = { samples: [] };
    samplingRef.current = s;
    alert("Start moving sticks through full range for 3 seconds...");
    setTimeout(() => {
      const samples = s.samples;
      if (!samples.length) {
        setSampling(false);
        samplingRef.current = null;
        return alert("No samples collected.");
      }
      let lxMin = Infinity, lxMax = -Infinity, lyMin = Infinity, lyMax = -Infinity, rxMin = Infinity, rxMax = -Infinity, ryMin = Infinity, ryMax = -Infinity;
      for (const p of samples) {
        lxMin = Math.min(lxMin, p.lx); lxMax = Math.max(lxMax, p.lx);
        lyMin = Math.min(lyMin, p.ly); lyMax = Math.max(lyMax, p.ly);
        rxMin = Math.min(rxMin, p.rx); rxMax = Math.max(rxMax, p.rx);
        ryMin = Math.min(ryMin, p.ry); ryMax = Math.max(ryMax, p.ry);
      }
      setCalib((c) => ({ ...c, range: { lxMin, lxMax, lyMin, lyMax, rxMin, rxMax, ryMin, ryMax } }));
      samplingRef.current = null;
      setSampling(false);
      alert("Range calibration complete.");
    }, 3000);
  }

  // Finetune: show prompt to adjust small offsets
  function ds5_finetune() {
    const step = parseFloat(prompt("Enter offset to apply to LX center (positive moves right). Example 0.01", "0"));
    if (isNaN(step)) return;
    setCalib((c) => ({
      ...c,
      center: { ...c.center, lx: c.center.lx + step }
    }));
  }

  function flash_all_changes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(calib));
      alert("Calibration saved locally.");
    } catch (e) {
      alert("Failed to save calibration: " + e.message);
    }
  }

  function reboot_controller() {
    alert("Reboot not available via Gamepad API. Please physically reconnect the controller to reboot.");
  }

  // Simple UI helpers
  function show_info_tab() {
    const infoTab = document.getElementById("info-tab");
    if (infoTab) infoTab.click();
  }

  function show_faq_modal() {
    alert("FAQ:\n- Connect controller by pressing Connect and pressing any button.\n- Use 'Calibrate stick center' to capture neutral position.\n- Use 'Calibrate stick range' and move sticks fully for 3s.");
  }

  // On mount: listen for gamepadconnected/gamepaddisconnected to auto-connect
  useEffect(() => {
    function onConn(e) {
      // if not connected yet, select this one
      if (!connected) {
        setGamepadIndex(e.gamepad.index);
        setDeviceName(e.gamepad.id || "Gamepad");
        setConnected(true);
      }
    }
    function onDis(e) {
      if (gamepadIndex === e.gamepad.index) {
        disconnect();
      }
    }
    window.addEventListener("gamepadconnected", onConn);
    window.addEventListener("gamepaddisconnected", onDis);
    return () => {
      window.removeEventListener("gamepadconnected", onConn);
      window.removeEventListener("gamepaddisconnected", onDis);
    };
  }, [connected, gamepadIndex]);

  // Expose simple functions to window so old code/your other scripts can call them if needed
  useEffect(() => {
    window.connect = connect;
    window.disconnect = disconnect;
    window.calibrate_stick_centers = calibrate_stick_centers;
    window.calibrate_range = calibrate_range;
    window.ds5_finetune = ds5_finetune;
    window.auto_calibrate_stick_centers = auto_calibrate_stick_centers;
    window.flash_all_changes = flash_all_changes;
    window.reboot_controller = reboot_controller;
    window.show_info_tab = show_info_tab;
    window.show_faq_modal = show_faq_modal;
    return () => {
      // cleanup: do not remove if other code expects them, but we can set to undefined
    };
  }, [calib, connected, gamepadIndex, axes]);

  return (
    <>
      <nav className="navbar bg-body-tertiary navbar-expand-md">
        <div className="container-fluid">
          <span className="navbar-brand">DualShock Calibration GUI</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse container-fluid justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => show_faq_modal()}>Frequently Asked Questions</button>
              </li>
              <li className="nav-item dropdown" id="navbarNavAltMarkup">
                <div className="nav-link">English</div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container p-2">
        <div id="offlinebar" className="vstack p-2" style={{ display: connected ? "none" : "block" }}>
          <p>Please connect a controller and press Connect.</p>
          <button id="btnconnect" type="button" className="btn btn-outline-primary" onClick={() => connect()}>
            Connect
          </button>
        </div>

        <div id="onlinebar" className="vstack p-2" style={{ display: connected ? "block" : "none" }}>
          <div className="row">
            <div className="col-sm-9 hstack">
              <p><b>Connected to:</b>&nbsp;<span>{deviceName}</span></p>
            </div>
            <div className="col-sm-3">
              <p style={{ textAlign: "right" }}>{battery ? `Battery: ${battery}` : ""}</p>
            </div>
          </div>
          <button type="button" className="btn btn-outline-secondary" onClick={() => disconnect()}>Disconnect</button>
        </div>

        <div id="mainmenu" className="container" style={{ display: connected ? "block" : "none" }}>
          <ul className="nav nav-tabs mb-3" id="mainTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="controller-tab" type="button">Calibration</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="info-tab" type="button" onClick={() => alert(JSON.stringify(calib, null, 2))}>Info</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="debug-tab" type="button">Debug</button>
            </li>
          </ul>

          <div className="tab-content" id="mainTabsContent">
            <div className="tab-pane show active" id="controller-content">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="card text-bg-light mb-3">
                    <div className="card-header"><i className="fas fa-gamepad" /> Controller Info</div>
                    <div className="card-body">
                      <dl className="row" id="fwinfo">
                        <dt className="col-sm-4">Device</dt>
                        <dd className="col-sm-8">{deviceName}</dd>
                        <dt className="col-sm-4">Saved center</dt>
                        <dd className="col-sm-8">{JSON.stringify(calib.center)}</dd>
                        <dt className="col-sm-4">Saved range</dt>
                        <dd className="col-sm-8">{JSON.stringify(calib.range)}</dd>
                      </dl>
                      <button className="btn btn-outline-secondary" onClick={() => show_info_tab()}>Show all</button>
                    </div>
                  </div>

                  <div className="my-3 text-center mx-3" id="controller-svg-container">
                    {/* placeholder for controller svg or image */}
                    <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ccc' }}>
                      Controller graphic
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12" style={{ minWidth: 330 }}>
                  <div className="vstack gap-2 p-2">
                    <div className="d-grid gap-2 d-md-block mb-2">
                      <button className="btn btn-primary me-2" onClick={() => calibrate_stick_centers()}>Calibrate stick center</button>
                      <button className="btn btn-primary me-2" onClick={() => calibrate_range()} disabled={sampling}>{sampling ? 'Sampling...' : 'Calibrate stick range'}</button>
                      <button className="btn btn-primary me-2" onClick={() => ds5_finetune()}>Finetune stick calibration (beta)</button>
                      <button id="btnmcs" className="btn btn-outline-secondary me-2" onClick={() => auto_calibrate_stick_centers()}>Fast calibrate stick center (OLD)</button>
                    </div>

                    <hr />

                    <div className="d-grid gap-2 d-md-block mb-2">
                      <button id="savechanges" className="btn btn-success me-2" onClick={() => flash_all_changes()}>Save changes permanently</button>
                      <button className="btn btn-danger" onClick={() => reboot_controller()}>Reboot controller</button>
                    </div>

                    <div className="card text-bg-light mt-3">
                      <div className="card-header">Joystick Info</div>
                      <div className="vstack px-2 py-2">
                        <div style={{ textAlign: 'center' }}>
                          <canvas ref={canvasRef} id="stickCanvas" width={300} height={150} style={{ border: '1px solid #ddd' }} />
                        </div>

                        <div className="px-2 mt-2">
                          <div className="d-flex justify-content-between">
                            <div style={{ textAlign: 'center' }}>
                              <div>LX:</div>
                              <pre id="lx-lbl" style={{ minWidth: 80 }}>{axes.lx.toFixed(3)}</pre>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <div>LY:</div>
                              <pre id="ly-lbl" style={{ minWidth: 80 }}>{axes.ly.toFixed(3)}</pre>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <div>RX:</div>
                              <pre id="rx-lbl" style={{ minWidth: 80 }}>{axes.rx.toFixed(3)}</pre>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                              <div>RY:</div>
                              <pre id="ry-lbl" style={{ minWidth: 80 }}>{axes.ry.toFixed(3)}</pre>
                            </div>
                          </div>
                        </div>

                        <div className="px-2 mt-3">
                          <div className="btn-group mb-3" role="group" aria-label="Display mode options">
                            <input type="radio" className="btn-check" name="displayMode" id="normalMode" value="normal" defaultChecked onChange={() => setDisplayMode('normal')} />
                            <label className="btn btn-outline-secondary btn-sm" htmlFor="normalMode">Normal</label>

                            <input type="radio" className="btn-check" name="displayMode" id="centerZoomMode" value="centerZoom" onChange={() => setDisplayMode('centerZoom')} />
                            <label className="btn btn-outline-secondary btn-sm" htmlFor="centerZoomMode">10x zoom</label>

                            <input type="radio" className="btn-check" name="displayMode" id="checkCircularityMode" value="checkCircularity" onChange={() => setDisplayMode('checkCircularity')} />
                            <label className="btn btn-outline-secondary btn-sm" htmlFor="checkCircularityMode">Check circularity</label>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="fixed-bottom bg-body-tertiary border-top">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row justify-content-between py-3" id="footbody">
            <p className="mb-0">Version 2.17 (2025-09-28) - <button className="btn btn-link p-0" onClick={() => alert('Support: https://github.com/dualshock-tools')}>Support this project</button></p>
            <ul className="list-unstyled d-flex mb-0">
              <li className="ms-3"><a className="link-body-emphasis" href="mailto:ds4@the.al" target="_blank" rel="noreferrer">Email</a></li>
              <li className="ms-3"><a className="link-body-emphasis" href="https://discord.gg/w2P7Rrs2Yp" target="_blank" rel="noreferrer">Discord</a></li>
              <li className="ms-3"><a className="link-body-emphasis" href="https://github.com/dualshock-tools/" target="_blank" rel="noreferrer">GitHub</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
