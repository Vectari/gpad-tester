import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const StyledWrapper = styled.div`
  background: "#FFF";
  width: 70%;
  height: 85vh;
  margin-top: 0.5rem;
  border: 1px solid ${Theme.interface};
  border-radius: 0.5rem;
`;

export function Calibration() {
  return (
    <StyledWrapper>
      <iframe
        loading="lazy"
        src="/dualshock-tools/dist/index.html"
        title="WebHID Calibration"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "transparent",
          borderRadius: "0.5rem",
        }}
      />
    </StyledWrapper>
  );
}
