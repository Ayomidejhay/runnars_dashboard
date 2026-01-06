'use client'

import React from 'react'
import UserPost from '@/app/content-moderation/components/UserPost'
import CommentsModal from '@/app/content-moderation/components/CommentsModal'

export default function PostsTab() {
  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Total Posts",
            value: '332',
            subtitle: "",
          },
          {
            title: "Photo",
            value: "121",
            subtitle: "77.6% of total",
          },
          {
            title: "Video",
            value: "44",
            subtitle: "22.4% of total",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-1 mt-6"
          >
            <div className="flex justify-between items-center text-sm text-gray">
              <span>{item.title}</span>
            </div>
            <div className="text-2xl font-bold text-deepblue">{item.value}</div>
            <p className="text-xs text-[#40B773] flex items-center">{item.subtitle}</p>
          </div>
        ))}
      </div>
      <UserPost />
    </div>
  )
}
