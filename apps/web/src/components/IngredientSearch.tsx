import { useState, useRef, useEffect, useMemo } from "react";
import type { IngredientCard } from "mfp-flavor-engine";
import { roleLabel } from "../utils/format";

interface IngredientSearchProps {
  allIngredients: IngredientCard[];
  addedIds: Set<string>;
  onAdd: (card: IngredientCard) => void;
}

export default function IngredientSearch({
  allIngredients,
  addedIds,
  onAdd,
}: IngredientSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (query.length < 1) return [];
    const lower = query.toLowerCase();
    return allIngredients
      .filter((ing) => ing.name.toLowerCase().includes(lower))
      .slice(0, 20);
  }, [query, allIngredients]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(card: IngredientCard) {
    onAdd(card);
    setQuery("");
    setIsOpen(false);
  }

  return (
    <div className="ingredient-search" ref={containerRef}>
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search ingredients..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <ul className="search-results">
          {results.map((ing) => {
            const added = addedIds.has(ing.id);
            return (
              <li key={ing.id}>
                <button
                  className={`search-result-item ${added ? "added" : ""}`}
                  disabled={added}
                  onClick={() => handleSelect(ing)}
                >
                  <span className="result-name">{ing.name}</span>
                  <span className="result-roles">
                    {Array.from(ing.roles)
                      .map(roleLabel)
                      .join(", ")}
                  </span>
                  {added && <span className="result-badge">Added</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {isOpen && query.length >= 1 && results.length === 0 && (
        <div className="search-empty">No ingredients match "{query}"</div>
      )}
    </div>
  );
}
