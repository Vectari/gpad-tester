const HallEffectAnalog = "../../../src/assets/HallEffectAnalog.jpg";
const PotentiometerSensor = "../../../src/assets/PotentiometerSensor.jpg";
const FullAnalog = "../../../src/assets/FullAnalog.jpg";

export function Info() {
  return (
    <div>
      <h1>Buttons Issues</h1>
      <img src="" alt="img" />
      <article>
        If there are issues with the keys, it is recommended to clean all
        contacts on the motherboard/flex with alcohol or replace the rubber pads
        that press the keys.
      </article>
      <article>
        In PS4/PS5, the L2 and R2 rubber bands need to be replaced when they are
        cut due to use and 100% pressure cannot be achieved.
      </article>
      <article></article>

      <h1>LT/RT Issues</h1>
      <img src="" alt="img" />
      <article>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, quam!
      </article>

      <h1>Analog issues</h1>
      <img src={FullAnalog} alt="Full Analog img" />
      <img src={PotentiometerSensor} alt="Potentiometer Sensor img" />
      <article>article</article>

      <h1>Hall effect Analog</h1>
      <img src={HallEffectAnalog} alt="Hall Effect Analog img" />
      <article>article</article>

      <h1>Connecting issues</h1>
      <img src="" alt="img" />
      <article>article</article>

      <h1>miniJack issues</h1>
      <img src="" alt="img" />
      <article>article</article>
    </div>
  );
}
