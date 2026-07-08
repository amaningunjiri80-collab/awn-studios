"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type Tab = "Dashboard" | "Portfolio" | "Projects" | "Services" | "Testimonials" | "Bookings" | "Contacts" | "Settings";

const CATEGORIES = [
  "Sports", "Music", "Fashion", "Events", "Branding",
  "Portraits", "Church", "Business", "Behind The Scenes", "Graduation",
];

const projectTypes = ["Sports", "Music", "Fashion", "Events", "Branding", "Portraits", "Content Creation", "Videography", "Other"];

interface DbItem {
  id: string;
  created_at?: string;
  [key: string]: unknown;
}

const ADMIN_CREDENTIALS = { username: "admin", password: "AWNARCHIVE2026" };

function useAuth() {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof document !== "undefined" && document.cookie.includes("awn_admin=1")) {
      setAuthed(true);
    }
    setLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_CREDENTIALS.password) {
      document.cookie = "awn_admin=1; path=/; max-age=86400";
      setAuthed(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    document.cookie = "awn_admin=1; path=/; max-age=0";
    setAuthed(false);
  };

  return { authed, loading, login, logout };
}

export default function AdminPage() {
  const auth = useAuth();
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState<string>("checking");

  // Data states
  const [portfolioItems, setPortfolioItems] = useState<DbItem[]>([]);
  const [projects, setProjects] = useState<DbItem[]>([]);
  const [services, setServices] = useState<DbItem[]>([]);
  const [testimonials, setTestimonials] = useState<DbItem[]>([]);
  const [bookings, setBookings] = useState<DbItem[]>([]);
  const [contacts, setContacts] = useState<DbItem[]>([]);

  // Form states
  const [portForm, setPortForm] = useState({ url: "", title: "", category: "", location: "", year: "", description: "", alt_text: "", featured: false });
  const [projForm, setProjForm] = useState({ slug: "", title: "", category: "", client: "", location: "", year: "", hero_image: "", description: "", tags: "", featured: false });
  const [testForm, setTestForm] = useState({ name: "", business: "", quote: "", image: "" });
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [projImgFiles, setProjImgFiles] = useState<FileList | null>(null);
  const [projImgProject, setProjImgProject] = useState("");
  const [projImgType, setProjImgType] = useState<"hero" | "gallery">("gallery");
  const [projImgUploading, setProjImgUploading] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [uploadStatuses, setUploadStatuses] = useState<string[]>([]);
  const [uploadCategory, setUploadCategory] = useState("Sports");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadLocation, setUploadLocation] = useState("");
  const [uploadYear, setUploadYear] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadFeatured, setUploadFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Site images
  const [siteImageFile, setSiteImageFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [siteImageUploading, setSiteImageUploading] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

  const showMsg = (msg: string, type: "success" | "error" = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const api = async (path: string, opts?: RequestInit) => {
    const res = await fetch(path, { ...opts, headers: { "Content-Type": "application/json", ...opts?.headers } });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  };

  useEffect(() => {
    async function init() {
      setDbStatus("connecting");
      try {
        const [p, pr, s, t, settings] = await Promise.all([
          api("/api/portfolio").catch(() => []),
          api("/api/projects").catch(() => []),
          api("/api/services").catch(() => []),
          api("/api/testimonials").catch(() => []),
          api("/api/site-settings").catch(() => ({})),
        ]);
        setPortfolioItems(Array.isArray(p) ? p : []);
        setProjects(Array.isArray(pr) ? pr : []);
        setServices(Array.isArray(s) ? s : []);
        setTestimonials(Array.isArray(t) ? t : []);
        setDbStatus(Array.isArray(p) ? "connected" : "no_data");
        if (settings?.profile_photo) setProfilePhotoUrl(settings.profile_photo);
      } catch {
        setDbStatus("disconnected");
      }
    }
    init();
  }, []);

  useEffect(() => {
    if (activeTab === "Bookings") {
      api("/api/booking").catch(() => {}).then((d) => { if (Array.isArray(d)) setBookings(d); });
    }
    if (activeTab === "Contacts") {
      api("/api/contact").catch(() => {}).then((d) => { if (Array.isArray(d)) setContacts(d); });
    }
  }, [activeTab]);

  // Upload handler
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFiles || uploadFiles.length === 0) return;
    setUploading(true);
    let successCount = 0;
    let errorCount = 0;
    try {
      for (let i = 0; i < uploadFiles.length; i++) {
        const fd = new FormData();
        fd.append("file", uploadFiles[i]);
        fd.append("category", uploadCategory);
        fd.append("title", uploadTitle);
        fd.append("alt_text", uploadAlt);
        fd.append("location", uploadLocation);
        fd.append("year", uploadYear);
        fd.append("description", uploadDescription);
        fd.append("featured", String(uploadFeatured));
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (json.error) { errorCount++; } else { successCount++; }
      }
      showMsg(`${successCount} uploaded, ${errorCount} failed`);
      setUploadFiles(null);
      setUploadTitle("");
      setUploadAlt("");
      setUploadLocation("");
      setUploadYear("");
      setUploadDescription("");
      setUploadFeatured(false);
      const updated = await api("/api/portfolio");
      setPortfolioItems(Array.isArray(updated) ? updated : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      showMsg(msg, "error");
    } finally {
      setUploading(false);
    }
  };

  // Site images upload
  const handleSiteImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setSiteImageUploading(true);
    try {
      if (siteImageFile) {
        const fd = new FormData();
        fd.append("file", siteImageFile);
        fd.append("type", "profile");
        const res = await fetch("/api/upload-site-image", { method: "POST", body: fd });
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setProfilePhotoUrl(json.url);
        setSiteImageFile(null);
        showMsg("Profile photo updated");
      }
      if (heroFile) {
        const fd = new FormData();
        fd.append("file", heroFile);
        fd.append("type", "hero");
        const res = await fetch("/api/upload-site-image", { method: "POST", body: fd });
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setHeroFile(null);
        showMsg("Hero image added");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      showMsg(msg, "error");
    } finally {
      setSiteImageUploading(false);
    }
  };

  const handleResetHero = async () => {
    try {
      await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero_images: [] }),
      });
      setHeroFile(null);
      showMsg("Hero images reset");
    } catch {
      showMsg("Failed to reset hero images", "error");
    }
  };

  // Portfolio CRUD
  const addPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api("/api/portfolio", { method: "POST", body: JSON.stringify(portForm) });
      showMsg("Portfolio item added");
      setPortForm({ url: "", title: "", category: "", location: "", year: "", description: "", alt_text: "", featured: false });
      const updated = await api("/api/portfolio");
      setPortfolioItems(Array.isArray(updated) ? updated : []);
    } catch (err: unknown) { showMsg(err instanceof Error ? err.message : "Error", "error"); }
  };

  const deletePortfolio = async (id: string) => {
    try {
      await api("/api/portfolio", { method: "DELETE", body: JSON.stringify({ id }) });
      showMsg("Deleted");
      setPortfolioItems((prev) => prev.filter((i) => i.id !== id));
    } catch (err: unknown) { showMsg(err instanceof Error ? err.message : "Error", "error"); }
  };

  // Projects CRUD
  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api("/api/projects", {
        method: "POST",
        body: JSON.stringify({ ...projForm, published: true, tags: projForm.tags.split(",").map((t) => t.trim()).filter(Boolean), gallery: [projForm.hero_image] }),
      });
      showMsg("Project added");
      setProjForm({ slug: "", title: "", category: "", client: "", location: "", year: "", hero_image: "", description: "", tags: "", featured: false });
      const updated = await api("/api/projects");
      setProjects(Array.isArray(updated) ? updated : []);
    } catch (err: unknown) { showMsg(err instanceof Error ? err.message : "Error", "error"); }
  };

  const handleProjectImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projImgFiles || projImgFiles.length === 0 || !projImgProject) return;
    setProjImgUploading(true);
    try {
      const project = projects.find((p) => p.id === projImgProject);
      if (!project) throw new Error("Project not found");
      const gallery: string[] = (project as { gallery?: string[] }).gallery || [];
      const urls: string[] = [];
      for (let i = 0; i < projImgFiles.length; i++) {
        const fd = new FormData();
        fd.append("file", projImgFiles[i]);
        fd.append("category", "projects");
        fd.append("title", project.title as string);
        fd.append("alt_text", "");
        fd.append("location", "");
        fd.append("year", "");
        fd.append("description", "");
        fd.append("featured", "false");
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        urls.push(json.url);
      }
      const updates: Record<string, unknown> = {};
      if (projImgType === "hero") {
        updates.hero_image = urls[0];
      } else {
        updates.gallery = [...gallery, ...urls];
      }
      await api("/api/projects", { method: "PUT", body: JSON.stringify({ id: projImgProject, ...updates }) });
      showMsg(`Uploaded ${urls.length} image(s) to project`);
      setProjImgFiles(null);
      const updated = await api("/api/projects");
      setProjects(Array.isArray(updated) ? updated : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      showMsg(msg, "error");
    } finally {
      setProjImgUploading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await api("/api/projects", { method: "DELETE", body: JSON.stringify({ id }) });
      showMsg("Deleted");
      setProjects((prev) => prev.filter((i) => i.id !== id));
    } catch (err: unknown) { showMsg(err instanceof Error ? err.message : "Error", "error"); }
  };

  // Testimonials CRUD
  const addTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api("/api/testimonials", { method: "POST", body: JSON.stringify(testForm) });
      showMsg("Testimonial added");
      setTestForm({ name: "", business: "", quote: "", image: "" });
      const updated = await api("/api/testimonials");
      setTestimonials(Array.isArray(updated) ? updated : []);
    } catch (err: unknown) { showMsg(err instanceof Error ? err.message : "Error", "error"); }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      await api("/api/testimonials", { method: "DELETE", body: JSON.stringify({ id }) });
      showMsg("Deleted");
      setTestimonials((prev) => prev.filter((i) => i.id !== id));
    } catch (err: unknown) { showMsg(err instanceof Error ? err.message : "Error", "error"); }
  };

  const inpCls = "w-full px-3 py-2.5 bg-[#0A0A0A] border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 transition-colors rounded-none";
  const lblCls = "block text-xs tracking-[0.15em] uppercase text-[#A0A0A0] mb-1.5";
  const tabs: Tab[] = ["Dashboard", "Portfolio", "Projects", "Services", "Testimonials", "Bookings", "Contacts", "Settings"];

  if (auth.loading) return <div className="pt-24 pb-16 px-4 md:px-8 min-h-screen flex items-center justify-center"><p className="text-sm text-[#555]">Loading...</p></div>;

  if (!auth.authed) {
    return (
      <div className="pt-24 pb-16 px-4 md:px-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-2xl font-light text-white">AWN Archive</h1>
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#555] mt-2">Admin Access</p>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (auth.login(passwordInput)) {
                setLoginError(false);
              } else {
                setLoginError(true);
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C8A96A] transition-colors"
              autoFocus
            />
            {loginError && <p className="text-[10px] text-red-400 tracking-wider uppercase">Incorrect password</p>}
            <button
              type="submit"
              className="w-full py-3 text-sm tracking-[0.2em] uppercase bg-white text-black hover:bg-[#C8A96A] hover:text-white transition-all duration-300"
            >
              Enter
            </button>
          </motion.form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Link href="/" className="text-[10px] tracking-[0.2em] uppercase text-[#555] hover:text-white transition-colors">&larr; Back to Site</Link>
            <button onClick={auth.logout} className="text-[10px] tracking-[0.2em] uppercase text-[#555] hover:text-red-400 transition-colors">Logout</button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-2xl md:text-3xl font-light text-white">AWN Archive Admin</h1>
            <span className={`text-[10px] tracking-wider uppercase px-2 py-1 ${
              dbStatus === "connected" ? "text-emerald-400 bg-emerald-500/10" :
              dbStatus === "checking" ? "text-amber-400 bg-amber-500/10" :
              "text-red-400 bg-red-500/10"
            }`}>
              DB: {dbStatus}
            </span>
          </div>
        </motion.div>

        {message && (
          <div className={`mb-4 px-4 py-3 text-sm ${
            messageType === "success" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300" : "bg-red-500/10 border border-red-500/20 text-red-300"
          }`}>
            {message}
          </div>
        )}

        {/* Tabs — scrollable horizontally on mobile */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-2 scrollbar-hide border-b border-white/5 -mx-4 px-4 md:mx-0 md:px-0">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 text-xs tracking-[0.15em] uppercase transition-all flex-shrink-0 ${
                activeTab === tab ? "text-white border-b border-white" : "text-[#555] hover:text-white"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* DASHBOARD */}
        {activeTab === "Dashboard" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
              {[
                { label: "Portfolio", value: portfolioItems.length, color: "border-l-[#C8A96A]" },
                { label: "Projects", value: projects.length, color: "border-l-white/30" },
                { label: "Services", value: services.length, color: "border-l-[#C8A96A]" },
                { label: "Testimonials", value: testimonials.length, color: "border-l-white/30" },
              ].map((stat) => (
                <div key={stat.label} className={`p-4 bg-[#111] border border-white/5 border-l-2 ${stat.color}`}>
                  <span className="text-xl md:text-2xl font-light text-white">{stat.value}</span>
                  <p className="text-[10px] text-[#A0A0A0] mt-0.5 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="p-4 md:p-6 bg-[#111] border border-white/5">
              <h2 className="text-sm font-light text-white mb-3">Quick Actions</h2>
              <div className="flex flex-wrap gap-2">
                {(["Portfolio", "Projects", "Testimonials"] as Tab[]).map((t) => (
                  <button key={t} onClick={() => setActiveTab(t)}
                    className="px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase border border-white/10 text-[#A0A0A0] hover:text-white hover:border-white/30 transition-all">
                    Manage {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 md:p-6 bg-[#111] border border-white/5">
              <h2 className="text-sm font-light text-white mb-3">Setup Instructions</h2>
              <ol className="text-xs text-[#A0A0A0] space-y-2 list-decimal pl-4">
                <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#C8A96A] underline">supabase.com</a></li>
                <li>Run the SQL from <code className="text-white/60">src/lib/supabase-schema.sql</code> in Supabase SQL editor</li>
                <li>Copy your project URL and anon key to <code className="text-white/60">.env.local</code></li>
                <li>Create a <code className="text-white/60">awn-archive</code> storage bucket in Supabase Storage (public)</li>
                <li>Set up Resend for email: <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-[#C8A96A] underline">resend.com</a></li>
                <li>Add <code className="text-white/60">RESEND_API_KEY</code> and <code className="text-white/60">CONTACT_EMAIL</code> to <code className="text-white/60">.env.local</code></li>
                <li>Verify the Instagram token or leave blank for placeholder fallback</li>
              </ol>
            </div>
          </motion.div>
        )}

        {/* PORTFOLIO */}
        {activeTab === "Portfolio" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-base md:text-lg font-light text-white mb-4">Upload Image</h2>
            <form onSubmit={handleUpload} className="space-y-3 mb-8 max-w-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={lblCls}>Images (select multiple)</label>
                  <input type="file" accept=".jpg,.jpeg,.png,.webp" multiple onChange={(e) => setUploadFiles(e.target.files)}
                    className={`${inpCls} file:mr-3 file:py-1 file:px-3 file:border-0 file:text-xs file:tracking-wider file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20`} required />
                </div>
                <div>
                  <label className={lblCls}>Category</label>
                  <select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value)} className={inpCls}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={lblCls}>Title</label>
                  <input type="text" value={uploadTitle} onChange={(e) => setUploadTitle(e.target.value)} className={inpCls} />
                </div>
                <div>
                  <label className={lblCls}>Alt Text (SEO)</label>
                  <input type="text" value={uploadAlt} onChange={(e) => setUploadAlt(e.target.value)} className={inpCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={lblCls}>Location</label>
                  <input type="text" value={uploadLocation} onChange={(e) => setUploadLocation(e.target.value)} className={inpCls} />
                </div>
                <div>
                  <label className={lblCls}>Year</label>
                  <input type="text" value={uploadYear} onChange={(e) => setUploadYear(e.target.value)} className={inpCls} />
                </div>
              </div>
              <div>
                <label className={lblCls}>Description</label>
                <textarea rows={2} value={uploadDescription} onChange={(e) => setUploadDescription(e.target.value)} className={inpCls} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={uploadFeatured} onChange={(e) => setUploadFeatured(e.target.checked)} className="accent-[#C8A96A]" />
                <span className="text-xs text-[#A0A0A0]">Featured</span>
              </label>
              <button type="submit" disabled={uploading || !uploadFiles || uploadFiles.length === 0}
                className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase bg-[#C8A96A] text-black hover:bg-[#C8A96A]/90 transition-all disabled:opacity-50">
                {uploading ? "Uploading..." : uploadFiles && uploadFiles.length > 1 ? `Upload ${uploadFiles.length} Images` : "Upload Image"}
              </button>
            </form>

            <h2 className="text-base md:text-lg font-light text-white mb-4">All Portfolio Items ({portfolioItems.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {portfolioItems.map((item) => (
                <div key={item.id as string} className="group relative bg-[#111] border border-white/5 overflow-hidden">
                  {(item.url as string) && (
                    <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${item.url})` }} />
                  )}
                  <div className="p-2">
                    <p className="text-[10px] text-white/80 truncate">{item.title as string || "Untitled"}</p>
                    <p className="text-[8px] text-[#555] uppercase tracking-wider">{item.category as string}</p>
                  </div>
                  <button onClick={() => deletePortfolio(item.id as string)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500/80 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    &times;
                  </button>
                </div>
              ))}
              {portfolioItems.length === 0 && <p className="text-xs text-[#555] col-span-full">No items yet. Upload or add one above.</p>}
            </div>
          </motion.div>
        )}

        {/* PROJECTS */}
        {activeTab === "Projects" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-base md:text-lg font-light text-white mb-4">Add Project</h2>
            <form onSubmit={addProject} className="space-y-3 mb-8 max-w-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={lblCls}>Title</label>
                  <input type="text" value={projForm.title} onChange={(e) => setProjForm({ ...projForm, title: e.target.value })} className={inpCls} required />
                </div>
                <div>
                  <label className={lblCls}>Slug (URL)</label>
                  <input type="text" value={projForm.slug} onChange={(e) => setProjForm({ ...projForm, slug: e.target.value })} className={inpCls} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={lblCls}>Category</label>
                  <select value={projForm.category} onChange={(e) => setProjForm({ ...projForm, category: e.target.value })} className={inpCls}>
                    <option value="">Select</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lblCls}>Client</label>
                  <input type="text" value={projForm.client} onChange={(e) => setProjForm({ ...projForm, client: e.target.value })} className={inpCls} />
                </div>
                <div>
                  <label className={lblCls}>Year</label>
                  <input type="text" value={projForm.year} onChange={(e) => setProjForm({ ...projForm, year: e.target.value })} className={inpCls} />
                </div>
              </div>
              <div>
                <label className={lblCls}>Hero Image URL</label>
                <input type="text" value={projForm.hero_image} onChange={(e) => setProjForm({ ...projForm, hero_image: e.target.value })} className={inpCls} />
              </div>
              <div>
                <label className={lblCls}>Description</label>
                <textarea rows={3} value={projForm.description} onChange={(e) => setProjForm({ ...projForm, description: e.target.value })} className={inpCls} />
              </div>
              <div>
                <label className={lblCls}>Tags (comma separated)</label>
                <input type="text" value={projForm.tags} onChange={(e) => setProjForm({ ...projForm, tags: e.target.value })} className={inpCls} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={projForm.featured} onChange={(e) => setProjForm({ ...projForm, featured: e.target.checked })} className="accent-[#C8A96A]" />
                <span className="text-xs text-[#A0A0A0]">Featured</span>
              </label>
              <button type="submit" className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 transition-all">Save Project</button>
            </form>

            <div className="p-4 bg-[#111] border border-white/5 mb-8 max-w-xl">
              <h3 className="text-xs tracking-wider uppercase text-white/40 mb-3">Edit Project</h3>
              <div className="space-y-3">
                <div>
                  <label className={lblCls}>Select Project</label>
                  <select value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.target.value)} className={inpCls}>
                    <option value="">Choose a project</option>
                    {projects.map((p) => <option key={p.id as string} value={p.id as string}>{(p as { published?: boolean }).published === false ? "[Draft] " : ""}{p.title as string}</option>)}
                  </select>
                </div>

                {(() => {
                  const project = projects.find((p) => p.id === selectedProjectId);
                  if (!project) return <p className="text-xs text-[#555]">Select a project above</p>;
                  const p = project as { hero_image?: string; gallery?: string[]; title?: string; slug?: string; category?: string; client?: string; location?: string; year?: string; description?: string; tags?: string[]; featured?: boolean; published?: boolean; id?: string };

                  const saveField = async (field: string, value: unknown) => {
                    await api("/api/projects", { method: "PUT", body: JSON.stringify({ id: project.id, [field]: value }) });
                    const u = await api("/api/projects"); setProjects(Array.isArray(u) ? u : []);
                  };

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div>
                          <p className="text-sm text-white">{p.title}{p.published === false ? <span className="text-amber-400 text-[10px] ml-2">Unpublished</span> : <span className="text-emerald-400 text-[10px] ml-2">Published</span>}</p>
                          <p className="text-[10px] text-[#555]">{p.slug} &middot; {p.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/projects/${p.slug}?preview=true`} target="_blank" className="px-2 py-1 text-[10px] tracking-wider uppercase bg-white/10 text-white hover:bg-white/20 transition-all rounded">Preview</Link>
                          <button onClick={() => deleteProject(project.id as string)} className="text-red-400 text-xs hover:text-red-300 transition-colors">Delete</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={lblCls}>Title</label>
                          <input type="text" defaultValue={p.title} onBlur={(e) => saveField("title", e.target.value)} className={inpCls} />
                        </div>
                        <div>
                          <label className={lblCls}>Slug</label>
                          <input type="text" defaultValue={p.slug} onBlur={(e) => saveField("slug", e.target.value)} className={inpCls} />
                        </div>
                        <div>
                          <label className={lblCls}>Category</label>
                          <select defaultValue={p.category} onChange={(e) => saveField("category", e.target.value)} className={inpCls}>
                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className={lblCls}>Client</label>
                          <input type="text" defaultValue={p.client} onBlur={(e) => saveField("client", e.target.value)} className={inpCls} />
                        </div>
                        <div>
                          <label className={lblCls}>Location</label>
                          <input type="text" defaultValue={p.location} onBlur={(e) => saveField("location", e.target.value)} className={inpCls} />
                        </div>
                        <div>
                          <label className={lblCls}>Year</label>
                          <input type="text" defaultValue={p.year} onBlur={(e) => saveField("year", e.target.value)} className={inpCls} />
                        </div>
                      </div>
                      <div>
                        <label className={lblCls}>Description</label>
                        <textarea rows={2} defaultValue={p.description} onBlur={(e) => saveField("description", e.target.value)} className={inpCls} />
                      </div>
                      <div>
                        <label className={lblCls}>Tags (comma separated)</label>
                        <input type="text" defaultValue={(p.tags || []).join(", ")} onBlur={(e) => saveField("tags", e.target.value.split(",").map((t: string) => t.trim()).filter(Boolean))} className={inpCls} />
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked={p.featured} onChange={(e) => saveField("featured", e.target.checked)} className="accent-[#C8A96A]" />
                          <span className="text-xs text-[#A0A0A0]">Featured</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked={p.published !== false} onChange={(e) => saveField("published", e.target.checked)} className="accent-[#C8A96A]" />
                          <span className="text-xs text-[#A0A0A0]">Published</span>
                        </label>
                      </div>

                      <div className="border-t border-white/5 pt-4">
                        <label className={lblCls}>Hero Image</label>
                        <div className="flex gap-2 items-start">
                          <div className="w-24 h-16 bg-cover bg-center rounded flex-shrink-0 bg-[#0A0A0A]" style={{ backgroundImage: p.hero_image && !p.hero_image.includes("placeholder") ? `url(${p.hero_image})` : "none" }}>
                            {(!p.hero_image || p.hero_image.includes("placeholder")) && <div className="w-full h-full flex items-center justify-center text-[10px] text-[#555]">No image</div>}
                          </div>
                          <label className="px-2 py-1 text-[10px] tracking-wider uppercase bg-[#C8A96A] text-black cursor-pointer hover:bg-[#C8A96A]/90 transition-all">
                            Replace
                            <input type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={async (e) => {
                              const f = e.target.files?.[0]; if (!f) return;
                              const fd = new FormData(); fd.append("file", f); fd.append("category", "projects"); fd.append("title", p.title || ""); fd.append("alt_text", ""); fd.append("location", ""); fd.append("year", ""); fd.append("description", ""); fd.append("featured", "false");
                              const r = await fetch("/api/upload", { method: "POST", body: fd }); const j = await r.json(); if (j.error) return showMsg(j.error, "error");
                              await api("/api/projects", { method: "PUT", body: JSON.stringify({ id: project.id, hero_image: j.url }) });
                              showMsg("Hero image updated"); const u = await api("/api/projects"); setProjects(Array.isArray(u) ? u : []);
                            }} />
                          </label>
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-4">
                        <label className={lblCls}>Gallery ({p.gallery?.filter((u) => !u.includes("placeholder")).length || 0} images)</label>

                        <div
                          className="border-2 border-dashed border-white/10 rounded p-4 mb-3 text-center hover:border-[#C8A96A]/50 transition-colors cursor-pointer"
                          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = "#C8A96A"; }}
                          onDragLeave={(e) => { e.currentTarget.style.borderColor = ""; }}
                          onDrop={async (e) => {
                            e.preventDefault(); e.currentTarget.style.borderColor = "";
                            const files = Array.from(e.dataTransfer.files).filter((f) => ["image/jpeg","image/png","image/webp"].includes(f.type));
                            if (files.length === 0) return;
                            const gal = [...((p.gallery || []).filter((u) => !u.includes("placeholder")))];
                            const status = [...uploadStatuses];
                            for (let i = 0; i < files.length; i++) {
                              status.push("uploading");
                              setUploadStatuses([...status]);
                              try {
                                const fd = new FormData(); fd.append("file", files[i]); fd.append("category", "projects"); fd.append("title", p.title || ""); fd.append("alt_text", ""); fd.append("location", ""); fd.append("year", ""); fd.append("description", ""); fd.append("featured", "false");
                                const r = await fetch("/api/upload", { method: "POST", body: fd }); const j = await r.json();
                                if (j.error) { status[status.length - 1] = "failed"; } else { gal.push(j.url); status[status.length - 1] = "done"; }
                              } catch { status[status.length - 1] = "failed"; }
                              setUploadStatuses([...status]);
                            }
                            await api("/api/projects", { method: "PUT", body: JSON.stringify({ id: project.id, gallery: gal }) });
                            showMsg("Gallery updated"); const u = await api("/api/projects"); setProjects(Array.isArray(u) ? u : []); setUploadStatuses([]);
                          }}
                          onClick={() => document.getElementById("gallery-upload-input")?.click()}
                        >
                          <p className="text-xs text-[#555]">Drop images here or click to select</p>
                          <p className="text-[10px] text-[#444] mt-1">JPG, PNG, WebP — multiple files supported</p>
                          <input id="gallery-upload-input" type="file" accept=".jpg,.jpeg,.png,.webp" multiple className="hidden" onChange={async (e) => {
                            const files = e.target.files; if (!files || files.length === 0) return;
                            const gal = [...((p.gallery || []).filter((u) => !u.includes("placeholder")))];
                            const status = [...uploadStatuses];
                            for (let i = 0; i < files.length; i++) {
                              status.push("uploading"); setUploadStatuses([...status]);
                              try {
                                const fd = new FormData(); fd.append("file", files[i]); fd.append("category", "projects"); fd.append("title", p.title || ""); fd.append("alt_text", ""); fd.append("location", ""); fd.append("year", ""); fd.append("description", ""); fd.append("featured", "false");
                                const r = await fetch("/api/upload", { method: "POST", body: fd }); const j = await r.json();
                                if (j.error) { status[status.length - 1] = "failed"; } else { gal.push(j.url); status[status.length - 1] = "done"; }
                              } catch { status[status.length - 1] = "failed"; }
                              setUploadStatuses([...status]);
                            }
                            await api("/api/projects", { method: "PUT", body: JSON.stringify({ id: project.id, gallery: gal }) });
                            showMsg("Gallery updated"); const u = await api("/api/projects"); setProjects(Array.isArray(u) ? u : []); setUploadStatuses([]);
                          }} />
                        </div>

                        {uploadStatuses.length > 0 && (
                          <div className="space-y-1 mb-3">
                            {uploadStatuses.map((s, i) => (
                              <div key={i} className="flex items-center gap-2 text-[10px]">
                                <span className={`w-2 h-2 rounded-full ${s === "uploading" ? "bg-amber-400 animate-pulse" : s === "done" ? "bg-emerald-400" : "bg-red-400"}`} />
                                <span className="text-[#A0A0A0]">Image {i + 1}: {s === "uploading" ? "Uploading..." : s === "done" ? "Done" : "Failed"}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
                          {(p.gallery || []).filter((u) => !u.includes("placeholder")).map((url, i) => (
                            <div key={i} className="relative group bg-[#0A0A0A] bg-cover bg-center rounded overflow-hidden" style={{ aspectRatio: "4/3", backgroundImage: `url(${url})` }}>
                              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={async () => {
                                  const gal = [...((p.gallery || []).filter((u) => !u.includes("placeholder")))];
                                  if (i > 0) { [gal[i - 1], gal[i]] = [gal[i], gal[i - 1]]; }
                                  await api("/api/projects", { method: "PUT", body: JSON.stringify({ id: project.id, gallery: gal }) });
                                  const u = await api("/api/projects"); setProjects(Array.isArray(u) ? u : []);
                                }} disabled={i === 0} className="w-5 h-5 flex items-center justify-center bg-black/60 text-white rounded text-[10px] disabled:opacity-30 hover:bg-black/80">&#9650;</button>
                                <button onClick={async () => {
                                  const gal = [...((p.gallery || []).filter((u) => !u.includes("placeholder")))];
                                  if (i < gal.length - 1) { [gal[i], gal[i + 1]] = [gal[i + 1], gal[i]]; }
                                  await api("/api/projects", { method: "PUT", body: JSON.stringify({ id: project.id, gallery: gal }) });
                                  const u = await api("/api/projects"); setProjects(Array.isArray(u) ? u : []);
                                }} disabled={i === gal.filter(u => !u.includes("placeholder")).length - 1} className="w-5 h-5 flex items-center justify-center bg-black/60 text-white rounded text-[10px] disabled:opacity-30 hover:bg-black/80">&#9660;</button>
                                <button onClick={async () => {
                                  const gal = [...((p.gallery || []).filter((u) => !u.includes("placeholder")))];
                                  gal.splice(i, 1);
                                  await api("/api/projects", { method: "PUT", body: JSON.stringify({ id: project.id, gallery: gal }) });
                                  showMsg("Image removed"); const u = await api("/api/projects"); setProjects(Array.isArray(u) ? u : []);
                                }} className="w-5 h-5 flex items-center justify-center bg-red-500/80 text-white rounded text-[10px] hover:bg-red-500">&times;</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {projects.length === 0 && (
              <div className="mb-6 p-4 bg-[#111] border border-[#C8A96A]/20 max-w-lg">
                <p className="text-xs text-[#A0A0A0] mb-3">No projects in the database yet. Click below to seed the placeholder projects from your JSON file into the database so you can edit them.</p>
                <button onClick={async () => {
                  try {
                    const res = await fetch("/api/seed-projects", { method: "POST" });
                    const json = await res.json();
                    if (json.error) { showMsg(json.error, "error"); return; }
                    showMsg(`Seeded ${json.count} projects`);
                    const u = await api("/api/projects");
                    setProjects(Array.isArray(u) ? u : []);
                  } catch { showMsg("Failed to seed projects", "error"); }
                }} className="px-4 py-2 text-xs tracking-[0.2em] uppercase bg-[#C8A96A] text-black hover:bg-[#C8A96A]/90 transition-all">Seed Projects from JSON</button>
              </div>
            )}
            <h2 className="text-base md:text-lg font-light text-white mb-4">All Projects ({projects.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {projects.map((p) => (
                <div key={p.id as string} className="flex items-center justify-between p-3 bg-[#111] border border-white/5">
                  <div>
                    <p className="text-sm text-white">{p.title as string}</p>
                    <p className="text-[10px] text-[#555]">{p.slug as string} &middot; {(p as { category?: string }).category || ""}</p>
                  </div>
                  <button onClick={() => { setSelectedProjectId(p.id as string); }} className="text-[#C8A96A] text-xs hover:text-[#C8A96A]/80 transition-colors mr-2">Edit</button>
                </div>
              ))}
              {projects.length === 0 && <p className="text-xs text-[#555]">No projects yet.</p>}
            </div>
          </motion.div>
        )}

        {/* SERVICES */}
        {activeTab === "Services" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-base md:text-lg font-light text-white mb-4">Services (read from DB)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {services.map((s) => (
                <div key={s.id as string} className="p-4 bg-[#111] border border-white/5">
                  <span className="text-[10px] tracking-wider uppercase text-[#555]">Service</span>
                  <h3 className="text-white text-sm mt-1">{s.title as string}</h3>
                  <p className="text-[10px] text-[#A0A0A0] mt-1 line-clamp-2">{s.description as string}</p>
                </div>
              ))}
              {services.length === 0 && <p className="text-xs text-[#555] col-span-full">No services loaded. Run the SQL schema.</p>}
            </div>
          </motion.div>
        )}

        {/* TESTIMONIALS */}
        {activeTab === "Testimonials" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-base md:text-lg font-light text-white mb-4">Add Testimonial</h2>
            <form onSubmit={addTestimonial} className="space-y-3 mb-8 max-w-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={lblCls}>Name</label>
                  <input type="text" value={testForm.name} onChange={(e) => setTestForm({ ...testForm, name: e.target.value })} className={inpCls} required />
                </div>
                <div>
                  <label className={lblCls}>Business</label>
                  <input type="text" value={testForm.business} onChange={(e) => setTestForm({ ...testForm, business: e.target.value })} className={inpCls} />
                </div>
              </div>
              <div>
                <label className={lblCls}>Quote</label>
                <textarea rows={3} value={testForm.quote} onChange={(e) => setTestForm({ ...testForm, quote: e.target.value })} className={inpCls} required />
              </div>
              <div>
                <label className={lblCls}>Image URL</label>
                <input type="text" value={testForm.image} onChange={(e) => setTestForm({ ...testForm, image: e.target.value })} className={inpCls} />
              </div>
              <button type="submit" className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 transition-all">Save Testimonial</button>
            </form>

            <h2 className="text-base md:text-lg font-light text-white mb-4">Testimonials ({testimonials.length})</h2>
            <div className="space-y-2">
              {testimonials.map((t) => (
                <div key={t.id as string} className="flex items-center justify-between p-3 bg-[#111] border border-white/5">
                  <div>
                    <p className="text-sm text-white">{t.name as string}</p>
                    <p className="text-[10px] text-[#555]">{(t as { business?: string }).business || ""}</p>
                  </div>
                  <button onClick={() => deleteTestimonial(t.id as string)}
                    className="text-red-400 text-xs hover:text-red-300 transition-colors">Delete</button>
                </div>
              ))}
              {testimonials.length === 0 && <p className="text-xs text-[#555]">No testimonials yet.</p>}
            </div>
          </motion.div>
        )}

        {/* BOOKINGS */}
        {activeTab === "Bookings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-base md:text-lg font-light text-white mb-4">Booking Requests ({bookings.length})</h2>
            <div className="space-y-2">
              {bookings.map((b) => (
                <div key={b.id as string} className="p-4 bg-[#111] border border-white/5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-white font-medium">{b.name as string}</p>
                      <p className="text-xs text-[#A0A0A0]">{(b as unknown as { email?: string }).email || ""}</p>
                    </div>
                    <span className="text-[10px] text-[#555] uppercase whitespace-nowrap">{(b as unknown as { shoot_type?: string }).shoot_type || ""}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-[10px] text-[#555] uppercase tracking-wider">
                    {(b as unknown as { date?: string }).date && <span>Date: {(b as unknown as { date: string }).date}</span>}
                    {(b as unknown as { location?: string }).location && <span>Location: {(b as unknown as { location: string }).location}</span>}
                    {(b as unknown as { phone?: string }).phone && <span>Phone: {(b as unknown as { phone: string }).phone}</span>}
                  </div>
                </div>
              ))}
              {bookings.length === 0 && <p className="text-xs text-[#555]">No bookings yet.</p>}
            </div>
          </motion.div>
        )}

        {/* CONTACTS */}
        {activeTab === "Contacts" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-base md:text-lg font-light text-white mb-4">Contact Submissions ({contacts.length})</h2>
            <div className="space-y-2">
              {contacts.map((c) => (
                <div key={c.id as string} className="p-4 bg-[#111] border border-white/5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-white font-medium">{c.name as string}</p>
                      <p className="text-xs text-[#A0A0A0]">{(c as unknown as { email?: string }).email || ""} {(c as unknown as { business?: string }).business ? `— ${(c as unknown as { business: string }).business}` : ""}</p>
                    </div>
                    <span className={`text-[10px] uppercase px-2 py-0.5 ${(c as unknown as { email_status?: string }).email_status === "sent" ? "text-emerald-400 bg-emerald-500/10" : (c as unknown as { email_status?: string }).email_status === "failed" ? "text-red-400 bg-red-500/10" : "text-amber-400 bg-amber-500/10"}`}>
                      {(c as unknown as { email_status?: string }).email_status || "pending"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-[10px] text-[#555] uppercase tracking-wider">
                    {(c as unknown as { project_type?: string }).project_type && <span>Type: {(c as unknown as { project_type: string }).project_type}</span>}
                    {(c as unknown as { budget?: string }).budget && <span>Budget: {(c as unknown as { budget: string }).budget}</span>}
                    {(c as unknown as { phone?: string }).phone && <span>Phone: {(c as unknown as { phone: string }).phone}</span>}
                  </div>
                </div>
              ))}
              {contacts.length === 0 && <p className="text-xs text-[#555]">No contacts yet.</p>}
            </div>
          </motion.div>
        )}

        {/* SETTINGS */}
        {activeTab === "Settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-base md:text-lg font-light text-white mb-4">Site Settings</h2>
            <div className="space-y-4 max-w-lg">

              <div className="p-4 bg-[#111] border border-white/5">
                <h3 className="text-xs tracking-wider uppercase text-white/40 mb-3">Site Images</h3>
                <form onSubmit={handleSiteImageUpload} className="space-y-3">
                  <div>
                    <label className={lblCls}>Profile Photo (shows on homepage & about page)</label>
                    <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => setSiteImageFile(e.target.files?.[0] || null)}
                      className={`${inpCls} file:mr-3 file:py-1 file:px-3 file:border-0 file:text-xs file:tracking-wider file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20`} />
                  </div>
                  <div>
                    <label className={lblCls}>Hero Slideshow (one image, set multiple times)</label>
                    <input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={(e) => setHeroFile(e.target.files?.[0] || null)}
                      className={`${inpCls} file:mr-3 file:py-1 file:px-3 file:border-0 file:text-xs file:tracking-wider file:uppercase file:bg-white/10 file:text-white hover:file:bg-white/20`} />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={siteImageUploading || (!siteImageFile && !heroFile)}
                      className="px-4 py-2 text-xs tracking-[0.2em] uppercase bg-[#C8A96A] text-black hover:bg-[#C8A96A]/90 transition-all disabled:opacity-50">
                      {siteImageUploading ? "Uploading..." : "Update Images"}
                    </button>
                    {profilePhotoUrl && (
                      <span className="text-[10px] text-emerald-400 self-center">Profile photo set</span>
                    )}
                  </div>
                  {heroFile && (
                    <div className="flex gap-2">
                      <button type="button" onClick={handleResetHero}
                        className="px-3 py-1 text-[10px] tracking-[0.2em] uppercase bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all">
                        Reset Hero Images
                      </button>
                    </div>
                  )}
                </form>
              </div>

              <div className="p-4 bg-[#111] border border-white/5">
                <h3 className="text-xs tracking-wider uppercase text-white/40 mb-3">Integrations</h3>
                <div className="space-y-2">
                  {[
                    { name: "Supabase", env: "NEXT_PUBLIC_SUPABASE_URL", status: dbStatus === "connected" },
                    { name: "Resend (Email)", env: "RESEND_API_KEY", status: null },
                    { name: "Instagram API", env: "INSTAGRAM_ACCESS_TOKEN", status: null },
                  ].map((int) => (
                    <div key={int.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-sm text-white">{int.name}</span>
                      <span className={`text-[10px] uppercase ${int.status === true ? "text-emerald-400" : int.status === false ? "text-red-400" : "text-amber-400"}`}>
                        {int.status === true ? "Connected" : int.status === false ? "Error" : "Configure in .env.local"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#111] border border-white/5">
                <h3 className="text-xs tracking-wider uppercase text-white/40 mb-3">Business Info</h3>
                <div className="space-y-2">
                  {[
                    { label: "Company", value: "AWN Archive" },
                    { label: "Email", value: "hello@awnarchive.com" },
                    { label: "Location", value: "Worcester, MA — Available Worldwide" },
                    { label: "Instagram", value: "@awn_studios" },
                    { label: "Tagline", value: "Stories Worth Remembering." },
                  ].map((info) => (
                    <div key={info.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#555]">{info.label}</span>
                      <span className="text-sm text-white">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#111] border border-white/5">
                <h3 className="text-xs tracking-wider uppercase text-white/40 mb-3">SEO Info</h3>
                <p className="text-xs text-[#A0A0A0] leading-relaxed">
                  Sitemap: <Link href="/sitemap.xml" className="text-[#C8A96A] underline">/sitemap.xml</Link><br />
                  Robots: <Link href="/robots.txt" className="text-[#C8A96A] underline">/robots.txt</Link><br />
                  10 SEO landing pages are live at <code className="text-white/60">/seo/[slug]</code><br />
                  Each page includes JSON-LD structured data, canonical tags, and unique meta descriptions.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
