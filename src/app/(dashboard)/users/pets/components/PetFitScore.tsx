import { div } from "framer-motion/client";

interface PetFitScoreProps {
  score: number;
  label: string;
  change?: string;
  percentile?: string;
}

const PetFitScore = ({ score, label, change }: PetFitScoreProps) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
   <div className="px-4 py-2 border border-[#ECF8F1] rounded-lg bg-[#ECF8F1]">
<span className="text-sm font-medium text-deepblue ">{label}</span>
     <div className="flex items-center gap-4 my-2">
      
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#40B773"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ "--score-offset": offset } as React.CSSProperties}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-[#40B773]">{score}</span>
        </div>
      </div>
      <div className="flex flex-col">
        
        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-success-light text-success font-medium w-fit">
          Excellent
        </span>
        <span className="text-xs text-muted-foreground mt-1">{change}</span>
        {/* <span className="text-xs text-muted-foreground">{percentile}</span> */}
      </div>
    </div>
   </div>
  );
};

export default PetFitScore;
