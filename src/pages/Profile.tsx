import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { SamplePack } from "@/types/types";
import { toast } from "sonner";
import ChangePassword from "@/components/ChangePassword";
import MyPurchases from "@/components/MyPurchases";

interface Profile {
  username: string;
  full_name: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [purchasedPacks, setPurchasedPacks] = useState<SamplePack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    full_name: ""
  });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, full_name, avatar_url")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
        setFormData({
          username: data.username || "",
          full_name: data.full_name || ""
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile information");
      }
    };

    const fetchPurchasedPacks = async () => {
      try {
        console.log("Fetching purchased packs for user:", user.id);
        
        const { data, error } = await supabase
          .from("purchased_packs")
          .select(`
            purchased_at,
            sample_packs!inner(
              id,
              title,
              description,
              genre,
              bpm,
              price,
              image_url,
              preview_url,
              created_at
            )
          `)
          .eq("user_id", user.id)
          .order("purchased_at", { ascending: false });

        if (error) {
          console.error("Error fetching purchased packs:", error);
          throw error;
        }

        console.log("Raw purchased packs data:", data);

        // Map the data to match the SamplePack interface
        const purchased = data?.map((row: any) => ({
          id: row.sample_packs.id,
          title: row.sample_packs.title,
          description: row.sample_packs.description || '',
          genre: row.sample_packs.genre,
          bpm: row.sample_packs.bpm,
          price: Number(row.sample_packs.price),
          imageUrl: row.sample_packs.image_url || '',
          previewUrl: row.sample_packs.preview_url || '',
          createdAt: row.sample_packs.created_at,
          purchasedAt: row.purchased_at
        })) || [];

        console.log("Mapped purchased packs:", purchased);
        setPurchasedPacks(purchased);
      } catch (error) {
        console.error("Error fetching purchased packs:", error);
        toast.error("Failed to load purchase history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
    fetchPurchasedPacks();
  }, [user]);

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: formData.username,
          full_name: formData.full_name
        })
        .eq("id", user.id);

      if (error) throw error;
      
      setProfile({
        ...profile!,
        username: formData.username,
        full_name: formData.full_name
      });
      
      setIsEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-3">
                <div className="d-flex justify-content-center">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-3" 
                    style={{width: "100px", height: "100px", fontSize: "2.5rem"}}>
                    {profile?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                  </div>
                </div>
                {isEditMode ? (
                  <form>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Username</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="full_name" className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="full_name"
                        name="full_name"
                        value={formData.full_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-primary me-2 animated-btn"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary animated-btn"
                      onClick={() => setIsEditMode(false)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <h4 className="mb-0">{profile?.full_name || "User"}</h4>
                    <p className="text-muted">@{profile?.username || user?.email}</p>
                    <p className="text-muted">{user?.email}</p>
                    <hr />
                    <div className="d-grid">
                      <button onClick={handleEditProfile} className="btn btn-outline-primary mb-2 animated-btn">Edit Profile</button>
                      <button 
                        className="btn btn-outline-secondary animated-btn"
                        onClick={() => setShowChangePassword(true)}
                      >
                        Change Password
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <MyPurchases purchasedPacks={purchasedPacks} />
        </div>
      </div>
      
      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};

export default Profile;
