import styled from "styled-components";
import { Theme } from "../../styles/Theme";
import {
  StyledMainPageWrapper,
  StyledMainPageInfo,
} from "../MainPageInfo/MainPageInfo";

const StyledWrapper = styled.div`
  background: "#FFF";
  width: 60%;
  height: 85vh;
  margin-top: 0.5rem;
  border: 1px solid ${Theme.interface};
  border-radius: 0.5rem;
`;

export function Calibration() {
  return (
    <>
      <StyledWrapper>
        <iframe
          loading="lazy"
          src="/dualshock-tools/dist/index.html"
          title="WebHID Calibration"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            background: "transparent",
            borderRadius: "0.5rem",
          }}
        />
      </StyledWrapper>

      <StyledMainPageWrapper>
        <StyledMainPageInfo>
          <a
            className="ps5_edge_guide"
            target="_blank"
            href="/guides/Sony/PS5%20Gamepad%20(DualSense%20Edge)/PS5%20Edge%20Gamepad%20analog%20replacement%20and%20calibration:%20HALLA,%20TMR,%20original"
          >
            GUIDE HERE: PS5 Edge Gamepad analog replacement and calibration:
            HALLA, TMR, original
          </a>
          <h1>Gamepad Analog Stick Calibration</h1>
          <article>
            <strong>Note:</strong> Calibration works{" "}
            <strong>only on Windows systems</strong> and in browsers that
            support the <em>HID (Human Interface Device)</em> API — such as{" "}
            <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>{" "}
            (Chromium-based).
            <br />
            <br />
            Welcome to the <strong>Gamepad Calibration Tool</strong> — a
            browser-based solution for <strong>PS4 DualShock</strong>,{" "}
            <strong>PS5 DualSense</strong> and <strong>PS5 Edge</strong>{" "}
            controller calibration. Whether you’ve replaced your analog sticks
            or noticed inconsistent movement, this process helps restore{" "}
            <strong>precise and responsive control</strong>.
            <br />
            <br />
            Our <strong>Calibration Wizard</strong> guides you step by step —
            simply follow on-screen instructions to complete setup. No software
            installation required.
          </article>
        </StyledMainPageInfo>

        <StyledMainPageInfo>
          <p className="h2_styles">What Does Analog Stick Calibration Do?</p>
          <article>
            Over time, analog sticks can develop <em>drift</em>,{" "}
            <em>uneven movement</em>, or <em>incorrect centering</em>, often due
            to wear or mismatched replacement parts.
            <br />
            <br />
            Calibration allows you to:
            <ul>
              <li>
                - <strong>Set the correct zero point</strong> — ensures the
                stick truly rests in the center when untouched.
              </li>
              <li>
                - <strong>Define maximum travel limits</strong> — adjust how far
                the analog moves in each direction.
              </li>
              <li>
                - <strong>Minimize deviations</strong> in new or replacement
                analogs.
              </li>
              <li>
                - Ensure the analog’s{" "}
                <strong>motion range forms a perfect circle</strong>, providing
                accurate input in all directions.
              </li>
            </ul>
            Calibration can significantly improve centering and correct input
            mapping, and it can reduce apparent movement issues caused by
            incorrect sensor ranges or software offsets.{" "}
            <strong>
              However — true analog stick drift is a hardware fault (wear, dirt,
              or failing sensors)
            </strong>{" "}
            and usually requires cleaning or replacement of the joystick module.
            Calibration is an important diagnostic and adjustment step, but it
            does not repair worn hardware.
          </article>
        </StyledMainPageInfo>

        <StyledMainPageInfo>
          <p className="h2_styles">Supported Controllers and Analog Types</p>
          <article>
            Our calibration tool supports all major PlayStation controller
            models and sensor types:
            <ul>
              <li>- PS4 DualShock analogs</li>
              <li>- PS5 DualSense analogs</li>
              <li>- PS5 Edge controllers</li>
              <li>- Hall Effect analog sticks</li>
              <li>- TMR (Tunnel Magneto-Resistance) analog sticks</li>
            </ul>
            Whether you’re using genuine Sony parts, upgraded Hall sensors, or
            next-gen TMR analogs, the calibration wizard ensures every type is
            properly aligned and responsive. Remember: calibration optimizes
            sensor mapping — it reduces software/offset issues but cannot repair
            mechanical wear that causes persistent drift.
          </article>
        </StyledMainPageInfo>

        <StyledMainPageInfo>
          <p className="h2_styles">What Are Hall Effect Analogs?</p>
          <article>
            <strong>Hall Effect analogs</strong> use{" "}
            <strong>magnetic sensors</strong> instead of traditional resistive
            potentiometers. Because they have no physical contact between moving
            parts, they greatly reduce wear and are far less prone to developing
            drift compared to contact potentiometers.
            <br />
            <br />
            <strong>Advantages of Hall Effect analogs:</strong>
            <ul>
              <li>- Much lower risk of stick drift over time</li>
              <li>- Longer lifespan due to no friction</li>
              <li>- Smoother and more consistent movement</li>
              <li>
                - Excellent for players who demand precision and durability
              </li>
            </ul>
            While Hall sensors are much more resistant to drift, if you still
            notice persistent movement when the stick is idle, that indicates a
            hardware issue that may require cleaning or replacement —
            calibration alone may not solve it.
          </article>
        </StyledMainPageInfo>

        <StyledMainPageInfo>
          <p className="h2_styles">
            What Are TMR (Tunnel Magneto-Resistance) Analogs?
          </p>
          <article>
            <strong>TMR analogs</strong> use{" "}
            <strong>tunnel magneto-resistance sensors</strong> to detect stick
            movement. Like Hall sensors, they work magnetically, avoiding
            mechanical wear, and often offer even greater precision and lower
            noise.
            <br />
            <br />
            <strong>Benefits of TMR analogs:</strong>
            <ul>
              <li>- Extreme sensitivity and accuracy</li>
              <li>- Low noise and stable output</li>
              <li>- Ideal for competitive or custom-modded controllers</li>
            </ul>
            TMR sensors are highly resistant to conventional drift problems, but
            if you observe constant unintended input, treat it as a hardware
            fault — cleaning or replacing the analog module is typically
            required.
          </article>
        </StyledMainPageInfo>

        <StyledMainPageInfo>
          <p className="h2_styles">Easy Calibration Wizard – Step by Step</p>
          <article>
            The <strong>Calibration Wizard</strong> makes the entire process
            simple:
            <ol>
              <li>1. Connect your controller via USB.</li>
              <li>
                2. Open this page in Chrome, Edge, or another HID-compatible
                browser.
              </li>
              <li>
                3. Follow on-screen guidance to adjust and confirm each axis.
              </li>
              <li>4. Save your calibration for ideal analog behavior.</li>
            </ol>
            <br />
            The wizard will help you set the center point and the maximum
            deviations so your analog stick’s movement draws a near-perfect
            circle. This improves accuracy and fixes miscalibration issues — but
            if drift persists after calibration, it is likely a hardware problem
            and you should consider cleaning the module or replacing the analog
            sticks.
          </article>
        </StyledMainPageInfo>
      </StyledMainPageWrapper>
    </>
  );
}
