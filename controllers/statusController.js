const { getAllStatuses } = require('../models/statusModel');

// Get all statuses
const getAllStatusesHandler = async (req, res) => {
  try {
    const statuses = await getAllStatuses();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get statuses', error: error.message });
  }
};

module.exports = { getAllStatusesHandler };
