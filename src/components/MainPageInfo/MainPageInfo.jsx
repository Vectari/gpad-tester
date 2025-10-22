import styled from "styled-components";
import { Theme } from "../../styles/Theme";
import x_series_full from "../../media/x_series_full.webp";
import x_series_open from "../../media/x_series_open.webp";
import ps5_full from "../../media/ps5_full.webp";
import ps5_mb from "../../media/ps5_mb.webp";
import { LatestArticles } from "../LatestArticles/LatestArticles";

export const StyledMainPageWrapper = styled.div`
  width: 90%;
  max-width: 1150px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const StyledImgWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;

  @media (max-width: 1250px) {
    display: grid;
  }

  img {
    width: 90%;
    max-width: 450px;
    margin: 1rem 2rem;
    height: auto;
  }
`;

export const StyledMainPageInfo = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${Theme.secondary};
    /* background-color: ${Theme.primary}; */
    color: ${Theme.black};
    padding: 0.5rem;
    /* border-radius: 0.5rem; */
    margin-bottom: 1rem;

    /* &:hover {
      color: ${Theme.white};
      background-color: ${Theme.interface};
      transition: 0.5s;
    } */
  }

  .h2_styles {
    font-size: 1.5rem;
    font-weight: bold;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${Theme.secondary};
    color: ${Theme.black};
    padding: 0.5rem;
    margin-bottom: 1rem;
  }

  h2 {
    padding-bottom: 0.5rem;
    /* background-color: ${Theme.primary}; */
    border-bottom: 1px solid ${Theme.secondary};
    color: ${Theme.black};
    padding: 0.5rem;
    /* border-radius: 0.5rem; */
    margin-bottom: 1rem;

    /* &:hover {
      color: ${Theme.white};
      background-color: ${Theme.interface};
      transition: 0.5s;
    } */
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
      <LatestArticles />
      <StyledMainPageInfo>
        <h1>
          Free Online Gamepad Tester – Test Your PS5, PS4, PS3, Xbox Controller
        </h1>
        <StyledImgWrapper>
          <img
            src={x_series_full}
            loading="lazy"
            decoding="async"
            alt="Xbox Series X controller test – front view"
          />
          <img
            src={x_series_open}
            loading="lazy"
            decoding="async"
            alt="Xbox Series X controller inside – analogs and button modules"
          />
        </StyledImgWrapper>

        <article>
          Test your controller online with our free{" "}
          <strong>gamepad tester</strong>! Run{" "}
          <strong>PS5 DualSense controller test</strong>,{" "}
          <strong>PS4 DualShock controller test</strong>,{" "}
          <strong>PS3 controller test</strong>,{" "}
          <strong>Xbox One controller test</strong>, and{" "}
          <strong>Xbox Series controller test</strong> directly in your browser
          — no download required.
          <br />
          <br />
          Our <strong>online gamepad tester</strong> checks:
          <ul>
            <li>
              - Button response (<strong>controller button test</strong>)
            </li>
            <li>
              - Joystick accuracy and <strong>stick drift test</strong>
            </li>
            <li>
              <strong>- Controller vibration test</strong>
            </li>
            <li>
              <strong>- Microphone test</strong> for supported devices
            </li>
            <br />
          </ul>
          Simply connect your gamepad, run a <strong>joystick tester</strong> or{" "}
          <strong>controller vibration tester</strong>, and view live feedback.
          <br />
          <br />
          Our tool supports:
          <ul>
            <li>- PS5 DualSense controllers</li>
            <li>- PS5 DualSense Edge controllers</li>
            <li>- PS4 DualShock controllers</li>
            <li>- PS3 controllers</li>
            <li>- Xbox One and Xbox Series controllers</li>
            <li>- Generic PC gamepads</li>
          </ul>
          <br />
          It also includes a built-in <strong>
            analog calibration tool
          </strong>{" "}
          for <strong>PS4 DualShock</strong>, <strong>PS5 DualSense</strong>,
          and <strong>PS5 DualSense Edge</strong> controllers – perfect for
          adjusting dead zones and improving joystick precision.
          <br />
          <br />
          Visit our website for detailed{" "}
          <strong>repair guides and tutorials</strong> for all major consoles
          and controllers — including PlayStation, Xbox, and Nintendo devices.
        </article>
      </StyledMainPageInfo>

      <StyledMainPageInfo>
        <p className="h2_styles">
          Stick Drift Test – How to Diagnose and Fix Joystick Drift
        </p>
        <article>
          If your gamepad moves on its own, use our{" "}
          <strong>stick drift tester</strong> to locate the problem. Steps to
          fix joystick drift:
          <br />
          <span>1.</span> Calibrate your controller using built-in{" "}
          <strong>controller calibration</strong> tools.
          <br />
          <span>2.</span> Clean the joystick with isopropyl alcohol.
          <br />
          <span>3.</span> Replace joystick modules if needed.
          <br />
          <span>4.</span> Update firmware or drivers.
          <br />
          <span>5.</span> Verify with our <strong>online gamepad tester</strong>
          .
        </article>
      </StyledMainPageInfo>

      <StyledImgWrapper>
        <img
          src={ps5_full}
          loading="lazy"
          decoding="async"
          alt="PS5 DualSense controller test – front view"
        />
        <img
          src={ps5_mb}
          loading="lazy"
          decoding="async"
          alt="PS5 DualSense controller inside – analog module"
        />
      </StyledImgWrapper>

      <StyledMainPageInfo>
        <p className="h2_styles">
          Controller Button Test – Fix Faulty Buttons Easily
        </p>
        <article>
          Run a <strong>controller button test</strong> to identify unresponsive
          or stuck buttons.
          <br />
          How to fix button issues:
          <br />
          <span>1.</span> Clean button contacts carefully.
          <br />
          <span>2.</span> Check and replace worn-out rubber pads.
          <br />
          <span>3.</span> Re-solder damaged connections.
          <br />
          <span>4.</span> Update controller drivers.
          <br />
          <span>5.</span> Retest using our <strong>controller tester</strong>.
        </article>
      </StyledMainPageInfo>

      <StyledMainPageInfo>
        <p className="h2_styles">Why Choose Our Gamepad Tester?</p>
        <article>
          Our free <strong>controller tester</strong> is trusted by gamers and
          repair professionals for:
          <ul>
            <li>
              - Fast and accurate <strong>online gamepad testing</strong>
            </li>
            <li>
              - Built-in <strong>controller vibration tester</strong> and{" "}
              <strong>microphone test</strong>
            </li>
            <li>
              - Integrated <strong>analog calibration tool</strong> for PS4 and
              PS5 controllers
            </li>
            <li>- No installation – 100% browser-based</li>
            <li>- Compatible with all major controller brands</li>
          </ul>
          <br />
          In addition, explore our growing library of{" "}
          <strong>repair tutorials and troubleshooting guides</strong> —
          covering everything from joystick drift fixes to USB port replacements
          and all consoles repair.
        </article>
        <footer style={{ display: "none" }}>
          PS4 analog calibration, PS5 DualSense calibration, PS5 Edge
          calibration, DualShock drift fix, DualSense Hall sensor calibration,
          TMR analog calibration, Windows gamepad calibration, browser HID
          calibration, fix controller drift online, recalibrate PlayStation
          analog sticks
        </footer>
      </StyledMainPageInfo>
    </StyledMainPageWrapper>
  );
}
