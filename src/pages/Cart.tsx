
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice, checkout } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsProcessing(true);
    try {
      await checkout();
      navigate("/profile");
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <h2 className="mb-4">Your Cart</h2>
        <div className="card p-5 text-center">
          <p className="mb-4">Your cart is empty</p>
          <button 
            className="btn btn-primary mx-auto" 
            style={{ maxWidth: "200px" }}
            onClick={() => navigate("/")}
          >
            Browse Sample Packs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>
      <div className="row">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              {cartItems.map((item) => (
                <div key={item.id} className="row mb-3 align-items-center">
                  <div className="col-md-2 col-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-5 col-8">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-0 text-muted">{item.genre} - {item.bpm}BPM</p>
                  </div>
                  <div className="col-md-3 col-6 text-md-center mt-3 mt-md-0">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="col-md-2 col-6 text-end mt-3 mt-md-0">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax:</span>
                <span>$0.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total:</strong>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
              <button
                className="btn btn-primary w-100 mb-2"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  "Checkout"
                )}
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={clearCart}
                disabled={isProcessing}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
