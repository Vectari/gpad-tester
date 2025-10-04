import { StyledArticleWrapper, GalleryWrapper } from "../../ArticleStyles";
import PHOTO1 from "./PS5_photo/3.webp";
import PHOTO2 from "./PS5_photo/4.webp";

export function PS5_Gamepad_Buttons_Fix() {
  return (
    <>
      <StyledArticleWrapper>
        <h2>● Issue Description</h2>
        <ol>
          <li>Some or all buttons do not respond when pressed.</li>
          <li>Buttons feel stiff or require excessive force to activate.</li>
          <li>
            L2 or R2 triggers do not register movement across the full range of
            motion.
          </li>
        </ol>
        <h2>● Repair Steps</h2>
        <ol>
          <li>
            Clean the connectors on both the motherboard and the inner side of
            the button flex cable (see gallery photo #1).
          </li>
          <li>
            Clean the top surface of the flex cable on the button side,
            including the contact points under the rubber pads.
          </li>
          <li>
            Inspect the button rubbers for mechanical damage and replace them if
            necessary.
          </li>
          <li>
            If cleaning does not help, replace the button flex cable with one
            matching your controller’s version.
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
