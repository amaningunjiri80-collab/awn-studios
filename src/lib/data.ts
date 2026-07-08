// Unified data layer — fetches from Supabase via API routes
// Falls back to placeholder images if backend is not configured

const API_BASE = "";

async function fetchFromApi<T>(endpoint: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_BASE}/api/${endpoint}`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Failed to fetch /api/${endpoint}, using fallback:`, err);
    return [];
  }
}

export async function getPortfolio() {
  return fetchFromApi("portfolio");
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  featured: boolean;
  description: string;
  [key: string]: unknown;
}

export async function getLivePortfolio(): Promise<PortfolioItem[] | null> {
  try {
    const apiData = await fetchFromApi<Record<string, unknown>>("portfolio");
    if (apiData.length > 0) {
      return apiData.map((item) => ({
        ...item,
        image: (item.url as string) || (item.image as string) || "/images/placeholder.svg",
      })) as PortfolioItem[];
    }
  } catch {
    // fall through to JSON fallback
  }
  return null;
}

export async function getProjects() {
  return fetchFromApi("projects");
}

export async function getServices() {
  return fetchFromApi("services");
}

export async function getTestimonials() {
  return fetchFromApi("testimonials");
}

export async function getInstagramFeed() {
  try {
    const res = await fetch(`${API_BASE}/api/instagram`, { next: { revalidate: 1800 } });
    if (!res.ok) throw new Error("Instagram API error");
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function getSiteSettings() {
  try {
    const res = await fetch("/api/site-settings", { next: { revalidate: 30 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function updateSiteSettings(settings: Record<string, unknown>) {
  const res = await fetch("/api/site-settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
  });
  return res.json();
}

export async function submitContact(form: Record<string, string>) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
}

export async function submitBooking(form: Record<string, string>) {
  const res = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
}

export async function uploadImage(formData: FormData) {
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  return res.json();
}
