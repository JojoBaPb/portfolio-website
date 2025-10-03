document.addEventListener("DOMContentLoaded", () => {
  /* --- Theme Toggling --- */
  const themeToggle = document.getElementById("dark-mode-btn");

  if (themeToggle) {
    const updateButtonText = () => {
      const isDarkMode = document.body.classList.contains("dark-mode");
      themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    };
    if (localStorage.getItem("dark-mode") === "enabled") {
      document.body.classList.add("dark-mode");
    }
    updateButtonText();
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");
      localStorage.setItem("dark-mode", isDarkMode ? "enabled" : "disabled");
      updateButtonText();
    });
  }

  /* --- Tagline Typing Effect --- */
  const tagline = document.getElementById("tagline");

  if (tagline) {
    const textToType = "A developer building things for everyone.";
    let i = 0;
    tagline.textContent = "";
    const typing = setInterval(() => {
      if (i < textToType.length) {
        tagline.textContent += textToType.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
  }

  /* --- NEW: tsParticles Animation --- */
  if (document.getElementById("tsparticles")) {
    tsParticles.load("tsparticles", {
      preset: "nasa",
      background: {
        color: {
          value: "transparent"
        }
      },
      particles: {
        color: {
          value: document.body.classList.contains("dark-mode") ? "#ffffff" : "#000000"
        },
        links: {
          color: document.body.classList.contains("dark-mode") ? "#ffffff" : "#000000",
          enable: true,
          opacity: 0.3
        },
        opacity: {
          value: 0.5,
        },
        move: {
            enable: true,
            speed: 1
        }
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
            grab: {
                distance: 150,
                links: {
                    opacity: 0.7
                }
            }
        }
      },
    });
  }

  /* --- Dynamic Project Cards & Modal --- */
  const projects = [
    {
      name: "Matchmaking Algorithm",
      description: "A Python-based system designed to explore matchmaking in games, including mechanics for both fair and intentionally unbalanced ('rigged') scenarios. A fun exploration of algorithm design.",
      github: "https://github.com/JojoBaPb/rigged-matchmaking-simulator",
      liveDemo: null,
      technologies: ["Python", "Algorithm Design"],
      image: "assets/images/matchmaking_algo_thumbnail.jpg"
    },
    {
      name: "Portfolio Website",
      description: "The very site you are on now! A fully responsive personal portfolio built from scratch to showcase my skills and projects. Includes a dark mode feature and is dynamically rendered.",
      github: "https://github.com/JojoBaPb/portfolio-website",
      liveDemo: "#",
      technologies: ["HTML5", "CSS3", "JavaScript", "Flexbox", "Grid"],
      image: "assets/images/p_folio_website_thumbnail.jpg"
    },
    {
      name: "AI Marketing Bot",
      description: "An intelligent bot designed to automate marketing tasks. It can handle lead generation, manage email campaigns, and schedule social media posts using various AI APIs.",
      github: "https://github.com/JojoBaPb/ai-marketing-bot",
      liveDemo: null,
      technologies: ["Python", "FastAPI", "OpenAI API", "Hugging Face"],
      image: "assets/images/ai_marketing_bot_thumbnail.jpg"    
    }
  ];

  const projectsContainer = document.getElementById("projects-container");
  const modal = document.getElementById("project-modal");

  if (modal) {
    const closeModalBtn = modal.querySelector(".modal-close-btn");
    function openModal(project) {
      modal.querySelector("#modal-title").textContent = project.name;
      modal.querySelector("#modal-description").textContent = project.description;
      modal.querySelector("#modal-github-link").href = project.github;
      const techList = modal.querySelector("#modal-tech-list");
      techList.innerHTML = "";
      project.technologies.forEach(tech => {
        const li = document.createElement("li");
        li.textContent = tech;
        techList.appendChild(li);
      });
      const liveLink = modal.querySelector("#modal-live-link");
      if (project.liveDemo) {
        liveLink.href = project.liveDemo;
        liveLink.style.display = "inline-block";
      } else {
        liveLink.style.display = "none";
      }
      modal.classList.add("active");
    }
    function closeModal() {
      modal.classList.remove("active");
    }
    if (projectsContainer) {
      projectsContainer.innerHTML = "";
      projects.forEach((project, index) => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.style.animationDelay = `${index * 0.15}s`;
        projectCard.innerHTML = `
          <img src="${project.image}" alt="Screenshot of the ${project.name} project">
          <div class="project-info">
            <h3>${project.name}</h3>
            <p>${project.description.substring(0, 80)}...</p>
            <button class="details-btn">View Details</button>
          </div>
        `;
        projectCard.querySelector(".details-btn").addEventListener("click", () => {
          openModal(project);
        });
        projectsContainer.appendChild(projectCard);
      });
    }
    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  /* --- Dynamic Copyright Year --- */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* --- Scroll Animations --- */
  const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  sectionsToAnimate.forEach(section => {
    observer.observe(section);
  });
});
