
import { formatTime } from "@/utils/timeUtils";

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

const TimeDisplay = ({ currentTime, duration }: TimeDisplayProps) => {
  return (
    <div className="time ms-2 small text-muted">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  );
};

export default TimeDisplay;
