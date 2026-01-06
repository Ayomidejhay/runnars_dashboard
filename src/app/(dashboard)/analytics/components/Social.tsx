import React from 'react'
import StatCard from './StatCard'

export default function Social() {
  return (
    <div>
        <div className="grid grid-cols-4 gap-4">
                <StatCard title="Media Posts" value="24,875" subtitle="8.3%" />
                <StatCard
                  title="Engagement Rate"
                  value="43%"
                  subtitle="1.7% this month"
                />
                <StatCard
                  title="Discussion Thread2"
                  value="264"
                  subtitle="3.2%"
                  
                />
                <StatCard
                  title="Pack Walk"
                  value="1,264"
                  subtitle="8.9%"
                  
                />
              </div>
    </div>
  )
}
