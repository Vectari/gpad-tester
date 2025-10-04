import { StyledArticleWrapper, GalleryWrapper } from "../../ArticleStyles";
import PHOTO5 from "./PS5_photo/5.webp";
import PHOTO6 from "./PS5_photo/6.webp";
import PHOTO7 from "./PS5_photo/7.webp";
import PHOTO8 from "./PS5_photo/8.webp";

export function PS5_Gamepad_Analog_Drift_Fix() {
  return (
    <>
      <StyledArticleWrapper>
        <h1>
          Note: Replacing analog requires experience and the right equipment!
        </h1>
        <h2>● Issue Description</h2>
        <ol>
          <li>
            One of the analog sticks moves automatically in a specific direction
            (drifting).
          </li>
        </ol>

        <h2>● Diagnostics</h2>
        <ol>
          <li>
            During testing on the main page, the analog movement path appears
            incorrect or moves by itself without any input.
          </li>
        </ol>

        <h2>● Repair Steps</h2>
        <ol>
          <li>
            Carefully bend back the damaged analog’s potentiometer to access the
            solder joints. (See gallery for reference.)
          </li>
          <li>
            Apply flux and a small amount of fresh solder to improve contact.
          </li>
          <li>
            Use hot air at around 350°C with airflow level 2–3 to desolder the
            damaged component.
          </li>
          <li>
            Heat the area evenly – a soldering iron may help during removal or
            cleanup.
          </li>
          <li>Clean the solder pads thoroughly once the part is removed.</li>
          <li>
            Position and solder the new analog potentiometer in place, ensuring
            all pins are properly aligned and connected.
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
          <a href={PHOTO5} target="_blank" rel="noopener noreferrer">
            <img
              src={PHOTO5}
              loading="lazy"
              alt="PS5 Gamepad analog drift fix"
            />
          </a>
          <a href={PHOTO6} target="_blank" rel="noopener noreferrer">
            <img
              src={PHOTO6}
              loading="lazy"
              alt="PS5 Gamepad analog drift fix"
            />
          </a>
          <a href={PHOTO7} target="_blank" rel="noopener noreferrer">
            <img
              src={PHOTO7}
              loading="lazy"
              alt="PS5 Gamepad analog drift fix"
            />
          </a>
          <a href={PHOTO8} target="_blank" rel="noopener noreferrer">
            <img
              src={PHOTO8}
              loading="lazy"
              alt="PS5 Gamepad analog drift fix"
            />
          </a>
        </GalleryWrapper>
      </StyledArticleWrapper>
    </>
  );
}
