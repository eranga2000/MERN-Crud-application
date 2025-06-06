const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const requestSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default:uuidv4, 
  },
  item: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  link: {
    type: String,
    default: ''
  },
  amount: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'High', 'Urgent','Medium'],
    default: 'Low'
  },
  project: {
    type: String
  },
  date: {
    type: String 
  }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
