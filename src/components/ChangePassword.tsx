
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface ChangePasswordProps {
  onClose: () => void;
}

const ChangePassword = ({ onClose }: ChangePasswordProps) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field]
    });
  };

  const validateForm = () => {
    if (!formData.currentPassword) {
      toast.error("Current password is required");
      return false;
    }
    if (!formData.newPassword) {
      toast.error("New password is required");
      return false;
    }
    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return false;
    }
    if (formData.currentPassword === formData.newPassword) {
      toast.error("New password must be different from current password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Change Password</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              disabled={isLoading}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <div className="input-group">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => togglePasswordVisibility('current')}
                    disabled={isLoading}
                  >
                    {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <div className="input-group">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => togglePasswordVisibility('new')}
                    disabled={isLoading}
                  >
                    {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="form-text">Password must be at least 6 characters long.</div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <div className="input-group">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => togglePasswordVisibility('confirm')}
                    disabled={isLoading}
                  >
                    {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-outline-secondary animated-btn" 
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary animated-btn" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
