import { useState } from "react";
import { config } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { apiInstance } from "../../api/axiosInstance/axiosInstance";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface DeleteArticleProps {
  articleId: string;
}

export const DeleteArticle: React.FC<DeleteArticleProps> = ({ articleId }) => {

  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const deleteArticle = async (articleId: string): Promise<void> => {
    try {
      const { data } = await apiInstance.delete(
        `/article/delete`,
        {
          data: { articleId },
        }
      );

      if (data.success) {
        navigate("/articles");
        window.location.href = `${config.BASE_URL}/articles`;
      }
    } catch (err: unknown) {
      console.log("ERROR: ", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="bg-transparent hover:bg-transparent border-transparent"
      >
        <Button variant="outline">
          <img
            src="/delete-icon.png"
            className="w-9 h-9 cursor-pointer bg-gray-300 rounded-full m-2"
          />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="h-52"
        style={{ width: "40rem", maxWidth: "90vw" }}
      >
        <div className="grid text-center">
          <DialogTitle className="text-center text-xl">Delete profile</DialogTitle>
      
 
          <div>
            <span className="baloo-bhai-2-main">
              Are you sure , you want to delete the Article ?
            </span>
          </div>
          <div className="flex gap-12 justify-center">
            <Button
              onClick={() => setOpen(false)}
              className="px-8 readora-theme cursor-pointer"
            >
              Close
            </Button>
            <Button
              onClick={() => deleteArticle(articleId)}
              className="px-8 bg-red-500 cursor-pointer"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
