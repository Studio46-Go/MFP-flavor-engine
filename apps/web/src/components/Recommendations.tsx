import type { Recommendation } from "mfp-flavor-engine";
import { formatDelta, recTypeLabel, recTypeClass } from "../utils/format";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export default function Recommendations({
  recommendations,
}: RecommendationsProps) {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="card rec-card">
      <h2 className="card-title">Recommendations</h2>
      <ul className="rec-list">
        {recommendations.slice(0, 8).map((rec, idx) => (
          <li key={idx} className="rec-item">
            <span className={`rec-type-badge ${recTypeClass(rec.type)}`}>
              {recTypeLabel(rec.type)}
            </span>
            <span className="rec-description">{rec.description}</span>
            <span
              className={`rec-delta ${rec.deltaScore >= 0 ? "positive" : "negative"}`}
            >
              {formatDelta(rec.deltaScore)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
