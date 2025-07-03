import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Theme } from "../../styles/Theme";

const AudioRecorderWrapper = styled.div`
  h3 {
    color: ${Theme.white};
    background-color: ${Theme.interface};
    border-radius: 1rem;
    padding: 1rem;
    margin-top: -1rem;

    span {
      font-size: 0.8rem;
    }
  }
`;

const StyledSmallInfo = styled.div`
  font-size: 0.7rem;
  margin-top: 0.3rem;
`;

const StyledRecorderConatiner = styled.div`
  text-align: center;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const intervalRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        chunks.current = [];
        clearInterval(intervalRef.current);
      };

      mediaRecorder.current.start();
      setRecording(true);

      setTimeout(() => {
        if (mediaRecorder.current?.state === "recording") {
          stopRecording();
        }
      }, 20000);

      intervalRef.current = setInterval(() => {}, 200);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const deleteRecording = () => {
    setAudioURL(null);
  };

  const openInNewTab = () => {
    if (audioURL) {
      window.open(audioURL, "_blank");
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <AudioRecorderWrapper>
      <h3>
        Gamepad Microphone Tester <span>(Experimental)</span>
        <StyledSmallInfo>If supported</StyledSmallInfo>
      </h3>

      <StyledRecorderConatiner>
        {!recording && !audioURL && (
          <button style={styles.button} onClick={startRecording}>
            Start Recording
          </button>
        )}

        {recording && (
          <div style={styles.recordingContainer}>
            <div style={styles.recordingIndicator}>
              <div style={styles.pulse}></div>
              <span>Recording...</span>
            </div>
            <button
              style={{
                ...styles.button_stop,
              }}
              onClick={stopRecording}
            >
              Stop
            </button>
          </div>
        )}

        {audioURL && (
          <div style={{ marginTop: 20 }}>
            <audio controls src={audioURL} style={{ width: "100%" }} />
            <div style={{ marginTop: 10 }}>
              <button
                style={{
                  ...styles.button,
                  backgroundColor: `${Theme.disconnected}`,
                  marginLeft: 8,
                }}
                onClick={deleteRecording}
              >
                Delete
              </button>
              <button
                style={{
                  ...styles.button,
                  backgroundColor: "#2196F3",
                  marginLeft: 8,
                }}
                onClick={openInNewTab}
              >
                Open in New Tab
              </button>
              <StyledSmallInfo>
                For audio playback, connect headphones to the gamepad. If you
                don’t have headphones, open the audio in a new tab before
                unplugging the gamepad.
              </StyledSmallInfo>
            </div>
          </div>
        )}
      </StyledRecorderConatiner>
    </AudioRecorderWrapper>
  );
}

const styles = {
  container: {},
  button: {
    backgroundColor: `${Theme.connected}`,
    color: "white",
    padding: "10px 20px",
    fontSize: 16,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  button_stop: {
    backgroundColor: `${Theme.disconnected}`,
    color: "white",
    padding: "10px 20px",
    fontSize: 16,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  recordingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  recordingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    fontWeight: "bold",
    color: `${Theme.disconnected}`,
  },
  pulse: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: `${Theme.disconnected}`,
    animation: "pulse 1s infinite",
  },
};

const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(styleSheet);
