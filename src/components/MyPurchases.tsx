
import { SamplePack } from "../types/types";
import SamplePackCard from "./SamplePackCard";

interface MyPurchasesProps {
  purchasedPacks: SamplePack[];
}

const MyPurchases = ({ purchasedPacks }: MyPurchasesProps) => {
  if (purchasedPacks.length === 0) {
    return (
      <div className="text-center my-5 py-5">
        <h3 className="text-muted">You haven't purchased any sample packs yet</h3>
        <p className="lead">Browse our collection and find something you like!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">My Purchases</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {purchasedPacks.map((pack) => (
          <div key={pack.id} className="col">
            <SamplePackCard samplePack={pack} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPurchases;
