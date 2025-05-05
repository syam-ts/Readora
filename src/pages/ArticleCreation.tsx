import axios from "axios";
import React, { useState } from "react";
import { config } from "../config/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorComponent } from "../components/errorComponents/ErrorComponent";
import { apiInstance } from "../api/axiosInstance/axiosInstance";
import { articleCreationSchema } from "../utils/validation/articleCreationSchema";
import { UserState } from "../config/UserStateConftg";

interface FormData {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
}

const ArticleCreation: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    tags: [""],
    category: "",
  });
  const userId: string = useSelector((state: UserState) => state.currentUser._id);
  const navigate = useNavigate();

  const onChangeHandler = (e: any): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addTag = (): void => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags((prev) => [...prev, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string): void => {
    setTags(tags.filter((t) => t !== tag));
  };

  const cloudinaryInstance = axios.create({
    baseURL: `${config.CLOUDINARY_BASEURL}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const handleFileUpload = async (e: any): Promise<void> => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "devlink-userProfle"),
        data.append("cloud_name", "dusbc29s2");

      console.log("file", [...data.entries()]);
      const response = await cloudinaryInstance.post("", data);
      console.log("finl imag: ", response.data?.url);
      formData.image = response.data?.url;
      setPreview(response.data.url);
    } catch (err) {
      console.log("ERR: ", err);
    }
  };

  const submitForm = async (): Promise<void> => {
    try {
      console.log("FORM: ", formData);
      formData.tags = tags;
      const validForm = await articleCreationSchema.validate(formData, {
        abortEarly: false,
      });

      if (validForm) {
        const { data } = await apiInstance.post(
          `${config.SERVER_URL}/article/${userId}`,
          formData
        );
 
        if (data.success) {
          setTimeout(() => {
            alert("success");
            navigate("/articles");
          }, 500);
        }
      } else {
        await articleCreationSchema.validate(formData, {
          abortEarly: false,
        });
      }
    } catch (error: unknown) {
      const err = error as { errors: string[] };
      setError(err.errors);
      console.log("ERROR: ", err.errors);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-neutral-800 font-sans">
      {/* Title */}
      <div className="grid gap-1 my-5">
        <input
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Title"
          className="w-full text-2xl font-medium placeholder-neutral-400 mb-4 focus:outline-none"
        />

        <ErrorComponent
          error={error}
          e1="Title is required"
          e2="Invalid title (minimum 10 characters)"
          e3="Invalid title (maximum 80 characters)"
        />
      </div>

      {/* Subtitle */}
      <div className="grid gap-1 my-5">
        <input
          onChange={onChangeHandler}
          type="text"
          name="subtitle"
          placeholder="Add a subtitle…"
          className="w-full text-md placeholder-neutral-400 focus:outline-none"
        />
        <ErrorComponent
          error={error}
          e1="Subtitle is required"
          e2="Invalid subtitle (minimum 10 characters)"
          e3="Invalid subtitle (maximum 50 characters)"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-12 grid">
        <label className="text-xs text-neutral-500 mb-2">Upload image</label>
        <input
          onChange={handleFileUpload}
          name="image"
          type="file"
          className="text-xs text-neutral-500 border w-2/7 py-1 rounded-sm"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 w-48 h-48 object-cover rounded-md border"
          />
        )}
      </div>

      {/* Description */}
      <div className="grid gap-5">
        <label className="text-md text-neutral-500">Description</label>
        <textarea
          onChange={onChangeHandler}
          name="description"
          placeholder="Start writing…"
          rows={8}
          className="w-full text-sm placeholder-neutral-400 focus:outline-none resize-none border border-neutral-300 rounded-xl p-3 "
        />
        <ErrorComponent
          error={error}
          e1="Description is required"
          e2="Description should have atleast 80 characters"
          e3="Description should be under 450 characters"
        />
      </div>

      {/* Tags */}
      <div className="mb-12 pt-5">
        <label className="text-xs text-neutral-500 block mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-neutral-100 px-3 py-1 rounded-full flex items-center"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 text-neutral-400 hover:text-neutral-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            name="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter a tag"
            className="w-2/4 text-xs placeholder-neutral-400 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none"
          />
          <button
            onClick={addTag}
            className="text-xs text-neutral-600 hover:text-black transition"
          >
            Add
          </button>
        </div>
        <ErrorComponent
          error={error}
          e1="Tags are required"
          e2="Minimum 3 tags needed"
          e3="Maximum 5 tags are allowed"
        />
      </div>

      {/* Categories */}
      <div className="mb-14">
        <label className="text-xs text-neutral-500 block mb-2">
          Categories
        </label>
        <select
          onChange={onChangeHandler}
          name="category"
          className="w-full text-xs bg-transparent border border-neutral-300 px-2 py-2 rounded-md focus:outline-none"
        >
          <option value="">Select category</option>
          <option value="tech">Tech</option>
          <option value="design">Design</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
        <ErrorComponent
          error={error}
          e1="Category is required"
          e2="Categorey is required (minimum 10 characters)"
          e3="Categorey is required (maximum 80 characters)"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={submitForm}
          className="text-xs px-6 py-2 border bg-sky-500 text-white border-neutral-300 rounded-md hover:bg-neutral-100 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ArticleCreation;
