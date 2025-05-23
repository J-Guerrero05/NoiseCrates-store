
import React from 'react';

const Privacy = () => {
  return (
    <div className="container content-wrapper py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h1 className="mb-4">Privacy Policy</h1>
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h3>1. Information We Collect</h3>
              <p>We collect information you provide when creating an account, making a purchase, or contacting us. 
              This may include your name, email address, and payment information.</p>
              
              <h3>2. How We Use Your Information</h3>
              <p>We use your information to provide and improve our services, process transactions, 
              send notifications about your account, and respond to your inquiries.</p>
              
              <h3>3. Information Sharing</h3>
              <p>We do not sell or rent your personal information to third parties. We may share information 
              with service providers who help us operate our business.</p>
              
              <h3>4. Data Security</h3>
              <p>We implement appropriate security measures to protect your personal information. However, 
              no method of transmission over the internet is 100% secure.</p>
              
              <h3>5. Cookies and Tracking</h3>
              <p>We use cookies and similar tracking technologies to analyze website usage and improve your experience.</p>
              
              <h3>6. Your Rights</h3>
              <p>Depending on your location, you may have rights regarding your personal information, 
              including the right to access, correct, or delete your data.</p>
              
              <h3>7. Changes to This Policy</h3>
              <p>We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
