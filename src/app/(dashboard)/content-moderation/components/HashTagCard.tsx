'use client'

import React from 'react'

type HashTagProps = {
  title: string;
  value: number;
  type?: string;
};

const HashTagCard = ({ title, value, type }: HashTagProps) => {
  const getTypeStyles = () => {
    if (type === 'featured') {
      return {
        textColor: 'text-[#B88330]',
        bgColor: 'bg-[#FFF3E0]',    
      };
    }
    if (type === 'challenge') {
      return {
        textColor: 'text-[#1570EF]', // Example: Red text
        bgColor: 'bg-[#E8F1FD]',     // Light red/pink background
      };
    }
    return {
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-100',
    };
  };

  const { textColor, bgColor } = getTypeStyles();

  return (
    <div className="border border-[#E1E1E1] p-6 rounded-[16px] bg-transparent flex flex-col gap-2">
      <p className="font-bold text-[16px] text-deepblue">{title}</p>
      <p className="text-[#8E98A8] text-[14px]">{value} posts</p>
      {type && (
        <div
          className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${textColor} ${bgColor}`}
        >
          {type}
        </div>
      )}
    </div>
  );
};

export default HashTagCard;
