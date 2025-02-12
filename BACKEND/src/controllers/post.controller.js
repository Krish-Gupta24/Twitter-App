import Posts from "../models/posts.modals.js";

export const addPost = async (req, res) => {
  const userId = req.user.id;
  const {
    content,
    image = "",
    likeCount = [],
    shared = 0,
    comments = [],
  } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }
  if (!Array.isArray(likeCount)) {
    return res.status(400).json({ message: "Likes must be an array" });
  }
  if (!Array.isArray(comments)) {
    return res.status(400).json({ message: "Comments must be an array" });
  }
  if (typeof shared !== "number") {
    return res.status(400).json({ message: "Shared count must be a number" });
  }

  try {

    const newPost =new Posts({
      userId,
      content,
      image,
      likeCount,
      shared,
      comments,
    });

    await newPost.save()

    return res.status(201).json({
      success: true,
      message: "Post was created",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  const { content, image } = req.body;

  try {
    // Find the post and ensure it belongs to the user
    const post = await Posts.findOne({ _id: postId, userId });

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found or unauthorized" });
    }

    // Prepare update data
    const updateData = {};
    if (content) updateData.content = content;
    if (image !== undefined) updateData.image = image;

    // Update the post
    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      { $set: updateData },
      { new: true } // Return updated post
    );

    res.status(200).json({ success: true, message: "Post updated", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deletePost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.postId;
  console.log(postId);
  
  if (!postId) {
    return res.status(400).json({
      error: true,
      message: "Post ID is required",
    });
  }
  try {
    const post = await Posts.findByIdAndDelete({_id:postId,userId})
    return res.json({
      error: false,
      message: "Post deleted",
      post
    })
  } catch (error) {
    return res.json({
      error: true,
      message:"Server error"
    })
  }
}