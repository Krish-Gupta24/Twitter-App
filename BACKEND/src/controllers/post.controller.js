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

export const userPosts = async (req,res)=>{
  const userId = req.params.id;
  try {
    const posts = await Posts.find({ userId: userId });
    return res.status(200).json({error:false,posts});
  } catch (error) {
    return res.status(500).json({error:true,message:"Internal Server Error"});
  }
}

export const getPost = async (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  
  try {
		const post = await Posts.findById(postId);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const replies = async (req, res) => {
  const { text } = req.body;
	const postId = req.params.postId;
	const userId = req.user.id;
	const userProfilePic = req.user.profilePic;
  const username = req.user.username;

  console.log("Received postId:", postId);

  
  if (!text) {
    res.json({
      error: true,
      message:"No reply rcd"
    })
  }

  try {
    const post = await Posts.findById(postId);
    if (!post) {
      res.json({
        error: true,
        message:"No post found"
      })
    }
  
    const reply = { userId, userProfilePic, username, text }
    
    post.replies.push(reply)
    await post.save()
  
    res.json({
      error: false,
      message:"reply added"
    })
  } catch (error) {
    res.json({
      error: true,
      message:"server error"
    })
  }
}