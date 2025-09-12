import styled from "styled-components";
import { Theme } from "../../../styles/Theme";

export const StyledArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 2rem;
  width: 95%;
  max-width: 700px;
  border-top: 3px solid ${Theme.interface};

  h1 {
    // Use it for NOTE or other important info
    color: ${Theme.disconnected};
    margin: 1rem 0;
  }

  h2 {
    color: ${Theme.black};
    margin: 1rem 0;
    text-align: left;
  }

  img {
    width: 95%;
  }

  p,
  li {
    font-size: 1.2rem;
  }

  ol {
    li {
      text-align: left;
      list-style-type: decimal;
      margin: 0.5rem 2rem;
    }
  }

  table {
    border: 1px solid ${Theme.interface};

    td {
      border-top: 1px solid ${Theme.interface};
    }
  }

  .gallery {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    img {
      max-width: 50%;
      border-radius: 1rem;
    }
  }
`;
