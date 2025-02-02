document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode
    const themeToggle = document.createElement("button");
    themeToggle.textContent = "Toggle Dark Mode";
    themeToggle.id = "dark-mode-btn";
    document.querySelector("header").appendChild(themeToggle);

    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
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
        projectCard.classList.add("project");
        projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.github}" target="_blank">View on GitHub</a>
        `;
        projectsContainer.appendChild(projectCard);
    });
});
