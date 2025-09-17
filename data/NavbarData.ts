// data/NavbarData.ts
export const NavbarData = [
  { label: "Home", href: "/" },
  { label: "About", href: "/aboutUs" },
  { label: "Properties", href: "/properties" },
  {
  label: "Services",
  href: "/services",
  submenu: [
    { label: "Plots", href: "/services/plots" }, // only the new page
  ],
}

  
];

// Contact button config
export const ContactBtnData = {
  label: "Contact Us",
  href: "/contact",
};
