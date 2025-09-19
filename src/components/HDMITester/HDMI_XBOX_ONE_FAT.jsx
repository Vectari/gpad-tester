import { HDMITester } from "./HDMITester";

export function HDMI_XBOX_ONE_FAT() {
  return (
    <HDMITester
      title="HDMI diode test: XBOX ONE FAT"
      leftPins={[
        {
          number: 1,
          value: "GND",
          valueColor: "aqua",
          squareColor: "orange",
        },
        {
          number: 2,
          value: "0.69",
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
          value: "0.69",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 5,
          value: "0.69",
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
          value: "0.69",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 8,
          value: "0.69",
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
          value: "0.69",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 11,
          value: "0.68",
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
          value: "0.69",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 16,
          value: "0.67",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 17,
          value: "OL",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 18,
          value: "0.60",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 19,
          value: "0.60",
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
          value: "0.52",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 22,
          value: "0.62",
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
