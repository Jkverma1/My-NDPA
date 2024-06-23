import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const COLOR_PRIMARY = '#F08080';
const FONT_FAMILY_MEDIUM = 'OpenSans-Medium';

const PercentFriendshipSection = () => {
  const route = useRoute();
  const { param } = route.params;
  const navigation = useNavigation();
  const [calculatedPercentage, setCalculatedPercentage] = useState(0);

  const quizData = [
    {
      step: "Step 3. Review",
      questions: [
        {
          id: 1,
          text: "Hey, I wanted to ask you about your friend. What's his/her name?",
          answer: [`My best friend is ${param.param.name}.`],
          correctAnswer: [`My best friend is ${param.param.name}.`],
        },
        {
          id: 2,
          text: "Cool. What does Alex look like? Describe his hair.",
          answer: [`He has ${param.param.hair} hair.`],
          correctAnswer: [`He has ${param.param.hair} hair.`],
        },
        {
          id: 3,
          text: "How about Alex eyes?",
          answer: [`He has ${param.param.eye} eyes.`],
          correctAnswer: [`He has ${param.param.eye} eyes.`],
        },
        {
          id: 4,
          text: "What qualities does Alex have?",
          answer: [`Alex is ${param.friendLike.slice(0, param.friendLike.length - 1).join(', ')} and ${param.friendLike[param.friendLike.length - 1]}.`],
          correctAnswer: [`Alex is ${param.friendLike.slice(0, param.friendLike.length - 1).join(', ')} and ${param.friendLike[param.friendLike.length - 1]}.`],
        },
        {
          id: 5,
          text: "Is there anything you don't like about Alex?",
          answer: [`Alex is ${param.friendDislike.slice(0, param.friendDislike.length - 1).join(', ')} and ${param.friendDislike[param.friendDislike.length - 1]}.`],
          correctAnswer: [`Alex is ${param.friendDislike.slice(0, param.friendDislike.length - 1).join(', ')} and ${param.friendDislike[param.friendDislike.length - 1]}.`],
        },
        {
          id: 6,
          text: "What do you look for in a friend?",
          answer: [`I value ${param.look.slice(0, param.look.length - 1).join(', ')} and ${param.look[param.look.length - 1]} in a friend.`],
          correctAnswer: [`I value ${param.look.slice(0, param.look.length - 1).join(', ')} and ${param.look[param.look.length - 1]} in a friend.`],
        }
      ]
    },
  ];

  const calculateCorrectPercentage = () => {
    let totalCorrectAnswers = 0;
    let totalPossibleCorrectAnswers = 0;
    let totalAnsweredQuestions = 0;

    quizData.forEach(step => {
      step.questions.forEach(question => {
        totalAnsweredQuestions++;
        const correctAnswers = question.correctAnswer;
        const selectedAnswers = question.answer;

        const correctSelectedAnswers = selectedAnswers.filter(answer => correctAnswers.includes(answer));
        totalCorrectAnswers += correctSelectedAnswers.length;
        totalPossibleCorrectAnswers += correctAnswers.length;
      });
    });

    if (totalAnsweredQuestions > 0) {
      setCalculatedPercentage((totalCorrectAnswers / totalPossibleCorrectAnswers) * 100);
    }
  };

  useEffect(() => {
    calculateCorrectPercentage();
  }, []);

  const checkAnswer = (answer, correctAnswers) => {
    return correctAnswers.includes(answer);
  };

  const renderSuggestedAnswers = (selectedAnswers, correctAnswers) => {
    const suggestedAnswers = correctAnswers.filter(answer => !selectedAnswers.includes(answer));
    return (
      <View>
        {suggestedAnswers > 0 && <View>
          <Text style={styles.suggestedText}>
            <Text style={{color: COLOR_PRIMARY}}>
              Suggested answers:{" "}
            </Text>
            {suggestedAnswers.join(', ')}
          </Text>
        </View>
        }
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, styles.titleMargin]}>Withdrawal</Text>
        <View style={styles.circularProgressContainer}>
          <CircularProgress
            value={calculatedPercentage}
            radius={screenWidth / 5}
            inActiveStrokeColor={COLOR_PRIMARY}
            activeStrokeColor={COLOR_PRIMARY}
            inActiveStrokeOpacity={0.2}
            progressValueColor={'black'}
            valueSuffix={'%'}
          />
          <Text style={[styles.title, styles.greatJobText]}>Great Job!</Text>
          <Text style={[styles.text, styles.centerText]}>
            {`You've answered correctly on ${quizData.length} question${quizData.length > 1 ? 's' : ''}. Keep learning!`}
          </Text>
        </View>
        <View style={styles.quizContainer}>
          <View style={styles.underline} />
          {quizData.map((step, stepIndex) => (
            <View key={stepIndex}>
              <Text style={styles.subTitle}>{step.step}</Text>
              {step.questions.map((question) => (
                <View key={question.id}>
                  <Text style={[styles.text, styles.quizText]}>{question.text}</Text>
                  {question.answer.map((answer, answerIndex) => (
                    <Text
                      key={answerIndex}
                      style={
                        checkAnswer(answer, question.correctAnswer)
                          ? styles.correctText
                          : styles.incorrectText
                      }
                    >
                      {checkAnswer(answer, question.correctAnswer) ? "✓ " : "✕ "}
                      {answer}
                    </Text>
                  ))}
                  {renderSuggestedAnswers(question.answer, question.correctAnswer)}
                  <View style={styles.underline} />
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={() => navigation.navigate('MainPage')}
          >
            <Text style={styles.b1Text}>Finish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.retryButton]}
            onPress={() => navigation.navigate('StartWithdrawalSection')}
          >
            <Text style={styles.b2Text}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF8',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  title: {
    color: 'black',
    fontFamily: FONT_FAMILY_MEDIUM,
    textAlign: 'center',
  },
  titleMargin: {
    marginTop: 50,
    fontSize: 22,
    fontWeight: '600',
  },
  circularProgressContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  greatJobText: {
    fontWeight: '700',
    fontSize: 28,
    marginTop: 25,
  },
  centerText: {
    textAlign: 'center',
  },
  quizContainer: {
    width: (screenWidth * 9) / 10,
    marginTop: 15,
  },
  underline: {
    height: 1.5,
    backgroundColor: '#D3D3D3',
    width: '100%',
    marginTop: 1,
  },
  subTitle: {
    color: 'black',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 19,
    fontWeight: '700',
    marginTop: 10,
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    marginTop: 5,
  },
  quizText: {
    marginVertical: 14,
    marginTop: 20,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'OpenSans',
  },
  suggestedText: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'OpenSans',
    marginVertical: 10,
  },
  correctText: {
    marginVertical: 6,
    color: '#23B80C',
  },
  incorrectText: {
    color: '#FF5050',
  },
  correctAnswerText: {
    color: COLOR_PRIMARY,
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: 'center',
    marginBottom: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (screenWidth * 8) / 10,
    height: 57,
    borderRadius: 45,
    marginVertical: 5,
  },
  submitButton: {
    backgroundColor: COLOR_PRIMARY,
  },
  retryButton: {
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  b1Text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b2Text: {
    color: COLOR_PRIMARY,
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
});

export default PercentFriendshipSection;
