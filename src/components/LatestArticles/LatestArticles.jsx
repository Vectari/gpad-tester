import styled from "styled-components";

const LatestArticlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0 3rem 0;
  width: 100%;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .table-scroll {
    width: 90%;
    max-width: 900px;
    max-height: 360px;
    overflow-y: auto;
    overflow-x: auto; /* <-- ważne na mobile */
    border: 1px solid #ececec;
    border-radius: 8px;
    background: #fff;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 400px; /* żeby nie łamało się zbyt ciasno */
  }

  thead th {
    position: sticky;
    top: 0;
    background: #fafafa;
    z-index: 1;
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid #e6e6e6;
  }

  th,
  td {
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
    font-size: 0.95rem;
    text-align: left;
    white-space: nowrap; /* w mobile lepiej scroll niż łamanie */
  }

  tbody tr:hover {
    background: #fafafa;
  }

  /* MOBILE */
  @media (max-width: 765px) {
    .table-scroll {
      width: 100%;
      max-height: 60vh;
    }

    table {
      font-size: 0.85rem;
    }

    th,
    td {
      padding: 0.5rem;
    }
  }
`;

export function LatestArticles() {
  return (
    <LatestArticlesWrapper>
      <h2>Latest Articles and Guides</h2>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Article / Guide</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-09-01</td>
              <td>
                <a href="#">Jak zrobić X — krótki przewodnik</a>
              </td>
            </tr>
            <tr>
              <td>2025-08-20</td>
              <td>
                <a href="#">
                  Poradnik Y z długim tytułem, który się zawija w mobile
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-08-10</td>
              <td>
                <a href="#">Test</a>
              </td>
            </tr>
            <tr>
              <td>2025-08-01</td>
              <td>
                <a href="#">Kolejny artykuł</a>
              </td>
            </tr>
            <tr>
              <td>2025-07-15</td>
              <td>
                <a href="#">Przykład</a>
              </td>
            </tr>
            <tr>
              <td>2025-09-01</td>
              <td>
                <a href="#">Jak zrobić X — krótki przewodnik</a>
              </td>
            </tr>
            <tr>
              <td>2025-08-20</td>
              <td>
                <a href="#">
                  Poradnik Y z długim tytułem, który się zawija w mobile
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-08-10</td>
              <td>
                <a href="#">Test</a>
              </td>
            </tr>
            <tr>
              <td>2025-08-01</td>
              <td>
                <a href="#">Kolejny artykuł</a>
              </td>
            </tr>
            <tr>
              <td>2025-07-15</td>
              <td>
                <a href="#">Przykład</a>
              </td>
            </tr>
            <tr>
              <td>2025-09-01</td>
              <td>
                <a href="#">Jak zrobić X — krótki przewodnik</a>
              </td>
            </tr>
            <tr>
              <td>2025-08-20</td>
              <td>
                <a href="#">
                  Poradnik Y z długim tytułem, który się zawija w mobile
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-08-10</td>
              <td>
                <a href="#">Test</a>
              </td>
            </tr>
            <tr>
              <td>2025-08-01</td>
              <td>
                <a href="#">Kolejny artykuł</a>
              </td>
            </tr>
            <tr>
              <td>2025-07-15</td>
              <td>
                <a href="#">Przykład</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </LatestArticlesWrapper>
  );
}
