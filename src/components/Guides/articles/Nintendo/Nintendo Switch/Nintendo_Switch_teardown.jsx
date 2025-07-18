import { StyledArticleWrapper } from "../../ArticleStyles";
import photo from "../../../../../media/ps5_full.webp";

export function Nintendo_Switch_teardown() {
  return (
    <StyledArticleWrapper>
      <h1>Note</h1>
      <ol>
        <li>1.</li>
        <li>2.</li>
        <img src={photo} alt="" />
        <li>3. </li>
        <li>4. </li>
      </ol>
    </StyledArticleWrapper>
  );
}
