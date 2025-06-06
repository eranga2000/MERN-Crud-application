const express = require('express');
const router = express.Router();
const Request = require('../models/RequestModel');

// Create a new request
router.post('/', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findOne({ id: req.params.id });
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a request by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRequest = await Request.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedRequest) return res.status(404).json({ error: 'Request not found' });
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a request by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRequest = await Request.findOneAndDelete({ id: req.params.id });
    if (!deletedRequest) return res.status(404).json({ error: 'Request not found' });
    res.status(200).json({ message: 'Request deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
