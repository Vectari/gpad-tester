import { StyledArticleWrapper, GalleryWrapper } from "../../ArticleStyles";
import PHOTO9 from "./PS5_photo/9.webp";
import PHOTO10 from "./PS5_photo/10.webp";
import PHOTO11 from "./PS5_photo/11.webp";

export function PS5_Gamepad_Analog_Replacement() {
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
