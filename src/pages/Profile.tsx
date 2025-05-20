
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { SamplePack } from "@/types/types";
import { toast } from "sonner";
import { samplePacks } from "@/data/samplePacks";

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
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile information");
      }
    };

    const fetchPurchasedPacks = async () => {
      try {
        const { data, error } = await supabase
          .from("purchased_packs")
          .select("pack_id, purchased_at")
          .eq("user_id", user.id)
          .order("purchased_at", { ascending: false });

        if (error) throw error;

        // Match purchased pack IDs with the sample pack data
        const purchased = data.map(purchase => {
          const pack = samplePacks.find(p => p.id === purchase.pack_id);
          return pack ? { 
            ...pack, 
            purchasedAt: purchase.purchased_at 
          } : null;
        }).filter(Boolean) as SamplePack[];

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
            <div className="card-body text-center">
              <img
                src={profile?.avatar_url || "https://via.placeholder.com/150"}
                alt="Profile"
                className="rounded-circle mb-3"
                width="150"
                height="150"
              />
              <h4 className="mb-0">{profile?.full_name || "User"}</h4>
              <p className="text-muted">@{profile?.username || user?.email}</p>
              <p className="text-muted">{user?.email}</p>
              <hr />
              <div className="d-grid">
                <button className="btn btn-outline-primary mb-2">Edit Profile</button>
                <button className="btn btn-outline-secondary">Change Password</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Purchase History</h5>
            </div>
            <div className="card-body">
              {purchasedPacks.length === 0 ? (
                <div className="text-center py-4">
                  <p className="mb-0">You haven't made any purchases yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sample Pack</th>
                        <th>Genre</th>
                        <th>Price</th>
                        <th>Purchase Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchasedPacks.map((pack) => (
                        <tr key={pack.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={pack.imageUrl}
                                alt={pack.title}
                                className="rounded me-2"
                                width="40"
                                height="40"
                              />
                              <div>
                                <div className="fw-bold">{pack.title}</div>
                                <div className="small text-muted">{pack.bpm} BPM</div>
                              </div>
                            </div>
                          </td>
                          <td>{pack.genre}</td>
                          <td>${pack.price.toFixed(2)}</td>
                          <td>{new Date(pack.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button className="btn btn-sm btn-primary">
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
