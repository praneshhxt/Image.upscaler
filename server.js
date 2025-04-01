const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize Express App
const app = express();
const PORT = 3000;

// Serve Static Files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer for File Uploads
const upload = multer({ dest: 'uploads/' });

// Mock AI Upscaling Function (Replace with actual AI logic)
function upscaleImage(filePath, scaleLevel) {
  return new Promise((resolve, reject) => {
    // Simulate AI processing delay
    setTimeout(() => {
      const upscaledPath = `${filePath}_upscaled`; // Simulate upscaled file
      fs.copyFileSync(filePath, upscaledPath); // Copy file for demonstration
      resolve(upscaledPath);
    }, 2000); // Simulated 2-second delay for AI processing
  });
}

// Upscale API Endpoint
app.post('/upscale', upload.single('image'), async (req, res) => {
  try {
    const scaleLevel = req.body.scaleLevel;
    const filePath = req.file.path;

    // Call AI model for upscaling (mock function)
    const upscaledImagePath = await upscaleImage(filePath, scaleLevel);

    // Send the upscaled image as a response
    res.sendFile(upscaledImagePath, { root: __dirname }, () => {
      // Clean up temporary files
      fs.unlinkSync(filePath);
      fs.unlinkSync(upscaledImagePath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing image.');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
