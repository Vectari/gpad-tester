import { useParams, Link } from "react-router-dom";
import { guidesData } from "./guidesData";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const StyledDevelopmentNote = styled.h3`
  text-align: center;
  text-decoration: underline;
`;

const StyledGuidesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  width: 95%;
  text-align: center;

  ul {
    font-size: 2rem;
  }

  span {
    padding: 0.5rem;
  }
`;

const StyledLinkWrapper = styled.div`
  background-color: ${Theme.background};
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 1rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  width: 95%;
  font-size: 1rem;
  color: ${Theme.black};
`;

export function Guides() {
  const { companySlug, deviceSlug, guideSlug } = useParams();

  const companyData = companySlug ? guidesData[companySlug] : null;
  const deviceData =
    companyData && deviceSlug ? companyData.devices[deviceSlug] : null;
  const guideText =
    deviceData && guideSlug ? deviceData.guides[guideSlug] : null;

  // Wspólne breadcrumbs
  const breadcrumbs = (
    <nav className="breadcrumbs">
      <StyledDevelopmentNote>
        Note: Guides currently in development
      </StyledDevelopmentNote>
      <StyledLinkWrapper>
        <StyledLink to="/guides">Guides</StyledLink>
        {companySlug && (
          <>
            <span>&#10140;</span>
            <StyledLink to={`/guides/${companySlug}`}>
              {(companySlug || "").replaceAll("_", " ")}
            </StyledLink>
          </>
        )}
        {deviceSlug && (
          <>
            <span>&#10140;</span>
            <StyledLink to={`/guides/${companySlug}/${deviceSlug}`}>
              {(deviceSlug || "").replaceAll("_", " ")}
            </StyledLink>
          </>
        )}
        {guideSlug && (
          <>
            <span>&#10140;</span>
            <span>{(guideSlug || "").replaceAll("_", " ")}</span>
          </>
        )}
      </StyledLinkWrapper>
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
              <StyledLink to={`/guides/${company}`}>{company}</StyledLink>
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
              <StyledLink to={`/guides/${companySlug}/${device}`}>
                {device}
              </StyledLink>
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
              <StyledLink to={`/guides/${companySlug}/${deviceSlug}/${guide}`}>
                {guide.replace("_", " ")}
              </StyledLink>
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
