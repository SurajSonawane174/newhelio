import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import "../../styles/project.css";
import StarsCanvas from "../Encryption/StarCanvas";

// Define the API Base at the top, just like the admin dashboard
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // 🚨 FIXED: Now uses the dynamic environment variable
        const response = await fetch(`${API_BASE}/projects`);
        if (!response.ok) throw new Error("Failed to fetch projects");
        
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project relative flex-col m-5 min-h-screen">
      <div className="about-bg">
        <StarsCanvas></StarsCanvas>
      </div>
      <div className="title-project-box relative m-5">
        <h1 className="title">Featured Projects</h1>
        <p className="subtitle">Check out My latest works</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center mt-20 text-cyan-400 font-mono tracking-widest animate-pulse">
          LOADING_DATABASE_RECORDS...
        </div>
      ) : error ? (
        <div className="flex justify-center items-center mt-20 text-red-500 font-mono tracking-widest uppercase">
          [ERR_CONNECTION: {error}]
        </div>
      ) : (
        <ProjectList projects={projects} />
      )}
    </div>
  );
};

export default ProjectsPage;