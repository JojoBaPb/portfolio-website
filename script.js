document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Toggle
    const themeToggle = document.createElement("button");
    themeToggle.id = "dark-mode-btn";
    document.body.appendChild(themeToggle); // Append directly to body for visibility

    function updateButtonText() {
        themeToggle.textContent = document.body.classList.contains("dark-mode") 
            ? "Light Mode" 
            : "Dark Mode";
    }

    // Check if dark mode is enabled in localStorage
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    updateButtonText(); // Set initial button text

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
        updateButtonText();
    });

    // Dynamic Projects Rendering
    const projects = [
        {
            name: "Matchmaking Algorithm",
            description: "A fun matchmaking system exploring rigged mechanics.",
            github: "https://github.com/JojoBaPb/matchmaking-algo"
        },
        {
            name: "Portfolio Website",
            description: "This portfolio site, built with HTML, CSS, and JavaScript.",
            github: "https://github.com/JojoBaPb/portfolio-website"
        }
    ];

    // Target the correct container for the project cards
    const projectsContainer = document.querySelector(".projects-container");

    // Loop through the projects array and dynamically add project cards
    projects.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
            <img src="assets/images/${project.name.toLowerCase().replace(/ /g, "-")}-thumbnail.jpg" alt="${project.name}">
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
        `;
        projectCard.setAttribute("onclick", `window.open('${project.github}', '_blank')`);
        projectsContainer.appendChild(projectCard);
    });

    // Interactive Project Card Animations - Optional: Can be moved to CSS for clarity
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("hovered"); // CSS class approach
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered"); // CSS class approach
        });
    });
});
