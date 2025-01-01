const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // To parse form data
const app = express();

// Serve static files like CSS, JS, and images
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // To parse form data

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Temporary in-memory storage for form data
let storedData = {};

// Route for login page
app.get('/', (req, res) => {
  res.render('login'); // Render login.ejs
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { email, password, confirmPassword, name } = req.body; // Get form data
  let errorMessage = '';

  // Server-side validation
  if (!email || !password || !confirmPassword || !name) {
    errorMessage = 'All fields are required.';
  } else if (password !== confirmPassword) {
    errorMessage = 'Passwords do not match.';
  }

  // If there is an error, re-render the login page
  if (errorMessage) {
    return res.render('login', { errorMessage });
  }

  // Store validated data temporarily
  storedData = { email, password, name };

  // Log the submitted data (for debugging)
  console.log("Form Data Received:", { email, password, confirmPassword, name });

  // Redirect to response page
  res.render('response', { email, name });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
