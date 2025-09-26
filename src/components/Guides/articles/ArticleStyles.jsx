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
      margin-top: 1rem;
      max-width: 80%;
      border-radius: 1rem;
    }
  }
`;

export const DiodeTesterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const GalleryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  img {
    margin-top: 1rem;
    /* width: 45%; */
    margin: 0.5rem;
    border-radius: 1rem;
  }
`;
