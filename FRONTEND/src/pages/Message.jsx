import React from "react";
import Navbar from "@/components/Navbar";
import TrendingSection from "@/components/TrendingSection";
import { ToastContainer } from "react-toastify";

const Message = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Navbar />

          <main className="flex-1 ml-64 border-r border-border min-h-screen"></main>

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

export default Message;
