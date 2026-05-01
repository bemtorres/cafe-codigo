export interface BadgeDefinition {
  id: string;
  code: string;
  name: string;
  description: string;
  image_url: string;
  required_courses: string[];
  required_modules: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_code: string;
  earned_at: string;
  definition?: BadgeDefinition;
}

export interface BadgeProgress {
  definition: BadgeDefinition;
  earned: boolean;
  earned_at?: string;
  completed_courses: number;
  total_courses: number;
  completed_modules: number;
  total_modules: number;
  progress_percentage: number;
}

export interface CreateBadgeInput {
  code: string;
  name: string;
  description: string;
  image_url: string;
  required_courses: string[];
  required_modules: string[];
}

export interface UpdateBadgeInput {
  name?: string;
  description?: string;
  image_url?: string;
  required_courses?: string[];
  required_modules?: string[];
  is_active?: boolean;
}
