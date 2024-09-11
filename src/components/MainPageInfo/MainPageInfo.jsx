import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const StyledMainPageInfo = styled.div`
  max-width: 70%;

  h1 {
    margin: 1rem 0 1rem 2rem;
    padding: 0 1rem;
    border-bottom: 0.2rem ${Theme.secondary} solid;
    border-radius: 1rem;
  }

  article {
    font-size: 1.1rem;
    text-align: justify;
  }

  span {
    font-weight: bold;
  }
`;

export function MainPageInfo() {
  return (
    <StyledMainPageInfo>
      <h1>What is a Web GamePad Tester App and What is it For?</h1>
      <article>
        A Web GamePad Tester App is an online tool designed to test and diagnose
        the functionality of various game controllers like PS4, PS5, Xbox One,
        and Xbox Series. Whether you&apos;re a gamer troubleshooting issues or a
        developer fine-tuning controller compatibility, this app offers a fast,
        accessible way to ensure everything is functioning correctly. By
        connecting your gamepad to your computer or device, you can view
        real-time feedback on button presses, joystick movements, trigger
        sensitivities, and more. This helps identify problems such as sticky
        buttons, misaligned axes, or non-responsive triggers. The app eliminates
        the need for specialized software installations, offering users an
        instant solution for checking gamepad performance from any browser.
        Additionally, game developers can leverage the app to validate input
        across different devices, ensuring a seamless gaming experience. Whether
        you&apos;re diagnosing issues for repair or verifying new hardware
        setups, this tool simplifies the process of ensuring optimal controller
        functionality.
      </article>
      <h1>How to Fix Faulty Axes on a Gamepad</h1>
      <article>
        Axes issues, like joysticks drifting or not reaching their full range,
        can interfere with your gaming experience. Here&apos;s a step-by-step
        guide to fixing faulty axes on your gamepad: <br />
        <span>1.</span> Calibrate Your Gamepad: Before assuming there&apos;s a
        hardware issue, recalibrate the gamepad. Many systems offer built-in
        calibration tools to help realign your controller&apos;s axes. For
        Windows, go to “Devices and Printers,” find your controller, and use the
        calibration tool in the controller settings. <br />
        <span>2.</span> Clean the Joystick: Dust and grime can build up around
        the joystick, leading to drift or sticking. Use a cotton swab lightly
        dampened with isopropyl alcohol to clean the area around the joystick.
        Rotate the stick while cleaning to get into the edges. <br />
        <span>3.</span> Replace the Joystick Module: If calibration and cleaning
        don&apos;t fix the issue, the joystick&apos;s internal components might
        be worn out. You can replace the joystick module by opening the
        controller and soldering in a new one. Many third-party retailers sell
        replacement modules specifically for common gamepads.br <br />
        <span>4.</span> Update Firmware or Drivers: Sometimes, outdated firmware
        or drivers cause misalignments in the axes. Check if the gamepad has any
        available updates from the manufacturer and install them. <br />
        <span>5.</span> Test Again Using the App: After making these fixes, use
        the Web Gamepad Controller App to test the axes again. Move the joystick
        in all directions and check for proper range and accuracy on the screen.
      </article>
      <h1>How to Fix Faulty Buttons on a Gamepad</h1>
      <article>
        Unresponsive or sticky buttons can ruin your gaming experience. Follow
        these steps to fix faulty gamepad buttons: <br />
        <span>1.</span> Clean the Buttons: Dust, dirt, or spilled liquids can
        cause buttons to become unresponsive or sticky. Open the controller (if
        it&apos;s user-serviceable), remove the buttons, and clean them
        thoroughly with isopropyl alcohol. Also, clean the contacts beneath the
        buttons on the circuit board. <br />
        <span>2.</span> Check for Wear and Tear: Gamepad buttons have rubber or
        plastic domes underneath that make contact with the board. Over time,
        these components wear down. If cleaning doesn&apos;t fix the issue,
        inspect these domes for damage and consider replacing them. Replacement
        button kits are available online for most common gamepads. <br />
        <span>3.</span> Re-solder Button Contacts: If a button press isn&apos;t
        registering at all, the contact points on the circuit board may be
        damaged or loose. You can try re-soldering the connections, but this
        step requires some technical skill. If you&apos;re not comfortable doing
        this, consider taking your controller to a professional repair service.
        <br />
        <span>4.</span> Update Firmware or Drivers: Button issues can sometimes
        be caused by outdated firmware or drivers. Make sure your gamepad is
        running the latest firmware, and check for updates for your system or
        game that might resolve any input issues. <br />
        <span>5.</span> Test Buttons on the App: After making these adjustments,
        reconnect your controller to the Web Gamepad Controller App to test if
        the buttons are now responsive. Press each button and verify that it
        registers correctly in the app.
      </article>
    </StyledMainPageInfo>
  );
}
