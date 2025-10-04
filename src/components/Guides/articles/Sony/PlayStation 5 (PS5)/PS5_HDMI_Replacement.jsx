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
    <>
      <StyledArticleWrapper>
        <h1>
          Note: Replacing HDMI requires experience and the right equipment!
        </h1>
        <h2>● Issue Description</h2>
        <p>
          <ol>
            <li>Visible mechanical damage.</li>
            <li>
              Video or audio signal depends on cable position or movement.
            </li>
            <li>No video or audio output at all.</li>
          </ol>
        </p>
        <img src="" alt="" />
        <h2>● Diagnostics</h2>
        <ol>
          <li>Inspect the HDMI port for visible physical damage.</li>
          <li>
            Check the console light – a solid white light means the system is
            working.
          </li>
          <li>Connect a controller to verify the console responds properly.</li>
          <li>
            Perform a diode test as shown below. Readings may vary slightly, but
            pay attention to the position of the green, red, and white pins –
            this shows whether the signal lines are in good condition.
          </li>

          <DiodeTesterWrapper>
            <HDMI_PS5_FAT />
            <HDMI_PS5_PRO />
          </DiodeTesterWrapper>
        </ol>
        <h2>● Repair Steps</h2>
        <ol>
          <li>
            The PS5 motherboard is durable, but precise temperature control is
            important. Use hot air at about 420°C with airflow level 2–3 and
            preheat the board to 160°C.
          </li>
          <li>Apply flux and a small amount of fresh solder to the joints.</li>
          <li>
            Heat the port evenly until the solder melts. You can use a soldering
            iron to help with the process.
          </li>
          <li>
            Be careful with the small SMD components behind the HDMI port – they
            are easy to move or damage with too much heat.
          </li>
          <li>Clean the pads thoroughly once the old port is removed.</li>
          <li>Position and solder the new HDMI port in place carefully.</li>
        </ol>
        <h2>● Testing</h2>
        <ol>
          <li>Perform another diode test to confirm correct readings.</li>
          <li>
            Connect the console to a monitor or TV and verify stable video and
            audio output.
          </li>
        </ol>
        <h2>● Gallery</h2>
        <GalleryWrapper>
          <img src={PHOTO_1} loading="lazy" alt="PS5 HDMI replacement" />
          <img src={PHOTO_2} loading="lazy" alt="PS5 HDMI replacement" />
          <img src={PHOTO_3} loading="lazy" alt="PS5 HDMI replacement" />
        </GalleryWrapper>
      </StyledArticleWrapper>
    </>
  );
}
