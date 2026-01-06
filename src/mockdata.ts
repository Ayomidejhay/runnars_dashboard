export const mockPetChallenges = [
  {
    id: 1,
    name: "Walk for Wellness",
    location: "Global",
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
    location: "Downtown",
    participants: 58,
    type: "walk",
    category: "walk",
    status: "scheduled",
    days_left: 15,
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
    location: "Global",
    participants: 93,
    type: "walk",
    category: "walk",
    status: "completed",
    is_active: false,
    is_featured: true,
    community_id: 103,
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    startTime: "08:00",
    endTime: "10:00",
    completionRate: 100,
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
    location: "Downtown",
    participants: 34,
    type: "walk",
    category: "walk",
    status: "scheduled",
    days_left: 20,
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
    location: "Downtown",
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
    location: "Downtown",
    participants: 47,
    type: "walk",
    category: "walk",
    status: "scheduled",
    days_left: 3,
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
    location: "Global",
    participants: 102,
    type: "walk",
    category: "walk",
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
    location: "Downtown",
    participants: 65,
    type: "walk",
    category: "walk",
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
    location: "Downtown",
    participants: 77,
    type: "walk",
    category: "walk",
    status: "scheduled",
    days_left: 10,
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
    location: "Global",
    participants: 50,
    type: "walk",
    category: "walk",
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


export const adminUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    dateJoined: "2025-05-10",
    timeJoined: "09:15 AM",
    role: "Super Admin",
  },
  {
    id: 2,
    name: "Brian Smith",
    email: "brian.smith@example.com",
    dateJoined: "2025-04-28",
    timeJoined: "11:30 AM",
    role: "Challenge",
  },
  {
    id: 3,
    name: "Carla Evans",
    email: "carla.evans@example.com",
    dateJoined: "2025-03-22",
    timeJoined: "03:45 PM",
    role: "Communities",
  },
  {
    id: 4,
    name: "Daniel Lee",
    email: "daniel.lee@example.com",
    dateJoined: "2025-02-14",
    timeJoined: "08:05 AM",
    role: "Push Notification",
  },
  {
    id: 5,
    name: "Eva Martinez",
    email: "eva.martinez@example.com",
    dateJoined: "2025-01-30",
    timeJoined: "02:20 PM",
    role: "Content Moderation",
  },
  {
    id: 6,
    name: "Frank Harris",
    email: "frank.harris@example.com",
    dateJoined: "2025-06-02",
    timeJoined: "10:10 AM",
    role: "Challenge",
  },
  {
    id: 7,
    name: "Grace Thompson",
    email: "grace.thompson@example.com",
    dateJoined: "2025-05-18",
    timeJoined: "01:55 PM",
    role: "Super Admin",
  },
  {
    id: 8,
    name: "Henry Walker",
    email: "henry.walker@example.com",
    dateJoined: "2025-04-11",
    timeJoined: "04:40 PM",
    role: "Communities",
  },
  {
    id: 9,
    name: "Isabella Carter",
    email: "isabella.carter@example.com",
    dateJoined: "2025-03-06",
    timeJoined: "07:20 AM",
    role: "Push Notification",
  },
  {
    id: 10,
    name: "Jack Robinson",
    email: "jack.robinson@example.com",
    dateJoined: "2025-02-25",
    timeJoined: "05:30 PM",
    role: "Content Moderation",
  },
  {
    id: 11,
    name: "Katherine Lewis",
    email: "katherine.lewis@example.com",
    dateJoined: "2025-01-12",
    timeJoined: "12:45 PM",
    role: "Challenge",
  },
  {
    id: 12,
    name: "Liam Scott",
    email: "liam.scott@example.com",
    dateJoined: "2025-06-15",
    timeJoined: "09:05 AM",
    role: "Super Admin",
  },
  {
    id: 13,
    name: "Mia Adams",
    email: "mia.adams@example.com",
    dateJoined: "2025-05-27",
    timeJoined: "03:15 PM",
    role: "Communities",
  },
  {
    id: 14,
    name: "Noah Turner",
    email: "noah.turner@example.com",
    dateJoined: "2025-04-05",
    timeJoined: "06:25 PM",
    role: "Push Notification",
  },
  {
    id: 15,
    name: "Olivia Baker",
    email: "olivia.baker@example.com",
    dateJoined: "2025-03-19",
    timeJoined: "08:50 AM",
    role: "Content Moderation",
  },
];



export const walkData = {
  daily: [
    { name: "23", walks: 5 },
    { name: "24", walks: 8 },
    { name: "25", walks: 6 },
    { name: "26", walks: 7 },
    { name: "27", walks: 10 },
    { name: "28", walks: 4 },
    { name: "29", walks: 9 },
  ],
  weekly: [
    { name: "Week 1", walks: 32 },
    { name: "Week 2", walks: 47 },
    { name: "Week 3", walks: 29 },
    { name: "Week 4", walks: 53 },
    { name: "Week 5", walks: 39 },
  ],
  monthly: [
    { name: "Mar", walks: 110 },
    { name: "Apr", walks: 130 },
    { name: "May", walks: 125 },
    { name: "Jun", walks: 140 },
    { name: "Jul", walks: 160 },
    { name: "Aug", walks: 152 },
  ],
};


// utils/notificationMockData.ts

export type NotificationStatus = "sent" | "scheduled";
export type NotificationTarget = "all users" | "active users";

export type Notification = {
  id: number;
  name: string;
  target: NotificationTarget;
  dateSent: string;
  timeSent: string;
  status: NotificationStatus;
};

export const notificationData: Notification[] = [
  {
    id: 1,
    name: "New Feature Released",
    target: "all users",
    dateSent: "2025-07-29",
    timeSent: "10:30 AM",
    status: "sent",
  },
  {
    id: 2,
    name: "Weekly Activity Reminder",
    target: "active users",
    dateSent: "2025-08-01",
    timeSent: "08:00 AM",
    status: "scheduled",
  },
  {
    id: 3,
    name: "Maintenance Alert",
    target: "all users",
    dateSent: "2025-07-30",
    timeSent: "09:15 PM",
    status: "sent",
  },
  {
    id: 4,
    name: "Your Walk Summary is Ready",
    target: "active users",
    dateSent: "2025-08-03",
    timeSent: "07:00 AM",
    status: "scheduled",
  },
  {
    id: 5,
    name: "Welcome to PetWalk!",
    target: "all users",
    dateSent: "2025-07-28",
    timeSent: "03:45 PM",
    status: "sent",
  },
  {
    id: 6,
    name: "New Pet Badge Unlocked",
    target: "active users",
    dateSent: "2025-08-02",
    timeSent: "12:10 PM",
    status: "scheduled",
  },
  {
    id: 7,
    name: "Account Verification Reminder",
    target: "all users",
    dateSent: "2025-07-27",
    timeSent: "05:20 PM",
    status: "sent",
  },
  {
    id: 8,
    name: "Special Offer for Active Users",
    target: "active users",
    dateSent: "2025-08-04",
    timeSent: "09:00 AM",
    status: "scheduled",
  },
  {
    id: 9,
    name: "Policy Update Notification",
    target: "all users",
    dateSent: "2025-07-26",
    timeSent: "01:30 PM",
    status: "sent",
  },
  {
    id: 10,
    name: "Don't Miss Your Daily Walk!",
    target: "active users",
    dateSent: "2025-08-05",
    timeSent: "06:00 AM",
    status: "scheduled",
  },
];

export const communityMockData = [
  {
    id: '1',
    name: "Dog Lovers",
    creator: "Jane Doe",
    createdDate: "2023-04-12",
    members: 148,
    location: "Lagos, Nigeria",
    status: "active",
    activity: "Group walk scheduled",
  },
  {
    id: '2',
    name: "Fit Pet Parents",
    creator: "Michael Smith",
    createdDate: "2022-11-28",
    members: 204,
    location: "Abuja, Nigeria",
    status: "active",
    activity: "Content reported",
  },
  {
    id: '3',
    name: "Morning Walkers",
    creator: "Ada Nwankwo",
    createdDate: "2023-01-09",
    members: 93,
    location: "Port Harcourt, Nigeria",
    status: "inactive",
    activity: "New member request",
  },
  {
    id: '4',
    name: "Active Companions",
    creator: "Kenny Bassey",
    createdDate: "2023-05-21",
    members: 175,
    location: "Ibadan, Nigeria",
    status: "active",
    activity: "New member request",
  },
  {
    id: '5',
    name: "Cat People Hub",
    creator: "Sarah Johnson",
    createdDate: "2023-03-15",
    members: 89,
    location: "Enugu, Nigeria",
    status: "active",
    activity: "Group walk scheduled",
  },
  {
    id: '6',
    name: "Pet Wellness Tribe",
    creator: "Daniel Ekene",
    createdDate: "2022-10-05",
    members: 132,
    location: "Benin City, Nigeria",
    status: "inactive",
    activity: "Social meet-up scheduled",
  },
  {
    id: '7',
    name: "Reptile Enthusiasts",
    creator: "Anita Okafor",
    createdDate: "2023-06-01",
    members: 47,
    location: "Jos, Nigeria",
    status: "active",
    activity: "Social meet-up scheduled",
  },
  {
    id: '8',
    name: "Bird Watch Nigeria",
    creator: "Emeka Obi",
    createdDate: "2023-02-18",
    members: 59,
    location: "Owerri, Nigeria",
    status: "active",
    activity: "New member joined",
  },
  {
    id: '9',
    name: "Pet Nutrition Circle",
    creator: "Faith Yusuf",
    createdDate: "2022-09-30",
    members: 77,
    location: "Kano, Nigeria",
    status: "inactive",
    activity: "Group walk scheduled",
  },
  {
    id: '10',
    name: "Exotic Pet Club",
    creator: "Tunde Bello",
    createdDate: "2023-07-05",
    members: 64,
    location: "Ilorin, Nigeria",
    status: "active",
    activity: "New member joined",
  },
];

export const userMockData = [
  {
    id: "u1",
    name: "Grace Johnson",
    dateJoined: "2025-07-21",
    timeJoined: "09:15 AM",
    status: "active",
    email: "grace.johnson@example.com",
  },
  {
    id: "u2",
    name: "Michael Adewale",
    dateJoined: "2025-07-18",
    timeJoined: "02:30 PM",
    status: "inactive",
    email: "michael.adewale@example.com",
  },
  {
    id: "u3",
    name: "Fatima Bello",
    dateJoined: "2025-07-20",
    timeJoined: "11:05 AM",
    status: "active",
    email: "fatima.bello@example.com",
  },
  {
    id: "u4",
    name: "David Chukwu",
    dateJoined: "2025-07-25",
    timeJoined: "04:45 PM",
    status: "active",
    email: "david.chukwu@example.com",
  },
  {
    id: "u5",
    name: "Aisha Mohammed",
    dateJoined: "2025-07-16",
    timeJoined: "08:20 AM",
    status: "inactive",
    email: "aisha.mohammed@example.com",
  },
  {
    id: "u6",
    name: "Tunde Afolabi",
    dateJoined: "2025-07-19",
    timeJoined: "01:10 PM",
    status: "active",
    email: "tunde.afolabi@example.com",
  },
  {
    id: "u7",
    name: "Chiamaka Okafor",
    dateJoined: "2025-07-17",
    timeJoined: "03:55 PM",
    status: "inactive",
    email: "chiamaka.okafor@example.com",
  },
  {
    id: "u8",
    name: "Ifeanyi Umeh",
    dateJoined: "2025-07-22",
    timeJoined: "10:25 AM",
    status: "active",
    email: "ifeanyi.umeh@example.com",
  },
  {
    id: "u9",
    name: "Ngozi Eze",
    dateJoined: "2025-07-23",
    timeJoined: "06:50 PM",
    status: "inactive",
    email: "ngozi.eze@example.com",
  },
  {
    id: "u10",
    name: "Samuel Olaniyan",
    dateJoined: "2025-07-26",
    timeJoined: "07:40 AM",
    status: "active",
    email: "samuel.olaniyan@example.com",
  },
];


export const petMockData = [
  {
    id: "p1",
    petName: "Buddy",
    petfitScore: 85,
    ownerName: "Grace Johnson",
    breed: "Labrador Retriever",
    age: 3,
    status: "active",
  },
  {
    id: "p2",
    petName: "Milo",
    petfitScore: 72,
    ownerName: "Michael Adewale",
    breed: "Beagle",
    age: 4,
    status: "inactive",
  },
  {
    id: "p3",
    petName: "Luna",
    petfitScore: 91,
    ownerName: "Fatima Bello",
    breed: "Golden Retriever",
    age: 2,
    status: "active",
  },
  {
    id: "p4",
    petName: "Rocky",
    petfitScore: 66,
    ownerName: "David Chukwu",
    breed: "Bulldog",
    age: 5,
    status: "inactive",
  },
  {
    id: "p5",
    petName: "Zara",
    petfitScore: 78,
    ownerName: "Aisha Mohammed",
    breed: "Poodle",
    age: 3,
    status: "active",
  },
  {
    id: "p6",
    petName: "Max",
    petfitScore: 89,
    ownerName: "Tunde Afolabi",
    breed: "German Shepherd",
    age: 4,
    status: "active",
  },
  {
    id: "p7",
    petName: "Coco",
    petfitScore: 58,
    ownerName: "Chiamaka Okafor",
    breed: "Chihuahua",
    age: 6,
    status: "inactive",
  },
  {
    id: "p8",
    petName: "Simba",
    petfitScore: 94,
    ownerName: "Ifeanyi Umeh",
    breed: "Siberian Husky",
    age: 2,
    status: "active",
  },
  {
    id: "p9",
    petName: "Bella",
    petfitScore: 63,
    ownerName: "Ngozi Eze",
    breed: "Boxer",
    age: 5,
    status: "inactive",
  },
  {
    id: "p10",
    petName: "Charlie",
    petfitScore: 88,
    ownerName: "Samuel Olaniyan",
    breed: "Rottweiler",
    age: 3,
    status: "active",
  },
];


export const reportedContents = [
  {
    id: "rc-1a2b3c",
    title: "Offensive Comment on Post",
    user: "Jane Doe",
    type: "comment",
    status: "pending",
    dateReported: "2025-08-12T14:32:00Z",
    moderationNotes: "Contains explicit insult directed at another user.",
    reportReason: "Hate speech / harassment",
  },
  {
    id: "rc-4d5e6f",
    title: "Inappropriate Photo in Gallery",
    user: "Michael Smith",
    type: "photo",
    status: "reviewed",
    dateReported: "2025-08-10T10:15:00Z",
    moderationNotes: "Blurred sensitive parts, approved for public view.",
    reportReason: "Sexually explicit content",
  },
  {
    id: "rc-7g8h9i",
    title: "Spam Video Link",
    user: "Alice Johnson",
    type: "video",
    status: "pending",
    dateReported: "2025-08-13T08:47:00Z",
    moderationNotes: "Video contains repeated promotional content.",
    reportReason: "Spam / misleading content",
  },
  {
    id: "rc-j1k2l3",
    title: "#FakeNews Trending",
    user: "Chris Lee",
    type: "hashtag",
    status: "pending",
    dateReported: "2025-08-14T12:05:00Z",
    moderationNotes: "Hashtag linked to unverified political claims.",
    reportReason: "False information",
  },
  {
    id: "rc-m4n5o6",
    title: "Harassing Comment",
    user: "Daniel Kim",
    type: "comment",
    status: "reviewed",
    dateReported: "2025-08-11T19:25:00Z",
    moderationNotes: "Comment removed, user issued a warning.",
    reportReason: "Harassment / bullying",
  },
  {
    id: "rc-p7q8r9",
    title: "Graphic Violence in Photo",
    user: "Sophia Brown",
    type: "photo",
    status: "pending",
    dateReported: "2025-08-14T21:10:00Z",
    moderationNotes: "Image depicts violent injury, pending policy decision.",
    reportReason: "Violence / gore",
  },
  {
    id: "rc-s1t2u3",
    title: "Misleading Video Ad",
    user: "James Wilson",
    type: "video",
    status: "reviewed",
    dateReported: "2025-08-09T07:53:00Z",
    moderationNotes: "Video removed for false product claims.",
    reportReason: "False advertising",
  },
  {
    id: "rc-v4w5x6",
    title: "#ScamReports Flood",
    user: "Olivia Davis",
    type: "hashtag",
    status: "pending",
    dateReported: "2025-08-13T16:42:00Z",
    moderationNotes: "Hashtag linked to fraudulent giveaways.",
    reportReason: "Fraud / scam",
  },
  {
    id: "rc-y7z8a9",
    title: "Racist Comment Thread",
    user: "William Garcia",
    type: "comment",
    status: "reviewed",
    dateReported: "2025-08-08T15:12:00Z",
    moderationNotes: "Multiple offensive slurs removed, user banned.",
    reportReason: "Hate speech",
  },
  {
    id: "rc-b1c2d3",
    title: "Explicit Photo Upload",
    user: "Emma Martinez",
    type: "photo",
    status: "pending",
    dateReported: "2025-08-14T18:20:00Z",
    moderationNotes: "Nudity detected, pending review for artistic context.",
    reportReason: "Nudity / sexual content",
  },
];



export const postMockData = [
  {
    id: 1,
    title: "Sunset over the hills",
    hashtags: ["#sunset", "#nature", "#photography"],
    time: "2025-08-14T18:30:00Z",
    date: "2025-08-14",
    type: "photo",
    username: "natureLover",
    repostCount: 25,
  },
  {
    id: 2,
    title: "Morning workout vibes",
    hashtags: ["#fitness", "#morning", "#health"],
    time: "2025-08-14T06:15:00Z",
    date: "2025-08-14",
    type: "video",
    username: "fitGuru",
    repostCount: 40,
  },
  {
    id: 3,
    title: "Delicious homemade pizza",
    hashtags: ["#foodie", "#pizza", "#homemade"],
    time: "2025-08-13T19:00:00Z",
    date: "2025-08-13",
    type: "photo",
    username: "chefMike",
    repostCount: 32,
  },
  {
    id: 4,
    title: "Best hiking spots in 2025",
    hashtags: ["#travel", "#hiking", "#adventure"],
    time: "2025-08-13T09:20:00Z",
    date: "2025-08-13",
    type: "video",
    username: "wanderlust",
    repostCount: 18,
  },
  {
    id: 5,
    title: "Art in motion",
    hashtags: ["#art", "#creative", "#painting"],
    time: "2025-08-12T16:45:00Z",
    date: "2025-08-12",
    type: "photo",
    username: "artsyAnna",
    repostCount: 56,
  },
  {
    id: 6,
    title: "Ocean waves ASMR",
    hashtags: ["#ocean", "#relax", "#asmr"],
    time: "2025-08-12T20:10:00Z",
    date: "2025-08-12",
    type: "video",
    username: "calmVibes",
    repostCount: 73,
  },
  {
    id: 7,
    title: "DIY wooden table",
    hashtags: ["#DIY", "#woodwork", "#craft"],
    time: "2025-08-11T14:05:00Z",
    date: "2025-08-11",
    type: "photo",
    username: "makerJoe",
    repostCount: 27,
  },
  {
    id: 8,
    title: "City lights at night",
    hashtags: ["#city", "#nightlife", "#photography"],
    time: "2025-08-11T22:40:00Z",
    date: "2025-08-11",
    type: "photo",
    username: "urbanExplorer",
    repostCount: 61,
  },
  {
    id: 9,
    title: "Quick 15-min dinner recipe",
    hashtags: ["#recipe", "#quickmeals", "#cooking"],
    time: "2025-08-10T18:00:00Z",
    date: "2025-08-10",
    type: "video",
    username: "cookWithLove",
    repostCount: 45,
  },
  {
    id: 10,
    title: "Skateboarding tricks compilation",
    hashtags: ["#skate", "#sports", "#extreme"],
    time: "2025-08-10T15:25:00Z",
    date: "2025-08-10",
    type: "video",
    username: "skaterDude",
    repostCount: 50,
  },
];

export const hashtagMockData = [
  { title: "#MorningVibes", posts: 1520, type: "featured" },
  { title: "#PetChallenge2025", posts: 830, type: "challenge" },
  { title: "#HealthyEats", posts: 2145, type: "featured" },
  { title: "#SummerWalks", posts: 980, type: "challenge" },
  { title: "#WeekendFun", posts: 1325, type: "featured" },
  { title: "#DanceYourPet", posts: 560, type: "challenge" },
  { title: "#CozyCorners", posts: 875, type: "featured" },
  { title: "#FetchChallenge", posts: 430, type: "challenge" },
  { title: "#UrbanExplorers", posts: 1190, type: "featured" },
  { title: "#WaterSplash", posts: 640, type: "challenge" },
];

