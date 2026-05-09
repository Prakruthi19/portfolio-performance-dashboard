export default function DashboardPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      {/* Top bar preview */}
      <div className="w-full max-w-6xl border border-[#1e2a38] rounded-sm px-6 py-3 flex items-center gap-4 bg-[#111823]">
        <span className="font-mono text-xs font-bold tracking-widest text-[#f5a623] uppercase">
          Nordic Analytics
        </span>
        <span className="text-[#1e2a38] select-none">|</span>
        <span className="font-mono text-xs text-[#7a8fa8] tracking-wider uppercase">
          Portfolio Performance Dashboard
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
          <span className="font-mono text-[10px] text-[#7a8fa8] tracking-wider">LIVE</span>
        </div>
      </div>

      {/* Theme palette preview */}
      <div className="w-full max-w-6xl border border-[#1e2a38] rounded-sm p-6 bg-[#111823] space-y-4">
        <p className="font-mono text-[10px] text-[#3d5166] tracking-widest uppercase">
          Theme — Bloomberg Terminal Dark
        </p>

        <div className="grid grid-cols-8 gap-2">
          {[
            { label: "Amber",  bg: "#f5a623", text: "#070c14" },
            { label: "Yellow", bg: "#facc15", text: "#070c14" },
            { label: "Orange", bg: "#fb923c", text: "#070c14" },
            { label: "Red",    bg: "#ef4444", text: "#e8f0fe" },
            { label: "Pink",   bg: "#f472b6", text: "#070c14" },
            { label: "Green",  bg: "#4ade80", text: "#070c14" },
            { label: "Cyan",   bg: "#22d3ee", text: "#070c14" },
            { label: "Muted",  bg: "#1e2a38", text: "#7a8fa8" },
          ].map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-1">
              <div
                className="w-full h-8 rounded-sm"
                style={{ backgroundColor: c.bg }}
              />
              <span className="font-mono text-[9px] text-[#3d5166] tracking-wider">
                {c.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2 flex-wrap">
          {[
            { label: "ACTIVE",  bg: "#002d0e", text: "#4ade80", border: "#4ade80" },
            { label: "WATCH",   bg: "#3a2e00", text: "#facc15", border: "#facc15" },
            { label: "AT RISK", bg: "#3d0000", text: "#f87171", border: "#f87171" },
            { label: "EXITED",  bg: "#162032", text: "#7a8fa8", border: "#1e2a38" },
          ].map((b) => (
            <span
              key={b.label}
              className="font-mono text-[9px] font-bold tracking-widest px-2 py-1 rounded-sm border"
              style={{ backgroundColor: b.bg, color: b.text, borderColor: b.border }}
            >
              {b.label}
            </span>
          ))}
        </div>

        <div className="pt-2 grid grid-cols-5 gap-3">
          {[
            { label: "IRR", value: "18.4%", accent: true },
            { label: "TVPI", value: "1.72x", accent: false },
            { label: "DPI",  value: "0.48x", accent: false },
            { label: "RVPI", value: "1.24x", accent: false },
            { label: "NAV",  value: "€182M", accent: true },
          ].map((k) => (
            <div
              key={k.label}
              className="border border-[#1e2a38] bg-[#0d1117] rounded-sm p-3"
            >
              <p className="font-mono text-[9px] text-[#3d5166] tracking-widest uppercase mb-1">
                {k.label}
              </p>
              <p
                className="font-mono text-lg font-bold tabular-nums"
                style={{ color: k.accent ? "#f5a623" : "#e8f0fe" }}
              >
                {k.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="font-mono text-[10px] text-[#3d5166] tracking-wider">
        STEP 1 COMPLETE — THEME SCAFFOLD ✓ — FEATURES NEXT
      </p>
    </main>
  );
}
