import React, { useState, useEffect } from "react";
import { Search, Heart, MessageCircle, Repeat2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import { Input } from "@/components/ui/input";
import useUserStore from "@/store/userStore";
import axiosInstance from "@/utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import UpdateProfileModal from "@/hooks/updateProfile";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Tweets");
  const tabs = ["Tweets", "Replies", "Likes"];
  const [tweets, setTweets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { logged, fetchUserProfile } = useUserStore();

  useEffect(() => {
    if (!logged.username || logged.username !== username) {
      fetchUserProfile(username);
    }
  }, [username, logged.username]);

  useEffect(() => {
    const fetchUserTweets = async () => {
      try {
        const response = await axiosInstance.get(`/post/allpost/${username}`);
        if (response.data && response.data.posts) {
          setTweets(response.data.posts);
        }
      } catch (error) {
        console.error(
          "Error fetching posts:",
          error.response ? error.response.data : error.message
        );
      }
    };

    if (username) {
      fetchUserTweets();
    }
  }, [username]);

  useEffect(() => {
    if (logged.username && logged.username !== username) {
      navigate(`/${logged.username}`, { replace: true });
    }
  }, [logged.username, username, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Navbar />
          <div className="flex-1 ml-64 p-6 bg-background text-gray-200 min-h-screen">
            <Card className="p-8 bg-background shadow-2xl rounded-3xl border border-gray-700">
              <div className="flex items-center space-x-6">
                <Avatar className="h-32 w-32 border-4 border-gray-700 shadow-xl">
                  <AvatarImage src={logged?.profilePic} alt="Profile" />
                  <AvatarFallback>{logged?.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-4xl font-extrabold text-white">
                    {logged?.fullName}
                  </h2>
                  <p className="text-gray-400 text-lg">@{logged?.username}</p>
                  <p className="mt-3 text-gray-300 italic">{logged?.bio}</p>
                  <div className="mt-5 flex space-x-8 text-gray-300 font-semibold">
                    <span>
                      <strong>{logged.followings || 0}</strong> Following
                    </span>
                    <span>
                      <strong>{logged?.followers || 0}</strong> Followers
                    </span>
                  </div>
                </div>
                {username === logged.username ? (
                  <Button
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-white"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit size={18} />
                    <span>Edit Profile</span>
                  </Button>
                ) : (
                  <Button className="flex items-center space-x-2 bg-blue-500 hover:bg-white">
                    <span>Follow</span>
                  </Button>
                )}
              </div>
            </Card>
            <Card className="mt-6 p-6 bg-background shadow-xl rounded-2xl border border-gray-700">
              <div className="flex border-b border-gray-700 pb-2 mb-4 space-x-6 justify-center">
                {tabs.map((tab) => (
                  <Button
                    key={tab}
                    variant={activeTab === tab ? "default" : "ghost"}
                    className={`text-lg font-semibold px-6 py-2 rounded-lg transition-colors ${
                      activeTab === tab
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </Button>
                ))}
              </div>
              {activeTab === "Tweets" && (
                <div className="space-y-6">
                  {tweets.length > 0 ? (
                    tweets.map((tweet, index) => (
                      <TweetCard key={index} tweet={tweet} user={logged} onClick={()=>{}} />
                    ))
                  ) : (
                    <p className="text-center text-gray-400">
                      No tweets available
                    </p>
                  )}
                </div>
              )}
            </Card>
          </div>
          <div className="w-80 p-4">
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
          </div>
        </div>
      </div>
      {isEditing && (
        <UpdateProfileModal
          user={logged}
          closeModal={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

const TweetCard = ({ tweet, user }) => {
  return (
    <div className="border-b border-gray-700 pb-4 hover:bg-gray-800 px-5 py-4 rounded-lg transition">
      <div className="flex items-center space-x-3 text-gray-400 text-sm">
        <Avatar>
          <AvatarImage src={user?.profilePic} alt="Profile" />
          <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center space-x-2">
          <span className="text-white font-semibold">{user?.fullName}</span>
          <span className="text-gray-500">@{user?.username}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500">
            {format(new Date(tweet.createdAt), "MMM d, yyyy")}
          </span>
        </div>
      </div>
      <p className="text-gray-200 text-base mt-2">{tweet.content}</p>
    </div>
  );
};

export default Profile;
