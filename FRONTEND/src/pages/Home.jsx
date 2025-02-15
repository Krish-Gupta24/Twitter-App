import React from 'react';
import { Home, Search, Bell, Mail, Bookmark, User, MoreHorizontal, Twitter, MessageCircle, Repeat2, Heart, Share } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Navbar from '@/components/Navbar';

function Tweet({ name, handle, content, avatar }) {
  return (
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
}

function TrendingSection() {
  const trends = [
    { category: 'Technology', topic: '#React', tweets: '24.5K' },
    { category: 'Sports', topic: '#WorldCup', tweets: '124K' },
    { category: 'Entertainment', topic: '#MovieNight', tweets: '45.2K' },
  ];

  return (
    <Card className="bg-muted/50 p-4">
      <h2 className="text-xl font-bold mb-4">Trends for you</h2>
      {trends.map((trend, index) => (
        <div key={index} className="mb-4">
          <p className="text-sm text-muted-foreground">{trend.category}</p>
          <p className="font-bold">{trend.topic}</p>
          <p className="text-sm text-muted-foreground">{trend.tweets} Tweets</p>
        </div>
      ))}
    </Card>
  );
}

function App() {
  const tweets = [
    {
      name: 'John Doe',
      handle: 'johndoe',
      content: 'Just deployed my first React application! 🚀 #webdev #react',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Jane Smith',
      handle: 'janesmith',
      content: 'Beautiful day for coding! ☀️ Working on some exciting new features.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      name: 'Tech Enthusiast',
      handle: 'techlover',
      content: 'The future of web development is here! Check out these amazing new tools and frameworks.',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

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
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Your avatar"
                  />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="What's happening?"
                    className="min-h-[80px] resize-none border-none focus-visible:ring-0 p-2"
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm">
                      Tweet
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {tweets.map((tweet, index) => (
                <Tweet key={index} {...tweet} />
              ))}
            </div>
          </main>

          <div className="w-80 p-4">
            <div className="sticky top-2">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
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
}

export default App;