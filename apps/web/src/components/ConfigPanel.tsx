import { CookingMethod, DishType, getStyleTarget } from "mfp-flavor-engine";
import { methodLabel, dishTypeLabel } from "../utils/format";

const COOKING_METHODS = Object.values(CookingMethod);
const DISH_TYPES = Object.values(DishType);

interface ConfigPanelProps {
  styleTargetId: string;
  styleTargetIds: string[];
  method: CookingMethod;
  heatLevel: number;
  dishType: DishType;
  onStyleTargetChange: (id: string) => void;
  onMethodChange: (method: CookingMethod) => void;
  onHeatLevelChange: (level: number) => void;
  onDishTypeChange: (type: DishType) => void;
}

export default function ConfigPanel({
  styleTargetId,
  styleTargetIds,
  method,
  heatLevel,
  dishType,
  onStyleTargetChange,
  onMethodChange,
  onHeatLevelChange,
  onDishTypeChange,
}: ConfigPanelProps) {
  return (
    <div className="card config-panel">
      <h2 className="card-title">Recipe Configuration</h2>

      <div className="config-grid">
        <div className="config-field">
          <label className="config-label" htmlFor="style-target">
            Cuisine Style
          </label>
          <select
            id="style-target"
            className="config-select"
            value={styleTargetId}
            onChange={(e) => onStyleTargetChange(e.target.value)}
          >
            {styleTargetIds.map((id) => {
              const target = getStyleTarget(id);
              return (
                <option key={id} value={id}>
                  {target?.name ?? id}
                </option>
              );
            })}
          </select>
        </div>

        <div className="config-field">
          <label className="config-label" htmlFor="cooking-method">
            Cooking Method
          </label>
          <select
            id="cooking-method"
            className="config-select"
            value={method}
            onChange={(e) => onMethodChange(e.target.value as CookingMethod)}
          >
            {COOKING_METHODS.map((m) => (
              <option key={m} value={m}>
                {methodLabel(m)}
              </option>
            ))}
          </select>
        </div>

        <div className="config-field">
          <label className="config-label" htmlFor="dish-type">
            Dish Type
          </label>
          <select
            id="dish-type"
            className="config-select"
            value={dishType}
            onChange={(e) => onDishTypeChange(e.target.value as DishType)}
          >
            {DISH_TYPES.map((dt) => (
              <option key={dt} value={dt}>
                {dishTypeLabel(dt)}
              </option>
            ))}
          </select>
        </div>

        <div className="config-field">
          <label className="config-label" htmlFor="heat-level">
            Heat Level: {Math.round(heatLevel * 100)}%
          </label>
          <input
            id="heat-level"
            type="range"
            className="config-slider"
            min="0"
            max="1"
            step="0.05"
            value={heatLevel}
            onChange={(e) => onHeatLevelChange(parseFloat(e.target.value))}
          />
          <div className="slider-labels">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
