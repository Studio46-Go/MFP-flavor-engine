import type { MFPEngineOutput } from "mfp-flavor-engine";
import { formatScore, scoreColor } from "../utils/format";

interface ScoreDisplayProps {
  output: MFPEngineOutput | null;
}

function ScoreGauge({ value }: { value: number }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.max(0, value));
  const color = scoreColor(value);

  return (
    <div className="score-gauge">
      <svg viewBox="0 0 120 120" className="gauge-svg">
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth="8"
          opacity="0.3"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          className="gauge-fill"
        />
      </svg>
      <div className="gauge-value" style={{ color }}>
        {formatScore(value)}
      </div>
      <div className="gauge-label">Score</div>
    </div>
  );
}

function ComponentBar({
  label,
  value,
  maxValue,
  inverted,
}: {
  label: string;
  value: number;
  maxValue: number;
  inverted?: boolean;
}) {
  const displayValue = inverted ? value : value;
  const barWidth = Math.min(100, (Math.abs(displayValue) / maxValue) * 100);
  const color = inverted
    ? displayValue > 0.1
      ? "var(--error)"
      : "var(--success)"
    : scoreColor(displayValue);

  return (
    <div className="component-row">
      <span className="component-label">{label}</span>
      <div className="component-bar-track">
        <div
          className="component-bar-fill"
          style={{
            width: `${barWidth}%`,
            background: color,
          }}
        />
      </div>
      <span className="component-value">{displayValue.toFixed(2)}</span>
    </div>
  );
}

export default function ScoreDisplay({ output }: ScoreDisplayProps) {
  if (!output) {
    return (
      <div className="card score-card score-empty">
        <h2 className="card-title">Score</h2>
        <p className="empty-text">Add ingredients to see your score</p>
      </div>
    );
  }

  const { scored, structuralGate } = output;
  const { components } = scored;

  return (
    <div className="card score-card">
      <h2 className="card-title">Score Analysis</h2>

      <div className="score-content">
        <ScoreGauge value={scored.score} />

        <div className="score-components">
          <ComponentBar
            label="Similarity"
            value={components.similarity}
            maxValue={1}
          />
          <ComponentBar
            label="Balance"
            value={components.balance}
            maxValue={1}
          />
          <ComponentBar
            label="Structure"
            value={components.structural}
            maxValue={1}
          />
          <ComponentBar
            label="Clash"
            value={components.clashPenalty}
            maxValue={0.5}
            inverted
          />
        </div>
      </div>

      <div className="score-meta">
        <span
          className={`gate-badge ${structuralGate.passed ? "gate-pass" : "gate-fail"}`}
        >
          {structuralGate.passed ? "Structure OK" : "Missing Roles"}
        </span>
        <span className="uncertainty">
          ±{(scored.uncertainty * 100).toFixed(1)}
        </span>
      </div>
    </div>
  );
}
