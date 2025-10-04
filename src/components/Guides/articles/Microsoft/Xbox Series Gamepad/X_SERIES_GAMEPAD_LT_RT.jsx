import { StyledArticleWrapper, GalleryWrapper } from "../../ArticleStyles";
import PHOTO1 from "./x_series_gamepad_photo/1.webp";

export function X_SERIES_GAMEPAD_LT_RT() {
  return (
    <>
      <StyledArticleWrapper>
        <h2>● Issue Description</h2>
        <ol>
          <li>
            The LT or RT trigger makes a loud “plastic against plastic” noise
            when pressed.
          </li>
          <li>
            The LT or RT trigger sticks, feels sluggish, or returns slowly after
            pressing.
          </li>
        </ol>

        <h2>● Repair Steps</h2>
        <ol>
          <li>
            Remove the rear housing cover to access the trigger mechanism.
          </li>
          <li>
            Clean the old rubber pad (see gallery photo) and wipe the surface
            with isopropyl alcohol.
          </li>
          <li>
            Attach new rubber pads. Replacement parts can be purchased on
            AliExpress or other electronic component stores.
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
            <img
              src={PHOTO1}
              loading="lazy"
              alt="Xbox Series loud RT LT button"
            />
          </a>
        </GalleryWrapper>
      </StyledArticleWrapper>
    </>
  );
}
