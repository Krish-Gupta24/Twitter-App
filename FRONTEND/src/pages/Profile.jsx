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
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import UpdateProfileModal from "@/hooks/updateProfile";

const Profile = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("Tweets");
  const tabs = ["Tweets", "Replies", "Likes"];
  const [tweets, setTweets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { user, fetchUserProfile } = useUserStore();

  useEffect(() => {
    fetchUserProfile(username);
  }, [username]);

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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Navbar />
          <div className="flex-1 ml-64 p-6 bg-background text-gray-200 min-h-screen">
            <Card className="p-8 bg-background shadow-2xl rounded-3xl border border-gray-700">
              <div className="flex items-center space-x-6">
                {/* Profile Avatar */}
                <Avatar className="h-32 w-32 border-4 border-gray-700 shadow-xl">
                  <AvatarImage src={user?.profilePic} alt="Profile" />
                  <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  {/* User Name */}
                  <h2 className="text-4xl font-extrabold text-white">
                    {user?.fullName}
                  </h2>
                  <p className="text-gray-400 text-lg">@{user?.username}</p>
                  <p className="mt-3 text-gray-300 italic">{user?.bio}</p>

                  {/* Follow Stats */}
                  <div className="mt-5 flex space-x-8 text-gray-300 font-semibold">
                    <span>
                      <strong>{user.followings || 0}</strong> Following
                    </span>
                    <span>
                      <strong>{user?.followers || 0}</strong> Followers
                    </span>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <Button
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-white"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit size={18} />
                  <span>Edit Profile</span>
                </Button>
              </div>
            </Card>

            {/* Tabs */}
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

              {/* Tweets Section */}
              {activeTab === "Tweets" && (
                <div className="space-y-6">
                  {tweets.length > 0 ? (
                    tweets.map((tweet, index) => (
                      <TweetCard key={index} tweet={tweet} user={user} />
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

          {/* Right Sidebar */}
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

      {/* Edit Profile Modal */}
      {isEditing && (
        <UpdateProfileModal
          user={user}
          closeModal={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

// Tweet Card Component
const TweetCard = ({ tweet, user }) => {
  return (
    <div className="border-b border-gray-700 pb-4 hover:bg-gray-800 px-5 py-4 rounded-lg transition">
      <div className="flex items-center space-x-3 text-gray-400 text-sm">
        {/* Profile Avatar */}
        <div className="w-10 h-10 bg-gray-600 rounded-full">
          <Avatar>
            <AvatarImage src={user?.profilePic} alt="Profile" />
            <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-white font-semibold">{user?.fullName}</span>
          <span className="text-gray-500">@{user?.username}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500">
            {format(new Date(tweet.createdAt), "MMM d, yyyy")}
          </span>
        </div>
      </div>

      {/* Tweet Content */}
      <p className="text-gray-200 text-base mt-2">{tweet.content}</p>

      {/* Tweet Actions */}
      <div className="flex justify-around items-center mt-3 text-gray-500 text-sm">
        <button className="flex items-center space-x-1 hover:text-blue-500 transition">
          <MessageCircle size={18} />
          <span>{tweet.replies.length ?? 0} </span>
        </button>

        <button className="flex items-center space-x-1 hover:text-green-500 transition">
          <Repeat2 size={18} />
          <span>{tweet.shared || 0}</span>
        </button>

        <button className="flex items-center space-x-1 hover:text-red-500 transition">
          <Heart size={18} />
          <span>{tweet.likeCount.length ?? 0}</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
