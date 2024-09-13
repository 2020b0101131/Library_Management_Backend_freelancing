const { getAllSubjects, createSubject } = require('../models/subjectModel');

// Get all subjects
const getAllSubjectsHandler = async (req, res) => {
  try {
    const subjects = await getAllSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get subjects', error: error.message });
  }
};

// Add a new subject
const createSubjectHandler = async (req, res) => {
  try {
    const { subject_name } = req.body;
    const subject = await createSubject(subject_name);
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add subject', error: error.message });
  }
};

module.exports = { getAllSubjectsHandler, createSubjectHandler };
