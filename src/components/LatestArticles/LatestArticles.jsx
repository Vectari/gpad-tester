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
    overflow-x: auto;
    border: 1px solid #ececec;
    border-radius: 8px;
    background: #fff;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 400px;
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
    white-space: nowrap;
  }

  a {
    text-decoration: none;
    color: black;

    &:hover {
      text-decoration: underline;
    }
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

  .pinned {
    border-bottom: 3px solid black;
  }

  .text {
    &::after {
      content: "✪";
      margin-left: 0.4rem;
      font-size: 1.1rem;
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
            <tr className="pinned">
              <td className="pinned text">2025-09-11</td>
              <td className="pinned">
                <a href="/guides/HDMI/All%20consoles/All%20consoles%20HDMI%20diode%20test">
                  All consoles HDMI diode test
                </a>
              </td>
            </tr>
            {/* PINNED */}
            <tr>
              <td>2025-10-01</td>
              <td>
                <a href="/guides/USB-C/XBOX%20Series%20Gamepad/XBOX%20Series%20Gamepad%20USB-C%20diode%20test">
                  XBOX Series Gamepad USB-C diode test
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-25</td>
              <td>
                <a href="/guides/Sony/PS5%20Gamepad%20(DualSense)/PS5%20Gamepad%20analog%20replacement">
                  PS5 Gamepad analog replacement
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-25</td>
              <td>
                <a href="/guides/Sony/PS5%20Gamepad%20(DualSense)/PS5%20Gamepad%20analog%20drift%20fix">
                  PS5 Gamepad analog drift fix
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-25</td>
              <td>
                <a href="/guides/Sony/PS5%20Gamepad%20(DualSense)/PS5%20Gamepad%20buttons%20not%20working">
                  PS5 Gamepad buttons not working
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-20</td>
              <td>
                <a href="/guides/Sony/PS5%20Gamepad%20(DualSense)/PS5%20Gamepad%20(DualSense)%20USB-C%20Replacement">
                  PS5 Gamepad (DualSense) USB-C Replacement
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-19</td>
              <td>
                <a href="/guides/USB-C/PS5%20Gamepad%20(DualSense)/PS5%20Gamepad%20(DualSense)%20USB-C%20diode%20test">
                  PS5 Gamepad (DualSense) USB-C diode test
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-15</td>
              <td>
                <a href="/guides/Sony/PlayStation%204%20FAT%20(PS4)/PS4%20FAT%20HDMI%20Replacement">
                  PS4 FAT HDMI Replacement
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-15</td>
              <td>
                <a href="/guides/Sony/PlayStation%204%20Slim%20(PS4%20Slim)/PS4%20Slim%20HDMI%20Replacement">
                  PS4 Slim HDMI Replacement
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-15</td>
              <td>
                <a href="/guides/Sony/PlayStation%204%20PRO%20(PS4%20PRO)/PS4%20PRO%20HDMI%20Replacement">
                  PS4 PRO HDMI Replacement
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-11</td>
              <td>
                <a href="/guides/HDMI/All%20consoles/All%20consoles%20HDMI%20diode%20test">
                  All consoles HDMI diode test
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-10</td>
              <td>
                <a href="/guides/Sony/PlayStation%205%20(PS5)/PS5%20HDMI%20Replacement">
                  PS5 HDMI Replacement
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-10</td>
              <td>
                <a href="/guides/Sony/PlayStation%205%20Slim%20(PS5%20Slim)/PS5%20Slim%20HDMI%20Replacement">
                  PS5 Slim HDMI Replacement
                </a>
              </td>
            </tr>
            <tr>
              <td>2025-09-10</td>
              <td>
                <a href="/guides/Sony/PlayStation%205%20PRO%20(PS5%20PRO)/PS5%20PRO%20HDMI%20Replacement">
                  PS5 PRO HDMI Replacement
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </LatestArticlesWrapper>
  );
}
