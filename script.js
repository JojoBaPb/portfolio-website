document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Toggle
    const themeToggle = document.createElement("button");
    themeToggle.id = "dark-mode-btn";
    document.querySelector("header").appendChild(themeToggle);

    function updateButtonText() {
        themeToggle.textContent = document.body.classList.contains("dark-mode") 
            ? "Light Mode" 
            : "Dark Mode";
    }

    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    updateButtonText(); // Set initial button text

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
        updateButtonText();
    });

    // Dynamic Projects
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

    const projectsContainer = document.getElementById("projects-container");

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

    // Interactive Project Card Animations
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.1)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });

        card.addEventListener("click", () => {
            window.open(card.getAttribute("onclick").split("'")[1], "_blank");
        });
    });
});
