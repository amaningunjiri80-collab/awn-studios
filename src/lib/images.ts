// Real Unsplash photography URLs for placeholder imagery
// These represent the categories AWN Archive shoots
// In production, replace with actual uploaded images

export const CATEGORY_IMAGES: Record<string, string> = {
  Sports: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=1200&q=80",
  Music: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
  Fashion: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
  Events: "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=1200&q=80",
  Branding: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
  Portraits: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  Lifestyle: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=1200&q=80",
  Church: "https://images.unsplash.com/photo-1438032005737-c2b4e9fad00f?w=1200&q=80",
  Business: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  Commercial: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=80",
  "Behind The Scenes": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80",
  Graduation: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=1200&q=80",
};

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=1920&q=85",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=85",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85",
  "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=1920&q=85",
];

export const ABOUT_IMAGE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=85";

export const INSTAGRAM_PLACEHOLDERS = Array.from({ length: 9 }, (_, i) =>
  `https://images.unsplash.com/photo-${1500000000000 + i}?w=600&q=80`
);
