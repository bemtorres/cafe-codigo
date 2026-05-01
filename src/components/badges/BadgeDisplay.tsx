import type { BadgeDefinition } from '../../lib/badges/types';

interface BadgeDisplayProps {
  badge: BadgeDefinition;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
}

const sizeClasses = {
  sm: {
    container: 'w-24 h-24',
    image: 'w-16 h-16',
    name: 'text-xs',
  },
  md: {
    container: 'w-32 h-32',
    image: 'w-20 h-20',
    name: 'text-sm',
  },
  lg: {
    container: 'w-40 h-40',
    image: 'w-28 h-28',
    name: 'text-base',
  },
};

export function BadgeDisplay({ badge, size = 'md', showDescription = false }: BadgeDisplayProps) {
  const classes = sizeClasses[size];

  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-gray-900 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
      <div className={`${classes.container} flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full border-2 border-gray-900`}>
        <img
          src={badge.image_url}
          alt={badge.name}
          className={`${classes.image} object-contain`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/badges/default.svg';
          }}
        />
      </div>
      <h3 className={`${classes.name} font-bold text-gray-900 text-center`}>{badge.name}</h3>
      {showDescription && badge.description && (
        <p className="text-xs text-gray-600 text-center line-clamp-2">{badge.description}</p>
      )}
    </div>
  );
}
