import axios from "axios";
import { config } from "../../config/config";
import React, { useEffect, useState } from "react";
import { categories } from "../../utils/constants/categories";
import { ErrorComponent } from "../../components/errorComponents/ErrorComponent";
import { useNavigate, useSearchParams } from "react-router-dom"; 
import { articleEditSchema } from "../../utils/validation/articleEditSchema";
import { apiInstance } from "../../services/axios/axiosInstance/axiosInstance";

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

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string[]>([]);
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
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("articleId");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchArticles = async () => {
        const { data } = await apiInstance.get(
          `/article/view/${articleId}`
        );

        setArticle(data.article);
        setTags(data.article.tags);
        setPreview(data.article.image);
      };

      fetchArticles();
    } catch (err) {
      console.log("ERROR: ", err);
    }
  }, []);

  const onChangeHandler = (e: any): void => {
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
      setPreview(response.data.url);
      article.image = response.data.url;
    } catch (err) {
      console.log("ERR: ", err);
    }
  };

  const submitForm = async (): Promise<void> => {
    try {
      console.log("The formData: ", article);
      article.tags = tags;

      const validForm = await articleEditSchema.validate(
        article,
        {
          abortEarly: false,
        }
      );

      if (validForm) {
        const { data } = await apiInstance.put(
          `/article/edit`,
          article
        );

        console.log("The result: ", data);
        if (data.success) {
          setTimeout(() => { 
            navigate("/articles");
          }, 500);
        } else {
          await articleEditSchema.validate(
            { article },
            {
              abortEarly: false,
            }
          );
        }
      }
    } catch (error: unknown) {
      const err = error as { errors: string[] };
      console.log('ERRORS: ', err.errors);
      setError(err.errors);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py- text-neutral-800 font-sans">
      {/* Title */}
      <label className="text-2xl">Title</label>
      <input
        onChange={onChangeHandler}
        type="text"
        name="title"
        placeholder={article.title}
        className="w-full text-2xl font-medium placeholder-gray-300 mb-4 focus:outline-none"
      />

      <ErrorComponent error={error}
        e1='Name is required'
        e2='Invalid title (minimum 10 characters)'
        e3='Invalid title (maximum 80 characters)'
      />

      {/* Subtitle */}
      <label className="text-xl">Sub Title</label>
      <input
        onChange={onChangeHandler}
        type="text"
        name="subtitle"
        placeholder={article.subtitle}
        className="w-full text-sm placeholder-gray-300 mb-8 focus:outline-none"
      />

      <ErrorComponent error={error}
        e1='Invalid subtitle (maximum 50 characters)'
        e2='Invalid subtitle (minimum 10 characters)'
        e3='Invalid subtitle (maximum 50 characters)'
      />

      {/* Image Upload */}
      <div className="mb-12 grid">
        <label className="text-xl text-neutral-500 mb-2">Upload image</label>
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
        className="w-full text-sm p-3 placeholder-gray-300 focus:outline-none resize-none border border-neutral-300 rounded-xl mb-3"
      />

      <ErrorComponent error={error}
        e1='Description should have atleast 80 characters'
        e2='Description should be under 450 characters'
        e3='Description should have atleast 80 characters'
      />

      {/* Tags */}
      <div className="mt-12">
        <label className="text-xl text-neutral-500 block mb-2">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs readora-theme px-3 py-1 rounded-full flex items-center"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 text-white hover:text-neutral-600"
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
            className="w-2/4 text-xs placeholder-gray-300 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none"
          ></input>
          <button
            onClick={() => addTag(tagInput)}
            className="text-xs text-neutral-600 hover:text-black transition"
          >
            Add
          </button>
        </div>
      </div>

      <ErrorComponent error={error}
        e1='Minimum 4 preferences needed'
        e2='Maximum 5 preferences are allowed'
        e3='Minimum 4 preferences needed'
      />

      {/* Categories */}
      <div className="mt-12">
        <label className="text-lg text-neutral-500 block mb-2">Category</label>
        <select
          onChange={onChangeHandler}
          name="category"
          className="w-[10rem] text-xs bg-transparent border border-neutral-300 px-2 py-2 rounded-md focus:outline-none"
        >
          <option value="">{article.category}</option>
          {categories.map((category: string) => (
            <option>{category}</option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={submitForm}
          className="text-xs px-6 py-2 border cursor-pointer readora-theme text-white border-neutral-300 rounded-md hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ArticleEditPage;
