
import { SamplePack } from "../types/types";
import SamplePackCard from "./SamplePackCard";

interface MyPurchasesProps {
  purchasedPacks: SamplePack[];
}

const MyPurchases = ({ purchasedPacks }: MyPurchasesProps) => {
  console.log("MyPurchases - received packs:", purchasedPacks);

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
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
          {purchasedPacks.map((pack) => (
            <div key={pack.id} className="col">
              <SamplePackCard samplePack={pack} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPurchases;
