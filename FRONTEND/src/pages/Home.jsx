import React, { useEffect, useState } from "react";
import { Search, MessageCircle, Repeat2, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import useUserStore from "@/store/userStore";

const Tweet = ({ name, handle, content, avatar }) => (
  <Card className="border-b rounded-none p-4 hover:bg-accent/50">
    <div className="flex space-x-3">
      <Avatar className="h-12 w-12">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-bold">{name}</span>
          <span className="text-muted-foreground">@{handle}</span>
        </div>
        <p className="mt-1">{content}</p>
        <div className="flex justify-between mt-3 text-muted-foreground w-4/5">
          <Button variant="ghost" size="sm" className="space-x-2">
            <MessageCircle size={18} />
            <span>24</span>
          </Button>
          <Button variant="ghost" size="sm" className="space-x-2">
            <Repeat2 size={18} />
            <span>12</span>
          </Button>
          <Button variant="ghost" size="sm" className="space-x-2">
            <Heart size={18} />
            <span>348</span>
          </Button>
          <Button variant="ghost" size="sm" className="space-x-2">
            <Share size={18} />
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

const Home = () => {
  const { user, fetchUserProfile, tweet } = useUserStore();
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Navbar />

          <main className="flex-1 ml-64 border-r border-border min-h-screen">
            <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border p-4">
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
                        tweet(content);
                        setContent("");
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
              {user?.tweets?.map((tweet, index) => (
                <Tweet key={index} {...tweet} />
              ))}
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
    </div>
  );
};

export default Home;
