
import { Play, Pause } from "lucide-react";

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
  disabled 
}: PlayButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center position-relative"
      style={{ 
        width: small ? '30px' : '40px', 
        height: small ? '30px' : '40px',
        backgroundColor: hasError ? '#dc3545' : '#6c5ce7',
        color: 'white'
      }}
      disabled={disabled || isLoading}
      title={hasError ? "Audio unavailable" : ""}
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
        <span style={{ fontSize: small ? '10px' : '12px' }}>✕</span>
      ) : isPlaying ? (
        <Pause size={small ? 14 : 18} />
      ) : (
        <Play size={small ? 14 : 18} />
      )}
    </button>
  );
};

export default PlayButton;
