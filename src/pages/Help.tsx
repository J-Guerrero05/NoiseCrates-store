
import React from 'react';

const Help = () => {
  return (
    <div className="container content-wrapper py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h1 className="mb-4">Help Center</h1>
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <h3>Getting Started</h3>
              <p>New to NoiseCrate? Here's how to make the most of our platform:</p>
              <ol>
                <li className="mb-2">Create an account to save your favorite sample packs and track your purchases.</li>
                <li className="mb-2">Browse our collection by genre, BPM, or use the search bar to find specific sounds.</li>
                <li className="mb-2">Preview samples before purchasing to ensure they fit your project.</li>
                <li className="mb-2">After purchase, download your sample packs from your profile page.</li>
              </ol>
            </div>
          </div>
          
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <h3>Common Issues</h3>
              <div className="accordion" id="helpAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                      I can't download my purchased sample packs
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                    <div className="accordion-body">
                      Make sure you're logged in with the account you used for the purchase. If you're still having issues, 
                      clear your browser cache or try a different browser. If the problem persists, contact our support team.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                      How do I update my payment information?
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                    <div className="accordion-body">
                      You can update your payment information in your profile settings. Navigate to the "Payment Methods" 
                      section and follow the instructions to add or update your payment details.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                      Can I use these samples in commercial projects?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#helpAccordion">
                    <div className="accordion-body">
                      Yes, all sample packs purchased on NoiseCrate include a license for commercial use. You can use these 
                      samples in your own musical productions, whether for personal or commercial purposes. However, you cannot 
                      resell the samples themselves or include them in competing sample packs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3>Contact Support</h3>
              <p>Still need help? Our support team is ready to assist you:</p>
              <ul className="list-unstyled">
                <li className="mb-2">📧 Email: support@noisecrate.com</li>
                <li className="mb-2">⏰ Support hours: Monday-Friday, 9am-6pm EST</li>
                <li className="mb-2">🔄 Average response time: Within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
