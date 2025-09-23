import { USB_PS5_GAMEPAD } from "../../../../USBTester/USB_PS5_GAMEPAD";
import { GalleryWrapper, StyledArticleWrapper } from "../../ArticleStyles";
import PHOTO_1 from "./PS5_photo/1.webp";
import PHOTO_2 from "./PS5_photo/2.webp";

export function PS5_Gamepad_USB_Replacement() {
  return (
    <>
      <StyledArticleWrapper>
        <h1>
          Note: Replacing USB-C requires experience and the right equipment!
        </h1>
        <h2>● Issue Description</h2>
        <p>
          <ol>
            <li>Mechanical damage</li>
            <li>Charging/connection via USB depends on cable movement</li>
          </ol>
        </p>
        <h2>● Diagnostics</h2>
        <ol>
          <li>Check for visible mechanical damage.</li>
          <li>USB power error messages in Windows can be helpful.</li>
          <li>
            Perform a diode test as shown below. Values may vary slightly, but
            the key is the location of the green, red, and white pins.
          </li>

          <USB_PS5_GAMEPAD />
        </ol>
        <h2>● Repair Steps</h2>
        <ol>
          <li>Use hot air at 420°C, airflow 2–3, with preheating at 160°C.</li>
          <li>Apply flux and fresh solder.</li>
          <li>Heat the area – using a soldering iron can help.</li>
          <li>Clean the pads thoroughly.</li>
          <li>Install the new USB-C port.</li>
        </ol>
        <h2>● Testing</h2>
        <ol>
          <li>Perform a diode test again.</li>
          <li>Check charging and data transfer (connect to PC or console).</li>
        </ol>
        <h2>● Gallery</h2>
        <GalleryWrapper>
          <img
            src={PHOTO_1}
            loading="lazy"
            alt="PS5 Gamepad Dualsense USB-C replacement"
          />
          <img
            src={PHOTO_2}
            loading="lazy"
            alt="PS5 Gamepad Dualsense USB-C replacement"
          />
        </GalleryWrapper>
      </StyledArticleWrapper>
    </>
  );
}
