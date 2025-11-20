import { GalleryWrapper, StyledArticleWrapper } from "../../ArticleStyles";
import PHOTO1 from "./ps5_edge_gamepad_photo/ps5edge_1.webp";
import PHOTO2 from "./ps5_edge_gamepad_photo/ps5edge_2.webp";
import PHOTO3 from "./ps5_edge_gamepad_photo/ps5edge_3.webp";

export function PS5_EDGE_HALLA_ANALOG() {
  return (
    <StyledArticleWrapper>
      <h1>Replacing analogs requires experience and the right equipment!</h1>
      <h2>● Issue Description</h2>
      <p>
        Calibrating the PS5 Edge requires adding a wire{" "}
        (<a href="#photo2">PHOTO</a>) that connects two points on the analog
        module. Supplying 1.8V to the top test point is necessary for the
        calibration process and for permanently saving the calibration data in
        the controller.
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
        <li>
          Add extra wire to the top test point. <a href="#photo2">(PHOTO)</a>
        </li>
      </ol>

      <h2>● Testing</h2>
      <ol>
        <li>
          <a href="http://gpadtester.com/">Use gpadtester.com</a>
        </li>
      </ol>
      <h2>● Gallery</h2>
      <GalleryWrapper>
        <a href={PHOTO1} target="_blank" rel="noopener noreferrer">
          <img
            src={PHOTO1}
            loading="lazy"
            alt="xbox one gamepad resistance adjustment"
          />
        </a>
        <a href={PHOTO2} target="_blank" rel="noopener noreferrer">
          <img
            id="photo2"
            src={PHOTO2}
            loading="lazy"
            alt="xbox one gamepad resistance adjustment"
          />
        </a>
        <a href={PHOTO3} target="_blank" rel="noopener noreferrer">
          <img
            src={PHOTO3}
            loading="lazy"
            alt="xbox one gamepad resistance adjustment"
          />
        </a>
      </GalleryWrapper>
    </StyledArticleWrapper>
  );
}
