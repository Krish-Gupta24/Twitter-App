import React, { useEffect, useState } from "react";
import { Smile, MessageCircle, Repeat2, Heart, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import useUserStore from "@/store/userStore";
import EmojiPicker from "emoji-picker-react";
import axiosInstance from "@/utils/axiosInstance";

const Tweet = ({
  image,
  content,
  replies,
  shared,
  likeCount,
  avatar,
  username,
  fullName,
}) => {
  const { logged } = useUserStore();

  return (
    <Card className="border-b rounded-none p-4 hover:bg-accent/50">
      <div className="flex space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar || logged?.profilePic} alt="profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{fullName || logged?.fullName}</span>
            <span className="text-muted-foreground">
              @{username || logged?.username}
            </span>
          </div>
          <p className="mt-1">{content}</p>
          <div className="flex justify-around items-center mt-3 text-gray-500 text-sm">
            <button className="flex items-center space-x-1 hover:text-blue-500 transition">
              <MessageCircle size={18} />
              <span>{replies?.length || 0}</span>
            </button>

            <button className="flex items-center space-x-1 hover:text-green-500 transition">
              <Repeat2 size={18} />
              <span>{shared || 0}</span>
            </button>

            <button className="flex items-center space-x-1 hover:text-red-500 transition">
              <Heart size={18} />
              <span>{likeCount?.length || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Home = () => {
  const [content, setContent] = useState("");
  const [tweets, setTweets] = useState([]);
  const { logged, Loggedinuser, tweet } = useUserStore();
  const [emojiPicker,setEmojiPicker]=useState(false)

  const feed = async () => {
    try {
      const response = await axiosInstance.get("/post/feed");
      setTweets(response.data.feedPosts);
    } catch (error) {
      toast.error("Feed Fetching Failed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    Loggedinuser();
    feed();
  }, []);

  const handleTweet = async () => {
    if (!content.trim()) return;

    try {
      await tweet(content); // Wait for the tweet to be posted
      setContent(""); // Clear the input
      await feed(); // Refresh the feed to show the new tweet

      toast.success("Tweet Uploaded!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Failed to post tweet!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Navbar />

          <main className="flex-1 ml-64 border-r border-border min-h-screen">
            <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border p-4 z-10">
              <h1 className="text-xl font-bold">Home</h1>
            </div>

            <div className="border-b border-border p-4">
              <div className="flex space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={logged?.profilePic} alt="Your avatar" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="What's happening?"
                    className="min-h-[80px] resize-none border-none focus-visible:ring-0 p-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />

                  {/* Emoji and Image Icons Section */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex space-x-3 text-gray-500">
                      <button className="hover:text-blue-500 transition cursor-pointer">
                        <Smile
                          size={20}
                          onClick={() => setEmojiPicker(!emojiPicker)}
                        />
                      </button>
                      {emojiPicker && (
                        <div className="absolute bottom-10 left-0 bg-white shadow-md p-2 rounded-lg z-20">
                          <EmojiPicker
                            onEmojiClick={(emoji) => {
                              setContent(content + emoji.emoji);
                              setEmojiPicker(false);
                            }}
                          />
                        </div>
                      )}
                      <button className="hover:text-green-500 transition cursor-pointer">
                        <ImageIcon size={20} />
                      </button>
                    </div>
                    <Button size="sm" onClick={handleTweet}>
                      Tweet
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Render tweets from feed */}
            <div>
              {tweets.length > 0 ? (
                tweets.map((item, index) => (
                  <Tweet
                    key={item._id || index}
                    image={item.image}
                    content={item.content}
                    likeCount={item.likeCount || []}
                    replies={item.replies || []}
                    shared={item.shared || 0}
                    avatar={item.userId?.profilePic}
                    username={item.userId?.username}
                    fullName={item.userId?.fullName}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground mt-4">
                  No tweets yet. Be the first to tweet!
                </p>
              )}
            </div>
          </main>

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

export default Home;
