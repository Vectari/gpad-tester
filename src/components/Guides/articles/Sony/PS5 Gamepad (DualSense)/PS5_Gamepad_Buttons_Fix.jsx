import { StyledArticleWrapper, GalleryWrapper } from "../../ArticleStyles";
import PHOTO1 from "./PS5_photo/3.webp";
import PHOTO2 from "./PS5_photo/4.webp";

export function PS5_Gamepad_Buttons_Fix() {
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
          <a href={PHOTO1} target="_blank" rel="noopener noreferrer">
            <img src={PHOTO1} loading="lazy" alt="PS5 Gamepad buttons fix" />
          </a>
          <a href={PHOTO2} target="_blank" rel="noopener noreferrer">
            <img src={PHOTO2} loading="lazy" alt="PS5 Gamepad buttons fix" />
          </a>
        </GalleryWrapper>
      </StyledArticleWrapper>
    </>
  );
}
