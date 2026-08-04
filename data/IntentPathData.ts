export type IntentPathItem = {
  id: string;
  label: string;
  description: string;
  href: string;
};

export type AreaChip = {
  id: string;
  label: string;
  href: string;
};

export const intentPathItems: IntentPathItem[] = [
  {
    id: "buy",
    label: "Buy a home",
    description: "Verified apartments & houses across Patna",
    href: "/properties",
  },
  {
    id: "sell",
    label: "Sell property",
    description: "List with local experts — fair, clear process",
    href: "/sell",
  },
  {
    id: "rent",
    label: "Rent",
    description: "Homes for tenants and landlord listing support",
    href: "/rent",
  },
  {
    id: "plots",
    label: "Plots & land",
    description: "Prime plots for investment or development",
    href: "/plots",
  },
];

export const areaChips: AreaChip[] = [
  { id: "patna", label: "Patna", href: "/properties?location=patna" },
  { id: "danapur", label: "Danapur", href: "/properties?location=danapur" },
  {
    id: "bailey-road",
    label: "Bailey Road",
    href: "/properties?location=bailey-road",
  },
  {
    id: "kankarbagh",
    label: "Kankarbagh",
    href: "/properties?location=kankarbagh",
  },
  {
    id: "boring-road",
    label: "Boring Road",
    href: "/properties?location=boring-road",
  },
];
