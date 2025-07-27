export const mockPetChallenges = [
  {
    id: 1,
    name: "Walk for Wellness",
    location: "Lagos, Nigeria",
    participants: 120,
    type: "walk",
    category: "walk",
    status: "active",
    is_active: true,
    is_featured: true,
    community_id: 101,
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    startTime: "06:00",
    endTime: "08:00",
    completionRate: 76,
    description: "A month-long walking challenge to promote daily exercise and bonding with pets around Lagos.",
    primaryGoal: "Promote daily walking routines",
    totalDistance: "50km",
    hashtags: ["#WalkForWellness", "#HealthyPets", "#LagosPets"],
    rewards: {
      completionPoints: 100,
      achievementBadge: "Wellness Walker"
    },
    eligibleParticipants: "All dog owners in Lagos",
    users: [
      {
        id: "1-1",
        name: "Ayomide Joshua",
        joinedAt: "2025-07-01T06:15:00",
        status: "active",
        completionRate: 80
      },
      {
        id: "1-2",
        name: "Chioma Adebanjo",
        joinedAt: "2025-07-03T07:00:00",
        status: "active",
        completionRate: 72
      },
      {
        id: "1-3",
        name: "Tolu Adeyemi",
        joinedAt: "2025-07-05T06:30:00",
        status: "active",
        completionRate: 60
      }
    ]
  },
  {
    id: 2,
    name: "Puppy Social Hour",
    location: "Abuja, Nigeria",
    participants: 58,
    type: "social",
    category: "social",
    status: "scheduled",
    is_active: false,
    is_featured: false,
    community_id: 102,
    startDate: "2025-08-10",
    endDate: "2025-08-12",
    startTime: "15:00",
    endTime: "17:00",
    completionRate: 0,
    description: "An interactive social gathering for puppies and their owners to play and socialize in a safe environment.",
    primaryGoal: "Encourage puppy socialization",
    totalDistance: null,
    hashtags: ["#PuppyTime", "#SocialPets", "#AbujaDogs"],
    rewards: {
      completionPoints: 30,
      achievementBadge: "Friendly Pup"
    },
    eligibleParticipants: "Puppies under 1 year old and their owners",
    users: [
      {
        id: "2-1",
        name: "Aisha Umar",
        joinedAt: "2025-08-01T12:00:00",
        status: "registered",
        completionRate: 0
      },
      {
        id: "2-2",
        name: "Henry Eze",
        joinedAt: "2025-08-05T13:20:00",
        status: "registered",
        completionRate: 0
      }
    ]
  },
  {
    id: 3,
    name: "Healthy Paws Challenge",
    location: "Ibadan, Nigeria",
    participants: 93,
    type: "wellness",
    category: "wellness",
    status: "completed",
    is_active: false,
    is_featured: true,
    community_id: 103,
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    startTime: "08:00",
    endTime: "10:00",
    completionRate: 92,
    description: "Focused on health checks, nutrition, and exercise routines to maintain your pet's overall wellness.",
    primaryGoal: "Improve overall pet wellness",
    totalDistance: "20km",
    hashtags: ["#HealthyPaws", "#IbadanPets", "#WellnessChallenge"],
    rewards: {
      completionPoints: 120,
      achievementBadge: "Wellness Hero"
    },
    eligibleParticipants: "All dog and cat owners",
    users: [
      {
        id: "3-1",
        name: "Bola Salami",
        joinedAt: "2025-06-01T08:10:00",
        status: "completed",
        completionRate: 100
      },
      {
        id: "3-2",
        name: "Nnamdi Okoro",
        joinedAt: "2025-06-02T09:00:00",
        status: "completed",
        completionRate: 90
      }
    ]
  },
  {
    id: 4,
    name: "Obedience Bootcamp",
    location: "Port Harcourt, Nigeria",
    participants: 34,
    type: "training",
    category: "training",
    status: "draft",
    is_active: false,
    is_featured: false,
    community_id: undefined,
    startDate: "2025-09-01",
    endDate: "2025-09-15",
    startTime: "09:00",
    endTime: "11:00",
    completionRate: 0,
    description: "A training challenge to help pets improve obedience and learn essential commands over two weeks.",
    primaryGoal: "Improve pet obedience",
    totalDistance: null,
    hashtags: ["#BootcampDogs", "#ObedienceMatters", "#TrainingChallenge"],
    rewards: {
      completionPoints: 90,
      achievementBadge: "Disciplined Doggo"
    },
    eligibleParticipants: "Dogs over 6 months old",
    users: [
      {
        id: "4-1",
        name: "Tamuno Ibifuro",
        joinedAt: "2025-08-25T10:00:00",
        status: "registered",
        completionRate: 0
      }
    ]
  },
  {
    id: 5,
    name: "Evening Walk Squad",
    location: "Enugu, Nigeria",
    participants: 88,
    type: "walk",
    category: "walk",
    status: "active",
    is_active: true,
    is_featured: false,
    community_id: 105,
    startDate: "2025-07-15",
    endDate: "2025-08-15",
    startTime: "17:30",
    endTime: "19:00",
    completionRate: 40,
    description: "A relaxed evening walking challenge where pet owners gather daily for healthy strolls with their dogs.",
    primaryGoal: "Encourage consistent daily walks",
    totalDistance: "35km",
    hashtags: ["#EveningWalk", "#WalkSquad", "#EnuguPets"],
    rewards: {
      completionPoints: 80,
      achievementBadge: "Evening Explorer"
    },
    eligibleParticipants: "All pet owners in Enugu",
    users: [
      {
        id: "5-1",
        name: "Nkechi Obi",
        joinedAt: "2025-07-15T17:45:00",
        status: "active",
        completionRate: 35
      },
      {
        id: "5-2",
        name: "Emeka Uche",
        joinedAt: "2025-07-18T18:00:00",
        status: "active",
        completionRate: 45
      }
    ]
  },
  {
    id: 6,
    name: "Puppy Yoga Session",
    location: "Kano, Nigeria",
    participants: 47,
    type: "wellness",
    category: "wellness",
    status: "scheduled",
    is_active: false,
    is_featured: false,
    community_id: undefined,
    startDate: "2025-08-20",
    endDate: "2025-08-20",
    startTime: "10:00",
    endTime: "11:30",
    completionRate: 0,
    description: "A wellness event combining basic yoga with playful puppy interaction for stress relief and flexibility.",
    primaryGoal: "Reduce stress and bond with pets",
    totalDistance: null,
    hashtags: ["#PuppyYoga", "#StressFreePets", "#KanoEvent"],
    rewards: {
      completionPoints: 40,
      achievementBadge: "Zen Pup"
    },
    eligibleParticipants: "Pet owners aged 18 and above",
    users: [
      {
        id: "6-1",
        name: "Zainab Ali",
        joinedAt: "2025-08-15T11:00:00",
        status: "registered",
        completionRate: 0
      }
    ]
  },
  {
    id: 7,
    name: "Doggo Dance Day",
    location: "Abeokuta, Nigeria",
    participants: 102,
    type: "social",
    category: "social",
    status: "completed",
    is_active: false,
    is_featured: true,
    community_id: 107,
    startDate: "2025-05-10",
    endDate: "2025-05-10",
    startTime: "13:00",
    endTime: "15:00",
    completionRate: 100,
    description: "A fun-filled day where pet owners and their dogs show off dance moves in a festive and lively event.",
    primaryGoal: "Celebrate pet creativity",
    totalDistance: null,
    hashtags: ["#DoggoDance", "#PetFun", "#AbeokutaPets"],
    rewards: {
      completionPoints: 50,
      achievementBadge: "Dancing Duo"
    },
    eligibleParticipants: "All dog owners",
    users: [
      {
        id: "7-1",
        name: "Kolapo Ilesanmi",
        joinedAt: "2025-05-01T14:00:00",
        status: "completed",
        completionRate: 100
      }
    ]
  },
  {
    id: 8,
    name: "Bark & Train Challenge",
    location: "Jos, Nigeria",
    participants: 65,
    type: "training",
    category: "training",
    status: "active",
    is_active: true,
    is_featured: false,
    community_id: undefined,
    startDate: "2025-07-10",
    endDate: "2025-07-25",
    startTime: "08:30",
    endTime: "10:30",
    completionRate: 55,
    description: "A challenge designed to reinforce basic training and obedience for dogs of all breeds and sizes.",
    primaryGoal: "Reinforce pet discipline",
    totalDistance: null,
    hashtags: ["#BarkAndTrain", "#JosPets", "#TrainingDay"],
    rewards: {
      completionPoints: 85,
      achievementBadge: "Training Champ"
    },
    eligibleParticipants: "Dogs over 4 months old",
    users: [
      {
        id: "8-1",
        name: "Mary Yakubu",
        joinedAt: "2025-07-11T09:00:00",
        status: "active",
        completionRate: 50
      },
      {
        id: "8-2",
        name: "David Moses",
        joinedAt: "2025-07-13T08:45:00",
        status: "active",
        completionRate: 60,
        
      }
    ]
  },
  {
    id: 9,
    name: "Sunrise Stroll",
    location: "Benin City, Nigeria",
    participants: 77,
    type: "walk",
    category: "walk",
    status: "draft",
    is_active: false,
    is_featured: false,
    community_id: 109,
    startDate: "2025-09-10",
    endDate: "2025-09-30",
    startTime: "05:30",
    endTime: "07:00",
    completionRate: 0,
    description: "Start your day right with early morning walks designed for peaceful bonding with your furry friend.",
    primaryGoal: "Promote morning exercise",
    totalDistance: "25km",
    hashtags: ["#SunriseStroll", "#BeninPets", "#MorningWalks"],
    rewards: {
      completionPoints: 70,
      achievementBadge: "Early Bird"
    },
    eligibleParticipants: "All dog owners in Benin City",
    users: []
  },
  {
    id: 10,
    name: "Vet Visit Week",
    location: "Akure, Nigeria",
    participants: 50,
    type: "wellness",
    category: "wellness",
    status: "completed",
    is_active: false,
    is_featured: true,
    community_id: undefined,
    startDate: "2025-06-20",
    endDate: "2025-06-26",
    startTime: "09:00",
    endTime: "17:00",
    completionRate: 87,
    description: "An awareness week focused on promoting routine vet checkups and health screenings for pets.",
    primaryGoal: "Encourage routine vet visits",
    totalDistance: null,
    hashtags: ["#VetWeek", "#HealthyPets", "#AkureEvent"],
    rewards: {
      completionPoints: 110,
      achievementBadge: "Health Advocate"
    },
    eligibleParticipants: "All pet owners in Akure",
    users: [
      {
        id: "10-1",
        name: "Samuel Adekunle",
        joinedAt: "2025-06-21T10:00:00",
        status: "completed",
        completionRate: 90,
        
      },
      {
        id: "10-2",
        name: "Rachael Ajayi",
        joinedAt: "2025-06-22T12:00:00",
        status: "completed",
        completionRate: 84,
        
      }
    ]
  }
];


// charts
export const hourlyData = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0") + ":00";
  return {
    time: hour,
    engagementRate: Math.floor(Math.random() * 51),
    avgDistance: Math.floor(Math.random() * 51),
    completionRate: Math.floor(Math.random() * 51),
  };
});

export const dailyData = [
  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
].map((day) => ({
  time: day,
  engagementRate: Math.floor(Math.random() * 51),
  avgDistance: Math.floor(Math.random() * 51),
  completionRate: Math.floor(Math.random() * 51),
}));

//bar chart
export const distanceData = [
  { range: "0-1km", value: 25 },
  { range: "1-2km", value: 45 },
  { range: "2-3km", value: 67 },
  { range: "3-4km", value: 15 },
  { range: "4-5km", value: 58 },
  { range: "5-6km", value: 35 },
  { range: "6-7km", value: 72 },
];

//badges
export const mockBadges = [
  {
    id: 1,
    badgeName: "First Challenge Completed",
    dateCreated: "2025-01-15",
  },
  {
    id: 2,
    badgeName: "10,000 Steps in a Day",
    dateCreated: "2025-02-10",
  },
  {
    id: 3,
    badgeName: "Consistency Champion",
    dateCreated: "2025-03-05",
  },
  {
    id: 4,
    badgeName: "Early Bird",
    dateCreated: "2025-03-20",
  },
  {
    id: 5,
    badgeName: "Community Helper",
    dateCreated: "2025-04-12",
  },
  {
    id: 6,
    badgeName: "Pet Walk Pro",
    dateCreated: "2025-05-01",
  },
  {
    id: 7,
    badgeName: "Step Master",
    dateCreated: "2025-06-18",
  },
  {
    id: 8,
    badgeName: "Hydration Hero",
    dateCreated: "2025-07-02",
  },
  {
    id: 9,
    badgeName: "Challenge Veteran",
    dateCreated: "2025-07-15",
  },
  {
    id: 10,
    badgeName: "Social Butterfly",
    dateCreated: "2025-07-22",
  },
];
