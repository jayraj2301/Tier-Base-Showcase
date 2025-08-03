import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const sampleEvents = [
  // Free tier events
  {
    title: "Community Meetup",
    description: "Join us for a casual community meetup where you can network with fellow enthusiasts and share your experiences. This is a great opportunity to connect with like-minded individuals in a relaxed atmosphere.",
    event_date: "2024-12-15T18:00:00Z",
    image_url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    tier: "free"
  },
  {
    title: "Open Workshop",
    description: "Learn the basics of modern web development in this hands-on workshop. Perfect for beginners who want to get started with coding and build their first project.",
    event_date: "2024-12-20T14:00:00Z",
    image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    tier: "free"
  },
  
  // Silver tier events
  {
    title: "Advanced Development Seminar",
    description: "Deep dive into advanced development techniques and best practices. Learn from industry experts about scaling applications and optimizing performance.",
    event_date: "2024-12-25T10:00:00Z",
    image_url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    tier: "silver"
  },
  {
    title: "Design Thinking Workshop",
    description: "Explore the principles of design thinking and how to apply them to create better user experiences. This workshop combines theory with practical exercises.",
    event_date: "2024-12-28T15:30:00Z",
    image_url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
    tier: "silver"
  },
  
  // Gold tier events
  {
    title: "VIP Networking Dinner",
    description: "An exclusive networking dinner with industry leaders and successful entrepreneurs. Enjoy fine dining while building valuable connections in an intimate setting.",
    event_date: "2025-01-05T19:00:00Z",
    image_url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    tier: "gold"
  },
  {
    title: "Executive Leadership Summit",
    description: "Join top executives and thought leaders for a day of strategic discussions about the future of technology and business. Limited to 50 attendees for intimate discussions.",
    event_date: "2025-01-10T09:00:00Z",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    tier: "gold"
  },
  
  // Platinum tier events
  {
    title: "Exclusive Tech Retreat",
    description: "A 3-day exclusive retreat in a luxury location where you'll have private sessions with tech visionaries, personalized mentoring, and access to cutting-edge technology demonstrations.",
    event_date: "2025-01-15T08:00:00Z",
    image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    tier: "platinum"
  },
  {
    title: "Founder's Circle",
    description: "An ultra-exclusive gathering of successful founders and investors. This intimate event features private pitch sessions, investment opportunities, and strategic partnerships.",
    event_date: "2025-01-20T18:00:00Z",
    image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    tier: "platinum"
  }
];

export async function POST() {
  try {
    // check
    // First, clear existing events
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.error('Error clearing events:', deleteError);
      return NextResponse.json({ error: 'Failed to clear existing events' }, { status: 500 });
    }

    // Insert new events
    const { data, error } = await supabase
      .from('events')
      .insert(sampleEvents)
      .select();

    if (error) {
      console.error('Error seeding events:', error);
      return NextResponse.json({ error: 'Failed to seed events' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Events seeded successfully', 
      count: data?.length || 0,
      events: data 
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 