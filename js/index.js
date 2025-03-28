document.addEventListener("DOMContentLoaded", () => {
    fetchDestinations(); 
});


function fetchDestinations() {
    fetch("http://localhost:3000/destinations")
        .then(response => response.json())
        .then(data => {
            const destinationsWithFullImagePaths = data.map(destination => {
                return {
                    ...destination,
                    image: getFullImagePath(destination.image)
                };
            });
            displayDestinations(destinationsWithFullImagePaths);
            addSearchFunctionality(destinationsWithFullImagePaths);
        })
        .catch(error => console.error("Error fetching destinations:", error));
}


function getFullImagePath(imagePath) {
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    return `http://localhost:3000/images/${imagePath}`;
}


const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
});


if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}


function displayDestinations(destinations) {
    const container = document.getElementById("destinations-container");
    container.innerHTML = ""; 

    destinations.forEach(destination => {
        const card = document.createElement("div");
        card.className = "destination-card";

        
        const imageUrl = destination.image || 'default-placeholder.jpg';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${destination.name}" 
                 onerror="this.src='fallback-image.jpg';this.alt='Image not available'">
            <h3>${destination.name}</h3>
            <p><strong>Location:</strong> ${destination.location}</p>
            <p>${destination.description}</p>
        `;

        
        card.addEventListener("mouseover", () => {
            card.style.border = "3px solid gold";
        });
        card.addEventListener("mouseout", () => {
            card.style.border = "none";
        });

        container.appendChild(card);
    });
}


function addSearchFunctionality(destinations) {
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredDestinations = destinations.filter(destination =>
            destination.name.toLowerCase().includes(searchTerm)
        );
        displayDestinations(filteredDestinations);
    });
}




