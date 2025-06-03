
  import { SamplePack } from "../types/types";
  import AudioPlayer from "./AudioPlayer";
  import { useAuth } from "@/context/AuthContext";
  import { useNavigate } from "react-router-dom";
  import { toast } from "sonner";
  import { useCart } from "@/context/CartContext";

  interface SamplePackCardProps {
    samplePack: SamplePack;
  }

  const SamplePackCard = ({ samplePack }: SamplePackCardProps) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addToCart } = useCart();
  console.log("1111111111111111111111");
  console.log(samplePack);

    const handleAddToCart = () => {
      if (!user) {
        toast.error("Please log in to add items to your cart");
        navigate("/login");
        return;
      }
      addToCart(samplePack);
    };

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
          <AudioPlayer audioSrc={"./audios/" + samplePack.previewUrl} small={true} />
          </div>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-1">{samplePack.title}</h5>
          <div className="d-flex mb-2 align-items-center">
            <span className="badge bg-primary me-2">{samplePack.genre}</span>
            <span className="badge bg-secondary">{samplePack.bpm} BPM</span>
          </div>
          <p className="card-text small text-muted flex-grow-1">{samplePack.description}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
            <span className="fs-5 fw-bold">${samplePack.price}</span>
            <button 
              className="btn btn-primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default SamplePackCard;
