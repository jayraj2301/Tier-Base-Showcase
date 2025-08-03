import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase, Event, UserTier } from "@/lib/supabase";
import EventCard from "@/components/EventCard";
import TierUpgrade from "@/components/TierUpgrade";
import SeedButton from "@/components/SeedButton";
import { SignOutButton } from "@clerk/nextjs";

const tierOrder: UserTier[] = ['free', 'silver', 'gold', 'platinum'];

async function getEvents(userTier: UserTier): Promise<Event[]> {
  const tierIndex = tierOrder.indexOf(userTier);
  const accessibleTiers = tierOrder.slice(0, tierIndex + 1);
  
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .in('tier', accessibleTiers)
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data || [];
}

async function getAllEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Error fetching all events:', error);
    return [];
  }

  return data || [];
}

export default async function EventsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();
  const userTier = (user?.publicMetadata?.tier as UserTier) || 'free';
  
  const events = await getEvents(userTier);
  const allEvents = await getAllEvents();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Event Showcase
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">Your tier:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  userTier === 'free' ? 'bg-gray-500 text-white' :
                  userTier === 'silver' ? 'bg-gray-400 text-white' :
                  userTier === 'gold' ? 'bg-yellow-500 text-white' :
                  'bg-purple-600 text-white'
                }`}>
                  {userTier.charAt(0).toUpperCase() + userTier.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SeedButton />
              <TierUpgrade currentTier={userTier} />
              <SignOutButton>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Events Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Available Events ({events.length})
          </h2>
          
          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                No events available for your tier. Upgrade to see more events!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} userTier={userTier} />
              ))}
            </div>
          )}
        </div>

        {/* All Events Section (for demonstration) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            All Events (Demo)
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Below are all events in the system. Events above your tier show upgrade messages.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event) => (
              <EventCard key={event.id} event={event} userTier={userTier} showUpgradeMessage={true} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 