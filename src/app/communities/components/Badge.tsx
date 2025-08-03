import React from "react";
import StatCard from "./StatCard";
import StatusCard from "./StatusCard";

const Badge = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="total badges" value="12" />
        <StatCard title="badge completion" value="84%" />
        <StatCard title="achievement rank" value="Top 5%" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatusCard
          topCircleColor="#EAE5F2"
          bottomCircleColor="#CEC2E5"
          stackedText="🏅"
          title="Top Walker"
          subtitle="10 walks in a week"
          status="earned"
        />
        <StatusCard
          topCircleColor="#E8F2E8"
          bottomCircleColor="#4CAF5033"
          stackedText="🌳"
          title="Nature Lover"
          subtitle="10 walks in a week"
          status="earned"
        />
        <StatusCard
          topCircleColor="#FAEFE0"
          bottomCircleColor="#FBDEB3"
          stackedText="🌅"
          title="Dawn Patrol"
          subtitle="3 sunrise walks"
          status="earned"
        />
        <StatusCard
          topCircleColor="#EAE5F2"
          bottomCircleColor="#CEC2E5"
          stackedText="🏅"
          title="Top Walker"
          subtitle="10 walks in a week"
          status="earned"
        />
         <StatusCard
          topCircleColor="#EAE5F2"
          bottomCircleColor="#CEC2E5"
          stackedText="🏅"
          title="Top Walker"
          subtitle="10 walks in a week"
          status="earned"
        />
        <StatusCard
          topCircleColor="#E8F2E8"
          bottomCircleColor="#4CAF5033"
          stackedText="🌳"
          title="Nature Lover"
          subtitle="10 walks in a week"
          status="earned"
        />
        <StatusCard
          topCircleColor="#FAEFE0"
          bottomCircleColor="#FBDEB3"
          stackedText="🌅"
          title="Dawn Patrol"
          subtitle="3 sunrise walks"
          status="earned"
        />
        <StatusCard
          topCircleColor="#EAE5F2"
          bottomCircleColor="#CEC2E5"
          stackedText="🏅"
          title="Top Walker"
          subtitle="10 walks in a week"
          status="earned"
        />
      </div>
    </div>
  );
};

export default Badge;
