import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tier Event Showcase",
  description: "View events based on your user tier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <SignedOut>
            <div className="flex justify-center items-center h-screen">
            <SignIn routing="hash" signUpUrl="/sign-up" />
            </div>
          </SignedOut> */}
          <SignedOut>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
              <div className="w-full max-w-6xl mx-auto">
                {/* Mobile Header - Show only on mobile */}
                <div className="lg:hidden mb-8 text-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Tier Event Showcase
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Discover and explore premium events curated for every tier of experience.
                    Join our community to access exclusive showcases and networking opportunities.
                  </p>
                </div>

                {/* Main Content Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="lg:flex">
                    {/* Left Side - Project Info (Desktop Only) */}
                    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-12 flex-col justify-center">
                      <div className="text-white">
                        <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
                          Tier Event Showcase
                        </h1>
                        <p className="text-xl text-indigo-100 leading-relaxed mb-8">
                          Discover and explore premium events curated for every tier of experience.
                          Join our community to access exclusive showcases, networking opportunities,
                          and premium content tailored to your interests.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-indigo-100">Exclusive tier-based access</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-indigo-100">Premium event showcases</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-indigo-100">Networking opportunities</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Sign In Form */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
                      <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back
                          </h2>
                          <p className="text-gray-600">
                            Sign in to access your tier events
                          </p>
                        </div>

                        {/* Clerk SignIn Component */}
                        <div className="flex justify-center">
                          <SignIn
                            routing="hash"
                            signUpUrl="/sign-up"
                            forceRedirectUrl={"/events"}
                            appearance={{
                              elements: {
                                rootBox: "w-full",
                                card: "shadow-none border-0 w-full",
                                headerTitle: "hidden",
                                headerSubtitle: "hidden",
                                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50 text-gray-700",
                                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
                                footerActionLink: "text-indigo-600 hover:text-indigo-700",
                                identityPreviewText: "text-gray-600",
                                formFieldInput: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500">
                    © 2025 Tier Event Showcase. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="min-h-screen bg-gray-50">
              {/* Responsive Header */}
              <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">T</span>
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <h1 className="text-xl font-semibold text-gray-900">Tier Event Showcase</h1>
                        <p className="text-sm text-gray-500">View events based on your user tier</p>
                      </div>
                      <div className="sm:hidden">
                        <h1 className="text-lg font-semibold text-gray-900">Tier Events</h1>
                      </div>
                    </div>

                    {/* Navigation and User Menu */}
                    <div className="flex items-center space-x-4">
                      {/* Navigation Links - Hidden on mobile */}
                      <nav className="hidden md:flex space-x-8">
                        <a href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                          Events
                        </a>
                        <a href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                          Dashboard
                        </a>
                      </nav>

                      {/* User Button */}
                      <div className="flex items-center space-x-3">
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox: "w-8 h-8"
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
            </div>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
