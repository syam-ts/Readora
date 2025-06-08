import axios from "axios";
import { toast } from "sonner";
import React, { useState } from "react";
import { config } from "../../config/config"; 
import { useNavigate } from "react-router-dom";
import { Sonner } from "../../components/sonner/Sonner"; 
import { categories } from "../../utils/constants/categories";
import { apiInstance } from "../../api/axiosInstance/axiosInstance";
import { ErrorComponent } from "../../components/errorComponents/ErrorComponent";
import { articleCreationSchema } from "../../utils/validation/articleCreationSchema";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    tags: [""],
    category: "",
  });
 
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
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "devlink-userProfle"),
      data.append("cloud_name", "dusbc29s2");

    console.log("the data", data);
    try {
      setLoadingImage(true);
      const response = await cloudinaryInstance.post("", data);
      console.log("finl imag: ", response.data?.url);
      formData.image = response.data?.url;
      setPreview(response.data.url);
      setLoadingImage(false);
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
        setLoading(true);
        const { data } = await apiInstance.post(`/article/create`, formData, {
          withCredentials: true, 
        });

        if (data.success) {
          setTimeout(() => {
            toast.success("article created succssfully", {
              position: "top-center",
              style: {
                backgroundColor: "green",
                color: "white",
                width: "16rem",
                height: "3rem",
                justifyContent: "center",
                border: "none",
              },
            });
          }, 500);
          navigate("/articles");
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
    <div className="max-w-2xl mx-auto px-4 pt-28 text-neutral-800 font-sans">
      <Sonner />

      {/* Title */}
      <div className="mb-6">
        <input
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Title"
          className="w-full text-xl font-semibold placeholder-neutral-400 bg-white border border-neutral-200 px-4 py-2 shadow-xs focus:ring-1 focus:ring-gray-500 focus:outline-none rounded-md"
        />
        <ErrorComponent
          error={error}
          e1="Title is required"
          e2="Invalid title (minimum 10 characters)"
          e3="Invalid title (maximum 80 characters)"
        />
      </div>

      {/* Subtitle */}
      <div className="mb-6">
        <input
          onChange={onChangeHandler}
          type="text"
          name="subtitle"
          placeholder="Add a subtitle…"
          className="w-full text-base placeholder-neutral-400 bg-white border border-neutral-200 px-4 py-2 shadow-xs focus:ring-1 focus:ring-gray-500 focus:outline-none rounded-md"
        />
        <ErrorComponent
          error={error}
          e1="Subtitle is required"
          e2="Invalid subtitle (minimum 10 characters)"
          e3="Invalid subtitle (maximum 50 characters)"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-10">
        <label className="block text-sm text-neutral-500 mb-2">
          {
            loadingImage ? <p> Loading...</p> : <p>Upload Image</p>
          }
        </label>
        <input
          onChange={handleFileUpload}
          name="image"
          type="file"
          className="text-sm text-neutral-600 file:mr-4 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 file:rounded-lg"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 w-40 h-40 object-cover border border-neutral-200 rounded-md"
          />
        )}
      </div>

      {/* Description */}
      <div className="mb-10">
        <label className="text-sm text-neutral-500 block mb-2">
          Description
        </label>
        <textarea
          onChange={onChangeHandler}
          name="description"
          placeholder="Start writing…"
          rows={6}
          className="w-full text-sm placeholder-neutral-400 bg-white border border-neutral-200 px-4 py-3 shadow-xs focus:ring-1 focus:ring-gray-500 focus:outline-none resize-none rounded-md"
        />
        <ErrorComponent
          error={error}
          e1="Description is required"
          e2="Description should have at least 80 characters"
          e3="Description should be under 450 characters"
        />
      </div>

      {/* Tags */}
      <div className="mb-10">
        <label className="text-sm text-neutral-500 block mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-neutral-100 px-3 py-1 border border-neutral-300 flex items-center rounded-md"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 text-neutral-400 hover:text-red-500"
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
            className="w-1/2 text-sm placeholder-neutral-400 bg-white border border-neutral-200 px-3 py-2 shadow-xs focus:ring-1 focus:ring-gray-500 focus:outline-none rounded-md"
          />
          <button
            onClick={addTag}
            className="text-sm text-sky-600 hover:text-sky-800 transition"
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
      <div className="mb-12">
        <label className="text-sm text-neutral-500 block mb-2">Category</label>
        <select
          onChange={onChangeHandler}
          name="category"
          className="w-full text-sm bg-white border border-neutral-200 px-3 py-2 shadow-xs focus:ring-1 focus:ring-gray-500 focus:outline-none rounded-md"
        >
          <option>Select category</option>
          {categories.map((category, index) => (
            <option key={index}>{category}</option>
          ))}
        </select>
        <ErrorComponent
          error={error}
          e1="Category is required"
          e2="Category is required (minimum 10 characters)"
          e3="Category is required (maximum 80 characters)"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={submitForm}
          className="px-6 py-2 readora-theme text-white text-sm font-medium shadow-xs hover:bg-sky-700 transition rounded-md"
        >
          {
            loading ? <p>Loading...</p> : <p>Submit</p>
          }
        </button>
      </div>
    </div>
  );
};

export default ArticleCreation;
