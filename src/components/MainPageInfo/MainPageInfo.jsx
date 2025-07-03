import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const StyledMainPageWrapper = styled.div`
  width: 90%;
  max-width: 1150px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const StyledMainPageInfo = styled.div`
  margin-bottom: 2rem;

  h1 {
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid ${Theme.secondary};
  }
  h2 {
    padding-bottom: 0.5rem;
  }

  article {
    margin-left: 1rem;
    font-size: 1.1rem;
    text-align: justify;
  }

  span {
    font-weight: bold;
    color: ${Theme.secondary};
  }
`;

export function MainPageInfo() {
  return (
    <StyledMainPageWrapper>
      <StyledMainPageInfo>
        <h1>
          Free Online Gamepad Tester – Test Your PS5, PS4, PS3, Xbox Controller
        </h1>

        <article>
          Test your controller online with our free{" "}
          <strong>gamepad tester</strong>! Run{" "}
          <strong>PS5 controller test</strong>,{" "}
          <strong>PS4 controller test</strong>,{" "}
          <strong>PS3 controller test</strong>,{" "}
          <strong>Xbox One controller test</strong>, and{" "}
          <strong>Xbox Series controller test</strong> directly in your browser
          — no download needed. Our <strong>online gamepad tester</strong>{" "}
          checks:
          <ul>
            <li>
              Button response (<strong>controller button test</strong>)
            </li>
            <li>
              Joystick accuracy and <strong>stick drift test</strong>
            </li>
            <li>
              <strong>Controller vibration test</strong>
            </li>
            <li>
              <strong>Microphone test</strong> for compatible controllers
            </li>
          </ul>
          Simply connect your gamepad, run a <strong>joystick tester</strong> or{" "}
          <strong>controller vibration tester</strong>, and view live feedback.
          Our tool supports:
          <ul>
            <li>PS5, PS4, PS3 controllers</li>
            <li>Xbox One, Xbox Series controllers</li>
            <li>Generic PC gamepads</li>
          </ul>
        </article>
      </StyledMainPageInfo>
      <StyledMainPageInfo>
        <h2>Stick Drift Test – How to Diagnose and Fix Joystick Drift</h2>
        <article>
          If your gamepad drifts on its own, use our{" "}
          <strong>stick drift tester</strong> to diagnose the issue. Steps to
          fix joystick drift:
          <br />
          <span>1.</span> Calibrate your controller with built-in{" "}
          <strong>controller calibration</strong> tools.
          <br />
          <span>2.</span> Clean the joystick with isopropyl alcohol.
          <br />
          <span>3.</span> Replace joystick modules if necessary.
          <br />
          <span>4.</span> Update firmware or drivers.
          <br />
          <span>5.</span> Verify with our <strong>online gamepad tester</strong>
          .
        </article>
      </StyledMainPageInfo>
      <StyledMainPageInfo>
        <h2>Controller Button Test – Fix Faulty Buttons Easily</h2>
        <article>
          Run a <strong>controller button test</strong> to identify unresponsive
          buttons. Fix issues by:
          <br />
          <span>1.</span> Cleaning button contacts.
          <br />
          <span>2.</span> Inspecting and replacing rubber domes.
          <br />
          <span>3.</span> Re-soldering faulty connections.
          <br />
          <span>4.</span> Updating drivers.
          <br />
          <span>5.</span> Retesting with our <strong>controller tester</strong>.
        </article>
      </StyledMainPageInfo>
      <StyledMainPageInfo>
        <h2>Why Choose Our Gamepad Tester?</h2>
        <article>
          Our free <strong>controller tester</strong> is trusted by gamers for:
          <ul>
            <li>
              Fast and accurate <strong>gamepad test online</strong>
            </li>
            <li>
              Built-in <strong>controller vibration tester</strong> and{" "}
              <strong>microphone test</strong>
            </li>
            <li>No installation — 100% browser-based</li>
            <li>Compatible with major brands and PC gamepads</li>
          </ul>
        </article>
      </StyledMainPageInfo>
    </StyledMainPageWrapper>
  );
}
