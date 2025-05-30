
import { Play, Pause, AlertCircle } from "lucide-react";

interface PlayButtonProps {
  isPlaying: boolean;
  isLoading: boolean;
  hasError: boolean;
  small?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const PlayButton = ({ 
  isPlaying, 
  isLoading, 
  hasError, 
  small = false, 
  onClick, 
  disabled = false
}: PlayButtonProps) => {
  const getButtonColor = () => {
    if (hasError) return '#dc3545';
    if (disabled) return '#6c757d';
    return '#6c5ce7';
  };

  const getButtonTitle = () => {
    if (hasError) return "Audio unavailable";
    if (disabled) return "No audio available";
    if (isLoading) return "Loading...";
    return isPlaying ? "Pause" : "Play";
  };

  return (
    <button 
      onClick={onClick} 
      className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center position-relative"
      style={{ 
        width: small ? '30px' : '40px', 
        height: small ? '30px' : '40px',
        backgroundColor: getButtonColor(),
        color: 'white',
        border: 'none'
      }}
      disabled={disabled || isLoading}
      title={getButtonTitle()}
    >
      {isLoading ? (
        <div 
          className="spinner-border" 
          style={{ width: small ? '12px' : '16px', height: small ? '12px' : '16px' }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : hasError ? (
        <AlertCircle size={small ? 12 : 16} />
      ) : isPlaying ? (
        <Pause size={small ? 14 : 18} />
      ) : (
        <Play size={small ? 14 : 18} />
      )}
    </button>
  );
};

export default PlayButton;
