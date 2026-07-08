// SEO page metadata — each page gets unique title, description, and JSON-LD

export interface SEOMeta {
  title: string;
  description: string;
  slug: string;
  h1: string;
  keywords: string[];
  bodyContent: string;
}

function jsonLd(pageTitle: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "AWN Archive",
    description,
    url: `https://awnarchive.com/${slug}`,
    image: "https://awnarchive.com/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Worcester",
      addressRegion: "MA",
      addressCountry: "US",
    },
    telephone: "",
    priceRange: "$$",
    sameAs: ["https://instagram.com/awn_studios"],
    serviceType: [
      "Sports Photography",
      "Music Photography",
      "Fashion Photography",
      "Event Photography",
      "Branding Photography",
      "Portrait Photography",
      "Church Photography",
      "Business Photography",
      "Graduation Photography",
      "Commercial Photography",
    ],
  };
}

export function getPageMeta(page: string): SEOMeta {
  const pages: Record<string, SEOMeta> = {
    "sports-photography-worcester": {
      title: "Sports Photography in Worcester MA | AWN Archive",
      description: "Professional sports photography in Worcester MA. Capture athletic moments with cinematic quality. Game day coverage, athlete portraits, and team branding by AWN Archive.",
      slug: "sports-photography-worcester-ma",
      h1: "Sports Photography Worcester MA",
      keywords: ["sports photography", "Worcester MA", "athlete portraits", "game day photography", "Massachusetts sports photographer"],
      bodyContent: `
        <p>AWN Archive provides premium sports photography services throughout Worcester, MA and Central Massachusetts. Whether you need game day coverage, athlete portraits, or team branding assets, we deliver cinematic images that capture the intensity and emotion of athletic competition.</p>
        <p>Our sports photography approach combines documentary-style coverage with editorial precision. We don't just document the game — we tell the story of the athletes, the effort, and the moments that define competition. From high school sports to professional athletics, every frame is composed with intention.</p>
        <h2>Sports Photography Services in Worcester</h2>
        <p>We cover a wide range of sports photography needs across Worcester County:</p>
        <ul><li>Game day action photography</li><li>Athlete portrait sessions</li><li>Team and league branding</li><li>Sports media day coverage</li><li>Training and practice documentation</li><li>Sports event photography</li></ul>
        <h2>Why Choose AWN Archive for Sports Photography</h2>
        <p>Sports photography requires more than just a fast camera. It requires an understanding of movement, timing, and the emotional arc of competition. Our photographers bring years of experience covering sports at every level, from local leagues to professional events in Worcester, Boston, and beyond.</p>
        <p>Located in Massachusetts and available throughout New England, AWN Archive is your trusted partner for sports photography that stands out.</p>
      `,
    },
    "event-photography-worcester": {
      title: "Event Photography Worcester Massachusetts | AWN Archive",
      description: "Professional event photography in Worcester, Massachusetts. Concerts, corporate events, festivals, and private celebrations documented with editorial excellence by AWN Archive.",
      slug: "event-photography-worcester-massachusetts",
      h1: "Event Photography Worcester Massachusetts",
      keywords: ["event photography", "Worcester Massachusetts", "corporate event photographer", "concert photography", "festival photography MA"],
      bodyContent: `
        <p>AWN Archive specializes in event photography across Worcester, Massachusetts and all of New England. From corporate galas to music festivals, we document every moment with the same editorial quality that defines our brand.</p>
        <p>Our event photography service is designed for clients who expect more than standard event coverage. We capture the energy, the interactions, and the atmosphere that make each event unique. Every image is color-graded and composed to tell a cohesive story.</p>
        <h2>Event Photography Services</h2>
        <p>We cover all types of events throughout Massachusetts:</p>
        <ul><li>Corporate events and conferences</li><li>Music concerts and festivals</li><li>Private celebrations and galas</li><li>Community and cultural events</li><li>Sporting events and tournaments</li><li>Brand activations and product launches</li></ul>
        <h2>Massachusetts Event Photography</h2>
        <p>Based in Worcester and serving all of Massachusetts, AWN Archive brings professional event photography to venues across the state. Whether you're planning a corporate event in Boston or a festival in the Berkshires, we provide reliable coverage with premium results.</p>
      `,
    },
    "portrait-photography-worcester": {
      title: "Portrait Photography Worcester MA | AWN Archive",
      description: "Professional portrait photography in Worcester MA. Editorial-quality portraits for individuals, professionals, brands, and creatives. Book your session with AWN Archive.",
      slug: "portrait-photography-worcester-ma",
      h1: "Portrait Photography Worcester MA",
      keywords: ["portrait photography", "Worcester MA", "professional headshots", "editorial portraits", "Massachusetts portrait photographer"],
      bodyContent: `
        <p>AWN Archive offers premium portrait photography in Worcester, MA for individuals, professionals, and brands. Our portrait sessions are designed to reveal authentic character while maintaining the highest editorial standards.</p>
        <p>Whether you need professional headshots for your business, an editorial portrait session for your portfolio, or creative portraits for a brand campaign, we tailor every session to your specific needs. Our approach combines natural light expertise with studio precision.</p>
        <h2>Portrait Photography Services</h2>
        <p>Based in Worcester, we offer a range of portrait photography services:</p>
        <ul><li>Professional headshots and executive portraits</li><li>Editorial and creative portrait sessions</li><li>Brand portrait photography</li><li>Actor and model portfolio shoots</li><li>Family and milestone portraits</li><li>Personal branding photography</li></ul>
        <h2>Why Worcester MA Chooses AWN Archive</h2>
        <p>As Worcester's premier portrait photography studio, AWN Archive combines technical excellence with a relaxed, professional session experience. We guide you through every step — from wardrobe consultation to final image selection — ensuring portraits you'll be proud to use everywhere.</p>
      `,
    },
    "graduation-photography-massachusetts": {
      title: "Graduation Photography Massachusetts | AWN Archive",
      description: "Graduation photography across Massachusetts. Professional commencement portraits and ceremony coverage in Worcester, Boston, and throughout MA. Book your graduation session.",
      slug: "graduation-photography-massachusetts",
      h1: "Graduation Photography Massachusetts",
      keywords: ["graduation photography", "Massachusetts", "commencement photos", "senior portraits", "college graduation photographer"],
      bodyContent: `
        <p>AWN Archive provides graduation photography services throughout Massachusetts. From Worcester to Boston, we capture the pride and accomplishment of commencement with the editorial quality that defines our work.</p>
        <p>Graduation is a milestone worth remembering. Our photography packages include both ceremony coverage and styled portrait sessions, ensuring you have beautiful images to commemorate this achievement for years to come.</p>
        <h2>Graduation Photography Packages</h2>
        <p>Available across Massachusetts:</p>
        <ul><li>Commencement ceremony coverage</li><li>Individual graduation portraits</li><li>Family and group graduation photos</li><li>Campus location sessions</li><li>Digital and print packages</li></ul>
        <h2>Massachusetts Graduation Photographer</h2>
        <p>Serving graduates at colleges and universities throughout Massachusetts, including Worcester, Boston, Amherst, and beyond. AWN Archive delivers professional graduation photography that honors your achievement.</p>
      `,
    },
    "branding-photography-massachusetts": {
      title: "Branding Photography Massachusetts | AWN Archive",
      description: "Professional branding photography in Massachusetts. Visual identity, commercial campaigns, and brand storytelling for businesses across MA. Elevate your brand with AWN Archive.",
      slug: "branding-photography-massachusetts",
      h1: "Branding Photography Massachusetts",
      keywords: ["branding photography", "Massachusetts", "commercial photography", "brand identity", "product photography MA"],
      bodyContent: `
        <p>AWN Archive delivers branding photography for businesses throughout Massachusetts. From Worcester startups to Boston enterprises, we create visual content that communicates your brand's identity and values.</p>
        <p>Branding photography is about more than just product shots or team photos. It's about creating a visual language that your audience recognizes and trusts. Our branding packages include strategic consultation, art direction, and post-production that ensures consistency across every touchpoint.</p>
        <h2>Branding Photography Services</h2>
        <p>Serving businesses across Massachusetts:</p>
        <ul><li>Brand campaign photography</li><li>Product and commercial photography</li><li>Team and executive portraits</li><li>Lifestyle brand imagery</li><li>Social media content creation</li><li>Brand identity visual development</li></ul>
        <h2>Massachusetts Brand Photography</h2>
        <p>Based in Worcester and available throughout Massachusetts, AWN Archive partners with businesses to create photography that builds brand equity. Let us help you tell your brand's story through compelling visual content.</p>
      `,
    },
    "music-photography-concerts": {
      title: "Music Photography & Concerts | AWN Archive",
      description: "Professional music and concert photography in Massachusetts. Live performance, studio sessions, and artist portraits by AWN Archive. Capture the energy of your music.",
      slug: "music-photography-concerts",
      h1: "Music Photography & Concerts",
      keywords: ["music photography", "concert photography", "live music photographer", "artist portraits", "Massachusetts music photographer"],
      bodyContent: `
        <p>AWN Archive captures the energy and emotion of live music, studio sessions, and artist portraits throughout Massachusetts. Our music photography is built for musicians, labels, and venues who demand more than standard show photos.</p>
        <p>From intimate acoustic sets to high-energy festival performances, we document music with a photographer's eye and a music lover's heart. Our work has covered venues across Worcester, Boston, and beyond.</p>
        <h2>Music Photography Services</h2>
        <p>Available for artists and venues throughout Massachusetts:</p>
        <ul><li>Live concert and performance photography</li><li>Studio session documentation</li><li>Artist portrait and promo shoots</li><li>Album cover and EP artwork</li><li>Music festival coverage</li><li>Behind-the-scenes tour documentation</li></ul>
        <h2>Massachusetts Concert Photographer</h2>
        <p>AWN Archive is available for music photography across Massachusetts and New England. Whether you're an emerging artist needing promotional images or a venue requiring consistent coverage, we deliver music photography that amplifies your sound visually.</p>
      `,
    },
    "fashion-photography": {
      title: "Fashion Photography | AWN Archive",
      description: "Editorial fashion photography by AWN Archive. Runway shows, lookbooks, editorial shoots, and brand campaigns. Massachusetts-based, available for projects worldwide.",
      slug: "fashion-photography",
      h1: "Fashion Photography",
      keywords: ["fashion photography", "editorial photographer", "runway photography", "lookbook photographer", "Massachusetts fashion photographer"],
      bodyContent: `
        <p>AWN Archive brings editorial fashion photography to designers, brands, and publications throughout Massachusetts and beyond. Our fashion work combines magazine-quality composition with the authentic storytelling that defines our brand.</p>
        <p>From runway shows to lookbook campaigns, we deliver fashion photography that elevates your collection and resonates with your audience. Our approach is collaborative, working closely with designers, stylists, and art directors to achieve a shared vision.</p>
        <h2>Fashion Photography Services</h2>
        <p>Available for fashion brands and designers:</p>
        <ul><li>Runway and fashion show coverage</li><li>Lookbook and campaign photography</li><li>Editorial fashion shoots</li><li>Brand and e-commerce photography</li><li>Fashion week coverage</li><li>Stylist and designer portfolio work</li></ul>
        <h2>Fashion Photography Massachusetts</h2>
        <p>Based in Worcester and serving Boston and all of Massachusetts, AWN Archive is your fashion photography partner. Whether you're preparing for a collection launch or need consistent brand imagery, we deliver fashion photography that stands out.</p>
      `,
    },
    "church-photography": {
      title: "Church Photography | AWN Archive",
      description: "Professional church and ministry photography in Massachusetts. Worship services, conferences, events, and community documentation by AWN Archive.",
      slug: "church-photography",
      h1: "Church Photography",
      keywords: ["church photography", "ministry photography", "worship photography", "church event photographer", "Massachusetts church photographer"],
      bodyContent: `
        <p>AWN Archive provides professional photography services for churches and ministries throughout Massachusetts. We understand the unique needs of faith communities and approach every project with respect and intentionality.</p>
        <p>From weekly service coverage to annual conferences, our church photography captures the moments of worship, community, and connection that define your ministry. We work with churches of all sizes across Worcester, Boston, and throughout the state.</p>
        <h2>Church Photography Services</h2>
        <p>Serving churches and ministries across Massachusetts:</p>
        <ul><li>Sunday service photography</li><li>Conference and event coverage</li><li>Baptism and ceremony documentation</li><li>Ministry branding photography</li><li>Community outreach documentation</li><li>Staff and leadership portraits</li></ul>
        <h2>Massachusetts Church Photographer</h2>
        <p>AWN Archive is available for churches throughout Massachusetts. We provide professional, affordable photography that helps you share your ministry's story with your community and beyond.</p>
      `,
    },
    "behind-the-scenes-photography": {
      title: "Behind The Scenes Photography | AWN Archive",
      description: "Behind the scenes photography and content for productions, events, and campaigns. Documentary-style coverage that captures the creative process by AWN Archive.",
      slug: "behind-the-scenes-photography",
      h1: "Behind The Scenes Photography",
      keywords: ["behind the scenes photography", "BTS photographer", "production photography", "on-set photographer", "documentary photography"],
      bodyContent: `
        <p>AWN Archive provides behind the scenes photography for productions, events, campaigns, and creative projects throughout Massachusetts. Our BTS coverage captures the process, the people, and the moments that make your project unique.</p>
        <p>Behind the scenes photography is valuable for marketing, documentation, and storytelling. We work alongside your production team to capture candid moments that reveal the work and passion behind your final product.</p>
        <h2>Behind The Scenes Services</h2>
        <p>Available for productions across Massachusetts:</p>
        <ul><li>Film and video production BTS</li><li>Photoshoot and campaign documentation</li><li>Event production BTS coverage</li><li>Creative process documentation</li></ul>
        <h2>Massachusetts BTS Photographer</h2>
        <p>Based in Worcester and available throughout Massachusetts, AWN Archive provides professional behind the scenes photography for creative projects, events, and productions of all sizes.</p>
      `,
    },
    "business-photography-massachusetts": {
      title: "Business Photography Massachusetts | AWN Archive",
      description: "Professional business photography in Massachusetts. Corporate headshots, team photos, office branding, and commercial photography for businesses across MA.",
      slug: "business-photography-massachusetts",
      h1: "Business Photography Massachusetts",
      keywords: ["business photography", "Massachusetts", "corporate headshots", "team photography", "commercial photographer MA"],
      bodyContent: `
        <p>AWN Archive provides business photography services for companies throughout Massachusetts. From corporate headshots to office branding, we help businesses present a professional visual identity across every channel.</p>
        <p>In today's digital landscape, your visual presence matters. Professional business photography communicates credibility, professionalism, and attention to detail. We work with companies of all sizes in Worcester, Boston, and throughout Massachusetts.</p>
        <h2>Business Photography Services</h2>
        <p>Serving businesses across Massachusetts:</p>
        <ul><li>Corporate headshots and executive portraits</li><li>Team and staff photography</li><li>Office and workspace branding</li><li>Corporate event coverage</li><li>Product and service photography</li><li>LinkedIn and social media content</li></ul>
        <h2>Massachusetts Business Photographer</h2>
        <p>AWN Archive is the preferred business photography partner for companies throughout Massachusetts. Professional, reliable, and results-driven — we help your business look its best.</p>
      `,
    },
  };

  return pages[page] || pages["sports-photography-worcester"];
}

export const ALL_SEO_PAGES = [
  "sports-photography-worcester",
  "event-photography-worcester",
  "portrait-photography-worcester",
  "graduation-photography-massachusetts",
  "branding-photography-massachusetts",
  "music-photography-concerts",
  "fashion-photography",
  "church-photography",
  "behind-the-scenes-photography",
  "business-photography-massachusetts",
];
