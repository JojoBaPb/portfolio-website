document.addEventListener("DOMContentLoaded", () => {
  /* --- Theme Toggling --- */
  const themeToggle = document.getElementById("dark-mode-btn");

  if (themeToggle) {
    // Function to update the button's text based on the current mode
    const updateButtonText = () => {
      const isDarkMode = document.body.classList.contains("dark-mode");
      themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    };

    // Check localStorage to set the initial theme on page load
    if (localStorage.getItem("dark-mode") === "enabled") {
      document.body.classList.add("dark-mode");
    }

    updateButtonText(); // Set initial button text

    // Add click event to toggle the theme
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Save the user's preference in localStorage
      const isDarkMode = document.body.classList.contains("dark-mode");
      localStorage.setItem("dark-mode", isDarkMode ? "enabled" : "disabled");
      
      updateButtonText();
    });
  }

  /* --- Tagline Typing Effect --- */
  const tagline = document.getElementById("tagline");

  if (tagline) {
    const textToType = "A developer building things for the web."; // Text is now stored here
    let i = 0;
    tagline.textContent = ""; // Ensure it starts empty

    const typing = setInterval(() => {
      if (i < textToType.length) {
        tagline.textContent += textToType.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 50);
  }

  /* --- Dynamic Project Cards --- */
  const projects = [
    {
      name: "Matchmaking Algorithm",
      description: "A fun matchmaking system exploring rigged mechanics.",
      github: "https://github.com/JojoBaPb/matchmaking-algo",
      image: "assets/images/matchmaking_algo_thumbnail.jpg"
    },
    {
      name: "Portfolio Website",
      description: "This portfolio site, built with HTML, CSS, and JavaScript.",
      github: "https://github.com/JojoBaPb/portfolio-website",
      image: "assets/images/p_folio_website_thumbnail.jpg"
    },
    {
      name: "AI Marketing Bot",
      description: "Automates lead generation, email campaigns, and social posts.",
      github: "https://github.com/JojoBaPb/ai-marketing-bot",
      image: "assets/images/ai_marketing_bot_thumbnail.jpg"
    }
  ];

  const projectsContainer = document.getElementById("projects-container");

  if (projectsContainer) {
    projectsContainer.innerHTML = ""; // Clear the "Loading..." fallback text

    projects.forEach((project, index) => {
      // Create an anchor tag <a> for the whole card for accessibility
      const projectCard = document.createElement("a");
      projectCard.classList.add("project-card");
      projectCard.href = project.github;
      projectCard.target = "_blank";
      projectCard.rel = "noopener noreferrer"; // Security best practice
      
      // Stagger the animation for each card
      projectCard.style.animationDelay = `${index * 0.15}s`;

      projectCard.innerHTML = `
        <img src="${project.image}" alt="Screenshot of the ${project.name} project">
        <div class="project-info">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
        </div>
      `;
      
      projectsContainer.appendChild(projectCard);
    });
  }
  
  /* --- Dynamic Copyright Year --- */
  const yearSpan = document.getElementById("current-year");
  if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
