import { HDMI_PS5_FAT } from "../../../../HDMITester/HDMI_PS5_FAT";
import { HDMI_PS5_PRO } from "../../../../HDMITester/HDMI_PS5_PRO";
import {
  DiodeTesterWrapper,
  GalleryWrapper,
  StyledArticleWrapper,
} from "../../ArticleStyles";
import PHOTO_1 from "./PS5_photo/1.webp";
import PHOTO_2 from "./PS5_photo/2.webp";
import PHOTO_3 from "./PS5_photo/3.webp";

export function PS5_HDMI_Replacement() {
  return (
    <StyledArticleWrapper>
      <h1>
        PS5 HDMI Port Not Working – How to Diagnose and Fix No Signal Issue
      </h1>

      <p>
        If your <strong>PS5 has no signal</strong>, no image on the screen, or
        the HDMI connection only works when the cable is moved — the HDMI port
        may be damaged.
      </p>

      <p>
        👉 Before opening the console, check if the system is actually working.
        <br />
        Look for a solid white light.
      </p>

      <h2>● Quick Check – Is Your PS5 Working?</h2>
      <ol>
        <li>Turn on the console.</li>
        <li>Look for a solid white light.</li>
        <li>Connect a controller.</li>
        <li>
          Open{" "}
          <a
            href="http://gpadtester.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            gamepad tester
          </a>{" "}
          and press buttons.
        </li>
        <li>
          If inputs are detected → console works, HDMI is likely the issue.
        </li>
      </ol>

      <h2>● Common HDMI Issues</h2>
      <ul>
        <li>Visible mechanical damage inside the port</li>
        <li>Signal appears/disappears when moving the cable</li>
        <li>No video or audio output at all</li>
      </ul>

      <h2>● Diagnostics</h2>
      <ol>
        <li>Inspect HDMI port for bent or broken pins.</li>
        <li>Check console LED (white = system is running).</li>
        <li>Confirm controller input works.</li>
        <li>
          Perform a diode test – compare readings with reference values below.
        </li>
      </ol>

      <DiodeTesterWrapper>
        <HDMI_PS5_FAT />
        <HDMI_PS5_PRO />
      </DiodeTesterWrapper>

      <h2>● HDMI Port Replacement</h2>
      <h3>
        This repair requires experience – incorrect technique can damage the
        motherboard.
      </h3>

      <ol>
        <li>
          Preheat the board to ~160°C. Use hot air at ~420°C (airflow 2–3).
        </li>
        <li>Apply flux and a small amount of fresh solder.</li>
        <li>Heat evenly until solder melts completely.</li>
        <li>Carefully remove the HDMI port.</li>
        <li>
          Watch out for nearby SMD components — they are easy to move or damage.
        </li>
        <li>Clean pads thoroughly.</li>
        <li>Align and solder the new HDMI port.</li>
      </ol>

      <h2>● Testing After Repair</h2>
      <ol>
        <li>Repeat diode test and compare values.</li>
        <li>Connect PS5 to a TV or monitor.</li>
        <li>Check if image is stable and not flickering.</li>
        <li>Verify audio output works correctly.</li>
      </ol>

      <p>
        👉 If the console works but you had no signal before — HDMI replacement
        solved the issue.
      </p>

      <h2>● Gallery</h2>
      <GalleryWrapper>
        <img src={PHOTO_1} loading="lazy" alt="PS5 HDMI port damage example" />
        <img
          src={PHOTO_2}
          loading="lazy"
          alt="PS5 HDMI port replacement process"
        />
        <img src={PHOTO_3} loading="lazy" alt="PS5 motherboard HDMI repair" />
      </GalleryWrapper>
    </StyledArticleWrapper>
  );
}
