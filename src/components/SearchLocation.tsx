import "./SearchLocation.css";
import { search } from "../api/search";
import { useEffect, useRef, useState } from "react";

import type { Location } from "../api/types";

type SearchLocationProps = {
  onLocation: (location: Location) => void;
};

export default function SearchLocation({ onLocation }: SearchLocationProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [term, setTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = await search(term);
    setLocations(results);
    setTerm("");
    setIsVisible(true);
  };

  useEffect(() => {
    if (isVisible && resultsRef.current) {
      resultsRef.current.focus();
    }
  }, [isVisible]);

  return (
    <>
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search-term">
            <span className="icon" aria-hidden="true">
              🔍
            </span>
            <input
              id="search-term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search here..."
              className="search-box"
            />
          </label>
          <input type="submit" value="Search" className="search-button" />
        </form>
      </div>

      {isVisible && (
        <div
          className="search-results"
          aria-live="polite"
          tabIndex={-1}
          ref={resultsRef}
        >
          <h1>Found Locations</h1>
          <ul>
            {locations.map((location) => (
              <li key={location.id}>
                <p>{location.name}</p>
                <button
                  className="go-button"
                  onClick={() => {
                    onLocation(location);
                    setIsVisible(false);
                  }}
                >
                  Go there
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
