document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.createElement("button");
    themeToggle.id = "dark-mode-btn";

    const header = document.querySelector("header");
    header.appendChild(themeToggle);

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
});
