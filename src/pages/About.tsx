import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 nunito-regular ">
      <h1 className="text-4xl font-bold mb-6 text-white">About REadora</h1>

      <p className="text-xl mb-6 leading-relaxed ">
        <span className="text-indigo-400 font-semibold ">REadora</span> is a modern platform where knowledge flows freely. Designed as an intelligent article feed site, REadora connects readers to curated insights, thought-provoking ideas, and stories that matter — all in one place.
      </p>

      <p className="text-lg mb-6 leading-relaxed ">
        Whether you're a passionate reader looking to stay updated or a writer aiming to reach an engaged audience, REadora is your destination. Our minimal, distraction-free interface ensures you focus on what truly matters: <span className="font-medium text-white">the content</span>.
      </p>

      <p className="text-lg mb-6 leading-relaxed ">
        From technology and design to lifestyle and personal growth, we welcome diverse voices and perspectives. REadora is built with speed, accessibility, and simplicity in mind — powered by <span className="text-indigo-400">React.js</span> and styled with <span className="text-indigo-400">Tailwind CSS</span>.
      </p>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-white">Our Vision</h2>
        <p className="text-lg ">
          To create a space where quality content finds its readers effortlessly — and readers discover new passions, one article at a time.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-white">Join the REadora Community</h2>
        <p className="text-lg ">
          Whether you’re here to read, write, or explore — welcome. Let’s make reading meaningful again.
        </p>
      </div>
    </div>
  );
};

export default About;
