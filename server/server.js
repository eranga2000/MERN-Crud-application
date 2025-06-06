const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const requestRoutes = require('./Routes/RequestRoutes'); // Adjust the path as necessary
const PORT = 3000;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
const port = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas with Mongoose'))
.catch((err) => console.error('MongoDB connection error:', err));

// // Define a Mongoose schema and model
// const exampleSchema = new mongoose.Schema({
//   // Define fields based on your collection's structure
//   name: String,
//   value: Number
//   // Add other fields as needed
// });

// const Example = mongoose.model('Example', exampleSchema);

// // Define routes
// app.get('/', async (req, res) => {
//   try {
//     const documents = await Example.find({});
//     res.json(documents);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.use('/api/requests', requestRoutes); // Use the request routes