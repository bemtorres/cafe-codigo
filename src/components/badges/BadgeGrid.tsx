import type { BadgeDefinition, BadgeProgress } from '../../lib/badges/types';
import { BadgeDisplay } from './BadgeDisplay';

interface BadgeGridProps {
  badges: BadgeDefinition[] | BadgeProgress[];
  title?: string;
  showProgress?: boolean;
}

function isBadgeProgress(item: BadgeDefinition | BadgeProgress): item is BadgeProgress {
  return 'definition' in item && 'earned' in item;
}

export function BadgeGrid({ badges, title, showProgress = true }: BadgeGridProps) {
  if (badges.length === 0) {
    return (
      <div className="p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <p className="text-gray-500">No hay insignias disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {badges.map((badge) => {
          if (isBadgeProgress(badge)) {
            return (
              <div key={badge.definition.code} className="relative">
                <BadgeDisplay
                  badge={badge.definition}
                  size="md"
                  showDescription
                />
                {showProgress && badge.earned && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-gray-900">
                    ✓
                  </div>
                )}
                {showProgress && !badge.earned && badge.progress_percentage > 0 && (
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-900">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all"
                        style={{ width: `${badge.progress_percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-1">
                      {badge.progress_percentage}%
                    </p>
                  </div>
                )}
              </div>
            );
          }

          return (
            <BadgeDisplay
              key={badge.code}
              badge={badge}
              size="md"
              showDescription
            />
          );
        })}
      </div>
    </div>
  );
}
