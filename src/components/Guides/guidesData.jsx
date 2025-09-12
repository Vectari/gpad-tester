import { AllHDMI } from "./articles/AllHDMI";
import { Nintendo_Switch_teardown } from "./articles/Nintendo/Nintendo Switch/Nintendo_Switch_teardown";
import { PS5_HDMI_Replacement } from "./articles/Sony/PlayStation 5 (PS5)/PS5_HDMI_Replacement";

export const guidesData = {
  Microsoft: {
    devices: {
      "Xbox One FAT (original)": {
        guides: {
          // one: "one",
        },
      },
      "Xbox One S": {
        guides: {
          // one: "one",
        },
      },
      "Xbox One X": {
        guides: {
          // one: "one",
        },
      },
      "Xbox One Gamepad": {
        guides: {
          // one: "one",
        },
      },
      "Xbox Series S": {
        guides: {
          // one: "one",
        },
      },
      "Xbox Series X": {
        guides: {
          // one: "one",
        },
      },
      "Xbox Elite Series Gamepad": {
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
          "Nintendo Switch teardown & disassembly": (
            <Nintendo_Switch_teardown />
          ),
          "Second guide": <Nintendo_Switch_teardown />,
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
      "PlayStation 3 (PS3)": {
        guides: {
          // one: "one",
        },
      },
      "PS3 Gamepad (DualShock 3)": {
        guides: {
          // one: "one",
        },
      },
      "PlayStation 4 (PS4)": {
        guides: {
          // one: "one",
        },
      },
      "PS4 Gamepad (DualShock 4 V1/V2)": {
        guides: {
          // one: "one",
        },
      },
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
          // one: "one",
        },
      },
      "PS5 Gamepad (DualSense Edge)": {
        guides: {
          // one: "one",
        },
      },
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
};
