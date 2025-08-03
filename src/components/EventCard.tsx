'use client';

import { Event, UserTier } from "@/lib/supabase";
import Image from "next/image";

interface EventCardProps {
  event: Event;
  userTier: UserTier;
  showUpgradeMessage?: boolean;
}

const tierColors = {
  free: 'bg-gray-500',
  silver: 'bg-gray-400',
  gold: 'bg-yellow-500',
  platinum: 'bg-purple-600'
};

const tierOrder: UserTier[] = ['free', 'silver', 'gold', 'platinum'];

export default function EventCard({ event, userTier, showUpgradeMessage = false }: EventCardProps) {
  const userTierIndex = tierOrder.indexOf(userTier);
  const eventTierIndex = tierOrder.indexOf(event.tier);
  const isAccessible = eventTierIndex <= userTierIndex;
  const needsUpgrade = !isAccessible && showUpgradeMessage;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
      needsUpgrade ? 'opacity-60' : ''
    }`}>
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600">
        <Image
          src={event.image_url || '/placeholder-event.jpg'}
          alt={event.title}
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkV2ZW50IEltYWdlPC90ZXh0Pjwvc3ZnPg==';
          }}
        />
        
        {/* Tier Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${tierColors[event.tier]}`}>
            {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)}
          </span>
        </div>

        {/* Upgrade Overlay */}
        {needsUpgrade && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white p-4">
              <div className="text-2xl mb-2">🔒</div>
              <p className="font-semibold">Upgrade to {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)}</p>
              <p className="text-sm opacity-90">to access this event</p>
            </div>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {event.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(event.event_date)}
        </div>

        {needsUpgrade ? (
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Upgrade to Access
          </button>
        ) : (
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            View Details
          </button>
        )}
      </div>
    </div>
  );
} 