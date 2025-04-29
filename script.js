document.addEventListener("DOMContentLoaded", () => {
    // Select the existing button (instead of appending it)
    const themeToggle = document.getElementById("dark-mode-btn");

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
            github: "https://github.com/JojoBaPb/matchmaking-algo",
            image: "assets/images/matchmaking_algo_thumbnail.jpg"
        },
        {
            name: "Portfolio Website",
            description: "This portfolio site, built with HTML, CSS, and JavaScript.",
            github: "https://github.com/JojoBaPb/portfolio-website",
            image: "assets/images/p_folio_website_thumbnail.jpg"
        }
    ];

    // Target the correct container for the project cards
    const projectsContainer = document.querySelector(".projects-container");

    // Loop through the projects array and dynamically add project cards
    projects.forEach(project => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.name}">
        <div class="project-info">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
        </div>
    `;
    projectCard.onclick = () => window.open(project.github, "_blank");
    projectsContainer.appendChild(projectCard);
}); 
