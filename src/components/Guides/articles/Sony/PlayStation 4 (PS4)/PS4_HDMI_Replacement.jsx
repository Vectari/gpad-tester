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
          On the CUH-1116 (PS4 FAT), PIN 4 on the new HDMI port may show red
          before the first console startup. After the initial boot, the same PIN
          usually turns green on the tester – this is normal behavior.
        </h2>
        <h2>● Issue Description</h2>
        <p>
          <ol>
            <li>Visible mechanical damage to the port or surrounding area.</li>
            <li>
              Video or audio signal depends on cable movement or position.
            </li>
            <li>
              No video or audio output, even though the console powers on.
            </li>
          </ol>
        </p>
        <h2>● Diagnostics</h2>
        <ol>
          <li>Inspect the HDMI port for physical or mechanical damage.</li>
          <li>
            Check the console indicator light – a solid white light means the
            console is working properly.
          </li>
          <li>
            Connect a controller to confirm that the console responds to input.
          </li>
          <li>
            Perform a diode test as shown below. Readings may vary slightly, but
            focus on the correct position of the green, red, and white pins –
            they indicate proper signal line continuity.
          </li>

          <DiodeTesterWrapper>
            <HDMI_PS4_FAT />
            <HDMI_PS4_SLIM />
            <HDMI_PS4_PRO />
          </DiodeTesterWrapper>
        </ol>
        <h2>● Repair Steps</h2>
        <ol>
          <li>
            Use hot air at around 420°C with airflow level 2–3. Preheat the
            board to approximately 160°C.
          </li>
          <li>
            Apply flux and a small amount of fresh solder to prepare the joints.
          </li>
          <li>
            Heat the area evenly – using a soldering iron may help to release
            the pins more easily.
          </li>
          <li>
            Be careful with the small SMD components located behind the HDMI
            port – they can be easily displaced or damaged by excess heat.
          </li>
          <li>
            Clean the solder pads thoroughly once the damaged port is removed.
          </li>
          <li>
            Align and solder the new HDMI port in place, ensuring all pins are
            properly seated.
          </li>
        </ol>
        <h2>● Testing</h2>
        <ol>
          <li>Perform another diode test to confirm correct readings.</li>
          <li>
            Connect the console to a display and verify that both video and
            audio output work correctly.
          </li>
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
