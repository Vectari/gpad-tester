import { GalleryWrapper, StyledArticleWrapper } from "../../ArticleStyles";
import PHOTO1 from "./x_one_gamepad_photo/xbox_gpad_add_res.webp";

export function X_ONE_DRIFT_ON_NEW_ANALOG() {
  return (
    <StyledArticleWrapper>
      <h1>Replacing analogs requires experience and the right equipment!</h1>
      <h2>● Issue Description</h2>
      <p>
        The analog stick consists of two potentiometers — colored components
        with three pins that can be detached from the housing. Each has a total
        resistance of 10 kΩ with a tolerance of 20%. Both potentiometers act as
        voltage dividers. If any deviation appears after replacing the analog
        stick, it indicates that a component with different electrical
        characteristics has been installed. The ideal solution is to recalibrate
        the controller. Simplest approach is to keep soldering the
        potentiometers (the three-pin parts) until proper operation is achieved,
        or to measure the old potentiometer first and select a new one with as
        close parameters as possible.
      </p>
      <h2>● Repair Steps</h2>
      <h3>
        The solder pads on the motherboard are very delicate and can easily come
        off — be careful!
      </h3>
      <ol>
        <li>Set the hot air station to 420°C.</li>
        <li>Set the soldering iron to 420°C as well.</li>
        <li>Apply flux and add a bit of fresh solder to all pins.</li>
        <li>
          Heat the area evenly until the solder on all legs becomes fully melted
          and shiny.
        </li>
        <li>Carefully remove the old analog stick.</li>
        <li>Clean the pads with flux and solder wick if needed.</li>
        <li>
          Place the new analog stick, apply flux again, and solder all pins
          gently.
        </li>
      </ol>
      <h2>● &quot;Manual&quot; resistance adjustment</h2>
      <p>
        The Xbox Series gamepad <b>can</b> be calibrated using an Xbox One or
        Xbox Series console. However, if you don’t have access to either of
        them, please read the information below.
      </p>
      <br />
      <p>
        The Xbox One gamepad cannot be calibrated on either a PC or the Xbox One
        console, which is why some technicians use a “manual” resistance
        adjustment (photo) to reduce drift on a new analog stick. However, this
        must be done with great care — applying too much correction may prevent
        the stick from reaching its full range of motion. Personally, I only use
        this method when I need a very small adjustment, such as –0.05 or –0.02.
      </p>
      <GalleryWrapper>
        <a href={PHOTO1} target="_blank" rel="noopener noreferrer">
          <img
            src={PHOTO1}
            loading="lazy"
            alt="xbox one gamepad resistance adjustment"
          />
        </a>
      </GalleryWrapper>
      <br />
      <table>
        <thead>
          <tr>
            <th>Resistor Value</th>
            <th>Resistance Adjustment </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>43 KΩ</td>
            <td>−0.15</td>
          </tr>
          <tr>
            <td>51 KΩ</td>
            <td>−0.11</td>
          </tr>
          <tr>
            <td>100 KΩ</td>
            <td>−0.05</td>
          </tr>
          <tr>
            <td>200 KΩ</td>
            <td>−0.02</td>
          </tr>
        </tbody>
      </table>
      <h2>● Testing</h2>
      <ol>
        <li>
          <a href="http://gpadtester.com/">Use gpadtester.com</a>
        </li>
      </ol>
    </StyledArticleWrapper>
  );
}
