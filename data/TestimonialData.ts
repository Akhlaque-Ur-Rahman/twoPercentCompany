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
    location: "India, Mumbai",
    title: "Outstanding Experience",
    feedback:
      "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended!",
    rating: 5,
    image: "/images/avatar1.png",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "India, Delhi",
    title: "Smooth Buying Process",
    feedback:
      "Estatein guided us perfectly through the buying process. Excellent communication and support throughout.",
    rating: 4,
    image: "/images/avatar3.png",
  },
  {
    id: 3,
    name: "Arjun Nair",
    location: "India, Bengaluru",
    title: "Best Property Deals",
    feedback:
      "Amazing service! They found us the best property within our budget. Very professional.",
    rating: 4,
    image: "/images/avatar2.png",
  },
  {
    id: 4,
    name: "Neha Kapoor",
    location: "India, Chandigarh",
    title: "Reliable Service",
    feedback:
      "The team helped us find a property quickly and handled all the paperwork smoothly. Very reliable service!",
    rating: 3,
    image: "/images/avatar3.png",
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "India, Jaipur",
    title: "Dream Home Secured",
    feedback:
      "Estatein made buying our dream home simple and stress-free. Truly professional and supportive.",
    rating: 5,
    image: "/images/avatar2.png",
  },
  {
    id: 6,
    name: "Ananya Iyer",
    location: "India, Chennai",
    title: "Professional Team",
    feedback:
      "Their expertise and attention to detail impressed us. They ensured we got the best property for our family.",
    rating: 4,
    image: "/images/avatar3.png",
  },
];
