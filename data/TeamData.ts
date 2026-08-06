export type TeamMember = {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  photo: string;
  areas: string[];
  phone?: string;
  email?: string;
  order: number;
};

export const TeamMemberData: TeamMember[] = [
  {
    id: "1",
    name: "Amit Kumar",
    slug: "amit-kumar",
    role: "Senior Property Advisor",
    bio: "Helps families find verified homes across Bailey Road, Boring Road, and Patliputra. Focused on clear pricing and fair process.",
    photo: "/images/avatar1.png",
    areas: ["Bailey Road", "Boring Road", "Patliputra"],
    phone: "+91 99559 96464",
    email: "2percent-patna@gmail.com",
    order: 1,
  },
  {
    id: "2",
    name: "Priya Sharma",
    slug: "priya-sharma",
    role: "Rental & Tenant Specialist",
    bio: "Matches tenants with ready-to-move homes and supports landlords with listing, screening, and handover.",
    photo: "/images/avatar2.png",
    areas: ["Kankarbagh", "Danapur", "Patna"],
    phone: "+91 99559 96464",
    order: 2,
  },
  {
    id: "3",
    name: "Rahul Singh",
    slug: "rahul-singh",
    role: "Plots & Investment Advisor",
    bio: "Guides plot buyers on title clarity, locality growth, and long-term investment fit across Patna corridors.",
    photo: "/images/avatar3.png",
    areas: ["Danapur", "Patna outskirts"],
    phone: "+91 99559 96464",
    order: 3,
  },
];
