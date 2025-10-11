// data/NavbarData.ts
export const NavbarData = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { label: "About", href: "/aboutUs" },
  {
  label: "Services",
  href: "/services",
  submenu: [
    { label: "Plots", href: "/plots" }, // only the new page
  ],
  
}

  
];

// Contact button config
export const ContactBtnData = {
  label: "Contact Us",
  href: "/contact",
};
