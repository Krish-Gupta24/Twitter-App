import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Tweets");
  const tabs = ["Tweets", "Replies", "Likes"];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Navbar />
          <div className="flex-1 ml-64 p-6 bg-background text-gray-200 min-h-screen">
            <Card className="p-8 bg-background shadow-2xl rounded-3xl border border-gray-700">
              <div className="flex items-center space-x-6">
                <Avatar className="h-32 w-32 border-4 border-blue-500 shadow-xl">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-4xl font-extrabold text-white">
                    John Doe
                  </h2>
                  <p className="text-gray-400 text-lg">@johndoe</p>
                  <p className="mt-3 text-gray-300 italic">
                    Web developer | Tech Enthusiast | Passionate about React
                  </p>
                  <div className="mt-5 flex space-x-8 text-gray-300 font-semibold">
                    <span>
                      <strong>150</strong> Following
                    </span>
                    <span>
                      <strong>2.3K</strong> Followers
                    </span>
                  </div>
                </div>
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
                  <div className="border-b border-gray-700 pb-4 hover:bg-gray-700 p-5 rounded-lg transition shadow-md">
                    <p className="text-lg font-medium text-gray-200">
                      🚀 Excited to share my new React project! #WebDevelopment
                    </p>
                    <span className="text-sm text-gray-400">
                      200 Likes - 50 Retweets
                    </span>
                  </div>
                  <div className="border-b border-gray-700 pb-4 hover:bg-gray-700 p-5 rounded-lg transition shadow-md">
                    <p className="text-lg font-medium text-gray-200">
                      🔥 Exploring Tailwind CSS and loving it!
                    </p>
                    <span className="text-sm text-gray-400">
                      150 Likes - 30 Retweets
                    </span>
                  </div>
                  <div className="hover:bg-gray-700 p-5 rounded-lg transition shadow-md">
                    <p className="text-lg font-medium text-gray-200">
                      🏆 Just deployed my first full-stack application!
                    </p>
                    <span className="text-sm text-gray-400">
                      300 Likes - 100 Retweets
                    </span>
                  </div>
                </div>
              )}
              {activeTab === "Replies" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-700 pb-4 hover:bg-gray-700 p-5 rounded-lg transition shadow-md">
                    <p className="text-lg font-medium text-gray-200">
                      Replying to @techguru: "Great article on React 18! Learned
                      a lot. 🙌"
                    </p>
                    <span className="text-sm text-gray-400">45 Likes</span>
                  </div>
                  <div className="border-b border-gray-700 pb-4 hover:bg-gray-700 p-5 rounded-lg transition shadow-md">
                    <p className="text-lg font-medium text-gray-200">
                      Replying to @webdev: "Thanks for the tip on Tailwind
                      spacing! 🔥"
                    </p>
                    <span className="text-sm text-gray-400">30 Likes</span>
                  </div>
                </div>
              )}
              {activeTab === "Likes" && (
                <div className="space-y-6">
                  <div className="border-b border-gray-700 pb-4 hover:bg-gray-700 p-5 rounded-lg transition shadow-md">
                    <p className="text-lg font-medium text-gray-200">
                      Liked: "🚀 Excited for the new React updates! So many
                      great features."
                    </p>
                    <span className="text-sm text-gray-400">1.2K Likes</span>
                  </div>
                  <div className="border-b border-gray-700 pb-4 hover:bg-gray-700 p-5 rounded-lg transition shadow-md">
                    <p className="text-lg font-medium text-gray-200">
                      Liked: "AI is revolutionizing web development! Can't wait
                      to see what's next. 🤖"
                    </p>
                    <span className="text-sm text-gray-400">850 Likes</span>
                  </div>
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
    </div>
  );
};

export default Profile;
