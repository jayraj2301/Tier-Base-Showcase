# Tier-Based Event Showcase

A responsive and elegant web application that allows logged-in users to view a list of show events based on their user tier (Free, Silver, Gold, Platinum). Users can only see events available to their tier or any lower tier.

## 🚀 Features

- **Authentication**: Secure user authentication with Clerk.dev
- **Tier-Based Access**: Events filtered based on user membership tier
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Real-time Tier Updates**: Users can upgrade/downgrade their tier for testing
- **Database Integration**: PostgreSQL database with Supabase
- **Modern UI**: Clean, accessible, and beautiful user interface

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Authentication**: Clerk.dev
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📋 Prerequisites

Before running this application, you'll need:

1. **Clerk Account**: Sign up at [clerk.dev](https://clerk.dev)
2. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
3. **Node.js**: Version 18 or higher

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd tier-event-showcase
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Database Setup

#### Create the Events Table

Run the following SQL in your Supabase SQL editor:

```sql
-- Create the events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'silver', 'gold', 'platinum')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on tier for better performance
CREATE INDEX idx_events_tier ON events(tier);

```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Seed the Database

1. Sign up/sign in to the application
2. Navigate to the events page
3. Click the "Seed Database" button to populate the database with sample events

## 👥 Demo User Credentials

For testing purposes, you can create accounts with different tiers. After signing up, use the tier upgrade feature to test different access levels:

### Tier Access Levels:
- **Free**: Access to 2 free events
- **Silver**: Access to 4 events (2 free + 2 silver)
- **Gold**: Access to 6 events (2 free + 2 silver + 2 gold)
- **Platinum**: Access to all 8 events (2 free + 2 silver + 2 gold + 2 platinum)

### Sample Events by Tier:

#### Free Tier Events:
- Community Meetup
- Open Workshop

#### Silver Tier Events:
- Advanced Development Seminar
- Design Thinking Workshop

#### Gold Tier Events:
- VIP Networking Dinner
- Executive Leadership Summit

#### Platinum Tier Events:
- Exclusive Tech Retreat
- Founder's Circle

## 🎯 How It Works

### Authentication Flow
1. Users land on the homepage with sign-in/sign-up options
2. After authentication, users are redirected to `/events`
3. User tier is stored in Clerk's public metadata

### Tier-Based Filtering
1. Application fetches user's tier from Clerk metadata
2. Events are filtered based on tier hierarchy (Free < Silver < Gold < Platinum)
3. Users see only events available to their tier or below

### Tier Management
- Users can upgrade/downgrade their tier for testing
- Tier changes are stored in Clerk's public metadata
- Page refreshes automatically after tier changes

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── seed/
│   │       └── route.ts          # Database seeding API
│   ├── events/
│   │   └── page.tsx              # Events listing page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with Clerk provider
│   ├── page.tsx                  # Landing page
│   └── middleware.ts             # Authentication middleware
├── components/
│   ├── EventCard.tsx             # Event display component
│   ├── SeedButton.tsx            # Database seeding component
│   └── TierUpgrade.tsx           # Tier management component
└── lib/
    └── supabase.ts               # Supabase client and types
```

## 🔧 Configuration

### Clerk Setup
1. Create a new application in Clerk dashboard
2. Configure authentication methods (email, social, etc.)
3. Copy your publishable key and secret key
4. Add your domain to allowed origins

### Supabase Setup
1. Create a new project in Supabase
2. Run the SQL commands above to create the events table
3. Copy your project URL and anon key
4. Configure Row Level Security policies

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your production environment:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_production_clerk_key
CLERK_SECRET_KEY=your_production_clerk_secret
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 🎨 Customization

### Adding New Events
1. Use the seed API endpoint to add new events
2. Or manually insert events into the Supabase database
3. Ensure tier values are one of: 'free', 'silver', 'gold', 'platinum'

### Styling
- Modify `src/app/globals.css` for global styles
- Update component styles in individual component files
- Tailwind CSS classes are used throughout the application

## 🔒 Security Features

- **Authentication**: All routes (except homepage) require authentication
- **Row Level Security**: Database-level access control
- **Tier Validation**: Server-side tier checking
- **Input Validation**: TypeScript interfaces ensure data integrity

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Tier-based event filtering
- [ ] Tier upgrade/downgrade functionality
- [ ] Responsive design on mobile devices
- [ ] Database seeding
- [ ] Error handling

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


---

**Note**: This is a demonstration application. In a production environment, i would implement proper payment processing, more robust security measures, and additional features like event registration, notifications, etc.
