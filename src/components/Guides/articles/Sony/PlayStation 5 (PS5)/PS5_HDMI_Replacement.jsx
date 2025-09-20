import styled from "styled-components";
import { HDMI_PS5_FAT } from "../../../../HDMITester/HDMI_PS5_FAT";
import { HDMI_PS5_PRO } from "../../../../HDMITester/HDMI_PS5_PRO";
import { StyledArticleWrapper } from "../../ArticleStyles";
import PHOTO_1 from "./PS5_photo/1.webp";
import PHOTO_2 from "./PS5_photo/2.webp";
import PHOTO_3 from "./PS5_photo/3.webp";
import PHOTO_4 from "./PS5_photo/4.webp";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const DiodeTesterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

// eslint-disable-next-line react-refresh/only-export-components
const GalleryButton = styled.button`
  font-size: 1.4rem;
  font-weight: bold;
  background: none;
  border: none;
  margin-top: 0.9rem;
  text-align: left;
  text-decoration: underline;
`;

export function PS5_HDMI_Replacement() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledArticleWrapper>
        <h1>
          Note: Replacing HDMI requires experience and the right equipment!
        </h1>
        <h2>● Issue Description</h2>
        <p>
          <ol>
            <li>Mechanical damage</li>
            <li>Video/Audio signal depends on cable movement</li>
            <li>No Video/Audio output</li>
          </ol>
        </p>
        <img src="" alt="" />
        <h2>● Diagnostics</h2>
        <ol>
          <li>Check for visible mechanical damage.</li>
          <li>Verify the console light – solid white = good.</li>
          <li>Connect a gamepad to confirm console response.</li>
          <li>
            Perform a diode test as shown below. Values may vary slightly, but
            the key is the location of the green, red, and white pins.
          </li>

          <DiodeTesterWrapper>
            <HDMI_PS5_FAT />
            <HDMI_PS5_PRO />
          </DiodeTesterWrapper>
        </ol>
        <h2>● Repair Steps</h2>
        <ol>
          <li>
            The PS5 motherboard is robust. Use hot air at 420°C, airflow 2–3,
            with preheating at 160°C.
          </li>
          <li>Apply flux and fresh solder.</li>
          <li>Heat the area – using a soldering iron can help.</li>
          <li>
            Be careful with the small components located behind the HDMI port –
            they can be easily displaced or damaged.
          </li>
          <li>Clean the pads thoroughly.</li>
          <li>Install the new HDMI port.</li>
        </ol>
        <h2>● Testing</h2>
        <ol>
          <li>Perform a diode test again.</li>
          <li>Check video and audio output with a display.</li>
        </ol>
        <GalleryButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "● Close Gallery" : "● Open Gallery"}
        </GalleryButton>
        <div className="gallery">
          {isOpen && (
            <div className="gallery">
              <img src={PHOTO_1} loading="lazy" alt="PS5 HDMI replacement" />
              <img src={PHOTO_2} loading="lazy" alt="PS5 HDMI replacement" />
              <img src={PHOTO_3} loading="lazy" alt="PS5 HDMI replacement" />
              <img src={PHOTO_4} loading="lazy" alt="PS5 HDMI replacement" />
            </div>
          )}
        </div>
      </StyledArticleWrapper>
    </>
  );
}
