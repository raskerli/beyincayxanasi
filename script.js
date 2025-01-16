let videosPerPage = 2; // Number of videos per page
let blogsPerPage = 2; // Number of blogs per page
let videoPage = 1; // Current video page
let blogPage = 1; // Current blog page
let allVideos = [];
let allBlogs = [];

// Fetch data from data.json
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    allVideos = data.videos;
    allBlogs = data.blogs;

    displayVideos();
    displayBlogs();
  })
  .catch((error) =>
    console.error("Məlumat yüklənərkən xəta baş verdi:", error)
  );

// Display videos with "Load More" functionality
function displayVideos() {
  const videoGrid = document.getElementById("videoGrid");
  const start = (videoPage - 1) * videosPerPage;
  const end = videoPage * videosPerPage;

  allVideos.slice(start, end).forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.className = "col-md-6 mb-4";
    videoCard.innerHTML = `
            <div class="card shadow-sm">
                <iframe src="${video.url}" frameborder="0" allowfullscreen class="card-img-top"></iframe>
                <div class="card-body">
                    <h5 class="card-title">${video.title}</h5>
                    <a href="video.html?id=${video.id}" class="btn btn-primary">Read Script</a>
                </div>
            </div>
        `;
    videoGrid.appendChild(videoCard);
  });

  if (end >= allVideos.length) {
    document.getElementById("loadMoreVideos").style.display = "none";
  }
}

// Display blogs with "Load More" functionality
function displayBlogs() {
  const blogGrid = document.getElementById("blogGrid");
  const start = (blogPage - 1) * blogsPerPage;
  const end = blogPage * blogsPerPage;

  allBlogs.slice(start, end).forEach((blog) => {
    const blogCard = document.createElement("div");
    blogCard.className = "col-md-6 mb-4";
    blogCard.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${blog.title}</h5>
                    <p class="card-text">${blog.description}</p>
                    <a href="blog.html?id=${blog.id}" class="btn btn-primary">Read More</a>
                </div>
            </div>
        `;
    blogGrid.appendChild(blogCard);
  });

  if (end >= allBlogs.length) {
    document.getElementById("loadMoreBlogs").style.display = "none";
  }
}

// Load More buttons
document.getElementById("loadMoreVideos").addEventListener("click", () => {
  videoPage++;
  displayVideos();
});

document.getElementById("loadMoreBlogs").addEventListener("click", () => {
  blogPage++;
  displayBlogs();
});

// Search functionality
document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("searchInput").value.toLowerCase();
  const results = {
    videos: allVideos.filter((v) => v.title.toLowerCase().includes(query)),
    blogs: allBlogs.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.description.toLowerCase().includes(query)
    ),
  };

  const resultsGrid = document.getElementById("resultsGrid");
  resultsGrid.innerHTML = ""; // Clear previous results

  if (results.videos.length > 0 || results.blogs.length > 0) {
    document.getElementById("searchResults").style.display = "block";

    results.videos.forEach((video) => {
      const videoCard = document.createElement("div");
      videoCard.className = "col-md-6 mb-4";
      videoCard.innerHTML = `
                <div class="card shadow-sm">
                    <iframe src="${video.url}" frameborder="0" allowfullscreen class="card-img-top"></iframe>
                    <div class="card-body">
                        <h5 class="card-title">${video.title}</h5>
                        <a href="video.html?id=${video.id}" class="btn btn-primary">Read Script</a>
                    </div>
                </div>
            `;
      resultsGrid.appendChild(videoCard);
    });

    results.blogs.forEach((blog) => {
      const blogCard = document.createElement("div");
      blogCard.className = "col-md-6 mb-4";
      blogCard.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${blog.title}</h5>
                        <p class="card-text">${blog.description}</p>
                        <a href="blog.html?id=${blog.id}" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            `;
      resultsGrid.appendChild(blogCard);
    });
  } else {
    document.getElementById("searchResults").style.display = "block";
    resultsGrid.innerHTML =
      '<p class="text-center text-muted">Axtarışa uyğun heç nə tapılmadı.</p>';
  }
});
