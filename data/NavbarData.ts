export const NavbarData = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Sell", href: "/sell" },
  // Rent dropdown
  {
    label: "Rent",
    href: "#", // non-clickable
    submenu: [
      { label: "Tenants", href: "/rent/tenants" },
      { label: "Landlords", href: "/rent/landlords" },
    ],
  },
 

  // Services dropdown
  {
    label: "Services",
    href: "#", // non-clickable
    submenu: [
      { label: "Plots", href: "/plots" },
    ],
  },

  
  { label: "About", href: "/aboutUs" },
];

// Contact button config
export const ContactBtnData = {
  label: "Contact Us",
  href: "/contact",
};
