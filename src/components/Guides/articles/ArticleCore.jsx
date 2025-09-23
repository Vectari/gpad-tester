import {
  DiodeTesterWrapper,
  GalleryWrapper,
  StyledArticleWrapper,
} from "../../ArticleStyles";

export function ArticleCore() {
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

          <DiodeTesterWrapper>
            {/* DIODE TEST 1  */}
            {/* DIOSE TEST 2 */}
          </DiodeTesterWrapper>
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
          {/* Gallery 1 */}
          {/* <img src={PHOTO} loading="lazy" alt="" /> */}
        </GalleryWrapper>
      </StyledArticleWrapper>
    </>
  );
}
