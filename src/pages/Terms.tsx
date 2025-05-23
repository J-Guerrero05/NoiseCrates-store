
import React from 'react';

const Terms = () => {
  return (
    <div className="container content-wrapper py-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h1 className="mb-4">Terms of Service</h1>
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              
              <h3>1. Introduction</h3>
              <p>Welcome to NoiseCrate! These Terms of Service govern your use of our website and services. 
              By accessing or using NoiseCrate, you agree to be bound by these Terms.</p>
              
              <h3>2. Accounts</h3>
              <p>When you create an account with us, you must provide accurate information. You are responsible 
              for maintaining the security of your account and password.</p>
              
              <h3>3. Sample Licenses</h3>
              <p>All sample packs purchased through NoiseCrate come with a standard license that allows you to use
              the samples in your own productions. You may not resell or redistribute these samples.</p>
              
              <h3>4. Payments</h3>
              <p>All payments are processed securely. Once a purchase is made, downloads are available immediately. 
              We reserve the right to change pricing at any time.</p>
              
              <h3>5. Refunds</h3>
              <p>Due to the digital nature of our products, all sales are final. However, if you experience technical 
              issues with your download, please contact our support team.</p>
              
              <h3>6. Limitation of Liability</h3>
              <p>NoiseCrate shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
              resulting from your use of or inability to use our service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
