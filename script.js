document.addEventListener("DOMContentLoaded", () => {
    // Check if the button already exists
    if (document.getElementById("dark-mode-btn")) return;

    // Create Dark Mode Toggle Button
    const themeToggle = document.createElement("button");
    themeToggle.textContent = "Toggle Dark Mode";
    themeToggle.id = "dark-mode-btn"; // Ensure unique ID

    // Find the header and add the button there
    const header = document.querySelector("header");
    header.appendChild(themeToggle);

    // Load Dark Mode Preference from Local Storage
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Toggle Dark Mode
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Save preference in local storage
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
        } else {
            localStorage.setItem("dark-mode", "disabled");
        }
    });
});

