import QuizQuestion from "../model/quizModel.js";
import User from "../model/userModel.js"; // ✅ Make sure this import exists

// ✅ Get all quiz questions
export const getAllQuizQuestions = async (req, res) => {
  try {
    const questions = await QuizQuestion.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching quiz questions",
      error: err.message,
    });
  }
};

// ✅ Get a single quiz question by ID
export const getSingleQuizQuestion = async (req, res) => {
  try {
    const question = await QuizQuestion.findById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching question",
      error: err.message,
    });
  }
};

// ✅ Add a new quiz question
export const addQuizQuestion = async (req, res) => {
  try {
    const { question, options, answer, category, points } = req.body;

    // ✅ Validate required fields
    if (!question || !options || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question, options, and answer are required",
      });
    }

    // ✅ Create new question
    const newQuestion = new QuizQuestion({
      question,
      options,
      answer,
      category,
      points: points || 20, // default points
    });

    // ✅ Save to DB
    await newQuestion.save();

    // ✅ Respond with success message and the saved question
    res.status(201).json({
      success: true,
      message: "Quiz question added successfully!",
      data: newQuestion,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error adding question",
      error: err.message,
    });
  }
};


// ✅ Update an existing question
export const updateQuizQuestion = async (req, res) => {
  try {
    const updated = await QuizQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Question not found" });

    res.status(200).json({
      message: "Question updated successfully",
      updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating question",
      error: err.message,
    });
  }
};

// ✅ Delete a question
export const deleteQuizQuestion = async (req, res) => {
  try {
    const deleted = await QuizQuestion.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Question not found" });

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting question",
      error: err.message,
    });
  }
};

// ✅ Add quiz points after user answers


export const addQuizPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    const { questionId, selectedOption } = req.body;

    // Validate input
    if (!questionId || !selectedOption) {
      return res.status(400).json({
        success: false,
        message: "Question ID and selected option are required",
      });
    }

    // Find question
    const question = await QuizQuestion.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Prevent multiple submissions for the same question
    const alreadyAnswered = user.quizAnswers?.some(
      (qa) => qa.questionId.toString() === questionId
    );
    if (alreadyAnswered) {
      return res.status(200).json({
        success: true,
        correct: question.answer === selectedOption,
        message: "You have already answered this question",
        totalPoints: user.points || 0,
      });
    }

    // Check if answer is correct
    const isCorrect = question.answer === selectedOption;

    // Save the answer in user's record
    user.quizAnswers = user.quizAnswers || [];
    user.quizAnswers.push({
      questionId,
      selectedOption,
      isCorrect,
      answeredAt: new Date(),
    });

    let earnedPoints = 0;
    if (isCorrect) {
      earnedPoints = question.points || 20;
      user.points = (user.points || 0) + earnedPoints;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      correct: isCorrect,
      message: isCorrect
        ? `✅ Correct! You've earned ${earnedPoints} points.`
        : `❌ Incorrect answer. Better luck next time!`,
      earnedPoints,
      totalPoints: user.points,
      correctAnswer: !isCorrect ? question.answer : undefined, // optional
      updatedUser: {
        _id: user._id,
        name: user.name,
        email: user.email,
        points: user.points,
      },
    });
  } catch (error) {
    console.error("Error adding quiz points:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding quiz points",
      error: error.message,
    });
  }
};


export const submitAnswer = async (req, res) => {
  try {
    const userId = req.user._id; // from userAuth middleware
    const { questionId, selectedOption } = req.body;

    if (!questionId || !selectedOption) {
      return res.status(400).json({ success: false, message: "Question ID and selected option are required." });
    }

    // Find question
    const question = await QuizQuestion.findById(questionId);
    if (!question) return res.status(404).json({ success: false, message: "Question not found." });

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    // Check if answer is correct
    const isCorrect = question.answer === selectedOption;

    if (!isCorrect) {
      return res.status(200).json({
        success: true,
        correct: false,
        message: "❌ Incorrect answer. Better luck next time!",
        correctAnswer: question.answer,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          points: user.points,
        },
      });
    }

    // Add points for correct answer
    const earnedPoints = question.points || 20;
    user.points = (user.points || 0) + earnedPoints;
    await user.save();

    return res.status(200).json({
      success: true,
      correct: true,
      message: `✅ Correct! You've earned ${earnedPoints} points.`,
      earnedPoints,
      totalPoints: user.points,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        points: user.points,
      },
    });
  } catch (error) {
    console.error("Error submitting answer:", error);
    return res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};


