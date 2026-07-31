export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  title: string;
  feedback: string;
  rating: number;
  image: string;
}

export const TestimonialData: TestimonialItem[] = [
  {
    id: 1,
    name: "Rohan Mehta",
    location: "Patna, Bihar",
    title: "Found our home with clarity",
    feedback:
      "2% Company made the search feel simple. Clear options, honest guidance, and a home we were happy to choose.",
    rating: 5,
    image: "/images/avatar1.png",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Bailey Road, Patna",
    title: "Smooth from enquiry to keys",
    feedback:
      "Communication stayed clear at every step. We always knew what came next — that confidence mattered most.",
    rating: 5,
    image: "/images/avatar3.png",
  },
  {
    id: 3,
    name: "Arjun Nair",
    location: "Kankarbagh, Patna",
    title: "Right plot, right timing",
    feedback:
      "They helped us compare plots without pressure and pick one that fit both our budget and long-term plans.",
    rating: 4,
    image: "/images/avatar2.png",
  },
  {
    id: 4,
    name: "Neha Kapoor",
    location: "Danapur, Patna",
    title: "Reliable through paperwork",
    feedback:
      "Listing and paperwork were handled carefully. We felt supported, not rushed — exactly what we needed.",
    rating: 5,
    image: "/images/avatar3.png",
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Patliputra, Patna",
    title: "Stress-free buying",
    feedback:
      "Buying felt organised from day one. Professional, responsive, and focused on what actually mattered to us.",
    rating: 5,
    image: "/images/avatar2.png",
  },
  {
    id: 6,
    name: "Ananya Iyer",
    location: "Boring Road, Patna",
    title: "Trusted local advice",
    feedback:
      "Their local insight helped us avoid wrong turns. We closed on a place that truly fits our family.",
    rating: 4,
    image: "/images/avatar3.png",
  },
];
