import { Mail, MapPin, Phone } from "lucide-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";



/**
 * === Contact Information ===
 *
 * Used in the Contact Me section to display personal details.
 * 
 * Fields:
 * - icon: Icon component for visual representation
 * - title: Label (e.g., Phone, Email)
 * - value: Actual content to display
 * - canCopy (optional): Enables click-to-copy functionality
 */
export const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "Available upon request",
  },
  {
    icon: Mail,
    title: "Email",
    value: "shahzaibawan1357@gmail.com",
    canCopy: true, // Enables clipboard copy on click
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Pakistan (Remote Collaboration Worldwide)",
  },
];



/**
 * === Social Links ===
 *
 * Used to render social media icons with external links.
 * 
 * Fields:
 * - icon: Social platform icon
 * - href: External profile URL
 */
export const socialLinks = [
  {
    icon: BsGithub,
    href: "https://github.com/shahzaib-awann",
  },
  {
    icon: BsLinkedin,
    href: "https://linkedin.com/in/shahzaib-awan-dev",
  },
];



/**
 * === Testimonials / Reviews Data ===
 *
 * An array of testimonial objects used to render user reviews.
 *
 * Fields:
 * - name (string): Reviewer's name
 * - review (string): Review text / feedback
 * - stars (number): Rating given by the reviewer (e.g., 1–5)
 */
export const testimonials = [
  {
    name: "Hassnain Yaqub",
    review: "Solid developer. Helped me fix issues quickly and improved overall performance.",
    stars: 5,
  },
  {
    name: "Mateen Rajput",
    review: "Very cooperative and easy to work with. Delivered exactly what I needed.",
    stars: 5,
  },
  {
    name: "Adresh Kumar",
    review: "Good experience overall. Handled both frontend and backend without problems.",
    stars: 4,
  },
];



/**
 * === Services Offered ===
 *
 * Represents a list of professional services provided.
 *
 * Each service object includes:
 * - id (string) - Unique identifier for the service.
 * - title (string) - Name of the service.
 * - desc (string) - Brief description of the service, highlighting features and value.
 */
export const services = [
  {
      id: "01",
      title: "Web App Development",
      desc: "Building modern, scalable web applications with Next.js, focused on performance, reliability, and seamless user experience.",
  },
  {
      id: "02",
      title: "Mobile App Development",
      desc: "Creating intuitive and high-performing mobile applications designed for smooth interaction and consistent user experience.",
  },
  {
      id: "03",
      title: "Desktop Software Solutions",
      desc: "Developing efficient desktop applications tailored for speed, usability, and real-world productivity.",
  },
  {
      id: "04",
      title: "AI Systems & Automation",
      desc: "Enhancing applications with intelligent capabilities that automate workflows and deliver smarter user interactions.",
  },
];