const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS and images
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route for login page
app.get('/', (req, res) => {
  res.render('login'); // Render login.ejs
});

// Handle form submission
app.post('/submit', (req, res) => {
  // Get form data
  const { email, password } = req.body;
  
  // Render response.ejs and pass the entered data
  res.render('response', { email, password });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
