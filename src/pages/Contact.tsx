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
        <div className="max-w-3xl mx-auto px-4 py-12 nunito-regular">
            <h1 className="text-4xl font-bold mb-6  ">Contact Us</h1>
            <p className="text-lg mb-8 leading-relaxed ">
                Have a question, feedback, or just want to say hello? We'd love to hear
                from you. Fill out the form below and we'll get back to you as soon as
                we can.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3   rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">Message</label>
                    <textarea
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors px-6 py-3 rounded-lg font-semibold"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
