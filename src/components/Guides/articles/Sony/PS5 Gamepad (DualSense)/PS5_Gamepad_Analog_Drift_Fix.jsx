import { StyledArticleWrapper, GalleryWrapper } from "../../ArticleStyles";
import PHOTO5 from "./PS5_photo/5.webp";
import PHOTO6 from "./PS5_photo/6.webp";
import PHOTO7 from "./PS5_photo/7.webp";
import PHOTO8 from "./PS5_photo/8.webp";

export function PS5_Gamepad_Analog_Drift_Fix() {
  return (
    <>
      <StyledArticleWrapper>
        <h1>RED Note</h1>
        <h2>● Issue Description</h2>
        <p>
          <ol>
            <li>Issue 1</li>
            <li>Issue 2</li>
            <li>Issue 3</li>
          </ol>
        </p>
        <img src="" alt="" />
        <h2>● Diagnostics</h2>
        <ol>
          <li>Diagnostics 1</li>
          <li>Diagnostics 2</li>
          <li>Diagnostics 3</li>
        </ol>
        <h2>● Repair Steps</h2>
        <ol>
          <li>Steps 1</li>
          <li>Steps 2</li>
          <li>Steps 3</li>
          <li>Steps 4</li>
        </ol>
        <h2>● Testing</h2>
        <ol>
          <li>Testing 1</li>
          <li>Testing 2</li>
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
