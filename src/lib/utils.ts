export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Sports: "bg-blue-500/20 text-blue-300",
    Music: "bg-purple-500/20 text-purple-300",
    Fashion: "bg-pink-500/20 text-pink-300",
    Events: "bg-amber-500/20 text-amber-300",
    Branding: "bg-emerald-500/20 text-emerald-300",
    Portraits: "bg-rose-500/20 text-rose-300",
    Lifestyle: "bg-teal-500/20 text-teal-300",
    Church: "bg-indigo-500/20 text-indigo-300",
    Business: "bg-slate-500/20 text-slate-300",
    Commercial: "bg-cyan-500/20 text-cyan-300",
    "Behind The Scenes": "bg-orange-500/20 text-orange-300",
    Graduation: "bg-violet-500/20 text-violet-300",
  };
  return colors[category] || "bg-gray-500/20 text-gray-300";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
