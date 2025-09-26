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
            One of the analog sticks drifts automatically in a certain
            direction.
          </li>
          <li>Analog stick clicking (L3 or R3) does not work.</li>
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
          <li>Apply flux and fresh solder.</li>
          <li>Use hot air at 350°C, airflow 2–3.</li>
          <li>Heat the area – using a soldering iron can help.</li>
          <li>Clean the pads thoroughly.</li>
          <li>Install a new analog.</li>
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
