// Select DOM elements
const form = document.querySelector('#prompt-form');
const promptInput = document.querySelector('#prompt-input');
const output = document.querySelector('#output');

// Define your backend endpoint (update if needed)
const BACKEND_URL = 'http://localhost:5000/api/generate';

// Form submission handler
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form from refreshing the page
  const userPrompt = promptInput.value;

  // Display loading message
  output.textContent = 'Generating...';

  try {
    // Send prompt to the backend
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: { messages: [{ content: userPrompt }] } }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    // Parse the response data
    const data = await response.json();

    // Display the output
    if (data && data.candidates && data.candidates[0]) {
      output.textContent = data.candidates[0].content;
    } else {
      output.textContent = 'No meaningful response from the API.';
    }
  } catch (error) {
    // Handle errors
    output.textContent = `Error: ${error.message}`;
  }
});
