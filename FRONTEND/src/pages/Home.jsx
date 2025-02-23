import React, { useEffect, useState } from "react";
import { Search, MessageCircle, Repeat2, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import useUserStore from "@/store/userStore";
import axiosInstance from "@/utils/axiosInstance";

const Tweet = ({image,content,replies,shared,likeCount}) => {
  const { user, fetchUserProfile } = useUserStore();
  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <Card className="border-b rounded-none p-4 hover:bg-accent/50">
      <div className="flex space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.profilePic} alt="hello" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{user.fullName}</span>
            <span className="text-muted-foreground">@{user.username}</span>
          </div>
          <p className="mt-1">{content}</p>
          <div className="flex justify-around items-center mt-3 text-gray-500 text-sm">
            <button className="flex items-center space-x-1 hover:text-blue-500 transition">
              <MessageCircle size={18} />
              <span>{replies || 0}</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:text-green-500 transition">
              <Repeat2 size={18} />
              <span>{shared || 0}</span>
            </button>
            
            <button className="flex items-center space-x-1 hover:text-red-500 transition">
              <Heart size={18} />
              <span>{likeCount || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Home = () => {
  const { user, fetchUserProfile, tweet } = useUserStore();
  const [content, setContent] = useState("");
  const [tweets, setTweets] = useState([])
  const feed = async () => {
    try {
      const response = await axiosInstance.get('/post/feed')
      setTweets(response.data.feedPosts)
    } catch (error) {
      toast.error("Feed Fetching Failed !", {
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
  }

  useEffect(() => {
    fetchUserProfile();
    feed()
  }, []);

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
                  <AvatarImage
                    src={
                      user?.profilePic ||
                      "https://api.dicebear.com/9.x/initials/svg?seed=default"
                    }
                    alt="Your avatar"
                  />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="What's happening?"
                    className="min-h-[80px] resize-none border-none focus-visible:ring-0 p-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        if (!content.trim()) return;
                        tweet(content);
                        setContent("");
                        toast.success("Tweet Uploaded!", {
                          position: "top-right",
                          autoClose: 2000, // Toast disappears after 2 seconds
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark", // Dark mode styling
                        });
                      }}
                    >
                      Tweet
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Render tweets from userStore */}
            <div>
              {tweets.length > 0 ? (
                tweets.map((item, index) => (
                  <Tweet
                    key={index}
                    image={item.image}
                    content={item.content}
                    likeCount={item.likeCount}
                    replies={item.replies}
                    shared={item.shared}
                    avatar={item.userId.profilePic}
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
              <div className="relative mb-4">
                <Search
                  className="absolute left-3 top-2.5 text-muted-foreground"
                  size={18}
                />
                <Input
                  placeholder="Search Twitter"
                  className="pl-10 bg-muted"
                />
              </div>
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
