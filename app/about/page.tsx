import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import Link from "next/link";

const About = () => {
  return (
    <div className="flex-1 bg-white p-5 h-full rounded-2xl">
      {/* Top Button Section */}
      <div className="w-full text-end">
        <Link href="/about/contact">
          {" "}
          <Button className="p-2 w-full">
            {" "}
            <MailIcon /> Contact{" "}
          </Button>{" "}
        </Link>
      </div>
      {/* About Us Section */}
      <div className="flex max-w-6xl mx-auto flex-col mb-10">
        <h1 className="text-4xl font-bold mb-5">About Us</h1>
        <p className="text-lg leading-7 mb-5">
          Welcome to <span className="font-semibold">Notion Clone</span>, a
          sleek and dynamic platform designed to empower users to collaborate,
          create, and manage their documents effortlessly. With a focus on
          simplicity, real-time collaboration, and a feature-rich experience,
          our platform is built to serve as your ultimate productivity tool.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
        <p className="text-lg leading-7 mb-5">
          At <span className="font-semibold">Notion Clone</span>, we aim to
          redefine how individuals and teams organize their work. Whether you
          are brainstorming ideas, drafting reports, or managing shared content,
          our platform offers the perfect blend of functionality and
          user-friendliness.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Features We Offer</h2>
        <ul className="list-disc list-inside text-lg leading-7 space-y-2 mb-5">
          <li>
            Real-Time Collaboration: Seamlessly collaborate with your team using
            Liveblocks-powered sessions for instant updates and interaction.
          </li>
          <li>
            Personalized Experience: Enjoy a tailored workspace with user
            authentication and profile management through Clerk.
          </li>
          <li>
            Sleek and Modern Design: Powered by cutting-edge tools like Framer
            Motion and TailwindCSS, our platform offers an aesthetically
            pleasing and intuitive user interface.
          </li>
          <li>
            Advanced Document Editing: Utilize BlockNote for rich-text editing
            and markdown support to bring your ideas to life.
          </li>
          <li>
            Themes and Accessibility: Switch effortlessly between light and dark
            modes to suit your preferences, thanks to our theme management
            system.
          </li>
          <li>
            Interactive Elements: Experience animations and interactions powered
            by libraries like Spline and Radix UI.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">
          Built with Passion and Technology
        </h2>
        <p className="text-lg leading-7 mb-5">
          Our platform is powered by modern web technologies like{" "}
          <span className="font-semibold">Next.js</span>,{" "}
          <span className="font-semibold">TypeScript</span>, and{" "}
          <span className="font-semibold">Firebase</span>. With the integration
          of tools such as <span className="font-semibold">Liveblocks</span>,{" "}
          <span className="font-semibold">Yjs</span>, and{" "}
          <span className="font-semibold">React</span>, we ensure a seamless
          experience for users, no matter their needs.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Why Choose Us?</h2>
        <p className="text-lg leading-7">
          We believe in providing a robust, reliable, and user-friendly platform
          where creativity and productivity thrive. With features like
          collaborative editing, live updates, and secure access control,{" "}
          <span className="font-semibold">Notion Clone</span> is your go-to
          solution for document management and collaboration.
        </p>
      </div>
    </div>
  );
};

export default About;
