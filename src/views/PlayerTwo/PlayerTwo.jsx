import { useEffect, useState } from "react";

export function PlayerTwo() {
  const [APressed, setAPressed] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const interval = setInterval(() => {
      const gpad = navigator.getGamepads()[1];
      if (gpad) {
        setAPressed(gpad.buttons[0].pressed)
      }
    }, 100)
  })

  return (
    <>
      <p>PlayerTwo content</p>
      {APressed && 'a'}
    </>
  );
}
