import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/events");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tier Event Showcase
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover exclusive events based on your membership tier. 
            From free community events to premium platinum experiences.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Welcome to Tier Event Showcase
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Choose your authentication method to get started.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/sign-in"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors block text-center"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors block text-center"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
              New users start with <span className="font-semibold text-gray-800 dark:text-gray-200">Free</span> tier access
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Available Tiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { tier: "Free", color: "bg-gray-500", events: "Community Events" },
              { tier: "Silver", color: "bg-gray-400", events: "Premium Events" },
              { tier: "Gold", color: "bg-yellow-500", events: "VIP Events" },
              { tier: "Platinum", color: "bg-purple-600", events: "Exclusive Events" },
            ].map((tier) => (
              <div
                key={tier.tier}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
              >
                <div className={`w-12 h-12 ${tier.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-white font-bold">{tier.tier[0]}</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {tier.tier}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {tier.events}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
