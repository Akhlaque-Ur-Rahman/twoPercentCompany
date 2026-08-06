import Link from "next/link";
import React from "react";

export default function BeforeDashboard() {
  return (
    <div className="tpc-before-dashboard">
      <div className="tpc-before-dashboard__copy">
        <p className="tpc-before-dashboard__eyebrow">Welcome back</p>
        <h2 className="tpc-before-dashboard__title">2% Company Content Studio</h2>
        <p className="tpc-before-dashboard__text">
          Manage listings, media, team profiles, FAQs, posts, and inbound leads.
        </p>
      </div>
      <div className="tpc-before-dashboard__actions">
        <Link
          className="tpc-before-dashboard__btn tpc-before-dashboard__btn--primary"
          href="/admin/collections/listings"
        >
          Open Listings
        </Link>
        <Link className="tpc-before-dashboard__btn" href="/admin/collections/leads">
          View Leads
        </Link>
        <a className="tpc-before-dashboard__btn" href="/" target="_blank" rel="noreferrer">
          View site
        </a>
      </div>
    </div>
  );
}
