export function Calibration() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#FFF" }}>
      <iframe
        src="/dualshock-tools/dist/index.html"
        title="WebHID Calibration"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          background: "transparent",
        }}
      />
    </div>
  );
}
