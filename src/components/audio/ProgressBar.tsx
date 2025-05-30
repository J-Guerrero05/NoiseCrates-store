
interface ProgressBarProps {
  currentTime: number;
  duration: number;
}

const ProgressBar = ({ currentTime, duration }: ProgressBarProps) => {
  return (
    <div className="progress position-relative flex-grow-1" style={{ height: '6px' }}>
      <div 
        className="progress-bar"
        role="progressbar"
        style={{ 
          width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
          backgroundColor: '#6c5ce7'
        }}
        aria-valuenow={duration > 0 ? (currentTime / duration) * 100 : 0}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};

export default ProgressBar;
