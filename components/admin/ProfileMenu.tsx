"use client";

import { Popup, PopupList, useAuth, useConfig, useTranslation } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import React from "react";

function initialsFromEmail(email?: string | null) {
  if (!email) return "A";
  const local = email.split("@")[0] || email;
  const parts = local.split(/[._\-\s]+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  }
  return local.slice(0, 2).toUpperCase();
}

export default function ProfileMenu() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { config } = useConfig();

  const {
    admin: {
      routes: { account: accountRoute, logout: logoutRoute },
    },
    routes: { admin: adminRoute },
  } = config;

  const email = typeof user?.email === "string" ? user.email : "";
  const initials = initialsFromEmail(email);
  const accountHref = formatAdminURL({ adminRoute, path: accountRoute });
  const logoutHref = formatAdminURL({ adminRoute, path: logoutRoute });

  return (
    <div className="tpc-profile">
      <Popup
        button={
          <span
            className="tpc-profile__trigger"
            title={email || "Account"}
            aria-label={email ? `Account menu for ${email}` : "Account menu"}
          >
            <span className="tpc-profile__avatar" aria-hidden>
              {initials}
            </span>
            <span className="tpc-profile__meta">
              <span className="tpc-profile__email">{email || "Account"}</span>
              <span className="tpc-profile__hint">Account</span>
            </span>
            <svg
              className="tpc-profile__caret"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        }
        buttonType="custom"
        caret={false}
        className="tpc-profile__popup"
        horizontalAlign="right"
        size="large"
        verticalAlign="bottom"
        render={({ close }) => (
          <PopupList.ButtonGroup>
            <div className="tpc-profile__header">
              <span className="tpc-profile__avatar tpc-profile__avatar--lg" aria-hidden>
                {initials}
              </span>
              <div>
                <div className="tpc-profile__header-email">{email || "Admin"}</div>
                <div className="tpc-profile__header-role">Administrator</div>
              </div>
            </div>
            <PopupList.Divider />
            <PopupList.Button href={accountHref} onClick={() => close()}>
              {t("authentication:account")}
            </PopupList.Button>
            <PopupList.Button href="/" onClick={() => close()}>
              View website
            </PopupList.Button>
            <PopupList.Divider />
            <PopupList.Button href={logoutHref} onClick={() => close()}>
              {t("authentication:logOut")}
            </PopupList.Button>
          </PopupList.ButtonGroup>
        )}
      />
    </div>
  );
}
