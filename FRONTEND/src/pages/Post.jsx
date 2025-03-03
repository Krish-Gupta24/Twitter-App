import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { Heart, Repeat2, MessageCircle, Share } from "lucide-react"; // Import Lucide icons
import { Button } from "@/components/ui/button";

const Post = () => {
  const { postId } = useParams();
  const { getTweet, selectedTweet,logged } = useUserStore();

  useEffect(() => {
    if (postId) {
      getTweet(postId);
    }
  }, [postId, getTweet]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Navbar />

          {/* Main Tweet Section */}
          <main className="flex-1 ml-64 border-r border-border min-h-screen p-6">
            {selectedTweet ? (
              <div className="p-6 border-b border-border">
                {/* Profile Section */}
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedTweet.profilePic}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-bold">
                      {selectedTweet.fullName}{" "}
                    </h2>
                    <p className="text-gray-500">@{selectedTweet.username}</p>
                  </div>
                </div>

                {/* Tweet Content */}
                <p className="text-lg text-white mt-3">
                  {selectedTweet.content}
                </p>

                {/* Image/Video Section */}
                {selectedTweet.image && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-border">
                    <img
                      src={selectedTweet.image}
                      alt="Post"
                      className="w-full rounded-lg"
                    />
                  </div>
                )}

                {/* Engagement Metrics */}
                <div className="flex justify-between text-gray-500 mt-5 text-sm">
                  <div className="flex items-center space-x-2 cursor-pointer hover:text-red-500">
                    <Heart /> <span>{selectedTweet.likeCount.length}</span>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:text-green-500">
                    <Repeat2 /> <span>{selectedTweet.shared}</span>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:text-blue-500">
                    <MessageCircle />{" "}
                    <span>{selectedTweet.replies.length}</span>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
                    <Share />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg mt-6">
                Loading post...
              </p>
            )}

            {/* Reply Section */}
            <div className="p-4 border-t border-border flex items-center space-x-3">
              <img
                src={
                  logged?.profilePic 
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />

              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Post your reply"
                  className="w-full p-3 bg-gray-800 text-white rounded-full outline-none"
                />
              </div>

              <Button className="bg-white text-black px-4 py-2 rounded-full font-medium ">
                Reply
              </Button>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-80 p-4">
            <div className="sticky top-2">
              <TrendingSection />
            </div>
          </aside>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post;
