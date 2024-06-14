import { makeStyles } from '@rneui/base';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '../src/Common_styles';
import { FontFamily } from '../GlobalStyles';
import { verticalScale } from '../src/Dimensions';
import questionsData from '../assets/ques/questions.json'; // Adjust the path as per your file structure

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const TriviaGame = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [wrongStrikes, setWrongStrikes] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [questions, setQuestions] = useState([]);
  
    useEffect(() => {
      setQuestions(shuffleArray(questionsData));
    }, []);
  
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const handleAnswer = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion[currentQuestion.answer]) {
          setScore(score + 1);
        } else {
          setWrongStrikes(wrongStrikes + 1);
          if (wrongStrikes + 1 === 3) {
            setGameOver(true);
            return;
          }
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
      setWrongStrikes(0);
      setGameOver(false);
      setQuestions(shuffleArray(questionsData));
    };
  
    const renderQuestion = () => {
      if (questions.length === 0 || currentQuestionIndex >= questions.length) {
        return null; // or any fallback UI when questions are not loaded yet
      }
    
      const currentQuestion = questions[currentQuestionIndex];
      return (
        <View>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          <Text style={styles.score}>Score: {score * 5}</Text>
          <Text style={styles.score}>Wrong Strikes: {wrongStrikes}/3</Text>
          {Object.values(currentQuestion)
            .filter((value) => typeof value === 'string' && value !== currentQuestion.question && value !== currentQuestion.answer)
            .map((option, index) => (
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
          <Text style={styles.scoreText}>Your Final Score: {score * 5}</Text>
          <Text style={styles.scoreText}>Wrong Strikes: {wrongStrikes}/3</Text>
          <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
            <Text style={styles.playAgainText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      );
    };
  
    const styles = useStyles();
return (
      <View style={styles.container}>
        <Animated.View style={[styles.innerContainer, { opacity: fadeAnim }]}>
          {!gameOver ? renderQuestion() : renderGameOver()}
        </Animated.View>
      </View>
    );
  };
  
  const useStyles = makeStyles((theme) => ({
    container: {
        marginVertical: 20,
      flex: 1,
      width:'90%',
      borderRadius:20,
      padding:20,
      backgroundColor:colors.dg.color,
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      paddingHorizontal: 20,
    },
    question: {
      fontSize: 20,
      marginVertical: verticalScale(10),
      color: colors.w.color,
      fontFamily: FontFamily.sourceSansProSemibold,
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
      fontFamily: FontFamily.sourceSansProSemibold,
      marginVertical: verticalScale(20),
      textAlign: 'center',
      color: colors.dg2.color
    },
    scoreText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
      color: colors.dg2.color
    },
    playAgainButton: {
      backgroundColor: colors.dg2.color,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignItems: 'center',
    },
    playAgainText: {
      color: '#FFF',
      fontSize: 16,
    },
    score: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 10,
      color: colors.w.color,
    },
  }));
  
  export default TriviaGame;