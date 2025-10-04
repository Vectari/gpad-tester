import { HDMITester } from "../../components/HDMITester/HDMITester";

export function USB_XBOX_SERIES_GAMEPAD() {
  return (
    <HDMITester
      // title="XBOX Series Gamepad USB-C diode test"
      leftPins={[
        {
          number: 1,
          value: "GND",
          valueColor: "aqua",
          squareColor: "orange",
        },
        {
          number: 2,
          value: "OL",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 3,
          value: "OL",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 4,
          value: "0.19",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 5,
          value: "1.30",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 6,
          value: "OL",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 7,
          value: "OL",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 8,
          value: "OL",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 9,
          value: "0.20",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 10,
          value: "OL",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 11,
          value: "OL",
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
          value: "OL",
          valueColor: "white",
          squareColor: "orange",
        },
        {
          number: 15,
          value: "OL",
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
          value: "OL",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 19,
          value: "OL",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 20,
          value: "1.30",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 21,
          value: "0.19",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 22,
          value: "OL",
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
