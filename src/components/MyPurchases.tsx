
import { SamplePack } from "../types/types";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface MyPurchasesProps {
  purchasedPacks: SamplePack[];
}

const MyPurchases = ({ purchasedPacks }: MyPurchasesProps) => {
  console.log("MyPurchases - received packs:", purchasedPacks);

  const handleDownload = (pack: SamplePack) => {
    // In a real app, this would trigger the actual download
    toast.success(`Downloading ${pack.title}...`);
    console.log("Downloading pack:", pack.title);
  };

  if (purchasedPacks.length === 0) {
    return (
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">My Purchases</h5>
        </div>
        <div className="card-body">
          <div className="text-center py-4">
            <h6 className="text-muted">You haven't purchased any sample packs yet</h6>
            <p className="lead">Browse our collection and find something you like!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">My Purchases ({purchasedPacks.length})</h5>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          {purchasedPacks.map((pack) => (
            <div key={pack.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
              <div className="flex-grow-1">
                <h6 className="mb-1">{pack.title}</h6>
                <div className="d-flex gap-2 mb-1">
                  <span className="badge bg-primary">{pack.genre}</span>
                  <span className="badge bg-secondary">{pack.bpm} BPM</span>
                </div>
                {pack.purchasedAt && (
                  <small className="text-muted">
                    Purchased: {new Date(pack.purchasedAt).toLocaleDateString()}
                  </small>
                )}
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="fw-bold">${pack.price}</span>
                <Button 
                  onClick={() => handleDownload(pack)}
                  size="sm"
                  className="d-flex align-items-center gap-1"
                >
                  <Download size={16} />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPurchases;
