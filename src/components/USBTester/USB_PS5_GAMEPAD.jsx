import { HDMITester } from "../../components/HDMITester/HDMITester";

export function USB_PS5_GAMEPAD() {
  return (
    <HDMITester
      // title="PS5 Gamepad USB-C diode test"
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
          value: "0.67",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 5,
          value: "1.28",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 6,
          value: "0.54",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 7,
          value: "0.55",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 8,
          value: "OL",
          valueColor: "red",
          squareColor: "red",
        },
        {
          number: 9,
          value: "0.66",
          valueColor: "green",
          squareColor: "orange",
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
          value: "0.66",
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
          value: "0.55",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 19,
          value: "0.54",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 20,
          value: "1.29",
          valueColor: "green",
          squareColor: "orange",
        },
        {
          number: 21,
          value: "0.66",
          valueColor: "green",
          squareColor: "orange",
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
