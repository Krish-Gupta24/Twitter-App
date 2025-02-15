import React from 'react'
import { Card } from "@/components/ui/card";
const TrendingSection = () => {
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

export default TrendingSection

