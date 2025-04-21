import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ArticleCreation: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    tags: [""],
    categories: "",
  });
  const userId = useSelector((state: any) => state.currentUser._id);
  const navigate = useNavigate();

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags((prev) => [...prev, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const submitForm = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/user/createArticle/${userId}`,
        formData
      );

      console.log("The result: ", data);
      if (data.success) {
        setTimeout(() => {
          alert("success");
          navigate("/articles");
        }, 500);
      }
    } catch (err: unknown) {
      console.log("ERROR: ", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 font-sans text-gray-800">
      <input
        onChange={(e) => onChangeHandler(e)}
        type="text"
        placeholder="Title"
        name="title"
        className="w-full text-3xl font-semibold placeholder-gray-400 mb-4 focus:outline-none"
      />

      <input
        onChange={(e) => onChangeHandler(e)}
        type="text"
        placeholder="Add a subtitle…"
        name="subtitle"
        className="w-full text-lg placeholder-gray-400 mb-6 focus:outline-none"
      />

      <div className="mb-10">
        <label className="text-sm text-gray-500 block mb-2">Upload image</label>
        <input
          onChange={(e) => onChangeHandler(e)}
          name="image"
          type="file"
          className="text-sm text-gray-500"
        />
      </div>

      <textarea
        onChange={(e) => onChangeHandler(e)}
        placeholder="Start writing…"
        name="description"
        className="w-full text-base placeholder-gray-400 focus:outline-none resize-none p-2 mb-10 rounded-xl shadow-xl border-t border-gray-300"
        rows={6}
      />

      <div className="mb-10">
        <label className="text-sm text-gray-500 block mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-sm px-3 py-1 rounded-full flex items-center"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter a tag"
            name="tags"
            className="text-sm placeholder-gray-500 shadow-xl px-2 py-1 w-full border-b rounded-xl border-gray-300 focus:outline-none"
          />
          <button
            onClick={addTag}
            className="text-sm text-gray-600 hover:text-black transition"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mb-10">
        <label className="text-sm text-gray-500 block mb-2">Categories</label>
        <select
          onChange={(e) => onChangeHandler(e)}
          name="category"
          className="w-full bg-transparent text-sm focus:outline-none"
        >
          <option value="">Select category</option>
          <option value="tech">Tech</option>
          <option value="design">Design</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
      </div>

      <div className="flex justify-end gap-4">
        {/* <button className="text-sm text-gray-500 hover:text-black transition">
          Preview
        </button> */}
        <button
          onClick={submitForm}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-sm rounded-lg transition cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ArticleCreation;
