import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  User,
  Clock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Star,
  Loader2,
  Github,
  ExternalLink,
} from "lucide-react";

// const API_BASE = "http://localhost:8080/api/v1";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  let data = null;
  try {
    data = await res.json();
  } catch (_) {}
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
};

/* ---------------------------------- Shared UI ---------------------------------- */

const Field = ({ label, children }) => (
  <label className="flex flex-col gap-1 text-sm">
    <span className="text-gray-400">{label}</span>
    {children}
  </label>
);

const inputClass =
  "w-full p-2.5 text-sm rounded bg-[#2a2a3d] text-white placeholder-gray-500 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all";

const SectionCard = ({ children, className = "" }) => (
  <div className={`bg-[#1e1e2f]/80 border border-[#7042f83b] rounded-xl p-5 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

const PrimaryButton = ({ children, onClick, type = "button", className = "", disabled }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-[0_0_15px_rgba(112,66,248,0.5)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const GhostButton = ({ children, onClick, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#2a2a3d] border border-gray-600 text-gray-300 text-sm hover:bg-[#34344a] hover:text-white transition-all ${className}`}
  >
    {children}
  </button>
);

const Modal = ({ title, onClose, children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.stopPropagation()}
      className="bg-[#16161f] border border-[#7042f88b] rounded-xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      {children}
    </motion.div>
  </motion.div>
);

const ErrorBanner = ({ message }) =>
  message ? (
    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-400 text-sm">
      {message}
    </div>
  ) : null;

const EmptyState = ({ label }) => (
  <div className="text-center text-gray-500 text-sm py-10 border border-dashed border-gray-700 rounded-xl">
    {label}
  </div>
);

const LoadingState = () => (
  <div className="flex items-center justify-center py-16 text-gray-400">
    <Loader2 className="w-6 h-6 animate-spin" />
  </div>
);

/* ---------------------------------- Projects ---------------------------------- */

const emptyProject = {
  title: "",
  description: "",
  techStack: "",
  githubLink: "",
  liveLink: "",
  attachmentUrls: "",
  isFeatured: false,
};

const projectToForm = (p) => ({
  title: p.title || "",
  description: p.description || "",
  techStack: (p.techStack || []).join(", "),
  githubLink: p.githubLink || "",
  liveLink: p.liveLink || "",
  attachmentUrls: (p.attachmentUrls || []).join(", "),
  isFeatured: !!p.isFeatured,
});

const formToProject = (f) => ({
  title: f.title,
  description: f.description,
  techStack: f.techStack.split(",").map((s) => s.trim()).filter(Boolean),
  githubLink: f.githubLink,
  liveLink: f.liveLink,
  attachmentUrls: f.attachmentUrls.split(",").map((s) => s.trim()).filter(Boolean),
  isFeatured: f.isFeatured,
});

const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");
  const [editing, setEditing] = useState(null); // null = closed, "new" = creating, object = editing
  const [form, setForm] = useState(emptyProject);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/projects");
      setProjects(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(emptyProject);
    setModalError("");
    setEditing("new");
  };

  const openEdit = (project) => {
    setForm(projectToForm(project));
    setModalError("");
    setEditing(project);
  };

  const closeModal = () => setEditing(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setModalError("");
    try {
      const payload = formToProject(form);
      if (editing === "new") {
        const created = await apiFetch("/projects", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setProjects((prev) => [created, ...prev]);
      } else {
        const updated = await apiFetch(`/projects/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setProjects((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
      }
      setEditing(null);
    } catch (err) {
      setModalError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await apiFetch(`/projects/${id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <PrimaryButton onClick={openCreate}>
          <Plus className="w-4 h-4" /> New Project
        </PrimaryButton>
      </div>

      <ErrorBanner message={error} />

      {loading ? (
        <LoadingState />
      ) : projects.length === 0 ? (
        <EmptyState label="No projects yet. Click 'New Project' to add one." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <SectionCard key={project._id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  {project.title}
                  {project.isFeatured && <Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />}
                </h3>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(project)} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    disabled={deletingId === project._id}
                    className="text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    {deletingId === project._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400 line-clamp-3">{project.description}</p>
              {project.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[#2a2a3d] border border-[#7042f83b] text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-3 mt-auto pt-2 text-sm">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                )}
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <Modal title={editing === "new" ? "New Project" : "Edit Project"} onClose={closeModal}>
            <ErrorBanner message={modalError} />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field label="Title">
                <input
                  required
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                />
              </Field>
              <Field label="Description">
                <textarea
                  required
                  rows={3}
                  className={inputClass}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </Field>
              <Field label="Tech Stack (comma separated)">
                <input
                  className={inputClass}
                  placeholder="React, Node.js, MongoDB"
                  value={form.techStack}
                  onChange={(e) => setForm((f) => ({ ...f, techStack: e.target.value }))}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="GitHub Link">
                  <input
                    className={inputClass}
                    value={form.githubLink}
                    onChange={(e) => setForm((f) => ({ ...f, githubLink: e.target.value }))}
                  />
                </Field>
                <Field label="Live Link">
                  <input
                    className={inputClass}
                    value={form.liveLink}
                    onChange={(e) => setForm((f) => ({ ...f, liveLink: e.target.value }))}
                  />
                </Field>
              </div>
              <Field label="Attachment URLs (comma separated)">
                <input
                  className={inputClass}
                  placeholder="https://...png, https://...jpg"
                  value={form.attachmentUrls}
                  onChange={(e) => setForm((f) => ({ ...f, attachmentUrls: e.target.value }))}
                />
              </Field>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                  className="w-4 h-4 accent-purple-500"
                />
                Featured project
              </label>
              <div className="flex justify-end gap-3 mt-2">
                <GhostButton onClick={closeModal}>Cancel</GhostButton>
                <PrimaryButton type="submit" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </PrimaryButton>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------------------------------- Personal ---------------------------------- */

const emptyPersonal = {
  name: "",
  headline: "",
  bio: "",
  email: "",
  github: "",
  linkedin: "",
  twitter: "",
  resumeUrl: "",
  numberOfProjects: 0,
  yearsOfExperience: 0,
};

const personalToForm = (p) => ({
  name: p?.name || "",
  headline: p?.headline || "",
  bio: p?.bio || "",
  email: p?.email || "",
  github: p?.socialLinks?.github || "",
  linkedin: p?.socialLinks?.linkedin || "",
  twitter: p?.socialLinks?.twitter || "",
  resumeUrl: p?.resumeUrl || "",
  numberOfProjects: p?.numberOfProjects ?? 0,
  yearsOfExperience: p?.yearsOfExperience ?? 0,
});

const formToPersonal = (f) => ({
  name: f.name,
  headline: f.headline,
  bio: f.bio,
  email: f.email,
  socialLinks: {
    github: f.github,
    linkedin: f.linkedin,
    twitter: f.twitter,
  },
  resumeUrl: f.resumeUrl,
  numberOfProjects: Number(f.numberOfProjects) || 0,
  yearsOfExperience: Number(f.yearsOfExperience) || 0,
});

const PersonalTab = () => {
  const [form, setForm] = useState(emptyPersonal);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await apiFetch("/personal");
        setForm(personalToForm(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const data = await apiFetch("/personal", {
        method: "POST",
        body: JSON.stringify(formToPersonal(form)),
      });
      setForm(personalToForm(data));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <SectionCard className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
      <ErrorBanner message={error} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Name">
            <input required className={inputClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </Field>
          <Field label="Email">
            <input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </Field>
        </div>
        <Field label="Headline">
          <input required className={inputClass} value={form.headline} onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))} />
        </Field>
        <Field label="Bio">
          <textarea rows={4} className={inputClass} value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="GitHub URL">
            <input className={inputClass} value={form.github} onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))} />
          </Field>
          <Field label="LinkedIn URL">
            <input className={inputClass} value={form.linkedin} onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))} />
          </Field>
          <Field label="Twitter URL">
            <input className={inputClass} value={form.twitter} onChange={(e) => setForm((f) => ({ ...f, twitter: e.target.value }))} />
          </Field>
        </div>
        <Field label="Resume URL">
          <input className={inputClass} value={form.resumeUrl} onChange={(e) => setForm((f) => ({ ...f, resumeUrl: e.target.value }))} />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Number of Projects">
            <input type="number" min="0" className={inputClass} value={form.numberOfProjects} onChange={(e) => setForm((f) => ({ ...f, numberOfProjects: e.target.value }))} />
          </Field>
          <Field label="Years of Experience">
            <input type="number" min="0" className={inputClass} value={form.yearsOfExperience} onChange={(e) => setForm((f) => ({ ...f, yearsOfExperience: e.target.value }))} />
          </Field>
        </div>
        <div className="flex justify-end items-center gap-3 mt-2">
          {saved && <span className="text-sm text-cyan-400">Saved</span>}
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </PrimaryButton>
        </div>
      </form>
    </SectionCard>
  );
};

/* ---------------------------------- Experience ---------------------------------- */
const emptyExperience = {
  role: "",
  company: "",
  companyLogo: "", // FIXED: Replaced '=' with ':'
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  technologiesUsed: "",
};

const experienceToForm = (exp) => ({
  role: exp.role || "",
  company: exp.company || "",
  companyLogo: exp.companyLogo || "", // ADDED: Map data from DB
  startDate: exp.startDate ? exp.startDate.slice(0, 10) : "",
  endDate: exp.endDate ? exp.endDate.slice(0, 10) : "",
  isCurrent: !!exp.isCurrent,
  description: (exp.description || []).join("\n"),
  technologiesUsed: (exp.technologiesUsed || []).join(", "),
});

const formToExperience = (f) => ({
  role: f.role,
  company: f.company,
  companyLogo: f.companyLogo, // ADDED: Send data to DB
  startDate: f.startDate,
  endDate: f.isCurrent ? null : f.endDate || null,
  isCurrent: f.isCurrent,
  description: f.description.split("\n").map((s) => s.trim()).filter(Boolean),
  technologiesUsed: f.technologiesUsed.split(",").map((s) => s.trim()).filter(Boolean),
});

const formatDate = (d) => (d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present");

const ExperienceTab = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyExperience);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/experience");
      setItems(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setForm(emptyExperience);
    setModalError("");
    setEditing("new");
  };

  const openEdit = (exp) => {
    setForm(experienceToForm(exp));
    setModalError("");
    setEditing(exp);
  };

  const closeModal = () => setEditing(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setModalError("");
    try {
      const payload = formToExperience(form);
      if (editing === "new") {
        const created = await apiFetch("/experience", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setItems((prev) => [created, ...prev]);
      } else {
        const updated = await apiFetch(`/experience/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setItems((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
      }
      setEditing(null);
    } catch (err) {
      setModalError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await apiFetch(`/experience/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <PrimaryButton onClick={openCreate}>
          <Plus className="w-4 h-4" /> New Entry
        </PrimaryButton>
      </div>

      <ErrorBanner message={error} />

      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState label="No experience entries yet. Click 'New Entry' to add one." />
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((exp) => (
            <SectionCard key={exp._id}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  {/* Quick visual check to show the logo in the dashboard list if it exists */}
                  {exp.companyLogo && (
                    <img src={exp.companyLogo} alt="Logo" className="w-8 h-8 rounded-full bg-white/10 object-contain p-1" />
                  )}
                  <div>
                    <h3 className="font-semibold text-white">{exp.role}</h3>
                    <p className="text-sm text-gray-400">
                      {exp.company} &middot; {formatDate(exp.startDate)} – {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(exp)} className="text-gray-400 hover:text-purple-400 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    disabled={deletingId === exp._id}
                    className="text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    {deletingId === exp._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              {exp.description?.length > 0 && (
                <ul className="list-disc list-inside text-sm text-gray-400 mt-2 space-y-1">
                  {exp.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
              {exp.technologiesUsed?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.technologiesUsed.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[#2a2a3d] border border-[#7042f83b] text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </SectionCard>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <Modal title={editing === "new" ? "New Experience" : "Edit Experience"} onClose={closeModal}>
            <ErrorBanner message={modalError} />
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Role">
                  <input required className={inputClass} value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
                </Field>
                <Field label="Company">
                  <input required className={inputClass} value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} />
                </Field>
              </div>
              
              {/* ADDED: The Input Field for the Logo */}
              <Field label="Company Logo URL (Optional)">
                <input
                  type="text"
                  className={inputClass}
                  placeholder="https://..."
                  value={form.companyLogo}
                  onChange={(e) => setForm((f) => ({ ...f, companyLogo: e.target.value }))}
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Start Date">
                  <input required type="date" className={inputClass} value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
                </Field>
                <Field label="End Date">
                  <input
                    type="date"
                    disabled={form.isCurrent}
                    className={`${inputClass} disabled:opacity-40`}
                    value={form.endDate}
                    onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                  />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={form.isCurrent}
                  onChange={(e) => setForm((f) => ({ ...f, isCurrent: e.target.checked, endDate: e.target.checked ? "" : f.endDate }))}
                  className="w-4 h-4 accent-purple-500"
                />
                This is my current role
              </label>
              <Field label="Description (one bullet per line)">
                <textarea
                  rows={4}
                  className={inputClass}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </Field>
              <Field label="Technologies Used (comma separated)">
                <input
                  className={inputClass}
                  placeholder="React, Node.js, MongoDB"
                  value={form.technologiesUsed}
                  onChange={(e) => setForm((f) => ({ ...f, technologiesUsed: e.target.value }))}
                />
              </Field>
              <div className="flex justify-end gap-3 mt-2">
                <GhostButton onClick={closeModal}>Cancel</GhostButton>
                <PrimaryButton type="submit" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </PrimaryButton>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// export default ExperienceTab;
/* ---------------------------------- Dashboard ---------------------------------- */

const TABS = [
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "personal", label: "Personal", icon: User },
  { id: "experience", label: "Experience", icon: Clock },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await apiFetch("/logout", { method: "POST" });
    } catch (_) {
      // ignore - proceed regardless
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a14] text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Admin{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Dashboard
            </span>
          </h1>
          <GhostButton onClick={handleLogout}>
            {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            Logout
          </GhostButton>
        </div>

        <div className="flex gap-1 mb-6 border-b border-[#7042f83b] overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  active ? "border-purple-500 text-white" : "border-transparent text-gray-400 hover:text-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "projects" && <ProjectsTab />}
            {activeTab === "personal" && <PersonalTab />}
            {activeTab === "experience" && <ExperienceTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;