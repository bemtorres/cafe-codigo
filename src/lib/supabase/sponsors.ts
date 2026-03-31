import type { SupabaseClient } from '@supabase/supabase-js';

export type SponsorWallRow = {
  id: string;
  display_name: string | null;
  sponsor_since: string | null;
};

/**
 * Perfiles marcados como colaboradores (is_sponsor), visibles en el muro público.
 */
export async function fetchSponsorWall(supabase: SupabaseClient): Promise<{
  rows: SponsorWallRow[];
  error: string | null;
}> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, sponsor_since')
    .eq('is_sponsor', true)
    .order('display_name', { ascending: true });

  if (error) {
    return { rows: [], error: error.message };
  }
  return { rows: (data as SponsorWallRow[]) ?? [], error: null };
}
