import { StyledArticleWrapper, GalleryWrapper } from "../../ArticleStyles";
import PHOTO9 from "./PS5_photo/9.webp";
import PHOTO10 from "./PS5_photo/10.webp";
import PHOTO11 from "./PS5_photo/11.webp";

export function PS5_Gamepad_Analog_Replacement() {
  return (
    <>
      <StyledArticleWrapper>
        <h1>
          Note: Replacing analog requires experience and the right equipment!
        </h1>
        <h2>● Issue Description</h2>
        <ol>
          <li>
            One of the analog sticks moves automatically in a certain direction
            (drifting).
          </li>
          <li>
            The analog stick button (L3 or R3) does not register when pressed.
          </li>
        </ol>

        <h2>● Diagnostics</h2>
        <ol>
          <li>
            During testing on the main page, the analog movement path appears
            inaccurate or moves by itself without any input.
          </li>
        </ol>

        <h2>● Repair Steps</h2>
        <ol>
          <li>Apply flux and a small amount of fresh solder to the joints.</li>
          <li>
            Use hot air at around 350°C with airflow level 2–3 to desolder the
            damaged analog module.
          </li>
          <li>
            Heat the area evenly – you can assist with a soldering iron if
            needed.
          </li>
          <li>Clean the solder pads thoroughly after removing the old part.</li>
          <li>
            Align and solder the new analog stick in place, ensuring all pins
            are properly connected.
          </li>
        </ol>
        <h2>● Testing</h2>
        <ol>
          <li>
            <a href="http://gpadtester.com/">Use gpadtester.com</a>
          </li>
        </ol>
        <h2>● Gallery</h2>
        <GalleryWrapper>
          <a href={PHOTO9} target="_blank" rel="noopener noreferrer">
            <img
              src={PHOTO9}
              loading="lazy"
              alt="PS5 Gamepad Analog Replacement"
            />
          </a>
          <a href={PHOTO10} target="_blank" rel="noopener noreferrer">
            <img
              src={PHOTO10}
              loading="lazy"
              alt="PS5 Gamepad Analog Replacement"
            />
          </a>
          <a href={PHOTO11} target="_blank" rel="noopener noreferrer">
            <img
              src={PHOTO11}
              loading="lazy"
              alt="PS5 Gamepad Analog Replacement"
            />
          </a>
        </GalleryWrapper>
      </StyledArticleWrapper>
    </>
  );
}
