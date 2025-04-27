import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Article {
  userId: string;
  author: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  createdAt: string;
}

const ArticleEditPage: React.FC = () => {
  const [article, setArticle] = useState<Article>({
    userId: "",
    author: "",
    title: "",
    subtitle: "",
    description: "",
    image: "",
    tags: [""],
    category: "",
    createdAt: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("articleId");
  const userId = useSelector((state: any) => state.currentUser._id);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchArticles = async () => {
        const { data } = await axios.get(
          `http://localhost:3000/article/${articleId}`
        );

        setArticle(data.article);
        setTags(data.article.tags);
      };

      fetchArticles();
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }, []);

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addTag = (value: string): void => {
    setTags((prev) => {
      if (prev.includes(value)) {
        return prev;
      } else {
        setTagInput("");
        return [...prev, value];
      }
    });
  };

  const removeTag = (tagToRemove: string): void => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const cloudinaryInstance = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/dusbc29s2/image/upload`,
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
      // formData.image = response.data?.url;
      setPreview(response.data.url);
    } catch (err) {
      console.log("ERR: ", err);
    }
  };

  const submitForm = async (): Promise<void> => {
    try {
      console.log("The formData: ", article);
      const { data } = await axios.post(
        `http://localhost:3000/article/${userId}`,
        article
      );

      console.log("The result: ", data);
      if (data.success) {
        setTimeout(() => {
          alert("success");
          navigate("/articles");
        }, 500);
      }
    } catch (err: unknown) {
      // console.log("ERROR: ", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-neutral-800 font-sans">
      {/* Title */}
      <label className="text-2xl">Title</label>
      <input
        onChange={onChangeHandler}
        type="text"
        name="title"
        placeholder={article.title}
        className="w-full text-2xl font-medium placeholder-neutral-400 mb-4 focus:outline-none"
      />

      {/* Subtitle */}
      <label className="text-xl">Sub Title</label>
      <input
        onChange={onChangeHandler}
        type="text"
        name="subtitle"
        placeholder={article.subtitle}
        className="w-full text-sm placeholder-neutral-400 mb-8 focus:outline-none"
      />

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
      <label className="text-xl">Description</label>
      <textarea
        onChange={onChangeHandler}
        name="description"
        placeholder={article.description}
        rows={8}
        className="w-full text-sm p-3 placeholder-neutral-400 focus:outline-none resize-none border border-neutral-300 rounded-xl mb-12"
      />

      {/* Tags */}
      <div className="mb-12">
        <label className="text-xs text-neutral-500 block mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags?.map((tag) => (
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
            onChange={(e) => setTagInput(e.target.value)}
            value={tagInput}
            placeholder="Enter a tag"
            className="w-2/4 text-xs placeholder-neutral-400 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none"
          ></input>
          <button
            onClick={() => addTag(tagInput)}
            className="text-xs text-neutral-600 hover:text-black transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-14">
        <label className="text-md text-neutral-500 block mb-2">Category</label>
        <p className="py-3">{article.category}</p>
        <select
          onChange={onChangeHandler}
          name="category"
          className="w-[10rem] text-xs bg-transparent border border-neutral-300 px-2 py-2 rounded-md focus:outline-none"
        >
          <option value="">Select category</option>
          <option value="tech">Tech</option>
          <option value="design">Design</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
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

export default ArticleEditPage;
