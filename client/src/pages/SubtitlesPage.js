import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilterField from '../components/FilterField';
import {
  Box,
  CircularProgress,
  TextareaAutosize,
  Typography,
} from '@material-ui/core';
import { AiFillCloseCircle, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import AlertDialog from '../components/AlertDialog';
import Exam from '../components/Exam';
import { useAppContext } from '../context/App/appContext';
import { jsPDF } from 'jspdf';
import Review from '../components/Review';
import RatingForm from '../components/RatingForm';
import { useCourseContext } from '../context/Course/courseContext';
import LinearProgressBar from '../components/LinearProgressBar';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: '95vh',
    padding: '2rem 1rem',
    marginTop: '2rem',
    marginBottom: '40rem',
  },
  subtitles: {
    width: '30%',
    border: '1px solid #e0e0e0',
    borderRadius: '0.5rem',
    padding: '1rem',
    marginRight: '1rem',
  },
  courseContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '3rem',
    padding: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  hr: {
    width: '100%',
    height: '1px',
    border: 'none',
    backgroundColor: '#e0e0e0',
  },
  lectureTitle: {
    fontWeight: '100',
    fontSize: '1rem',
  },
  showMore: {
    width: '100%',
    height: '3rem',
    border: 'none',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
  },

  rightSection: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '0.5rem',
  },

  video: {
    width: '100%',
    height: '30rem',
    border: '1px solid #e0e0e0',
    borderRadius: '0.5rem',
    backgroundColor: 'black',
  },

  exam: {
    width: '100%',
    height: '30rem',
    border: '1px solid #e0e0e0',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  videoInfoHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '3rem',
    padding: '0.5rem',
    border: 'none',
  },

  button: {
    border: 'none',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#666f73',
    cursor: 'pointer',
    '&:hover': {
      color: 'black',
    },
    marginRight: '1rem',
  },
  line: {
    width: '100%',
    height: '1px',
    border: 'none',
    backgroundColor: '#e0e0e0',
  },
  videoInfoBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '0.5rem',
    border: 'none',
  },
  overview: {
    width: '100%',
    marginTop: '1rem',
  },
  showMoreDescription: {
    color: '#0294d4',
    cursor: 'pointer',
    '&:hover': {
      color: '#006db3',
    },
  },
  addNote: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '3rem',
    backgroundColor: '#f5f5f5',
    padding: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    color: '#666f73',
    fontWeight: '600',
  },
  writeNote: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '0.5rem',
    border: 'none',
  },
  textarea: {
    width: '100%',
    height: '10rem',
    padding: '0.5rem',
    border: '1px solid #e0e0e0',
    borderRadius: '0.5rem',
    resize: 'none',
    outline: 'none',
    '&:focus': {
      border: '1px solid #0294d4',
    },
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginTop: '1rem',
  },

  save: {
    width: '100%',
    height: '3rem',
    border: 'none',
    backgroundColor: '#0294d4',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#006db3',
    },
  },
  downloadNotes: {
    width: '6rem',
    height: '3rem',
    border: 'none',
    backgroundColor: '#666f73',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#4d5559',
    },
    marginTop: '1rem',
  },

  cancel: {
    width: '100%',
    height: '3rem',
    border: 'none',
    backgroundColor: '#f5f5f5',
    color: '#666f73',
    fontWeight: '600',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    marginLeft: '1rem',
  },

  notes: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  note: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },

  noteHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    padding: '0.5rem',
    border: 'none',
  },

  editIcons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    border: 'none',
  },

  noteTitle: {
    fontWeight: '600',
    fontSize: '1.5rem',
  },

  noteContent: {
    marginTop: '1rem',
    width: '100%',
    border: '1px solid #e0e0e0',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    resize: 'none',
    outline: 'none',
    '&:focus': {
      border: '1px solid #0294d4',
    },
  },

  noteIcons: {
    height: '100%',

    marginLeft: '1rem',
    '&:hover': {
      transform: 'scale(2)',
      transition: 'transform 0.3s ease-in-out',
    },
  },

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100vw',
    height: '100vh',
    zIndex: 1000,
    color: 'white',
  },
}));

const SubtitlesPage = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState(true);
  const [subtitles, setSubtitles] = useState([]);
  const [exams, setExams] = useState([]);
  const [exam, setExam] = useState(null);
  const [state, setState] = useState({
    checkedSubtitles: [],
    checkedExams: [],
  });
  const [showMore, setShowMore] = useState(false);
  const [videoInfo, setVideoInfo] = useState(0);
  const [writeNote, setWriteNote] = useState(false);
  const [dialog, setDialog] = useState(-1);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const noteContent = useRef();
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, token } = useAppContext();
  const { courses, updateCourse } = useCourseContext();
  const [notes, setNotes] = useState([]);
  const [reviews, setReviews] = useState([]);

  const downloadNotes = () => {
    const doc = new jsPDF();
    doc.text('Notes', 100, 10);
    let height = 0;
    notes.forEach((note, index) => {
      doc.text(`note ${index + 1}: `, 10, 20 + height);
      for (let line = 0; line <= note.description.length; line += 68) {
        doc.text(`${note.description.slice(line, line + 68)}`, 30, 20 + height);
        height += 10;
      }
    });
    doc.save('notes.pdf');
  };

  // const addItemToLocalStorage = (item, type) => {
  //   if (!localStorage.getItem(`${type}${courseId}`))
  //     localStorage.setItem(`${type}${courseId}`, JSON.stringify([]));
  //   let items = JSON.parse(localStorage.getItem(`${type}${courseId}`));
  //   items.push(item);
  //   localStorage.setItem(`${type}${courseId}`, JSON.stringify(items));
  // };

  // const removeItemFromLocalStorage = (item, type) => {
  //   let items = JSON.parse(localStorage.getItem(`${type}${courseId}`));
  //   let filteredItems = items.filter((i) => i !== item);
  //   localStorage.setItem(`${type}${courseId}`, JSON.stringify(filteredItems));
  // };

  // const getItemFromLocalStorage = (type) => {
  //   if (!localStorage.getItem(`${type}${courseId}`))
  //     localStorage.setItem(`${type}${courseId}`, JSON.stringify([]));
  //   return JSON.parse(localStorage.getItem(`${type}${courseId}`));
  // };

  useEffect(() => {
    console.log('courseId ' + courseId);
    async function fetchSubtitles() {
      const response = await axios.get(
        `http://localhost:8080/api/v1/course/${courseId}/subtitle`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubtitles(response.data.subTitles);
    }

    async function fetchExams() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/exam?courseId=${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExams(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function getProgress() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/progress/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setState({
          checkedSubtitles: response.data.completedSubtitles,
          checkedExams: response.data.completedExams,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSubtitles();
    fetchExams();
    getProgress();
  }, [courseId, token]);

  useEffect(() => {
    const getExam = async (examId) => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/exam/' + examId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExam(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    async function fetchNotes(subtitleId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/note?subtitleId=${subtitleId}&userId=${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotes(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchReviews() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/course/${courseId}?reviews=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(response.data.course.reviews);
      } catch (error) {
        console.log(error);
      }
    }

    if (searchParams.has('examId')) {
      getExam(searchParams.get('examId'));
    }

    if (searchParams.has('subtitleId')) {
      fetchNotes(searchParams.get('subtitleId'));
    }

    if (videoInfo === 2) {
      console.log('fetch reviews');
      fetchReviews();
    }
  }, [searchParams, user._id, token, videoInfo, courseId]);

  const computeProgress = () => {
    if (!state.checkedSubtitles && !state.checkedExams) return 0;

    return Math.round(
      ((state.checkedSubtitles?.length + state.checkedExams?.length) /
        (subtitles.length + exams.length)) *
        100
    );
  };

  const updateProgress = async (checkedSubtitles, checkedExams) => {
    console.log('checkedSubtitles: ' + checkedSubtitles.length);
    console.log('checkedExams ' + checkedExams.length);
    console.log('subtitles ' + subtitles.length);
    console.log('exams ' + exams.length);
    console.log('-----------------------------------------------------');
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/user/progress/${courseId}`,
        {
          completedSubtitles: checkedSubtitles,
          completedExams: checkedExams,
          progress: computeProgress(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChecked = async (subtitle, title, checked) => {
    setState((prevState) => {
      if (checked) {
        prevState.checkedSubtitles.push(subtitle);
      } else {
        prevState.checkedSubtitles = prevState.checkedSubtitles.filter(
          (item) => item !== subtitle
        );
      }

      return {
        ...prevState,
      };
    });

    await updateProgress(state.checkedSubtitles, state.checkedExams);
  };

  const handleCheckedExam = async (exam, title, checked) => {
    setState((prevState) => {
      if (checked) {
        prevState.checkedExams.push(exam);
      } else {
        prevState.checkedExams = prevState.checkedExams.filter(
          (item) => item !== exam
        );
      }

      return {
        ...prevState,
      };
    });

    await updateProgress(state.checkedSubtitles, state.checkedExams);
  };

  const addNote = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/note', {
        subtitleId: searchParams.get('subtitleId'),
        userId: user._id,
        description: noteContent.current.value,
      });
      setNotes([...notes, response.data.response]);
      setWriteNote(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (noteId) => {
    console.log('noteId ' + noteId);
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/note/${noteId}?userId=${user._id}`,
        {
          userId: user._id,
        }
      );
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.log(error);
    }
  };

  const postReview = async (rating, review) => {
    setLoading(true);
    const course = courses.find((item) => item._id === courseId);
    updateCourse(courseId, {
      ...course,
      reviews: [
        ...course.reviews,
        {
          username: user.username,
          review: review,
          rate: rating,
        },
      ],
    });
    setReviews([
      ...reviews,
      {
        username: user.username,
        review,
        rate: rating,
      },
    ]);
    setLoading(false);
  };

  return (
    <main className={`${classes.main}`}>
      {loading && <CircularProgress className={classes.loading} />}
      <section className={`${classes.subtitles}`}>
        <LinearProgressBar value={computeProgress()} />
        <Box
          className={`${classes.courseContent}`}
          onClick={() => setShowList(!showList)}
        >
          <h3>Course Content</h3>
          <AiFillCloseCircle />
        </Box>
        {showList &&
          !loading &&
          subtitles
            .map((subtitle, idx) => (
              <FilterField
                title={`Lecture ${idx + 1}`}
                options={[...Array(subtitle.title)]}
                key={idx}
                onFilter={handleChecked}
                optionOnClick={() => navigate(`?subtitleId=${subtitle._id}`)}
                titleStyle={{
                  fontSize: '1rem',
                  fontWeight: '500',
                }}
                checkedOptions={state.checkedSubtitles?.reduce((acc, item) => {
                  acc[item] = true;
                  return acc;
                }, {})}
              />
            ))
            .slice(0, showMore ? subtitles.length : 2)}
        {!loading &&
          exams.map((exam, idx) => (
            <FilterField
              title={`Exam ${idx + 1}`}
              options={[...Array(`Let's take the exam ${idx + 1}`)]}
              key={idx}
              onFilter={handleCheckedExam}
              optionOnClick={() => navigate(`?examId=${exam._id}`)}
              titleStyle={{
                fontSize: '1rem',
                fontWeight: '500',
              }}
              checkedOptions={state.checkedExams?.reduce((acc, item) => {
                acc[item] = true;
                return acc;
              }, {})}
            />
          ))}
        {subtitles.length > 2 && (
          <button
            className={`${classes.showMore}`}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
      </section>
      <section className={`${classes.rightSection}`}>
        <div
          className={searchParams.get('examId') ? classes.exam : classes.video}
        >
          {exam && searchParams.get('examId') ? (
            <Exam
              questions={exam?.questions}
              title={"Let's take the exam"}
              duration={exam?.duration}
            ></Exam>
          ) : (
            <></>
          )}

          {!exam && (
            <div className={`${classes.video}`}>
              {/* <iframe
                width='911'
                height='480'
                src='https://www.youtube.com/embed/1v_TEnpqHXE'
                title='YouTube video player'
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></iframe> */}
            </div>
          )}
        </div>
        <div className={`${classes.videoInfo}`}>
          <div className={`${classes.line}`}></div>
          <div className={`${classes.videoInfoHeader}`}>
            <button
              className={`${classes.button}`}
              onClick={() => setVideoInfo(0)}
              style={{ color: videoInfo === 0 ? 'black' : '#666f73' }}
            >
              Overview
            </button>
            <button
              className={`${classes.button}`}
              onClick={() => setVideoInfo(1)}
              style={{ color: videoInfo === 1 ? 'black' : '#666f73' }}
            >
              Notes
            </button>
            <button
              className={`${classes.button}`}
              onClick={() => setVideoInfo(2)}
              style={{ color: videoInfo === 2 ? 'black' : '#666f73' }}
            >
              Reviews
            </button>
          </div>
          <div className={`${classes.line}`}></div>

          <div className={`${classes.videoInfoBody}`}>
            {videoInfo === 0 && (
              <Box className={`${classes.overview}`}>
                <Typography variant='h6' gutterBottom>
                  Course Description
                </Typography>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  saepe porro laborum quas perspiciatis eos minus, numquam
                  maiores, optio temporibus enim quis id aliquid accusamus
                  eligendi vel, libero ea quidem.
                  <span
                    className={`${classes.showMoreDescription}`}
                    onClick={() => setShowMoreDescription(!showMoreDescription)}
                  >
                    {showMoreDescription ? 'Show Less' : 'Show More'}
                  </span>
                </p>
              </Box>
            )}
            {(videoInfo === 1 && writeNote && (
              <div className={`${classes.writeNote}`}>
                <TextareaAutosize
                  ref={noteContent}
                  minRows={3}
                  aria-label='maximum height'
                  placeholder='Write your note here'
                  className={`${classes.textarea}`}
                />
                <div className={`${classes.buttons}`}>
                  <button
                    className={`${classes.cancel}`}
                    onClick={() => setWriteNote(false)}
                  >
                    Cancel
                  </button>
                  <button className={`${classes.save}`} onClick={addNote}>
                    save
                  </button>
                </div>
              </div>
            )) ||
              (videoInfo === 1 && !writeNote && (
                <button
                  onClick={() => setWriteNote(true)}
                  className={`${classes.addNote}`}
                >
                  Create a note for this lecture
                  <span>
                    <AiOutlinePlusCircle />
                  </span>
                </button>
              ))}
            <div className={`${classes.hr}`}></div>

            {videoInfo === 1 && (
              <div className={`${classes.notes}`}>
                {notes.map((note, idx) => (
                  <div key={note.id} style={{ width: '100%' }}>
                    <Box className={`${classes.note}`}>
                      <div className={`${classes.noteHeader}`}>
                        <Typography
                          variant='h6'
                          gutterBottom
                          className={`${classes.noteTitle}`}
                        >
                          Note {idx + 1}
                        </Typography>
                        <div className={`${classes.editIcons}`}>
                          <AiFillEdit className={`${classes.noteIcons}`} />
                          <AiFillDelete
                            className={`${classes.noteIcons}`}
                            onClick={() => {
                              setDialog(note.id);
                            }}
                          />
                        </div>
                      </div>
                      <div className={`${classes.noteContent}`}>
                        <p>{note?.description}</p>
                      </div>
                    </Box>
                    <div className={`${classes.hr}`}></div>
                  </div>
                ))}
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  {notes.length !== 0 && (
                    <button
                      onClick={() => downloadNotes()}
                      className={`${classes.downloadNotes}`}
                    >
                      Download notes
                    </button>
                  )}
                </div>
              </div>
            )}
            <AlertDialog
              title={'Delete Note'}
              content={'Are you sure you want to delete this note ?'}
              open={dialog !== -1}
              handleAgree={() => {
                deleteNote(dialog);
                setDialog(-1);
                console.log('agree');
              }}
              handleDisagree={() => {
                setDialog(-1);
                console.log('disagree');
              }}
            />
            {videoInfo === 2 && (
              <>
                <div
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '1rem',
                  }}
                >
                  {reviews
                    ?.map((review, idx) => (
                      <div
                        key={idx}
                        style={{
                          marginBottom: '1rem',
                        }}
                      >
                        <Review
                          username={review?.username}
                          reviewText={review?.review}
                          rate={review?.rate}
                        />
                      </div>
                    ))
                    .slice(0, 3)}
                </div>
                <div>
                  <RatingForm
                    buttonText={'Rate this course'}
                    title={'Course'}
                    textArea={'Tell us, what do you think about this course ?'}
                    buttonStyle={{
                      height: '3rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'rgb(74, 73, 73)',
                      color: 'white',
                      border: 'none',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'black',
                      },
                    }}
                    onSubmit={postReview}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubtitlesPage;
