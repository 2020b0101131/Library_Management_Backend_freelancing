const { createQuestion, getQuestionsBySubject, deleteQuestion } = require('../models/questionModel');

// Add a new question
const createQuestionHandler = async (req, res) => {
  try {
    const { question_text, subject_id } = req.body;
    const interviewer_id = req.user.id; // Assuming interviewer_id is from auth middleware
    const question = await createQuestion(question_text, subject_id, interviewer_id);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add question', error: error.message });
  }
};

// Get questions by subject
const getQuestionsBySubjectHandler = async (req, res) => {
  try {
    const interviewer_id = req.user.id;
    const { subject_id } = req.params;
    const questions = await getQuestionsBySubject(subject_id,interviewer_id);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get questions', error: error.message });
  }
};

// Delete a question
const deleteQuestionHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const interviewer_id = req.user.id; // Assuming interviewer_id is from auth middleware
    const success = await deleteQuestion(id, interviewer_id);
    if (success) {
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ message: 'Question not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete question', error: error.message });
  }
};

module.exports = { createQuestionHandler, getQuestionsBySubjectHandler, deleteQuestionHandler };
