
import React from 'react';

const FAQ = () => {
  return (
    <div className="container content-wrapper py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h1 className="mb-4">Frequently Asked Questions</h1>
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqOne">
                      What formats do your sample packs come in?
                    </button>
                  </h2>
                  <div id="faqOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      All our sample packs come in high-quality WAV format (24-bit, 44.1kHz). Some packs may also include 
                      additional formats like MP3 or AIFF, as well as project files for specific DAWs.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqTwo">
                      Are the samples royalty-free?
                    </button>
                  </h2>
                  <div id="faqTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes, all samples purchased from NoiseCrate are 100% royalty-free. Once you purchase a pack, you can use the 
                      samples in your music productions without paying additional fees or royalties.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqThree">
                      How do I download my purchases?
                    </button>
                  </h2>
                  <div id="faqThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      After purchasing, you can download your sample packs from your Profile page under the "My Purchases" section. 
                      Downloads are available immediately after purchase and remain accessible in your account for future downloads.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFour">
                      Can I get a refund if I'm not satisfied?
                    </button>
                  </h2>
                  <div id="faqFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Due to the digital nature of our products, all sales are final. However, we provide audio previews for all 
                      sample packs so you can hear the content before purchasing. If you experience technical issues with your download, 
                      please contact our support team, and we'll assist you.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFive">
                      How often do you add new sample packs?
                    </button>
                  </h2>
                  <div id="faqFive" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      We add new sample packs weekly. Sign up for our newsletter to be notified when new packs are released, 
                      or follow us on social media for updates and special promotions.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqSix">
                      Do you offer any free samples?
                    </button>
                  </h2>
                  <div id="faqSix" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes! We regularly offer free sample packs to our newsletter subscribers. Additionally, some of our premium packs 
                      include free demo samples that you can download before purchasing.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
