
interface BpmFilterProps {
  bpmRange: { min: number; max: number };
  onBpmChange: (type: "min" | "max", value: number) => void;
}

const BpmFilter = ({ bpmRange, onBpmChange }: BpmFilterProps) => {
  const handleBpmScroll = (type: "min" | "max", event: React.WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const delta = event.deltaY > 0 ? -1 : 1;
    const currentValue = bpmRange[type];
    let newValue = currentValue + delta;
    
    if (type === "min") {
      newValue = Math.max(70, Math.min(newValue, bpmRange.max));
    } else {
      newValue = Math.max(bpmRange.min, Math.min(newValue, 200));
    }
    
    if (newValue !== currentValue) {
      onBpmChange(type, newValue);
    }
  };

  const handleBpmFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <div className="row g-2">
      <div className="col">
        <div className="input-group input-group-sm">
          <span className="input-group-text">Min</span>
          <input
            type="number"
            className="form-control bpm-input"
            value={bpmRange.min}
            onChange={(e) => onBpmChange("min", parseInt(e.target.value))}
            onWheel={(e) => handleBpmScroll("min", e)}
            onFocus={handleBpmFocus}
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
            className="form-control bpm-input"
            value={bpmRange.max}
            onChange={(e) => onBpmChange("max", parseInt(e.target.value))}
            onWheel={(e) => handleBpmScroll("max", e)}
            onFocus={handleBpmFocus}
            min={bpmRange.min+1}
            max={200}
          />
        </div>
      </div>
    </div>
  );
};

export default BpmFilter;
