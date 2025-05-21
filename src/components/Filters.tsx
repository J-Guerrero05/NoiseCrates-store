
import { useState } from "react";
import { genres } from "../data/samplePacks";
import { Filter } from "lucide-react";

interface FiltersProps {
  onFilterChange: (genre: string, minBpm: number, maxBpm: number) => void;
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bpmRange, setBpmRange] = useState({ min: 80, max: 180 });
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    onFilterChange(genre, bpmRange.min, bpmRange.max);
  };

  const handleBpmChange = (type: "min" | "max", value: number) => {
    const newBpmRange = { ...bpmRange, [type]: value };
    setBpmRange(newBpmRange);
    onFilterChange(selectedGenre, newBpmRange.min, newBpmRange.max);
  };

  return (
    <div className="filters mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0">Filters</h5>
        <button 
          className="btn btn-sm btn-outline-secondary d-md-none d-flex align-items-center"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          <Filter size={16} className="me-1" /> 
          {isFiltersVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className={`${isFiltersVisible ? 'd-block' : 'd-none d-md-block'}`}>
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <div className="d-flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                className={`btn btn-sm ${
                  selectedGenre === genre ? "btn-primary" : "btn-outline-secondary"
                }`}
                onClick={() => handleGenreChange(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">BPM Range</label>
          <div className="row g-2">
            <div className="col">
              <div className="input-group input-group-sm">
                <span className="input-group-text">Min</span>
                <input
                  type="number"
                  className="form-control"
                  value={bpmRange.min}
                  onChange={(e) => handleBpmChange("min", parseInt(e.target.value))}
                  min={70}
                  max={bpmRange.max-1}
                />
              </div>
            </div>
            <div className="col">
              <div className="input-group input-group-sm">
                <span className="input-group-text">Max</span>
                <input
                  type="number"
                  className="form-control"
                  value={bpmRange.max}
                  onChange={(e) => handleBpmChange("max", parseInt(e.target.value))}
                  min={bpmRange.min+1}
                  max={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
