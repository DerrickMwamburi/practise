document.addEventListener("DOMContentLoaded", () => {
    const agencyList = document.getElementById("agency-list");

    fetch("http://localhost:3000/agencies")
        .then((response) => response.json())
        .then((agencies) => {
            agencies.forEach((agency) => {
                const agencyCard = document.createElement("div");
                agencyCard.classList.add("agency-card");
                agencyCard.innerHTML = `
                    <h3>${agency.name}</h3>
                    <p><strong>Location:</strong> ${agency.location}</p>
                    <p><strong>Contact:</strong> ${agency.contact}</p>
                    <p><strong>Email:</strong> <a href="mailto:${agency.email}">${agency.email}</a></p>
                `;
                agencyList.appendChild(agencyCard);
            });
        })
        .catch((error) => console.error("Error fetching agencies:", error));
});
