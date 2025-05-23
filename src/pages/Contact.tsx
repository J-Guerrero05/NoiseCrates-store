
import React from 'react';

const Contact = () => {
  return (
    <div className="container content-wrapper py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="mb-4">Contact Us</h1>
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <p className="mb-4">Have questions or suggestions? Reach out to our team using the form below or contact us directly.</p>
              
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Your name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="your.email@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" className="form-control" id="subject" placeholder="Subject" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows={5} placeholder="Your message here"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
              
              <div className="mt-5">
                <h4>Contact Information</h4>
                <ul className="list-unstyled">
                  <li className="mb-2">📧 Email: contact@noisecrate.com</li>
                  <li className="mb-2">📱 Phone: (555) 123-4567</li>
                  <li className="mb-2">🏢 Address: 123 Music Street, Beat City, BC 12345</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
