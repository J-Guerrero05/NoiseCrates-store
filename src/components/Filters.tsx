
import { useState } from "react";
import { Filter } from "lucide-react";
import { useGenres } from "@/hooks/useGenres";
import GenreFilter from "./filters/GenreFilter";
import BpmFilter from "./filters/BpmFilter";

interface FiltersProps {
  onFilterChange: (genre: string, minBpm: number, maxBpm: number) => void;
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  const { data: genres = ["All"], isLoading: genresLoading } = useGenres();
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
          className="btn btn-sm btn-outline-secondary d-md-none d-flex align-items-center animated-btn"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
        >
          <Filter size={16} className="me-1" /> 
          {isFiltersVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className={`${isFiltersVisible ? 'd-block' : 'd-none d-md-block'}`}>
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
            isLoading={genresLoading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">BPM Range <small className="text-muted">(scroll over numbers to adjust)</small></label>
          <BpmFilter
            bpmRange={bpmRange}
            onBpmChange={handleBpmChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
