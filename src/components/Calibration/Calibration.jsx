export function Calibration() {
  const iframeSrc =
    "/dualshock-tools/index.html" || "/dualshock-tools/dist/index.html";

  return (
    <div style={{ width: "100%", height: "100vh", background: "#FFF" }}>
      <iframe
        src={iframeSrc}
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
