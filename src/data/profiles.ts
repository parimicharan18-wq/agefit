import type { UserProfile, Challenge, AchievementBadge } from '../types';

export const DEMO_PROFILES: Record<string, UserProfile> = {
  leo: {
    id: 'user-leo',
    name: 'Leo Chen',
    email: 'leo@example.com',
    dateOfBirth: '2016-04-12',
    age: 10,
    ageGroup: 'children',
    gender: 'male',
    fitnessLevel: 'beginner',
    goals: ['general_fitness', 'better_daily_activity'],
    availableTime: 15,
    preferences: ['home', 'bodyweight'],
    limitations: ['none'],
    currentStreak: 4,
    bestStreak: 7,
    totalWorkoutMinutes: 180,
    totalWorkoutsCompleted: 12,
    createdAt: '2026-01-10T00:00:00.000Z'
  },
  maya: {
    id: 'user-maya',
    name: 'Maya Patel',
    email: 'maya@example.com',
    dateOfBirth: '2010-08-19',
    age: 16,
    ageGroup: 'teenagers',
    gender: 'female',
    fitnessLevel: 'intermediate',
    goals: ['muscle_strength', 'flexibility'],
    availableTime: 20,
    preferences: ['home', 'bodyweight'],
    limitations: ['none'],
    currentStreak: 6,
    bestStreak: 14,
    totalWorkoutMinutes: 340,
    totalWorkoutsCompleted: 17,
    createdAt: '2026-01-15T00:00:00.000Z'
  },
  charan: {
    id: 'user-charan',
    name: 'Charan Teja',
    email: 'parimicharan18@gmail.com',
    dateOfBirth: '1998-05-18',
    age: 28,
    ageGroup: 'young_adults',
    gender: 'male',
    fitnessLevel: 'intermediate',
    goals: ['muscle_strength', 'endurance', 'weight_management'],
    availableTime: 20,
    preferences: ['home', 'bodyweight', 'walking'],
    limitations: ['none'],
    currentStreak: 5,
    bestStreak: 12,
    totalWorkoutMinutes: 420,
    totalWorkoutsCompleted: 21,
    createdAt: '2026-02-01T00:00:00.000Z'
  },
  david: {
    id: 'user-david',
    name: 'David Miller',
    email: 'david@example.com',
    dateOfBirth: '1974-11-03',
    age: 52,
    ageGroup: 'middle_age',
    gender: 'male',
    fitnessLevel: 'beginner',
    goals: ['mobility', 'stress_reduction'],
    availableTime: 15,
    preferences: ['home', 'walking'],
    limitations: ['back'],
    currentStreak: 3,
    bestStreak: 9,
    totalWorkoutMinutes: 210,
    totalWorkoutsCompleted: 14,
    createdAt: '2026-02-10T00:00:00.000Z'
  },
  grace: {
    id: 'user-grace',
    name: 'Grace Thompson',
    email: 'grace@example.com',
    dateOfBirth: '1955-02-28',
    age: 71,
    ageGroup: 'seniors',
    gender: 'female',
    fitnessLevel: 'beginner',
    goals: ['balance', 'mobility'],
    availableTime: 15,
    preferences: ['home'],
    limitations: ['knee'],
    currentStreak: 8,
    bestStreak: 15,
    totalWorkoutMinutes: 280,
    totalWorkoutsCompleted: 18,
    createdAt: '2026-01-05T00:00:00.000Z'
  }
};

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch-7day-habit',
    name: '7-Day Movement Kickstart',
    level: 'beginner',
    durationDays: 7,
    description: 'Build consistency with 10–15 minutes of joint-safe movement each day.',
    badgeName: 'Consistency Champ',
    icon: '🌱',
    targetAgeGroups: ['children', 'teenagers', 'young_adults', 'adults', 'middle_age', 'seniors'],
    dailyTasks: [
      { day: 1, title: 'Day 1: Gentle Wake-Up', description: 'Complete today’s 10-min warmup and mobility.', targetMinutes: 10 },
      { day: 2, title: 'Day 2: Posture Check', description: 'Focus on tall spine and core stability.', targetMinutes: 12 },
      { day: 3, title: 'Day 3: Lower Body Rhythm', description: 'Gentle squats, marching or chair sit-to-stands.', targetMinutes: 15 },
      { day: 4, title: 'Day 4: Active Rest', description: 'Deep diaphragmatic breathing and gentle walking.', targetMinutes: 10 },
      { day: 5, title: 'Day 5: Balance & Focus', description: 'Single-leg stand, clock reach, or heel raises.', targetMinutes: 15 },
      { day: 6, title: 'Day 6: Full Body Flow', description: 'Combine cardio marching and muscle tone.', targetMinutes: 15 },
      { day: 7, title: 'Day 7: Celebration Lap', description: 'Finish your final session with confidence!', targetMinutes: 15 }
    ]
  },
  {
    id: 'ch-14day-strength',
    name: '14-Day Posture & Core Builder',
    level: 'intermediate',
    durationDays: 14,
    description: 'Strengthen spine support, shoulder mobility, and functional movement.',
    badgeName: 'Posture Pro',
    icon: '🛡️',
    targetAgeGroups: ['teenagers', 'young_adults', 'adults', 'middle_age'],
    dailyTasks: [
      { day: 1, title: 'Day 1: Spine Alignment', description: 'Wall angels and bird-dogs.', targetMinutes: 15 },
      { day: 2, title: 'Day 2: Core Foundations', description: 'Glute bridges and dead-bugs.', targetMinutes: 15 },
      { day: 3, title: 'Day 3: Upper Back Release', description: 'Chest openers and shoulder retraction.', targetMinutes: 15 }
    ]
  }
];

export const BADGES: AchievementBadge[] = [
  { id: 'b1', title: 'First Step', description: 'Completed your very first workout', icon: '🎯', category: 'workouts' },
  { id: 'b2', title: '3-Day Streak', description: 'Exercised 3 days in a row', icon: '🔥', category: 'streak' },
  { id: 'b3', title: '7-Day Warrior', description: 'Maintained 7 consecutive active days', icon: '⚡', category: 'streak' },
  { id: 'b4', title: 'Century Club', description: 'Accumulated over 100 active minutes', icon: '🏅', category: 'special' },
  { id: 'b5', title: 'Joint Guardian', description: 'Completed 5 balance & mobility sessions', icon: '🌿', category: 'workouts' }
];

export const NUTRITION_GUIDELINES = [
  {
    ageGroup: 'Children (5–12 yrs)',
    headline: 'Fueling Growth, Energy & Strong Bones',
    tips: [
      'Whole foods first: fresh fruit slices, crunchy vegetables with hummus, and yogurt over sugary packaged snacks.',
      'Calcium and vitamin D for growing bones: milk, fortified plant milks, cheeses, or leafy greens.',
      'Hydration rule: Water is the best workout beverage. Limit fruit juices to special treats.',
      'Never skip breakfast: complex carbs (oatmeal, eggs, whole grains) power school concentration and playground energy.'
    ]
  },
  {
    ageGroup: 'Teens (13–18 yrs)',
    headline: 'Athletic Recovery & Sustained Vitality',
    tips: [
      'Quality lean protein: eggs, lentils, chicken, tofu, or nuts within 45 minutes after intense exercise.',
      'Iron for energy transport: lean meats, beans, spinach, and pumpkin seeds prevent fatigue.',
      'Smarter carbs: sweet potatoes, brown rice, and quinoa fuel workouts better than soda and fast-food snacks.',
      'Sleep is nutrition for muscles: aim for 8–9 hours to synthesize growth hormones.'
    ]
  },
  {
    ageGroup: 'Adults (19–60 yrs)',
    headline: 'Metabolic Health, Muscle Retention & Stress Relief',
    tips: [
      'Mindful portioning: Half of your plate with vibrant vegetables, 1/4 with lean protein, 1/4 with high-fiber grains.',
      'Combat sitting fatigue: drink a full glass of water every 90 minutes to maintain cellular hydration.',
      'Omega-3 fatty acids: salmon, flaxseed, chia seeds, and walnuts reduce joint inflammation.',
      'Limit late evening ultra-processed foods: improves deep sleep and next-morning workout readiness.'
    ]
  },
  {
    ageGroup: 'Seniors (60+ yrs)',
    headline: 'Muscle Preservation, Bone Density & Digestive Comfort',
    tips: [
      'Adequate protein in every meal: 25–30g of easy-to-digest protein helps prevent age-related sarcopenia (muscle loss).',
      'Hydration reminder: Thirst sensation decreases with age. Sip water consistently throughout the day.',
      'Fiber & gut health: stewed apples, oatmeal, berries, and lentils assist healthy digestion.',
      'Vitamin B12 and Vitamin D: essential for nerve function, bone retention, and steady balance.'
    ]
  }
];
