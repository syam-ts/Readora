import React, { useState } from "react";

interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        alert("Message sent!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 nunito-regular">
  <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Contact Us</h1>
  <p className="text-base sm:text-lg mb-8 leading-relaxed text-gray-300">
    Have a question, feedback, or just want to say hello? We'd love to hear
    from you. Fill out the form below and we'll get back to you as soon as
    we can.
  </p>

  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label className="block mb-2 text-sm font-medium text-white">Name</label>
      <input
        type="text"
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block mb-2 text-sm font-medium text-white">Email</label>
      <input
        type="email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block mb-2 text-sm font-medium text-white">Message</label>
      <textarea
        name="message"
        rows={5}
        required
        value={formData.message}
        onChange={handleChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <button
      type="submit"
      className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors px-6 py-3 rounded-lg font-semibold w-full sm:w-auto"
    >
      Send Message
    </button>
  </form>
</div>

    );
};

export default Contact;
