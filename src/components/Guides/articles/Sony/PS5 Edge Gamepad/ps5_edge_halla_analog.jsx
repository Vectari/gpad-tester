import { GalleryWrapper, StyledArticleWrapper } from "../../ArticleStyles";
import PHOTO1 from "./ps5_edge_gamepad_photo/ps5edge_1.webp";
import PHOTO2 from "./ps5_edge_gamepad_photo/ps5edge_2.webp";
import PHOTO3 from "./ps5_edge_gamepad_photo/ps5edge_3.webp";

export function PS5_EDGE_HALLA_ANALOG() {
  return (
    <StyledArticleWrapper>
      <h1>
        PS5 DualSense Edge Analog Drift – How to Fix and Test Your Controller
      </h1>

      <p>
        If your <strong>PS5 DualSense Edge controller</strong> has issues like
        analog drift, random movement, or unresponsive input — you may need to
        repair or replace the analog stick.
      </p>

      <p>
        👉 Before opening the controller, first{" "}
        <a
          href="http://gpadtester.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          test your gamepad online
        </a>{" "}
        to confirm the issue.
      </p>

      <h2>● How to Test PS5 Edge Analog Drift</h2>
      <ol>
        <li>Connect your controller to your PC.</li>
        <li>
          Open{" "}
          <a
            href="http://gpadtester.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            gamepad tester
          </a>
        </li>
        <li>Move both analog sticks slowly.</li>
        <li>
          If the cursor moves on its own → you have{" "}
          <strong>analog drift</strong>.
        </li>
      </ol>

      <h2>● Issue Description</h2>
      <p>
        Calibrating the PS5 DualSense Edge requires adding a wire (
        <a href="#photo2">see photo</a>) that connects two points on the analog
        module.
      </p>

      <p>
        Supplying <strong>1.8V</strong> to the top test point is required for:
      </p>
      <ul>
        <li>calibration process</li>
        <li>saving calibration data permanently</li>
      </ul>

      <h2>● Repair Steps</h2>
      <h3>
        The solder pads on the motherboard are very delicate — be extremely
        careful.
      </h3>

      <ol>
        <li>Set hot air station to 420°C.</li>
        <li>Set soldering iron to 420°C.</li>
        <li>Apply flux and add fresh solder to all pins.</li>
        <li>Heat evenly until solder becomes fully liquid.</li>
        <li>Carefully remove the analog stick.</li>
        <li>Clean pads using flux and solder wick.</li>
        <li>Place new analog, apply flux, solder all pins.</li>
        <li>
          Add extra wire to the top test point <a href="#photo2">(see photo)</a>
          .
        </li>
      </ol>

      <h2>● Test After Repair</h2>
      <p>
        After replacing the analog, you should immediately verify if everything
        works correctly:
      </p>

      <ol>
        <li>
          Open{" "}
          <a
            href="http://gpadtester.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            gamepad tester
          </a>
        </li>
        <li>Move analogs in full range.</li>
        <li>
          Use gamepad tester calibration tool:{" "}
          <a
            href="http://gpadtester.com/calibration"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to calibration tool
          </a>{" "}
        </li>
        <li>Check if movement is smooth and centered.</li>
        <li>Ensure no unwanted input appears.</li>
      </ol>

      <p>👉 If everything looks stable — your repair was successful.</p>

      <h2>● Gallery</h2>
      <GalleryWrapper>
        <a href={PHOTO1} target="_blank" rel="noopener noreferrer">
          <img
            src={PHOTO1}
            loading="lazy"
            alt="PS5 DualSense Edge analog repair step"
          />
        </a>

        <a href={PHOTO2} target="_blank" rel="noopener noreferrer">
          <img
            id="photo2"
            src={PHOTO2}
            loading="lazy"
            alt="PS5 Edge calibration wire connection"
          />
        </a>

        <a href={PHOTO3} target="_blank" rel="noopener noreferrer">
          <img
            src={PHOTO3}
            loading="lazy"
            alt="PS5 controller analog replacement process"
          />
        </a>
      </GalleryWrapper>
    </StyledArticleWrapper>
  );
}
