// API Key
const apiKey = "6oigPYpQr5diaWLyCXWO3HJmHEnfCuSRBnZMGSBH";

// Elements
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');
const button = document.querySelector('button');
const gallery = document.getElementById('gallery');

// Event Listener for Button
button.addEventListener('click', fetchImages);

// Function to fetch images from NASA APOD API
async function fetchImages() {
  const startDate = startInput.value;
  const endDate = endInput.value;

  // If dates are missing, don't do anything
  if (!startDate || !endDate) {
    alert("Please select both a start and end date.");
    return;
  }

  // Build API URL
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Clear previous gallery content
    gallery.innerHTML = '';

    // If data is an array, create cards for each item
    if (Array.isArray(data)) {
      data.forEach(item => {
        const card = createImageCard(item);
        gallery.appendChild(card);
      });
    } else {
      // If only one object returned
      const card = createImageCard(data);
      gallery.appendChild(card);
    }

  } catch (error) {
    console.error('Error fetching images:', error);
    gallery.innerHTML = '<p>Failed to load images. Please try again later.</p>';
  }
}

// Function to create an image card
function createImageCard(item) {
  const card = document.createElement('div');
  card.classList.add('image-card');

  // Check if media is image
  if (item.media_type === 'image') {
    card.innerHTML = `
      <img src="${item.url}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.date}</p>
    `;
  } else {
    card.innerHTML = `
      <div class="non-image">
        <p>🚀 ${item.title} (Non-image content)</p>
      </div>
    `;
  }

  return card;
}