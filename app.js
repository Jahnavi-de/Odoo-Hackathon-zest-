// Static sample profiles
const staticProfiles = [
  {
    name: "Ananya Sharma",
    skillsOffered: ["Photoshop", "Public Speaking"],
    skillsWanted: ["Python"],
    location: "Delhi",
    availability: "Weekends",
    photo: "https://i.pinimg.com/236x/d5/b3/0d/d5b30db5c2e73b9659795d1caf901fb7.jpg"
  },
  {
    name: "Ravi Mehra",
    skillsOffered: ["Javascript", "React"],
    skillsWanted: ["Figma", "UI Design"],
    location: "Mumbai",
    availability: "Evenings",
    photo: "https://rukminim2.flixcart.com/image/850/1000/l1mh7rk0/poster/b/s/j/medium-famous-cartoon-poster-for-kids-shinchan-cartoon-wall-original-imagd5fcasqbqfcg.jpeg?q=90&crop=false"
  },
  {
    name: "Ranya Sharma",
    skillsOffered: ["Photoshop", "Public Speaking", "Event Organizer"],
    skillsWanted: ["Python", "Java"],
    location: "Delhi",
    availability: "Weekdays",
    photo: "https://www.shutterstock.com/image-vector/vector-cute-baby-panda-cartoon-600nw-2427356853.jpg"
  }
];

// Load dynamic profiles (from signup)
const userProfiles = JSON.parse(localStorage.getItem("userProfiles")) || [];

// Merge all profiles
const allProfiles = [...staticProfiles, ...userProfiles];

// DOM elements
const profilesContainer = document.getElementById("profiles");
const searchInput = document.getElementById("searchInput");

// Display profiles
function displayProfiles(data) {
  profilesContainer.innerHTML = "";

  data.forEach((profile, index) => {
    profilesContainer.innerHTML += `
      <div class="card">
        <img src="${profile.photo}" alt="${profile.name}" />
        <h3>${profile.name}</h3>
        <p><strong>Offered:</strong> ${profile.skillsOffered.join(", ")}</p>
        <p><strong>Wanted:</strong> ${profile.skillsWanted.join(", ")}</p>
        <p><strong>Availability:</strong> ${profile.availability}</p>
        <p><strong>Location:</strong> ${profile.location}</p>
        <a href="#" class="btn view-profile-btn" data-index="${index}">View Profile</a>
      </div>
    `;
  });

  // Add click events for each "View Profile" button
  const viewButtons = document.querySelectorAll(".view-profile-btn");
  viewButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const profileIndex = this.getAttribute("data-index");
      localStorage.setItem("selectedProfile", JSON.stringify(data[profileIndex]));
      window.location.href = "profile-view.html";
    });
  });
}

// Initial load
displayProfiles(allProfiles);

// Search filter
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allProfiles.filter(profile =>
    profile.skillsOffered.join(",").toLowerCase().includes(searchTerm) ||
    profile.skillsWanted.join(",").toLowerCase().includes(searchTerm)
  );
  displayProfiles(filtered);
});