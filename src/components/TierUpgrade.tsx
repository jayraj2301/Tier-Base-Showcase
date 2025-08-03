'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserTier } from '@/lib/supabase';

interface TierUpgradeProps {
  currentTier: UserTier;
}

const tierOrder: UserTier[] = ['free', 'silver', 'gold', 'platinum'];

export default function TierUpgrade({ currentTier }: TierUpgradeProps) {
  const { user } = useUser();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const currentTierIndex = tierOrder.indexOf(currentTier);
  const nextTier = tierOrder[currentTierIndex + 1];

  const handleUpgrade = async (newTier: UserTier) => {
    if (!user) return;
    
    setIsUpgrading(true);
    try {
      await user.update({
        publicMetadata: {
          ...user.publicMetadata,
          tier: newTier
        }
      });
      
      // Refresh the page to show updated tier
      window.location.reload();
    } catch (error) {
      console.error('Error upgrading tier:', error);
      alert('Failed to upgrade tier. Please try again.');
    } finally {
      setIsUpgrading(false);
      setShowDropdown(false);
    }
  };

  const handleDowngrade = async (newTier: UserTier) => {
    if (!user) return;
    
    setIsUpgrading(true);
    try {
      await user.update({
        publicMetadata: {
          ...user.publicMetadata,
          tier: newTier
        }
      });
      
      // Refresh the page to show updated tier
      window.location.reload();
    } catch (error) {
      console.error('Error changing tier:', error);
      alert('Failed to change tier. Please try again.');
    } finally {
      setIsUpgrading(false);
      setShowDropdown(false);
    }
  };

  if (!nextTier) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          disabled={isUpgrading}
        >
          {isUpgrading ? 'Updating...' : 'Change Tier'}
        </button>
        
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
            <div className="py-1">
              {tierOrder.map((tier) => (
                <button
                  key={tier}
                  onClick={() => handleDowngrade(tier)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    tier === currentTier ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  {tier === currentTier && ' (Current)'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        disabled={isUpgrading}
      >
        {isUpgrading ? 'Upgrading...' : `Upgrade to ${nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}`}
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
          <div className="py-1">
            {tierOrder.map((tier) => (
              <button
                key={tier}
                onClick={() => tier === currentTier ? handleDowngrade(tier) : handleUpgrade(tier)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  tier === currentTier ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
                {tier === currentTier && ' (Current)'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 