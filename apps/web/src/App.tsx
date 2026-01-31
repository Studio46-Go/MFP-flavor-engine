import { useState, useCallback } from "react";
import {
  getAllIngredients,
  getStyleTarget,
  getStyleTargetIds,
  CookingMethod,
  DishType,
  type IngredientCard,
  type DishIngredient,
} from "mfp-flavor-engine";
import { useEngine } from "./hooks/useEngine";
import Header from "./components/Header";
import ConfigPanel from "./components/ConfigPanel";
import IngredientSearch from "./components/IngredientSearch";
import IngredientList from "./components/IngredientList";
import FlavorRadar from "./components/FlavorRadar";
import ScoreDisplay from "./components/ScoreDisplay";
import Recommendations from "./components/Recommendations";

const allIngredients = getAllIngredients();
const styleTargetIds = getStyleTargetIds();

export default function App() {
  const [ingredients, setIngredients] = useState<DishIngredient[]>([]);
  const [method, setMethod] = useState<CookingMethod>(CookingMethod.SAUTE);
  const [heatLevel, setHeatLevel] = useState(0.7);
  const [dishType, setDishType] = useState<DishType>(DishType.COMPLETE_PLATE);
  const [styleTargetId, setStyleTargetId] = useState("italian");

  const { output, error } = useEngine({
    ingredients,
    method,
    heatLevel,
    dishType,
    styleTargetId,
  });

  const styleTarget = getStyleTarget(styleTargetId);

  const addIngredient = useCallback((card: IngredientCard) => {
    setIngredients((prev) => {
      if (prev.some((i) => i.card.id === card.id)) return prev;
      return [...prev, { card, quantity: 100 }];
    });
  }, []);

  const removeIngredient = useCallback((id: string) => {
    setIngredients((prev) => prev.filter((i) => i.card.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setIngredients((prev) =>
      prev.map((i) =>
        i.card.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    );
  }, []);

  const addedIds = new Set(ingredients.map((i) => i.card.id));

  return (
    <div className="app">
      <Header />

      <main className="main-layout">
        <section className="panel panel-left">
          <ConfigPanel
            styleTargetId={styleTargetId}
            styleTargetIds={styleTargetIds}
            method={method}
            heatLevel={heatLevel}
            dishType={dishType}
            onStyleTargetChange={setStyleTargetId}
            onMethodChange={setMethod}
            onHeatLevelChange={setHeatLevel}
            onDishTypeChange={setDishType}
          />

          <div className="card">
            <h2 className="card-title">Ingredients</h2>
            <IngredientSearch
              allIngredients={allIngredients}
              addedIds={addedIds}
              onAdd={addIngredient}
            />
            <IngredientList
              ingredients={ingredients}
              onRemove={removeIngredient}
              onQuantityChange={updateQuantity}
            />
          </div>
        </section>

        <section className="panel panel-right">
          {error && <div className="card error-card">{error}</div>}

          <div className="card">
            <h2 className="card-title">Flavor Profile</h2>
            <FlavorRadar
              dishVector={output?.normalizedVector ?? null}
              targetVector={styleTarget?.profile ?? null}
              targetName={styleTarget?.name ?? ""}
            />
          </div>

          <ScoreDisplay output={output} />

          <Recommendations recommendations={output?.recommendations ?? []} />
        </section>
      </main>
    </div>
  );
}
