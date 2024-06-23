import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {ScrollView} from 'react-native-gesture-handler';
import {retrieveUserProgress} from '../../utils/saveUserProgress';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const steps = ['Reading', 'Speaking', 'Review'];

const ResultPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const rlts = await Promise.all(
        steps.map(step => retrieveUserProgress('Personal_Identity', step)),
      );
      setResults(rlts);
    };

    fetchResults();
  }, []);

  useEffect(() => {
    const {allQuestions, correctAnswers} = getNumberOfQuestions(results);
    setNumberOfQuestions(allQuestions);
    setNumberOfCorrectAnswers(correctAnswers);
  }, [results]);

  const getNumberOfQuestions = results => {
    let allQuestions = 0;
    let correctAnswers = 0;
    results.forEach(result => {
      result.forEach(conver => {
        allQuestions += 1;
        if (conver.isCorrect) {
          correctAnswers += 1;
        }
      });
    });
    return {allQuestions, correctAnswers};
  };

  const removeNewlines = inputString => {
    let cleanedString = inputString.replace(/\n/g, '');
    cleanedString = cleanedString.replace(/\.([^\s])/g, '. $1');

    return cleanedString;
  };

  const RenderStepResult = props => {
    return (
      <View style={{marginTop: props.index !== 0 ? 25 : 0}}>
        {props.index === 0 ? <View style={styles.underline} /> : null}

        <Text style={[styles.sub_title]}>{`Step ${props.index + 1}. ${
          steps[props.index]
        }`}</Text>
        {props.result.map((quiz, id) => (
          <View key={id}>
            <Text style={[styles.text, {marginTop: 10}]}>
              {id + 1 + '. ' + removeNewlines(quiz.question)}
            </Text>
            <Text
              style={[
                quiz.isCorrect ? styles.welcomeText : styles.incorrectText,
                {marginTop: 10},
              ]}
            >
              {quiz.isCorrect ? '✓ ' + quiz.answer : '✕ ' + quiz.answer}
            </Text>
            <View style={[styles.underline, {marginTop: 10}]} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text
          style={[
            styles.title,
            {marginTop: 50, fontSize: 22, fontFamily: 'OpenSans-SemiBold'},
          ]}
        >
          Personal Identity
        </Text>
        <View
          style={{marginTop: 30, alignContent: 'center', alignItems: 'center'}}
        >
          <CircularProgress
            value={(100 * numberOfCorrectAnswers) / numberOfQuestions}
            radius={screenWidth / 5}
            inActiveStrokeColor={'#F08080'}
            activeStrokeColor={'#F08080'}
            inActiveStrokeOpacity={0.2}
            progressValueColor={'black'}
            valueSuffix={'%'}
          />
          <Text
            style={[
              styles.title,
              {fontFamily: 'OpenSans-Bold', fontSize: 28, marginTop: 25},
            ]}
          >
            Great Job!
          </Text>
          <Text style={[styles.text, {textAlign: 'center'}]}>
            {`You've answered correctly on\n${numberOfCorrectAnswers}/${numberOfQuestions} questions. Keep learning!`}
          </Text>
        </View>
        <View style={{width: (screenWidth * 9) / 10, marginTop: 15}}>
          {results.map((result, index) => (
            <RenderStepResult result={result} index={index} key={index} />
          ))}
        </View>
        <View
          style={{
            marginTop: 40,
            alignContent: 'center',
            alignItems: 'center',
            gap: 10,
            marginBottom: 50,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: (screenWidth * 9) / 10,
              height: 57,
              borderRadius: 45,
              backgroundColor: '#F08080',
            }}
            onPress={() => navigation.navigate('MainPage')}
          >
            <Text style={styles.b1_text}>Finish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: (screenWidth * 9) / 10,
              height: 57,
              borderColor: '#F08080',
              borderWidth: 1,
              borderRadius: 45,
              backgroundColor: 'white',
            }}
            onPress={() => navigation.navigate('StartPersonalSection')}
          >
            <Text style={styles.b2_text}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResultPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    width: screenWidth,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    height: 40,
    width: (screenWidth * 9) / 10,
    marginTop: -40,
    padding: 1,
    paddingLeft: 30,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
  },
  title: {
    color: 'black',
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
  },
  sub_title: {
    color: 'black',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    marginTop: 10,
  },
  underline: {
    height: 1,
    backgroundColor: '#0000001A',
    width: '100%',
    marginTop: 1,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Light',
    marginTop: 5,
  },
  welcomeText: {
    color: '#23B80C',
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  incorrectText: {
    color: '#FF5050',
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  correctText: {
    color: '#F08080',
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
  },
  step: {
    marginBottom: 40,
  },
  b1_text: {
    fontSize: 21,
    fontFamily: 'OpenSans-SemiBold',
    color: 'white',
  },
  b2_text: {
    fontSize: 21,
    fontFamily: 'OpenSans-SemiBold',
    color: '#F08080',
  },
});
