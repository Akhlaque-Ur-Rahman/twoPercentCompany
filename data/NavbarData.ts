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
  {
    label: "Services",
    href: "/services",
    submenu: [
      {
        label: "Plots & Land",
        href: "/plots",
        description: "Residential and commercial plots",
      },
      {
        label: "Be an Investor",
        href: "/beaninvestor",
        description: "Curated opportunities for growth",
      },
    ],
  },
  { label: "About", href: "/aboutUs" },
];

export const ContactBtnData = {
  label: "Contact",
  href: "/contact",
};
