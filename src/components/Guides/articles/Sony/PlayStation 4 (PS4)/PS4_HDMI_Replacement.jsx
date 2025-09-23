import { HDMI_PS4_FAT } from "../../../../HDMITester/HDMI_PS4_FAT";
import { HDMI_PS4_SLIM } from "../../../../HDMITester/HDMI_PS4_SLIM";
import { HDMI_PS4_PRO } from "../../../../HDMITester/HDMI_PS4_PRO";
import {
  DiodeTesterWrapper,
  GalleryWrapper,
  StyledArticleWrapper,
} from "../../ArticleStyles";
import PHOTO_1 from "./PS4_photo/1.webp";
import PHOTO_3 from "./PS4_photo/3.webp";
import PHOTO_4 from "./PS4_photo/4.webp";

export function PS4_HDMI_Replacement() {
  return (
    <>
      <StyledArticleWrapper>
        <h1>
          Note: Replacing HDMI requires experience and the right equipment!
        </h1>
        <h2>
          On the CUH-1116 (PS4 FAT), I noticed that PIN 4 on the new HDMI shows
          red before the first console startup. After that, PIN 4 turns green on
          the tester.
        </h2>
        <h2>● Issue Description</h2>
        <p>
          <ol>
            <li>Mechanical damage</li>
            <li>Video/Audio signal depends on cable movement</li>
            <li>No Video/Audio output</li>
          </ol>
        </p>
        <img src="" alt="" />
        <h2>● Diagnostics</h2>
        <ol>
          <li>Check for visible mechanical damage.</li>
          <li>Verify the console light – solid white = good.</li>
          <li>Connect a gamepad to confirm console response.</li>
          <li>
            Perform a diode test as shown below. Values may vary slightly, but
            the key is the location of the green, red, and white pins.
          </li>

          <DiodeTesterWrapper>
            <HDMI_PS4_FAT />
            <HDMI_PS4_SLIM />
            <HDMI_PS4_PRO />
          </DiodeTesterWrapper>
        </ol>
        <h2>● Repair Steps</h2>
        <ol>
          <li>Use hot air at 420°C, airflow 2–3, with preheating at 160°C.</li>
          <li>Apply flux and fresh solder.</li>
          <li>Heat the area – using a soldering iron can help.</li>
          <li>
            Be careful with the small components located behind the HDMI port –
            they can be easily displaced or damaged.
          </li>
          <li>Clean the pads thoroughly.</li>
          <li>Install the new HDMI port.</li>
        </ol>
        <h2>● Testing</h2>
        <ol>
          <li>Perform a diode test again.</li>
          <li>Check video and audio output with a display.</li>
        </ol>
        <h2>● Gallery</h2>
        <GalleryWrapper>
          <img src={PHOTO_1} loading="lazy" alt="PS4 HDMI replacement" />
          <img src={PHOTO_3} loading="lazy" alt="PS4 HDMI replacement" />
          <img src={PHOTO_4} loading="lazy" alt="PS4 HDMI replacement" />
        </GalleryWrapper>
      </StyledArticleWrapper>
    </>
  );
}
