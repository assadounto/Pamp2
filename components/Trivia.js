import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';
import { verticalScale } from '../src/Dimensions';

const TriviaGame = () => {
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'London', 'Paris', 'Madrid'],
      correctAnswer: 'Paris'
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4'
    },
    {
      question: 'What is the color of the sky on a clear day?',
      options: ['Red', 'Green', 'Blue', 'Yellow'],
      correctAnswer: 'Blue'
    },
    {
      question: 'What is the opposite of hot?',
      options: ['Cold', 'Warm', 'Burning', 'Icy'],
      correctAnswer: 'Cold'
    }
    // Add more questions here
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current; // Changed initial opacity to 1

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setWrongAnswers(0);
    setGameOver(false);
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <View>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderGameOver = () => {
    return (
      <View>
        <Text style={styles.gameOverText}>Game Over!</Text>
        <Text style={styles.scoreText}>Your Final Score: {score}</Text>
        <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
          <Text style={styles.playAgainText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
        {!gameOver ? renderQuestion() : renderGameOver()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 20,
    marginVertical: verticalScale(30),
    color: colors.dg.color,
    marginBottom: 20,
    fontFamily:FontFamily.sourceSansProSemibold,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: colors.dg2.color,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
    
    alignItems: 'center',
  },
  optionText: {
    color: '#FFF',
    fontSize: 16,
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  playAgainButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  playAgainText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default TriviaGame;
