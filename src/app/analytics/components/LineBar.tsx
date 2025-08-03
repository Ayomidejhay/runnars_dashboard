import React from 'react';

type LineBarProps = {
  title: string;
  value: string; // e.g., "90%" or "80/100"
  bgColor?: string;
  activeColor?: string;
 
};

// Utility: Convert fraction or percentage string to a proper percentage string
const parseToPercent = (value: string): string => {
  if (value.includes('/')) {
    const [numerator, denominator] = value.split('/').map(Number);
    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      const percent = (numerator / denominator) * 100;
      return `${percent}%`;
    }
    return '0%';
  }

  return value.trim();
};

export default function LineBar({
  title,
  value,
  bgColor = "#E1E1E1",
  activeColor = "#93BDF8",
  
}: LineBarProps) {
  const widthValue = parseToPercent(value);

  return (
    <div className="flex gap-6 items-center">
      <div className="w-2/6">
        <p className="text-[14px] text-deepblue capitalize">{title}</p>
      </div>
      <div className="w-4/6 flex items-center gap-2">
        <div
          className="h-5 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: widthValue,
              backgroundColor: activeColor,
            }}
          ></div>
        </div>
        <p className="text-[12px] text-deepblue whitespace-nowrap">{value}</p>
      </div>
    </div>
  );
}
