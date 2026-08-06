import React from "react";

/** Quick link under collection nav: open the public site. */
export default function NavFooterLink() {
  return (
    <div className="tpc-nav-extra">
      <a className="tpc-nav-extra__link" href="/" target="_blank" rel="noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>View website</span>
      </a>
    </div>
  );
}
