
interface GenreFilterProps {
  genres: string[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  isLoading?: boolean;
}

const GenreFilter = ({ genres, selectedGenre, onGenreChange, isLoading }: GenreFilterProps) => {
  if (isLoading) {
    return <div className="text-muted">Loading genres...</div>;
  }

  return (
    <div className="d-flex flex-wrap gap-2">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`btn btn-sm animated-btn ${
            selectedGenre === genre ? "btn-primary" : "btn-outline-secondary"
          }`}
          onClick={() => onGenreChange(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
