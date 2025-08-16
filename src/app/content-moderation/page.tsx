'use client'

import React, { useState } from 'react'
import ReportedContent from './components/ReportedContent';
import UserPost from './components/UserPost';
import HashTags from './components/HashTags';

const tabs = [
  "Reported Contents",
  "User Post",
  "Hashtags",
  "Comments",
  "Media Library",
];

export default function page() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const renderContent = () => {
        switch (activeTab) {
          case "Reported Contents":
            return (
              <ReportedContent />
            );
    
          case "User Post":
            return (
              <UserPost />
            );
    
          case "Hashtags":
            return (
              <HashTags />
            );
    
        //   case "Comments":
        //     return (
        //       <Social />
        //     );
    
        //   case "Gamification":
        //     return (
        //       <Gamification />
        //     );
    
          default:
            return null;
        }
      };
  return (
    <div className='px-10'>
        <div className="">
        <h1 className="capitalize text-[34px] font-bold text-deepblue">
          content moderations
        </h1>     
      </div>
      {/* Tabs Header */}
      <div className="flex gap-3 border-b  mb-4 px-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium rounded-t-lg ${
              activeTab === tab
                ? "text-brightblue border-b-2 border-brightblue"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{renderContent()}</div>
    </div>
  )
}
