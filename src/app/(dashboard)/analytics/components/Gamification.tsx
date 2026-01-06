import React from 'react'
import StatCard from './StatCard'

export default function Gamification() {
  return (
    <div>
        <div className="grid grid-cols-4 gap-4">
                <StatCard title="Leaderboard Views" value="24.874" subtitle="2.3%" />
                <StatCard
                  title="Badge Earned"
                  value="430"
                  subtitle="1.7%4 this month"
                />
                <StatCard
                  title="Streak Drop Rate"
                  value="68.2%"
                  subtitle="3.2%"
                  
                />
                <StatCard
                  title="Active Streaks"
                  value="65%"
                  subtitle="3.2%"
                  
                />
              </div>
    </div>
  )
}
