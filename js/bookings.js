document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("booking-form");
    const bookingsTableBody = document.getElementById("bookings-table-body");
    const destinationSelect = document.getElementById("destination");
    const agencySelect = document.getElementById("agency");

    // Fetch Destinations and Populate Dropdown
    fetch("http://localhost:3000/destinations")
        .then(response => response.json())
        .then(destinations => {
            destinations.forEach(destination => {
                const option = document.createElement("option");
                option.value = destination.id;
                option.textContent = destination.name;
                destinationSelect.appendChild(option);
            });
        });

    // Fetch Agencies and Populate Dropdown
    fetch("http://localhost:3000/agencies")
        .then(response => response.json())
        .then(agencies => {
            agencies.forEach(agency => {
                const option = document.createElement("option");
                option.value = agency.id;
                option.textContent = agency.name;
                agencySelect.appendChild(option);
            });
        });

    // Fetch and Display Existing Bookings
    function loadBookings() {
        fetch("http://localhost:3000/bookings")
            .then(response => response.json())
            .then(bookings => {
                bookingsTableBody.innerHTML = ""; // Clear table before reloading
                bookings.forEach(booking => displayBooking(booking));
            });
    }

    loadBookings(); // Initial load

    // Function to Display Booking in Table
    function displayBooking(booking) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.customer}</td>
            <td>${booking.destinationName}</td>
            <td>${booking.agencyName}</td>
            <td>${booking.date}</td>
            <td>${booking.status}</td>
            <td>
                <button class="delete-btn" data-id="${booking.id}">❌ Remove</button>
            </td>
        `;
        bookingsTableBody.appendChild(row);

        // Add Event Listener to Delete Button
        row.querySelector(".delete-btn").addEventListener("click", () => {
            deleteBooking(booking.id);
        });
    }

    // Handle Form Submission
    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const customer = document.getElementById("customer-name").value;
        const destinationId = destinationSelect.value;
        const agencyId = agencySelect.value;
        const date = document.getElementById("date").value;
        const status = "Pending"; // Default status

        // Get Destination & Agency Names
        const destinationName = destinationSelect.options[destinationSelect.selectedIndex].text;
        const agencyName = agencySelect.options[agencySelect.selectedIndex].text;

        // Create Booking Object
        const newBooking = { 
            customer, 
            destination: destinationId, 
            destinationName,
            agency: agencyId, 
            agencyName,
            date, 
            status 
        };

        // Send POST Request to JSON Server
        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBooking)
        })
        .then(response => response.json())
        .then(booking => {
            displayBooking(booking); // Show new booking immediately
            bookingForm.reset(); // Clear form
        });
    });

    // Function to Delete a Booking
    function deleteBooking(id) {
        fetch(`http://localhost:3000/bookings/${id}`, {
            method: "DELETE"
        })
        .then(() => loadBookings()); // Refresh bookings
    }
});

