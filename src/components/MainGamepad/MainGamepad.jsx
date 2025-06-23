import { useEffect, useRef, useState } from "react";
import USB_SVG from "../../assets/usb.svg";
import BT_SVG from "../../assets/bt.svg";
import { AxesSVG } from "../../components/AxesSVG/AxesSVG";
import { XboxSVG } from "../../components/XboxSVG/XboxSVG";
import { PS4SVG } from "../../components/PS4SVG/PS4SVG";
import { GiVibratingBall } from "react-icons/gi";
import { MdDeleteSweep } from "react-icons/md";
import {
  StyledSVG,
  StyledLoader,
  AxesAndButtonsWrapper,
  AxesWrapper,
  ButtonsWrapper,
  HistoryWrapper,
  StyledButtons,
  HistoryList,
  HistoryItem,
  StyledContener,
  StyledGamepadSVGAxesAVGWrapper,
  StyledHistoryAndVibrationButtonsWrapper,
  StyledVibrationLoopButtonWrapper,
  StyledSmallInfo,
} from "./MainGamepad.styles";
import { MainPageInfo } from "../MainPageInfo/MainPageInfo";
import { AudioRecorder } from "../AudioRecorder/AudioRecorder";

export function MainGamepad({ playerNumber }) {
  const [leftX, setLeftX] = useState(0);
  const [leftY, setLeftY] = useState(0);
  const [rightX, setRightX] = useState(0);
  const [rightY, setRightY] = useState(0);
  const [l3Pressed, setL3Pressed] = useState(false);
  const [r3Pressed, setR3Pressed] = useState(false);
  const [lt, setLT] = useState(0);
  const [rt, setRT] = useState(0);
  const [lbPressed, setLBPressed] = useState(false);
  const [rbPressed, setRBPressed] = useState(false);
  const [APressed, setAPressed] = useState(false);
  const [BPressed, setBPressed] = useState(false);
  const [XPressed, setXPressed] = useState(false);
  const [YPressed, setYPressed] = useState(false);
  const [upPressed, setUPPressed] = useState(false);
  const [downPressed, setDOWNPressed] = useState(false);
  const [leftPressed, setLEFTPressed] = useState(false);
  const [rightPressed, setRIGHTPressed] = useState(false);
  const [sharePressed, setSHAREPressed] = useState(false);
  const [optionsPressed, setOPTIONSPressed] = useState(false);
  const [logoPressed, setLogoPressed] = useState(false);
  const [touchbarPressed, setTouchbarPressed] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [gamepadName, setGamepadName] = useState("");
  const [buttons, setButtons] = useState(0);
  // const [axes, setAxes] = useState(0);
  const [buttonHistory, setButtonHistory] = useState([]);
  const historyListRef = useRef(null);
  const [scaleValue, setScaleValue] = useState(
    localStorage.getItem("interfaceScale")
      ? localStorage.getItem("interfaceScale")
      : "scale1"
  );
  const [infiniteVibration, setInfiniteVibration] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const interval = setInterval(() => {
      const gpad = navigator.getGamepads()[playerNumber];
      if (gpad && gpad.connected && gpad.buttons) {
        setLeftX(gpad.axes[0]);
        setLeftY(gpad.axes[1]);
        setRightX(gpad.axes[2]);
        setRightY(gpad.axes[3]);
        setL3Pressed(gpad.buttons[10].pressed);
        setR3Pressed(gpad.buttons[11].pressed);
        setLT(gpad.buttons[6].value);
        setRT(gpad.buttons[7].value);
        setLBPressed(gpad.buttons[4].pressed);
        setRBPressed(gpad.buttons[5].pressed);
        setAPressed(gpad.buttons[0].pressed);
        setBPressed(gpad.buttons[1].pressed);
        setXPressed(gpad.buttons[2].pressed);
        setYPressed(gpad.buttons[3].pressed);
        setUPPressed(gpad.buttons[12].pressed);
        setDOWNPressed(gpad.buttons[13].pressed);
        setLEFTPressed(gpad.buttons[14].pressed);
        setRIGHTPressed(gpad.buttons[15].pressed);
        setSHAREPressed(gpad.buttons[8].pressed);
        setOPTIONSPressed(gpad.buttons[9].pressed);
        setLogoPressed(gpad.buttons[16].pressed);
        setTouchbarPressed(gpad.buttons[17]?.pressed);
        setConnectionStatus(gpad.connected);
        setGamepadName(gpad.id);
        setButtons(gpad.buttons.length);
        // setAxes(gpad.axes.length);

        // -------------------------- Update buttons history
        if (gpad && gpad.buttons) {
          const newHistory = [];
          gpad.buttons.forEach((button, index) => {
            if (button.pressed) {
              newHistory.push(`B${index}`);
            }
          });
          setButtonHistory((prevHistory) => [...prevHistory, ...newHistory]);
        }
      }

      if (navigator.getGamepads()[playerNumber] === null) {
        setConnectionStatus(false);
        setButtonHistory([]);
        // setAxes(0);
        setButtons(0);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [playerNumber]);

  // ------------------------------- SCALE INTERFACE SECTION
  const scaleInterface = (
    <>
      <label>Interface scale: </label>
      <select
        value={scaleValue}
        onChange={(e) => {
          setScaleValue(e.target.value);
          localStorage.setItem("interfaceScale", e.target.value);
        }}
      >
        <option value={"scale1"}>x1.0</option>
        <option value={"scale08"}>x0.8</option>
        <option value={"scale09"}>x0.9</option>
        <option value={"scale11"}>x1.1</option>
        <option value={"scale12"}>x1.2</option>
      </select>
      <br />
      <br />
    </>
  );

  // ------------------------------- BUTTONS HISTORY SECTION
  useEffect(() => {
    if (historyListRef.current) {
      historyListRef.current.scrollLeft = historyListRef.current.scrollWidth;
    }
  }, [buttonHistory]);

  // ------------------------------- VIBRATION INFINITE LOOP SECTION
  useEffect(() => {
    let vibrationInterval;

    if (infiniteVibration) {
      vibrationInterval = setInterval(() => {
        const activeGpad = navigator.getGamepads()[0];
        if (activeGpad && activeGpad.vibrationActuator) {
          activeGpad.vibrationActuator.playEffect("dual-rumble", {
            startDelay: 0,
            duration: 1000,
            weakMagnitude: 1.0,
            strongMagnitude: 1.0,
          });
        }
      }, 1000); // Trigger every 1 second
    } else {
      if (vibrationInterval) clearInterval(vibrationInterval);
    }

    return () => {
      if (vibrationInterval) clearInterval(vibrationInterval);
    };
  }, [infiniteVibration]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "v" || e.key === "V") {
        setInfiniteVibration((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "h" || e.key === "H") {
        setButtonHistory([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const buttonHistorySection = (
    <HistoryWrapper>
      <AudioRecorder />
      <h3>Buttons History (h)</h3>
      <HistoryList ref={historyListRef}>
        {buttonHistory.map((event, index) => (
          <HistoryItem key={index}>{event}</HistoryItem>
        ))}
      </HistoryList>
      <StyledHistoryAndVibrationButtonsWrapper>
        <button onClick={() => setButtonHistory([])}>
          <MdDeleteSweep />
        </button>

        {/* // ------------------------------- VIBRATION SECTION */}
        <StyledVibrationLoopButtonWrapper>
          <label>
            <input
              type="checkbox"
              checked={infiniteVibration}
              onChange={(e) => setInfiniteVibration(e.target.checked)}
            />{" "}
            Infinite Vibration (v)
          </label>
          <button
            onClick={() =>
              navigator
                .getGamepads()[0]
                .vibrationActuator.playEffect("dual-rumble", {
                  startDelay: 0, // Delay before the effect starts, in milliseconds
                  duration: 1000, // Duration of the effect, in milliseconds
                  weakMagnitude: 1.0, // Intensity of the low-frequency (weak) rumble, between 0.0 and 1.0
                  strongMagnitude: 1.0, // Intensity of the high-frequency (strong) rumble, between 0.0 and 1.0
                })
            }
          >
            <GiVibratingBall />
          </button>
          <StyledSmallInfo>PS5 not supported</StyledSmallInfo>
        </StyledVibrationLoopButtonWrapper>
      </StyledHistoryAndVibrationButtonsWrapper>
    </HistoryWrapper>
  );
  // ------------------------------- BUTTONS SECTION
  let buttonsNumber = [];
  const gpad = navigator.getGamepads()[playerNumber];

  if (gpad && gpad.buttons) {
    for (let i = 0; i < gpad.buttons.length; i++) {
      let buttonsValue = gpad.buttons[i]?.value || 0;
      buttonsNumber.push(
        <StyledButtons key={i} value={buttonsValue}>
          B {i}
          <span>
            <br />
            {(i === 6 || i === 7) && buttonsValue.toFixed(2)}
          </span>
          <br />
        </StyledButtons>
      );
    }
  }

  // ------------------------------- AXES SECTION
  let axesNumber = [];
  if (gpad && gpad.axes) {
    for (let i = 0; i < gpad.axes.length; i++) {
      let renderedAxesValue = Math.abs(gpad.axes[i]).toFixed(3).substring(0, 5);
      const axesLabels = ["Left X ", "Left Y ", "Right X ", "Right Y "];

      axesNumber.push(
        <div key={i}>
          {axesLabels[i] || `Axes${i} `} → <span>{renderedAxesValue}</span>
        </div>
      );
    }
  }

  //
  //
  // RENDER SECTION
  if (buttons === 0 || !connectionStatus) {
    return (
      <>
        <StyledLoader>
          <div></div>
          <div></div>
        </StyledLoader>
        <h2>
          Connect the controller via USB or Bluetooth (only USB on Linux) and
          press any key
        </h2>
        <StyledSVG>
          <img src={USB_SVG} alt="usb logo" />
          <img src={BT_SVG} alt="bluetooth logo" />
        </StyledSVG>
        <MainPageInfo />
      </>
    );

    // ------------------ XBOX ONE
  } else if (buttons === 17) {
    return (
      <>
        <StyledContener className={scaleValue}>
          <AxesAndButtonsWrapper>
            {scaleInterface}
            <p>
              <span>Gamepad ID:</span> {gamepadName}
            </p>
            <AxesWrapper>{axesNumber}</AxesWrapper>
            <ButtonsWrapper>{buttonsNumber}</ButtonsWrapper>
            {buttonHistorySection}
          </AxesAndButtonsWrapper>
          <StyledGamepadSVGAxesAVGWrapper>
            <XboxSVG
              leftX={leftX}
              leftY={leftY}
              rightX={rightX}
              rightY={rightY}
              l3Pressed={l3Pressed}
              r3Pressed={r3Pressed}
              lt={lt}
              rt={rt}
              lbPressed={lbPressed}
              rbPressed={rbPressed}
              APressed={APressed}
              BPressed={BPressed}
              XPressed={XPressed}
              YPressed={YPressed}
              upPressed={upPressed}
              downPressed={downPressed}
              leftPressed={leftPressed}
              rightPressed={rightPressed}
              sharePressed={sharePressed}
              optionsPressed={optionsPressed}
            />
            <AxesSVG
              leftX={leftX}
              leftY={leftY}
              l3Pressed={l3Pressed}
              rightX={rightX}
              rightY={rightY}
              r3Pressed={r3Pressed}
            />
          </StyledGamepadSVGAxesAVGWrapper>
        </StyledContener>
        <MainPageInfo />
      </>
    );

    // ------------------ PS4 AND PS5
  } else {
    return (
      <>
        <StyledContener className={scaleValue}>
          <AxesAndButtonsWrapper>
            {scaleInterface}
            <p>
              <span>Gamepad ID:</span> {gamepadName}
            </p>
            <AxesWrapper>{axesNumber}</AxesWrapper>
            <ButtonsWrapper>{buttonsNumber}</ButtonsWrapper>
            {buttonHistorySection}
          </AxesAndButtonsWrapper>
          <StyledGamepadSVGAxesAVGWrapper>
            <PS4SVG
              leftX={leftX}
              leftY={leftY}
              rightX={rightX}
              rightY={rightY}
              l3Pressed={l3Pressed}
              r3Pressed={r3Pressed}
              lt={lt}
              rt={rt}
              lbPressed={lbPressed}
              rbPressed={rbPressed}
              APressed={APressed}
              BPressed={BPressed}
              XPressed={XPressed}
              YPressed={YPressed}
              upPressed={upPressed}
              downPressed={downPressed}
              leftPressed={leftPressed}
              rightPressed={rightPressed}
              sharePressed={sharePressed}
              optionsPressed={optionsPressed}
              logoPressed={logoPressed}
              touchbarPressed={touchbarPressed}
            />
            <AxesSVG
              leftX={leftX}
              leftY={leftY}
              l3Pressed={l3Pressed}
              rightX={rightX}
              rightY={rightY}
              r3Pressed={r3Pressed}
            />
          </StyledGamepadSVGAxesAVGWrapper>
        </StyledContener>
        <MainPageInfo />
      </>
    );
  }
}
