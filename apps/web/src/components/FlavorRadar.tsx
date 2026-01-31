import { DIMENSION_SHORT_LABELS } from "../utils/format";

interface FlavorRadarProps {
  dishVector: Float64Array | null;
  targetVector: Float64Array | null;
  targetName: string;
}

const SIZE = 300;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 120;
const DIMS = 20;
const RINGS = [0.2, 0.4, 0.6, 0.8, 1.0];

function polarToCart(
  dim: number,
  value: number
): { x: number; y: number } {
  const angle = (dim * 2 * Math.PI) / DIMS - Math.PI / 2;
  return {
    x: CX + R * value * Math.cos(angle),
    y: CY + R * value * Math.sin(angle),
  };
}

function polygonPoints(values: ArrayLike<number>, scale: number): string {
  const pts: string[] = [];
  for (let i = 0; i < DIMS; i++) {
    const v = Math.min(1, Math.max(0, Number(values[i]) * scale));
    const { x, y } = polarToCart(i, v);
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
}

function ringPoints(value: number): string {
  const pts: string[] = [];
  for (let i = 0; i < DIMS; i++) {
    const { x, y } = polarToCart(i, value);
    pts.push(`${x},${y}`);
  }
  return pts.join(" ");
}

export default function FlavorRadar({
  dishVector,
  targetVector,
  targetName,
}: FlavorRadarProps) {
  return (
    <div className="radar-container">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="radar-svg"
        role="img"
        aria-label="Flavor profile radar chart"
      >
        {/* Background rings */}
        {RINGS.map((r) => (
          <polygon
            key={r}
            points={ringPoints(r)}
            fill="none"
            stroke="var(--border)"
            strokeWidth={r === 1 ? 1.5 : 0.5}
            opacity={0.6}
          />
        ))}

        {/* Axis lines */}
        {Array.from({ length: DIMS }, (_, i) => {
          const { x, y } = polarToCart(i, 1);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke="var(--border)"
              strokeWidth="0.5"
              opacity="0.4"
            />
          );
        })}

        {/* Target profile */}
        {targetVector && (
          <polygon
            points={polygonPoints(targetVector, 1)}
            fill="var(--primary)"
            fillOpacity="0.06"
            stroke="var(--primary)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.7"
          />
        )}

        {/* Dish profile */}
        {dishVector && (
          <polygon
            points={polygonPoints(dishVector, 1)}
            fill="var(--accent)"
            fillOpacity="0.2"
            stroke="var(--accent)"
            strokeWidth="2"
          />
        )}

        {/* Dish vertex dots */}
        {dishVector &&
          Array.from({ length: DIMS }, (_, i) => {
            const v = Math.min(1, Math.max(0, Number(dishVector[i])));
            const { x, y } = polarToCart(i, v);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill="var(--accent)"
                stroke="var(--surface)"
                strokeWidth="1"
              />
            );
          })}

        {/* Dimension labels */}
        {DIMENSION_SHORT_LABELS.map((label, i) => {
          const { x, y } = polarToCart(i, 1.2);
          const angle = (i * 360) / DIMS;
          const anchor =
            angle > 80 && angle < 280
              ? angle > 170 && angle < 190
                ? "middle"
                : angle < 180
                ? "start"
                : "end"
              : "middle";
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="central"
              className="radar-label"
            >
              {label}
            </text>
          );
        })}
      </svg>

      <div className="radar-legend">
        <span className="legend-item">
          <span
            className="legend-swatch"
            style={{ background: "var(--accent)" }}
          />
          Your Dish
        </span>
        <span className="legend-item">
          <span
            className="legend-swatch legend-swatch-dashed"
            style={{ borderColor: "var(--primary)" }}
          />
          {targetName || "Target"}
        </span>
      </div>
    </div>
  );
}
