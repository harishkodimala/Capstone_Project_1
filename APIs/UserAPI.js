import exp from "express";
import { register, authenticate } from "../services/authService.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { ArticleModel } from "../models/ArticleModel.js";
import mongoose from "mongoose";
export const userRoute = exp.Router();

//Register user
userRoute.post("/users", async (req, res) => {
  //get user obj from req
  let userObj = req.body;
  //call register
  const newUserObj = await register({ ...userObj, role: "USER" });
  //send res
  res.status(201).json({ message: "user created", payload: newUserObj });
});


//Read all articles(protected route)
userRoute.get(
  "/articles",
  verifyToken,
  async (req, res) => {
    try {

      const articles = await ArticleModel.find({
        isArticleActive: true
      })
      .populate("author", "-password") // hide password
      .populate("comments.user", "username email");

      res.status(200).json({
        message: "All active articles",
        payload: articles
      });

    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message
      });
    }
  }
);
//Add comment to an article(protected route)
userRoute.post(
  "/articles/:articleId",
  verifyToken,
  async (req, res) => {
    try {

      const { articleId } = req.params;
      const { comment } = req.body;

      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(articleId)) {
        return res.status(400).json({
          message: "Invalid article ID"
        });
      }

      // Check article exists and is active
      const article = await ArticleModel.findOne({
        _id: articleId,
        isArticleActive: true
      });

      if (!article) {
        return res.status(404).json({
          message: "Article not found or inactive"
        });
      }

      // Create comment object
      const newComment = {
        user: req.user.userId,  
        Comment: comment
      };

      // Push into comments array
      article.comments.push(newComment);

      await article.save();

      res.status(201).json({
        message: "Comment added successfully",
        payload: article
      });

    } catch (error) {
      res.status(500).json({
        message: "Server error",
        error: error.message
      });
    }
  }
);
