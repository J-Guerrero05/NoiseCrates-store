
import { useSamplePacks } from "@/hooks/useSamplePacks";
import SamplePackCard from "@/components/SamplePackCard";

const Index = () => {
  const { data: samplePacks = [], isLoading, error } = useSamplePacks();

  console.log("Index page - sample packs data:", samplePacks);
  console.log("Index page - number of packs:", samplePacks.length);

  if (isLoading) {
    return (
      <div className="container mb-5">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Index page - error loading packs:", error);
    return (
      <div className="container mb-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Sample Packs</h4>
          <p>We encountered an error while loading the sample packs. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mb-5">
      <div className="hero-section text-center py-5 mb-5">
        <h1 className="display-4 fw-bold mb-3">Premium Sample Packs</h1>
        <p className="lead text-muted mb-4">
          Discover high-quality samples from top producers
        </p>
      </div>

      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Featured Sample Packs ({samplePacks.length} total)</h2>
          {samplePacks.length === 0 ? (
            <div className="text-center my-5 py-5">
              <h3 className="text-muted">No sample packs available</h3>
              <p>Check back later for new releases</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
              {samplePacks.map((pack, index) => {
                console.log(`Rendering pack ${index + 1}:`, pack);
                return (
                  <div key={pack.id} className="col">
                    <SamplePackCard samplePack={pack} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
