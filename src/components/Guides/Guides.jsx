import { useParams, Link } from "react-router-dom";
import { guidesData } from "./guidesData";
import styled from "styled-components";

const StyledGuidesWrapper = styled.div`
  h2 {
    color: red;
  }
`;

// const StyledLink = styled(Link)`
//   font-size: 2rem;
// `;

export function Guides() {
  const { companySlug, deviceSlug, guideSlug } = useParams();

  // Pobranie danych na podstawie slugów
  const companyData = companySlug ? guidesData[companySlug] : null;
  const deviceData =
    companyData && deviceSlug ? companyData.devices[deviceSlug] : null;
  const guideText =
    deviceData && guideSlug ? deviceData.guides[guideSlug] : null;

  // Wspólne breadcrumbs
  const breadcrumbs = (
    <nav className="breadcrumbs" style={{ marginBottom: "1rem" }}>
      <h1>Guides currently in development</h1>
      <Link to="/guides">Guides</Link>
      {companySlug && (
        <>
          {" > "}
          <Link to={`/guides/${companySlug}`}>
            {(companySlug || "").replaceAll("_", " ")}
          </Link>
        </>
      )}
      {deviceSlug && (
        <>
          {" > "}
          <Link to={`/guides/${companySlug}/${deviceSlug}`}>
            {(deviceSlug || "").replaceAll("_", " ")}
          </Link>
        </>
      )}
      {guideSlug && (
        <>
          {" > "}
          <span>{(guideSlug || "").replaceAll("_", " ")}</span>
        </>
      )}
    </nav>
  );

  // 1️⃣ Brak firmy — pokazujemy listę firm
  if (!companySlug) {
    return (
      <StyledGuidesWrapper>
        {breadcrumbs}
        <h2>Select company</h2>
        <ul>
          {Object.keys(guidesData).map((company) => (
            <li key={company}>
              <Link to={`/guides/${company}`}>{company}</Link>
            </li>
          ))}
        </ul>
      </StyledGuidesWrapper>
    );
  }

  if (!companyData) {
    return (
      <div>
        {breadcrumbs}
        <p>Company not found</p>
      </div>
    );
  }

  // 2️⃣ Brak urządzenia — pokazujemy listę urządzeń
  if (!deviceSlug) {
    return (
      <StyledGuidesWrapper>
        {breadcrumbs}
        <h2>Select device for {companySlug}</h2>
        <ul>
          {Object.keys(companyData.devices).map((device) => (
            <li key={device}>
              <Link to={`/guides/${companySlug}/${device}`}>{device}</Link>
            </li>
          ))}
        </ul>
      </StyledGuidesWrapper>
    );
  }

  if (!deviceData) {
    return (
      <div>
        {breadcrumbs}
        <p>Device not found</p>
      </div>
    );
  }

  // 3️⃣ Brak poradnika — pokazujemy listę poradników
  if (!guideSlug) {
    return (
      <StyledGuidesWrapper>
        {breadcrumbs}
        <h2>Select guide for {deviceSlug}</h2>
        <ul>
          {Object.keys(deviceData.guides).map((guide) => (
            <li key={guide}>
              <Link to={`/guides/${companySlug}/${deviceSlug}/${guide}`}>
                {guide.replace("_", " ")}
              </Link>
            </li>
          ))}
        </ul>
      </StyledGuidesWrapper>
    );
  }

  if (!guideText) {
    return (
      <div>
        {breadcrumbs}
        <p>Guide not found</p>
      </div>
    );
  }

  // 4️⃣ Pokazujemy poradnik
  return (
    <StyledGuidesWrapper>
      {breadcrumbs}
      <h2>{guideSlug.replace("_", " ")}</h2>
      <p>{guideText}</p>
    </StyledGuidesWrapper>
  );
}
