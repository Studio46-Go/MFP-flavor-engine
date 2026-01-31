import type { DishIngredient } from "mfp-flavor-engine";
import { roleLabel } from "../utils/format";

interface IngredientListProps {
  ingredients: DishIngredient[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export default function IngredientList({
  ingredients,
  onRemove,
  onQuantityChange,
}: IngredientListProps) {
  if (ingredients.length === 0) {
    return (
      <div className="ingredient-empty">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        <p>Search and add ingredients to build your recipe</p>
      </div>
    );
  }

  return (
    <ul className="ingredient-list">
      {ingredients.map((item) => (
        <li key={item.card.id} className="ingredient-item">
          <div className="ingredient-info">
            <span className="ingredient-name">{item.card.name}</span>
            <span className="ingredient-roles">
              {Array.from(item.card.roles)
                .map(roleLabel)
                .join(" / ")}
            </span>
          </div>
          <div className="ingredient-controls">
            <button
              className="qty-btn"
              onClick={() =>
                onQuantityChange(item.card.id, item.quantity - 10)
              }
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              className="qty-input"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                onQuantityChange(
                  item.card.id,
                  parseInt(e.target.value) || 1
                )
              }
              aria-label={`Quantity for ${item.card.name}`}
            />
            <span className="qty-unit">g</span>
            <button
              className="qty-btn"
              onClick={() =>
                onQuantityChange(item.card.id, item.quantity + 10)
              }
              aria-label="Increase quantity"
            >
              +
            </button>
            <button
              className="remove-btn"
              onClick={() => onRemove(item.card.id)}
              aria-label={`Remove ${item.card.name}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
