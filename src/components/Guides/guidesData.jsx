import { AllHDMI } from "./articles/AllHDMI";
import { PS5_HDMI_Replacement } from "./articles/Sony/PlayStation 5 (PS5)/PS5_HDMI_Replacement";
import { PS4_HDMI_Replacement } from "./articles/Sony/PlayStation 4 (PS4)/PS4_HDMI_Replacement";
import { USB_PS5_GAMEPAD } from "../USBTester/USB_PS5_GAMEPAD";
import { USB_XBOX_SERIES_GAMEPAD } from "../USBTester/USB_XBOX_SERIES_GAMEPAD";
import { PS5_Gamepad_USB_Replacement } from "./articles/Sony/PS5 Gamepad (DualSense)/PS5_Gamepad_USB_replacement";
import { PS5_Gamepad_Buttons_Fix } from "./articles/Sony/PS5 Gamepad (DualSense)/PS5_Gamepad_Buttons_Fix";
import { PS5_Gamepad_Analog_Drift_Fix } from "./articles/Sony/PS5 Gamepad (DualSense)/PS5_Gamepad_Analog_Drift_Fix";
import { PS5_Gamepad_Analog_Replacement } from "./articles/Sony/PS5 Gamepad (DualSense)/PS5_Gamepad_Analog_Replacement";
import { X_SERIES_GAMEPAD_LT_RT } from "./articles/Microsoft/Xbox Series Gamepad/X_SERIES_GAMEPAD_LT_RT";

export const guidesData = {
  Microsoft: {
    devices: {
      // "Xbox One FAT (original)": {
      //   guides: {
      //     // one: "one",
      //   },
      // },
      // "Xbox One S": {
      //   guides: {
      //     // one: "one",
      //   },
      // },
      // "Xbox One X": {
      //   guides: {
      //     // one: "one",
      //   },
      // },
      "Xbox One Gamepad": {
        guides: {
          // one: "one",
        },
      },
      "Xbox Series Gamepad": {
        guides: {
          "Xbox Series Gamepad loud or sticky LT or RT buttons": (
            <X_SERIES_GAMEPAD_LT_RT />
          ),
        },
      },
      // "Xbox Series S": {
      //   guides: {
      //     // one: "one",
      //   },
      // },
      // "Xbox Series X": {
      //   guides: {
      //     // one: "one",
      //   },
      // },
      "Xbox One Elite Gamepad": {
        guides: {
          // one: "one",
        },
      },
      "Xbox Elite Series 2 Gamepad": {
        guides: {
          // one: "one",
        },
      },
    },
  },
  Nintendo: {
    devices: {
      "Nintendo Switch": {
        guides: {
          // one: "one",
        },
      },
      "Nintendo Switch Lite": {
        guides: {
          // one: "one",
        },
      },
      "Nintendo Switch OLED": {
        guides: {
          // one: "one",
        },
      },
      "Nintendo Switch Joy-Con": {
        guides: {
          // one: "one",
        },
      },
      "Nintendo Switch 2": {
        guides: {
          // one: "one",
        },
      },
      "Nintendo Switch 2 Joy-Con": {
        guides: {
          // one: "one",
        },
      },
    },
  },
  Sony: {
    devices: {
      // "PlayStation 3 (PS3)": {
      //   guides: {
      //     // one: "one",
      //   },
      // },
      // "PS3 Gamepad (DualShock 3)": {
      //   guides: {
      //     // one: "one",
      //   },
      // },
      "PlayStation 4 FAT (PS4)": {
        guides: {
          "PS4 FAT HDMI Replacement": <PS4_HDMI_Replacement />,
        },
      },
      "PlayStation 4 Slim (PS4 Slim)": {
        guides: {
          "PS4 Slim HDMI Replacement": <PS4_HDMI_Replacement />,
        },
      },
      "PlayStation 4 PRO (PS4 PRO)": {
        guides: {
          "PS4 PRO HDMI Replacement": <PS4_HDMI_Replacement />,
        },
      },
      // "PS4 Gamepad (DualShock 4 V1/V2)": {
      //   guides: {
      //     // one: "one",
      //   },
      // },
      "PlayStation 5 (PS5)": {
        guides: {
          "PS5 HDMI Replacement": <PS5_HDMI_Replacement />,
        },
      },
      "PlayStation 5 Slim (PS5 Slim)": {
        guides: {
          "PS5 Slim HDMI Replacement": <PS5_HDMI_Replacement />,
        },
      },
      "PlayStation 5 PRO (PS5 PRO)": {
        guides: {
          "PS5 PRO HDMI Replacement": <PS5_HDMI_Replacement />,
        },
      },
      "PS5 Gamepad (DualSense)": {
        guides: {
          "PS5 Gamepad (DualSense) USB-C Replacement": (
            <PS5_Gamepad_USB_Replacement />
          ),
          "PS5 Gamepad buttons not working": <PS5_Gamepad_Buttons_Fix />,
          "PS5 Gamepad analog drift fix": <PS5_Gamepad_Analog_Drift_Fix />,
          "PS5 Gamepad analog replacement": <PS5_Gamepad_Analog_Replacement />,
        },
      },
      // "PS5 Gamepad (DualSense Edge)": {
      //   guides: {
      //     // one: "one",
      //   },
      // },
    },
  },
  Valve: {
    devices: {
      "SteamDeck 1010 (LCD)": {
        guides: {
          // one: "one",
        },
      },
      "SteamDeck 1030 (OLED)": {
        guides: {
          // one: "one",
        },
      },
    },
  },
  HDMI: {
    devices: {
      "All consoles": {
        guides: {
          "All consoles HDMI diode test": <AllHDMI />,
        },
      },
    },
  },
  "USB-C": {
    devices: {
      "PS5 Gamepad (DualSense)": {
        guides: {
          "PS5 Gamepad (DualSense) USB-C diode test": <USB_PS5_GAMEPAD />,
        },
      },
      "XBOX Series Gamepad": {
        guides: {
          "XBOX Series Gamepad USB-C diode test": <USB_XBOX_SERIES_GAMEPAD />,
        },
      },
    },
  },
};
