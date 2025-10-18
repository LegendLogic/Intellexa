import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

/**
 * Basic.jsx
 *
 * - Cycles between panels: HTML, CSS, JavaScript, Other
 * - Shows live date/time
 * - Shows scheduled start times for each panel (based on current time + interval)
 * - Controls: play/pause, next, prev, change interval (seconds)
 * - Fetches user profile and shows user name
 *
 * Usage: <Basic token="YOUR_AUTH_TOKEN" backendUrl="YOUR_BACKEND_URL" />
 */

const DEFAULT_INTERVAL = 10; // seconds

const PANELS = [
  { id: "html", title: "HTML", content: `<!-- HTML Example -->\n<header>\n  <h1>Welcome to My Page</h1>\n  <p>This is a sample HTML snippet.</p>\n</header>` },
  { id: "css", title: "CSS", content: `/* CSS Example */\nbody { font-family: Inter, system-ui; background: #f7fafc; }\nheader { background: linear-gradient(90deg,#7c3aed,#06b6d4); color: white; padding: 1rem; border-radius: 8px; }` },
  { id: "javascript", title: "JavaScript", content: `// JavaScript Example\nconst greet = (name) => {\n  console.log(\`Hello, \${name}!\`);\n};\ngreet("Developer");` },
  { id: "other", title: "Other", content: `// Notes / Other\n- Tips: Practice small projects every day.\n- Tools: VSCode, Chrome DevTools, Git.\n- Learning flow: HTML -> CSS -> JS -> Frameworks.` },
];

function formatTwo(num) {
  return num.toString().padStart(2, "0");
}

function formatDateTime(date) {
  const y = date.getFullYear();
  const m = formatTwo(date.getMonth() + 1);
  const d = formatTwo(date.getDate());
  const hh = formatTwo(date.getHours());
  const mm = formatTwo(date.getMinutes());
  const ss = formatTwo(date.getSeconds());
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}

const Basic = ({ token, backendUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalSec, setIntervalSec] = useState(DEFAULT_INTERVAL);
  const [isPlaying, setIsPlaying] = useState(true);
  const [now, setNow] = useState(new Date());
  const [timeElapsed, setTimeElapsed] = useState(0); 
  const [userName, setUserName] = useState("Guest");

  const intervalRef = useRef(null);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.name) setUserName(res.data.name);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };
    if (token && backendUrl) fetchProfile();
  }, [token, backendUrl]);

  // Update live clock every second
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Manage autoplay interval progress
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimeElapsed(0);

    if (!isPlaying) return;

    const tickMs = 200;
    intervalRef.current = setInterval(() => {
      setTimeElapsed(prev => {
        const next = +(prev + tickMs / 1000).toFixed(2);
        if (next >= intervalSec) {
          setCurrentIndex(ci => (ci + 1) % PANELS.length);
          return 0;
        }
        return next;
      });
    }, tickMs);

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [isPlaying, intervalSec]);

  const goTo = index => {
    setCurrentIndex(((index % PANELS.length) + PANELS.length) % PANELS.length);
    setTimeElapsed(0);
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  const schedule = PANELS.map((p, idx) => {
    const dt = new Date(new Date().getTime() + idx * intervalSec * 1000);
    return { ...p, startAt: dt };
  });

  const progressPercent = Math.min(100, (timeElapsed / Math.max(1, intervalSec)) * 100);

  return (
    <div style={rootStyle.container}>
      <header style={rootStyle.header}>
        <div>
          <h1 style={rootStyle.title}>Hello, {userName}! ⏱️ Timed Content Viewer</h1>
          <p style={rootStyle.subtitle}>HTML / CSS / JavaScript / Other — auto-rotates by interval</p>
        </div>
        <div style={rootStyle.clock}>
          <strong>Now:</strong> {formatDateTime(now)} ({Intl.DateTimeFormat().resolvedOptions().timeZone || "Local"})
        </div>
      </header>

      <main style={rootStyle.main}>
        <aside style={rootStyle.left}>
          <div style={rootStyle.controlsBox}>
            <div style={rootStyle.controlsRow}>
              <button onClick={() => setIsPlaying(p => !p)} style={rootStyle.btn}>{isPlaying ? "Pause" : "Play"}</button>
              <button onClick={prev} style={rootStyle.btn}>Prev</button>
              <button onClick={next} style={rootStyle.btn}>Next</button>
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={rootStyle.label}>Interval (seconds)</label>
              <input
                type="number"
                min={2}
                value={intervalSec}
                onChange={e => setIntervalSec(Math.max(2, Math.floor(Number(e.target.value) || DEFAULT_INTERVAL)))}
                style={rootStyle.input}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={rootStyle.label}>Current panel</label>
              <div style={rootStyle.tag}>{PANELS[currentIndex].title}</div>
            </div>
            <div style={{ marginTop: 14 }}>
              <label style={rootStyle.label}>Progress</label>
              <div style={rootStyle.progressWrap}><div style={{ ...rootStyle.progressBar, width: `${progressPercent}%` }} /></div>
              <div style={{ marginTop: 6, fontSize: 13 }}>{Math.round(timeElapsed)}s / {intervalSec}s</div>
            </div>
          </div>

          <div style={rootStyle.scheduleBox}>
            <h3 style={rootStyle.scheduleTitle}>Schedule (local times)</h3>
            <ul style={rootStyle.scheduleList}>
              {schedule.map((s, i) => (
                <li key={s.id} style={i === currentIndex ? rootStyle.scheduleItemActive : rootStyle.scheduleItem}>
                  <div>
                    <strong>{s.title}</strong>
                    <small style={{ marginLeft: 8 }}>{formatDateTime(s.startAt)}</small>
                  </div>
                  {i === currentIndex && <span style={rootStyle.badge}>Now</span>}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section style={rootStyle.viewer}>
          <div style={rootStyle.panelHeader}>
            <h2>{PANELS[currentIndex].title}</h2>
            <div style={{ color: "#6b7280" }}>Starts: {formatDateTime(schedule[currentIndex].startAt)}</div>
          </div>

          <pre style={rootStyle.codeBlock}><code>{PANELS[currentIndex].content}</code></pre>

          <div style={rootStyle.panelFooter}>
            <button style={rootStyle.smallBtn} onClick={() => { navigator.clipboard?.writeText(PANELS[currentIndex].content); alert("Copied!"); }}>Copy</button>
            <div style={{ marginLeft: "auto", color: "#6b7280", fontSize: 13 }}>Panel {currentIndex + 1} of {PANELS.length}</div>
          </div>
        </section>
      </main>
    </div>
  );
};

// Styles same as before (rootStyle) ...
const rootStyle = {
  container: {
    maxWidth: 1100,
    margin: "24px auto",
    padding: 20,
    background: "#f8fafc",
    borderRadius: 12,
    border: "1px solid rgba(15, 23, 42, 0.04)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: { margin: 0, fontSize: 20, color: "#0f172a" },
  subtitle: { margin: 0, color: "#475569", fontSize: 13 },
  clock: { textAlign: "right" },
  clockLine: { fontSize: 14, color: "#0f172a" },

  main: {
    display: "flex",
    gap: 18,
  },
  left: {
    width: 320,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  controlsBox: {
    background: "#fff",
    padding: 14,
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
    border: "1px solid rgba(2,6,23,0.04)",
  },
  controlsRow: { display: "flex", gap: 8 },
  btn: {
    padding: "8px 10px",
    borderRadius: 8,
    border: "none",
    background: "#eef2ff",
    cursor: "pointer",
  },
  smallBtn: {
    padding: "6px 10px",
    borderRadius: 8,
    border: "none",
    background: "#eef2ff",
    cursor: "pointer",
  },
  label: { display: "block", fontSize: 12, color: "#6b7280", marginBottom: 6 },
  input: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #e6e9ee",
    outline: "none",
  },
  tag: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "#eef2ff",
    fontWeight: 600,
    color: "#3730a3",
  },

  progressWrap: {
    height: 8,
    width: "100%",
    background: "#e6e9ee",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
    transition: "width 0.2s linear",
  },

  scheduleBox: {
    background: "#fff",
    padding: 14,
    borderRadius: 10,
    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
    border: "1px solid rgba(2,6,23,0.04)",
  },
  scheduleTitle: { margin: 0, marginBottom: 8, fontSize: 14 },
  scheduleList: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 },
  scheduleItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    border: "1px solid rgba(2,6,23,0.04)",
  },
  scheduleItemActive: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    border: "1px solid rgba(99,102,241,0.18)",
    background: "linear-gradient(90deg, rgba(99,102,241,0.06), rgba(6,182,212,0.03))",
  },
  badge: {
    background: "#e6f7ff",
    color: "#0369a1",
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 12,
  },

  viewer: {
    flex: 1,
    background: "#fff",
    borderRadius: 12,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
    border: "1px solid rgba(2,6,23,0.04)",
  },
  panelHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  panelTitle: { margin: 0 },
  codeBlock: {
    background: "#0b1220",
    color: "#e6eef8",
    padding: 14,
    borderRadius: 8,
    overflowX: "auto",
    whiteSpace: "pre",
    fontSize: 13,
    lineHeight: 1.6,
    flex: 1,
    marginTop: 8,
  },
  panelFooter: { display: "flex", alignItems: "center", gap: 10, marginTop: 8 },
};
export default Basic;
