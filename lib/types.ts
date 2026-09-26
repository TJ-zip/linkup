export type LookingFor =
  | 'Make new friends'
  | 'Find people with similar interests'
  | 'Find a study partner'
  | 'Find teammates'
  | 'Find people to attend events with'
  | 'Work on projects'
  | 'Entrepreneurship / startup connections'
  | 'Networking'
  | 'Explore new hobbies'
  | 'Other';

export interface Student {
  id: string;
  name: string;
  avatarSeed: number;
  emoji: string;
  college: string;
  course: string;
  year: string;
  bio: string;
  interests: string[];
  hobbies: string[];
  skills: string[];
  careerInterests: string[];
  goals: string[];
  personality: string[];
  activities: string[];
  lookingFor: string[];
  premium?: boolean;
}

export interface Me extends Student {
  verified: boolean;
  verifiedEmail: string;
  premium: boolean;
  showPremiumBadge: boolean;
  onboarded: boolean;
}

export interface Breakdown {
  interest: number;
  goal: number;
  personality: number;
  activity: number;
  overall: number;
}

export interface MatchResult {
  student: Student;
  breakdown: Breakdown;
  reasons: string[];
  shared: {
    interests: string[];
    hobbies: string[];
    goals: string[];
    activities: string[];
    personality: string[];
    lookingFor: string[];
  };
  complementarySkills: string[];
  sameCollege: boolean;
}

export interface Message {
  id: string;
  from: 'me' | 'them';
  text: string;
  ts: number;
}

export type RequestState = 'pending' | 'connected';

export interface CommunityPost {
  id: string;
  kind: 'Event' | 'Club' | 'Meetup' | 'Project' | 'Opportunity' | 'Activity';
  title: string;
  host: string;
  college: string;
  when: string;
  where: string;
  blurb: string;
  tags: string[];
  attending: number;
  emoji: string;
}
