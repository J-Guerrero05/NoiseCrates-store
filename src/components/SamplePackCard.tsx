
import { SamplePack } from "../types/types";
import AudioPlayer from "./AudioPlayer";

interface SamplePackCardProps {
  samplePack: SamplePack;
}

const SamplePackCard = ({ samplePack }: SamplePackCardProps) => {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="position-relative">
        <img 
          src={samplePack.imageUrl} 
          className="card-img-top" 
          alt={samplePack.title} 
          style={{ 
            height: "180px", 
            objectFit: "cover",
            filter: "brightness(0.8)"
          }}
        />
        <div className="position-absolute bottom-0 start-0 w-100 p-2">
          <AudioPlayer audioSrc={samplePack.previewUrl} small={true} />
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title mb-1">{samplePack.title}</h5>
        <div className="d-flex mb-2 align-items-center">
          <span className="badge bg-primary me-2">{samplePack.genre}</span>
          <span className="badge bg-secondary">{samplePack.bpm} BPM</span>
        </div>
        <p className="card-text small text-muted">{samplePack.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="fs-5 fw-bold">${samplePack.price}</span>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default SamplePackCard;
