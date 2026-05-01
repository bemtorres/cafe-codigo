import { useState, useEffect } from 'react';
import { getBadgeProgress, checkAndAwardBadges } from '../../lib/badges';
import type { BadgeProgress } from '../../lib/badges/types';
import { BadgeGrid } from './BadgeGrid';

interface UserBadgesCardProps {
  userId: string;
}

export function UserBadgesCard({ userId }: UserBadgesCardProps) {
  const [badges, setBadges] = useState<BadgeProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  async function loadBadges() {
    setLoading(true);
    const progress = await getBadgeProgress(userId);
    setBadges(progress);
    setLoading(false);
  }

  useEffect(() => {
    if (userId) {
      loadBadges();
    }
  }, [userId]);

  async function handleCheckBadges() {
    setChecking(true);
    await checkAndAwardBadges();
    await loadBadges();
    setChecking(false);
  }

  if (loading) {
    return (
      <div className="p-6 bg-white border-2 border-gray-900 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const earnedCount = badges.filter((b) => b.earned).length;
  const totalCount = badges.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b-2 border-gray-900 pb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Insignias</h2>
          <p className="text-sm text-gray-600">
            {earnedCount} de {totalCount} obtenidas
          </p>
        </div>
        <button
          onClick={handleCheckBadges}
          disabled={checking}
          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 border-2 border-gray-900 rounded-lg font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {checking ? 'Verificando...' : 'Verificar progreso'}
        </button>
      </div>

      {earnedCount === 0 && totalCount === 0 ? (
        <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <p className="text-gray-500">No hay insignias disponibles aún</p>
        </div>
      ) : (
        <BadgeGrid badges={badges} showProgress />
      )}
    </div>
  );
}
