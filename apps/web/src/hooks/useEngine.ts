import { useMemo } from "react";
import {
  runMFPEngine,
  type MFPEngineOutput,
  type DishIngredient,
  type CookingMethod,
  type DishType,
} from "mfp-flavor-engine";

export interface EngineConfig {
  ingredients: DishIngredient[];
  method: CookingMethod;
  heatLevel: number;
  dishType: DishType;
  styleTargetId: string;
}

export interface EngineResult {
  output: MFPEngineOutput | null;
  error: string | null;
}

export function useEngine(config: EngineConfig): EngineResult {
  const ingredientKey = config.ingredients
    .map((i) => `${i.card.id}:${i.quantity}`)
    .join(",");

  return useMemo(() => {
    if (config.ingredients.length === 0) {
      return { output: null, error: null };
    }

    try {
      const output = runMFPEngine({
        ingredients: config.ingredients,
        method: config.method,
        heatLevel: config.heatLevel,
        dishType: config.dishType,
        styleTargetId: config.styleTargetId,
      });
      return { output, error: null };
    } catch (e) {
      return {
        output: null,
        error: e instanceof Error ? e.message : "Engine computation failed",
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ingredientKey,
    config.method,
    config.heatLevel,
    config.dishType,
    config.styleTargetId,
  ]);
}
