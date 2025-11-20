const events = [
  {
    name: "AI Workshop",
    date: "2025-11-20",
    start: "10:00",
    end: "12:00",
    venue: "Lab 204",
    category: "tech",
    link: "https://example.com"
  },
  {
    name: "Dance Auditions",
    date: "2025-11-22",
    start: "14:00",
    end: "16:00",
    venue: "Cultural Hall",
    category: "cultural",
    link: "https://example.com"
  },
  {
    name: "Football Tryouts",
    date: "2025-11-23",
    start: "08:00",
    end: "10:00",
    venue: "Sports Ground",
    category: "sports",
    link: "https://example.com"
  }
];

// --- Rendering Events ---
function renderEvents(filter = "all") {
  const eventList = document.getElementById("event-list");
  eventList.innerHTML = "";

  events
    .filter(e => filter === "all" || e.category === filter)
    .forEach(e => {
      eventList.innerHTML += `
        <div class="event-card">
          <h3>${e.name}</h3>
          <p><strong>Date:</strong> ${e.date}</p>
          <p><strong>Time:</strong> ${e.start} - ${e.end}</p>
          <p><strong>Venue:</strong> ${e.venue}</p>
          <a href="${e.link}" target="_blank">
            <button>Register</button>
          </a>
        </div>
      `;
    });
}

renderEvents();

// --- Happening Now ---
function checkHappeningNow() {
  const nowContainer = document.getElementById("now-events");
  nowContainer.innerHTML = "";

  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().slice(0, 5);

  const happening = events.filter(e =>
    e.date === today && currentTime >= e.start && currentTime <= e.end
  );

  if (happening.length === 0) {
    nowContainer.innerHTML = "<p>No events happening now.</p>";
    return;
  }

  happening.forEach(e => {
    nowContainer.innerHTML += `
      <div class="event-card">
        <h3>${e.name}</h3>
        <p><strong>Time:</strong> ${e.start} - ${e.end}</p>
        <p><strong>Venue:</strong> ${e.venue}</p>
      </div>
    `;
  });
}

checkHappeningNow();
setInterval(checkHappeningNow, 60000); // updates every 1 min

// --- Filters ---
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    renderEvents(btn.dataset.category);
  });
});
