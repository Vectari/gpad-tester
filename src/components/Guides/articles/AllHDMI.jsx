import styled from "styled-components";
import { HDMI_PS3_FAT } from "../../../components/HDMITester/HDMI_PS3_FAT";
import { HDMI_PS4_FAT } from "../../../components/HDMITester/HDMI_PS4_FAT";
import { HDMI_PS4_PRO } from "../../../components/HDMITester/HDMI_PS4_PRO";
import { HDMI_PS4_SLIM } from "../../../components/HDMITester/HDMI_PS4_SLIM";
import { HDMI_PS5_FAT } from "../../../components/HDMITester/HDMI_PS5_FAT";
import { HDMI_PS5_PRO } from "../../../components/HDMITester/HDMI_PS5_PRO";
import { HDMI_XBOX_ONE_FAT } from "../../../components/HDMITester/HDMI_XBOX_ONE_FAT";
import { HDMI_XBOX_ONE_S } from "../../../components/HDMITester/HDMI_XBOX_ONE_S";
import { HDMI_XBOX_ONE_X } from "../../../components/HDMITester/HDMI_XBOX_ONE_X";
import { HDMI_XBOX_SERIES_S } from "../../../components/HDMITester/HDMI_XBOX_SERIES_S";
import { HDMI_XBOX_SERIES_X } from "../../../components/HDMITester/HDMI_XBOX_SERIES_X";

const AllHDMIWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-self: center;
  justify-content: center;
  max-width: 1150px;
  margin-top: 2rem;
  gap: 5rem;
  position: absolute;
`;

export function AllHDMI() {
  return (
    <>
      <br />
      <h3>
        USB-C is reversible — when you connect the tester, the results may
        appear in the opposite order.
      </h3>
      <br />
      <h3>
        On the CUH-1116 (PS4 FAT), I noticed that PIN 4 on the new HDMI shows
        red before the first console startup. After that, PIN 4 turns green on
        the tester.
      </h3>

      <AllHDMIWrapper>
        <HDMI_PS4_FAT />
        <HDMI_PS4_SLIM />
        <HDMI_PS4_PRO />
        <HDMI_PS5_FAT />
        <HDMI_PS5_PRO />
        <HDMI_XBOX_ONE_FAT />
        <HDMI_XBOX_ONE_S />
        <HDMI_XBOX_ONE_X />
        <HDMI_XBOX_SERIES_S />
        <HDMI_XBOX_SERIES_X />
        <HDMI_PS3_FAT />
      </AllHDMIWrapper>
    </>
  );
}
