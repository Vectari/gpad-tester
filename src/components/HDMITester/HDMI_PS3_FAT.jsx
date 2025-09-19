import { HDMITester } from "./HDMITester";

export function HDMI_PS3_FAT() {
  return (
    <HDMITester
      title="HDMI diode test: PS3 FAT"
      leftPins={[
        {
          number: 1,
          value: "GND",
          valueColor: "aqua",
          squareColor: "orange",
        },
        {
          number: 2,
          value: "0.54",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 3,
          value: "0.07",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 4,
          value: "0.54",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 5,
          value: "0.55",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 6,
          value: "0.07",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 7,
          value: "0.54",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 8,
          value: "0.54",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 9,
          value: "0.07",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 10,
          value: "0.54",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 11,
          value: "0.55",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 12,
          value: "GND",
          valueColor: "aqua",
          squareColor: "orange",
        },
      ]}
      rightPins={[
        {
          number: 13,
          value: "GND",
          valueColor: "aqua",
          squareColor: "orange",
        },
        {
          number: 14,
          value: "0.07",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 15,
          value: "0.55",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 16,
          value: "OL",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 17,
          value: "OL",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 18,
          value: "0.56",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 19,
          value: "0.56",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 20,
          value: "0.07",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 21,
          value: "0.60",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 22,
          value: "0.55",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 23,
          value: "OL",
          valueColor: "whited",
          squareColor: "orange",
        },
        {
          number: 24,
          value: "GND",
          valueColor: "aqua",
          squareColor: "orange",
        },
      ]}
    />
  );
}
