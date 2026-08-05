export type NavSubItem = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  submenu?: NavSubItem[];
};

export const NavbarData: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Plots", href: "/plots" },
  { label: "Sell", href: "/sell" },
  {
    label: "Rent",
    href: "/rent",
    submenu: [
      {
        label: "For Tenants",
        href: "/rent/tenants",
        description: "Browse verified rentals in Patna",
      },
      {
        label: "For Landlords",
        href: "/rent/landlords",
        description: "List your property and reach tenants",
      },
    ],
  },
  { label: "Experts", href: "/team" },
  {
    label: "More",
    href: "/aboutUs",
    submenu: [
      {
        label: "About Us",
        href: "/aboutUs",
        description: "Our story and values",
      },
      {
        label: "Blog",
        href: "/blog",
        description: "Patna real estate guides",
      },
      {
        label: "FAQ",
        href: "/faq",
        description: "Common questions answered",
      },
    ],
  },
];

export const ContactBtnData = {
  label: "Contact",
  href: "/contact",
};
