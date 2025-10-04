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
            <li>
              Visible mechanical damage to the USB-C port or surrounding area.
            </li>
            <li>
              Charging or connection via USB depends on cable position or
              movement.
            </li>
          </ol>
        </p>
        <h2>● Diagnostics</h2>
        <ol>
          <li>
            Inspect the USB-C port for visible physical or mechanical damage.
          </li>
          <li>
            If connected to a PC, look for USB power or connection error
            messages in Windows — they can help identify a faulty port.
          </li>
          <li>
            Perform a diode test as shown below. Readings may vary slightly, but
            the key indicator is the correct position of the green, red, and
            white pins.
          </li>

          <USB_PS5_GAMEPAD />
        </ol>
        <h2>● Repair Steps</h2>
        <ol>
          <li>
            Use hot air at around 420°C with airflow level 2–3 and preheat the
            board to approximately 160°C.
          </li>
          <li>
            Apply flux and a small amount of fresh solder to improve contact.
          </li>
          <li>
            Heat the area evenly – using a soldering iron can help loosen the
            port pins.
          </li>
          <li>
            Clean the solder pads thoroughly once the damaged port is removed.
          </li>
          <li>
            Position and solder the new USB-C port in place, ensuring all
            connections are solid.
          </li>
        </ol>
        <h2>● Testing</h2>
        <ol>
          <li>Perform another diode test to confirm proper readings.</li>
          <li>
            Verify charging and data transfer by connecting the controller to a
            PC or console.
          </li>
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
