import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import { projectsData } from '/public/data/data';
import "../../styles/project.css";
import StarsCanvas from "../Encryption/StarCanvas";


const ProjectsPage = () => {


  return (
    <div className="project relative flex-col m-5 min-h-screen">
        <div className="about-bg">
      <StarsCanvas></StarsCanvas>

        </div>
                <div class="title-project-box relative m-5">
            <h1 class="title">Featured Projects</h1>
            <p class="subtitle">Check out My latest works</p>
        </div>

      {/* ✅ Render Project List */}
      <ProjectList projects={projectsData} />
    </div>
  );
};

export default ProjectsPage;
