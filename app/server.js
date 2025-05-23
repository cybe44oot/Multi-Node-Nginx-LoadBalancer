const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from current directory (for future use)
app.use(express.static(__dirname));

// Serve index.html on root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});