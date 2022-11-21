import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import Question from './Question';

const exam = {
  duration: 60,
  title: 'Exam 1',
  questions: [
    {
      title: 'What is the capital of France?',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1200px-Flag_of_France.svg.png',
      choices: ['Paris', 'London', 'Berlin', 'Rome'],
      answer: 0,
    },
    {
      title: 'What is the capital of Germany?',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png',
      choices: ['Paris', 'London', 'Berlin', 'Rome'],
      answer: 2,
    },
    {
      title: 'What is the capital of Italy?',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png',
      choices: ['Paris', 'London', 'Berlin', 'Rome'],
      answer: 3,
    },
    {
      title: 'What is the capital of Spain?',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png',
      choices: ['Paris', 'London', 'Berlin', 'Rome'],
      answer: 0,
    },
    {
      title: 'What is the capital of England?',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Flag_of_England.svg/1200px-Flag_of_England.svg.png',
      choices: ['Paris', 'London', 'Berlin', 'Rome'],
      answer: 1,
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  exam: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40rem',
    padding: '1rem',
  },
  mainFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '1rem',
  },
  checkAnswerBtn: {
    backgroundColor: '#3f51b5',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  nextBtn: {
    backgroundColor: '#3f51b5',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
}));

const initialState = {
  currentQuestion: 0,
  answer: null,
  numberOfCorrectAnswers: 0,
};

function Exam() {
  const classes = useStyles();
  const [start, setStart] = useState(false);
  const [questionState, setQuestionState] = useState(initialState);
  const [alert, setAlert] = useState(null);

  const updateAnswer = (answerText) => {
    const answerNumber =
      exam.questions[questionState.currentQuestion].choices.indexOf(answerText);
    console.log(answerNumber);
    setQuestionState({ ...questionState, answer: answerNumber });
  };

  const handleNextQuestion = () => {
    const currentQuestion = exam.questions[questionState.currentQuestion];

    setQuestionState({
      ...questionState,
      currentQuestion: questionState.currentQuestion + 1,
      numberOfCorrectAnswers:
        questionState.answer === currentQuestion.answer
          ? questionState.numberOfCorrectAnswers + 1
          : questionState.numberOfCorrectAnswers,
    });
  };

  const handleCheckAnswer = () => {
    const currentQuestion = exam.questions[questionState.currentQuestion];
    console.log(currentQuestion.answer);
    if (questionState.answer !== currentQuestion.answer) {
      setAlert({
        title: 'Incorrect answer. Please try again.',
        text: `The correct answer is ${
          currentQuestion.choices[currentQuestion.answer]
        }`,
        type: 'error',
      });
    } else {
      setAlert({
        title: 'Good job!',
        text: `This is the correct answer`,
        type: 'success',
      });
    }
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <div className={classes.exam}>
      <header>
        <h1>Short Exam: {exam.title}</h1>
        <p
          style={{
            color: 'gray',
            fontSize: '0.8rem',
            textAlign: 'center',
          }}
        >
          {exam.title} | {exam.questions.length} questions | {exam.duration}
          minutes
        </p>
      </header>
      {alert && (
        <Alert severity={alert.type}>
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.text}
        </Alert>
      )}
      <main>
        {start && questionState.currentQuestion !== exam.questions.length && (
          <>
            <div>
              <Question
                title={exam.questions[questionState.currentQuestion].title}
                imageURL={
                  exam.questions[questionState.currentQuestion].imageURL
                }
                choices={exam.questions[questionState.currentQuestion].choices}
                number={questionState.currentQuestion + 1}
                onSolved={updateAnswer}
              />
            </div>
            <div className={`${classes.mainFooter}`}>
              <button
                onClick={handleCheckAnswer}
                className={`${classes.checkAnswerBtn}`}
              >
                Check answer
              </button>
              <button
                onClick={handleNextQuestion}
                className={`${classes.nextBtn}`}
              >
                {questionState.currentQuestion === exam.questions.length - 1
                  ? 'See the results'
                  : 'Next'}
              </button>
            </div>
          </>
        )}
        {questionState.currentQuestion === exam.questions.length && (
          <>
            {questionState.numberOfCorrectAnswers === exam.questions.length && (
              <div className={`${classes.all}`}>
                <h1>
                  Great job! You are ready to move on to the next lecture.
                </h1>
                {/* happy icon */}
                <img
                  src='https://cdn.pixabay.com/photo/2016/11/29/05/45/adult-1867615_960_720.png'
                  alt='happy'
                />

                <p>
                  You got {questionState.numberOfCorrectAnswers} out of{' '}
                  {questionState.numberOfCorrectAnswers}
                </p>
              </div>
            )}

            {questionState.numberOfCorrectAnswers !== exam.questions.length && (
              <div className={`${classes.notAll}`}>
                {/* sad icon */}
                <h1>
                  You need to review the lecture again. You can do it!{' '}
                  <span role='img' aria-label='emoji'>
                    😊
                  </span>
                </h1>
                <p>
                  You got {questionState.numberOfCorrectAnswers} out of{' '}
                  {exam.questions.length}
                </p>
              </div>
            )}
          </>
        )}
      </main>
      <footer>
        {!start && (
          <button
            onClick={() => {
              setStart(true);
            }}
            className={`${classes.btn}`}
          >
            Start Exam
          </button>
        )}
      </footer>
    </div>
  );
}

export default Exam;
