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
    const textToType = "Backend & Systems Engineer \u2014 Python APIs, data pipelines, & C/C++20 systems.";
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
 
  /* --- Dynamic Project Cards, Filter & Modal --- */
  const projects = [
    {
      name: "Nexus Job Board API",
      track: "backend",
      pitch: "Production-ready job board REST API built with Django REST Framework and PostgreSQL, featuring JWT refresh-token blacklisting and role-based access control.",
      demonstrates: [
        "JWT refresh-token blacklisting and secure session invalidation via SimpleJWT",
        "Granular Role-Based Access Control (RBAC) separating employer and candidate permissions",
        "Relational schema modeling in PostgreSQL with optimized queryset indexing",
        "Comprehensive interactive OpenAPI/Swagger API documentation"
      ],
      decision: "Implemented server-side refresh token rotation and blacklisting in PostgreSQL to immediately revoke compromised sessions without sacrificing stateless access token performance.",
      technologies: ["Python", "Django REST Framework", "PostgreSQL", "SimpleJWT", "RBAC", "OpenAPI"],
      github: "https://github.com/JojoBaPb/nexus-jobboard-backend",
      liveDemo: null,
      image: null
    },
    {
      name: "Async URL Shortener",
      track: "backend",
      pitch: "High-throughput asynchronous URL shortening and redirection service engineered with FastAPI, SQLAlchemy 2.0, asyncpg, and PostgreSQL.",
      demonstrates: [
        "Non-blocking asynchronous database operations using asyncpg connection pooling",
        "GDPR secret-key deletion flow enabling secure link removal without user registration",
        "Strict request validation and settings management using Pydantic v2",
        "Automated integration test suites with pytest and transactional rollback fixtures"
      ],
      decision: "Replaced synchronous ORM queries with SQLAlchemy 2.0 async sessions and asyncpg connection pooling to maximize non-blocking concurrency under heavy redirect traffic.",
      technologies: ["FastAPI", "Python", "SQLAlchemy 2.0", "asyncpg", "PostgreSQL", "Pydantic v2", "Docker", "pytest"],
      github: "https://github.com/JojoBaPb/url-shortener",
      liveDemo: null,
      image: null
    },
    {
      name: "GraphQL CRM",
      track: "backend",
      pitch: "Customer Relationship Management backend leveraging Django and Graphene-Django GraphQL for structured queries, paired with Celery for background automation.",
      demonstrates: [
        "Flexible GraphQL query and mutation schemas eliminating client over-fetching",
        "Asynchronous task processing with Celery and Redis message brokers for background jobs",
        "Automated recurring cron tasks scheduled via Celery Beat",
        "Multi-tenant access controls and relational query optimization"
      ],
      decision: "Leveraged GraphQL to allow modular client consumers to fetch nested relationship graphs in a single network round-trip while offloading batch operations to background Celery workers.",
      technologies: ["Django", "GraphQL", "Graphene-Django", "Celery", "Redis", "PostgreSQL", "Python"],
      github: "https://github.com/JojoBaPb/alx-backend-graphql_crm",
      liveDemo: null,
      image: null
    },
    {
      name: "C++20 Card Battle Engine",
      track: "systems",
      pitch: "Turn-based tactical card battle engine developed in modern C++20 with strict RAII, State pattern architecture, and CMake build automation.",
      demonstrates: [
        "Finite State Machine (FSM) governing turn phases (Draw, Main, Battle, End) via the State pattern",
        "Strict memory safety and exclusive ownership semantics using std::unique_ptr and std::move",
        "Flexible card ability callbacks using std::function lambdas and event observers",
        "Modular CMake build architecture with automated unit testing suites"
      ],
      decision: "Modeled turn phases as concrete State objects with zero raw pointer allocations, ensuring deterministic state transitions and complete absence of memory leaks through RAII.",
      technologies: ["C++20", "State Pattern", "RAII", "std::unique_ptr", "CMake", "OOP"],
      github: "https://github.com/JojoBaPb/cpp-card-battle-architecture",
      liveDemo: null,
      image: null
    },
    {
      name: "UE5 Cinematic Camera State Machine",
      track: "systems",
      pitch: "Unreal Engine 5 cinematic camera control system powered by a C++ Finite State Machine (EMenuStates) and Blueprint dynamic mapping.",
      demonstrates: [
        "C++ enum-driven FSM managing menu and inspection states (EMenuStates)",
        "Blueprint TMap data structures mapping states directly to scene camera transform targets",
        "Frame-rate independent smooth interpolations using VInterpTo and RInterpTo",
        "Clean separation between core C++ transition logic and designer-exposed Blueprint bindings"
      ],
      decision: "Encapsulated camera transition interpolation math in native C++ while exposing target transforms to Blueprints via TMap, enabling instant designer iteration without recompilation.",
      technologies: ["Unreal Engine 5", "C++", "FSM", "Vector Interpolation", "Blueprints"],
      github: "https://github.com/JojoBaPb/UE5-Cinematic-State-Machine",
      liveDemo: null,
      image: null
    },
    {
      name: "C Systems Projects",
      track: "systems",
      pitch: "Low-level UNIX systems utilities implemented from scratch in POSIX C, including a custom UNIX shell, a Monty bytecode interpreter, and a formatted output library.",
      demonstrates: [
        "Custom UNIX command line interpreter (simple_shell) with fork(), execve(), path resolution, and signal handling",
        "Bytecode interpreter (monty) implementing LIFO/FIFO opcode stacks and memory buffers",
        "Custom printf engine handling specifiers, buffer management, and variable argument lists (va_list)",
        "Defensive dynamic memory management and clean error recovery routines"
      ],
      decision: "Implemented strict token parsing, dynamic allocation tracking, and custom memory cleanup routines to survive edge-case command executions and prevent leaks across all system calls.",
      technologies: ["C", "POSIX", "UNIX Shell", "Bytecode Interpreter", "Memory Management", "Linux"],
      github: "https://github.com/JojoBaPb/simple_shell",
      liveDemo: null,
      image: null
    }
  ];

  const projectsContainer = document.getElementById("projects-container");
  const modal = document.getElementById("project-modal");
  const filterBtns = document.querySelectorAll(".filter-btn");

  let currentTrack = "all";

  function openModal(project) {
    if (!modal) return;
    modal.querySelector("#modal-title").textContent = project.name;
    modal.querySelector("#modal-pitch").textContent = project.pitch;

    const demonstratesList = modal.querySelector("#modal-demonstrates-list");
    demonstratesList.innerHTML = "";
    project.demonstrates.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      demonstratesList.appendChild(li);
    });

    modal.querySelector("#modal-decision").textContent = project.decision;

    const techList = modal.querySelector("#modal-tech-list");
    techList.innerHTML = "";
    project.technologies.forEach(tech => {
      const li = document.createElement("li");
      li.textContent = tech;
      techList.appendChild(li);
    });

    const githubLink = modal.querySelector("#modal-github-link");
    githubLink.href = project.github;

    const liveLink = modal.querySelector("#modal-live-link");
    if (project.liveDemo) {
      liveLink.href = project.liveDemo;
      liveLink.style.display = "inline-block";
    } else {
      liveLink.style.display = "none";
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  function renderProjects(filterTrack = "all") {
    if (!projectsContainer) return;
    projectsContainer.innerHTML = "";

    const filtered = filterTrack === "all"
      ? projects
      : projects.filter(p => p.track === filterTrack);

    filtered.forEach((project, index) => {
      const card = document.createElement("div");
      card.classList.add("project-card");
      card.style.animationDelay = `${index * 0.08}s`;

      const trackBadge = project.track === "backend" ? "BACKEND" : "C++ / SYSTEMS";

      const thumbnailHtml = project.image
        ? `<img src="${project.image}" alt="Screenshot of the ${project.name} project">`
        : `<div class="project-placeholder" aria-hidden="true">
             <span class="placeholder-tag">&gt;_ ${trackBadge}</span>
             <span class="placeholder-title">${project.name}</span>
           </div>`;

      card.innerHTML = `
        ${thumbnailHtml}
        <div class="project-info">
          <span class="project-track-badge">${trackBadge}</span>
          <h3>${project.name}</h3>
          <p>${project.pitch}</p>
          <button class="details-btn">View Details</button>
        </div>
      `;

      card.querySelector(".details-btn").addEventListener("click", () => {
        openModal(project);
      });

      projectsContainer.appendChild(card);
    });
  }

  // Initialize filter button click listeners
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentTrack = btn.getAttribute("data-track") || "all";
        renderProjects(currentTrack);
      });
    });
  }

  // Initial render of all projects
  renderProjects("all");

  // Modal event bindings
  if (modal) {
    const closeModalBtn = modal.querySelector(".modal-close-btn");
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", closeModal);
    }
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
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
