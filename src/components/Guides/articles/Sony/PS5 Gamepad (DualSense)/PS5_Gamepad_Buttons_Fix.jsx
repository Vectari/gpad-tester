import { StyledArticleWrapper, GalleryWrapper } from "../../ArticleStyles";
import PHOTO1 from "./PS5_photo/3.webp";
import PHOTO2 from "./PS5_photo/4.webp";

export function PS5_Gamepad_Buttons_Fix() {
  return (
    <>
      <StyledArticleWrapper>
        <h2>● Issue Description</h2>
        <ol>
          <li>Buttons do not work.</li>
          <li>Buttons are hard to press or require excessive force.</li>
          <li>L2 and R2 buttons do not work within the full range.</li>
        </ol>
        <h2>● Repair Steps</h2>
        <ol>
          <li>
            Clean the connectors on the motherboard and on the inner side of the
            button flex (gallery photo #1).
          </li>
          <li>
            Clean the top side of the flex on the button side along with the
            button rubbers.
          </li>
          <li>
            Check if the button rubbers are mechanically damaged, replace them
            if necessary.
          </li>
          <li>
            Replace the button flex according to your controller’s version.
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
