
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h5 className="mb-3">
              <span className="text-primary">Noise</span>Crate
            </h5>
            <p className="small text-white">
              The best marketplace for music producers to find high-quality sample packs.
            </p>
          </div>
          <div className="col-md-2">
            <h6 className="mb-3">Company</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/about" className="footer-link small">About</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/contact" className="footer-link small">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <h6 className="mb-3">Legal</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/terms" className="footer-link small">Terms</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/privacy" className="footer-link small">Privacy</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="mb-3">Support</h6>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/help" className="footer-link small">Help Center</Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/faq" className="footer-link small">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-3" />
        <div className="d-flex justify-content-between">
          <p className="small text-white">&copy; {new Date().getFullYear()} NoiseCrate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
