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
            One of the analog sticks drifts automatically in a certain
            direction.
          </li>
        </ol>

        <h2>● Diagnostics</h2>
        <ol>
          <li>
            The analog stick movement path in the test on the main page is
            incorrect or moves on its own.
          </li>
        </ol>

        <h2>● Repair Steps</h2>
        <ol>
          <li>
            Bend back the damaged analog&apos;s potentiometer. (See gallery)
          </li>
          <li>Apply flux and fresh solder.</li>
          <li>Use hot air at 350°C, airflow 2–3.</li>
          <li>Heat the area – using a soldering iron can help.</li>
          <li>Clean the pads thoroughly.</li>
          <li>Install a new analog&apos;s potentiometer.</li>
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
