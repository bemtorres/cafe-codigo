import { getSupabaseBrowser } from '../supabase/client';
import type {
  BadgeDefinition,
  UserBadge,
  BadgeProgress,
  CreateBadgeInput,
  UpdateBadgeInput,
} from './types';
import type { SupabaseClient } from '@supabase/supabase-js';

function getClient(): SupabaseClient | null {
  return getSupabaseBrowser();
}

// ── Badge Definitions ──────────────────────────────────────────────────────

export async function getAllBadges(): Promise<BadgeDefinition[]> {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from('badge_definitions')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching badges:', error);
    return [];
  }

  return data || [];
}

export async function getBadgeByCode(code: string): Promise<BadgeDefinition | null> {
  const client = getClient();
  if (!client) return null;

  const { data, error } = await client
    .from('badge_definitions')
    .select('*')
    .eq('code', code)
    .single();

  if (error) {
    console.error('Error fetching badge:', error);
    return null;
  }

  return data;
}

export async function createBadge(input: CreateBadgeInput): Promise<BadgeDefinition | null> {
  const client = getClient();
  if (!client) return null;

  const { data, error } = await client
    .from('badge_definitions')
    .insert({
      code: input.code,
      name: input.name,
      description: input.description,
      image_url: input.image_url,
      required_courses: input.required_courses,
      required_modules: input.required_modules,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating badge:', error);
    return null;
  }

  return data;
}

export async function updateBadge(code: string, input: UpdateBadgeInput): Promise<BadgeDefinition | null> {
  const client = getClient();
  if (!client) return null;

  const { data, error } = await client
    .from('badge_definitions')
    .update({
      ...(input.name !== undefined && { name: input.name }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.image_url !== undefined && { image_url: input.image_url }),
      ...(input.required_courses !== undefined && { required_courses: input.required_courses }),
      ...(input.required_modules !== undefined && { required_modules: input.required_modules }),
      ...(input.is_active !== undefined && { is_active: input.is_active }),
      updated_at: new Date().toISOString(),
    })
    .eq('code', code)
    .select()
    .single();

  if (error) {
    console.error('Error updating badge:', error);
    return null;
  }

  return data;
}

export async function deleteBadge(code: string): Promise<boolean> {
  const client = getClient();
  if (!client) return false;

  const { error } = await client
    .from('badge_definitions')
    .delete()
    .eq('code', code);

  if (error) {
    console.error('Error deleting badge:', error);
    return false;
  }

  return true;
}

// ── User Badges ────────────────────────────────────────────────────────────

export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from('user_badges')
    .select(`
      *,
      definition:badge_definitions(*)
    `)
    .eq('user_id', userId)
    .order('earned_at', { ascending: false });

  if (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }

  return data || [];
}

export async function checkAndAwardBadges(): Promise<void> {
  const client = getClient();
  if (!client) return;

  const { error } = await client.rpc('check_and_award_badges');

  if (error) {
    console.error('Error checking and awarding badges:', error);
  }
}

// ── Badge Progress ─────────────────────────────────────────────────────────

export async function getBadgeProgress(userId: string): Promise<BadgeProgress[]> {
  const client = getClient();
  if (!client) return [];

  const badges = await getAllBadges();
  if (badges.length === 0) return [];

  const { data: quizData } = await client
    .from('quiz_progress')
    .select('course_slug, lesson_slug, correct_best, question_count')
    .eq('user_id', userId);

  const { data: earnedBadges } = await client
    .from('user_badges')
    .select('badge_code, earned_at')
    .eq('user_id', userId);

  const earnedMap = new Map<string, string>();
  earnedBadges?.forEach((ub) => {
    earnedMap.set(ub.badge_code, ub.earned_at);
  });

  const completedCourses = new Set<string>();
  const completedModules = new Set<string>();

  quizData?.forEach((qp) => {
    if (qp.correct_best === qp.question_count) {
      completedCourses.add(qp.course_slug);
      completedModules.add(`${qp.course_slug}/${qp.lesson_slug}`);
    }
  });

  return badges.map((badge) => {
    const earned = earnedMap.has(badge.code);
    const completedCoursesCount = badge.required_courses.filter((c) =>
      completedCourses.has(c)
    ).length;
    const completedModulesCount = badge.required_modules.filter((m) =>
      completedModules.has(m)
    ).length;

    const totalItems = badge.required_courses.length + badge.required_modules.length;
    const completedItems = completedCoursesCount + completedModulesCount;

    let progressPercentage = 0;
    if (totalItems > 0) {
      progressPercentage = Math.round((completedItems / totalItems) * 100);
    } else {
      progressPercentage = earned ? 100 : 0;
    }

    return {
      definition: badge,
      earned,
      earned_at: earnedMap.get(badge.code),
      completed_courses: completedCoursesCount,
      total_courses: badge.required_courses.length,
      completed_modules: completedModulesCount,
      total_modules: badge.required_modules.length,
      progress_percentage: Math.min(progressPercentage, 100),
    };
  });
}
