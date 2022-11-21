import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilterField from '../components/FilterField';
import { Box, TextareaAutosize, Typography } from '@material-ui/core';
import { AiFillCloseCircle, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useEffect } from 'react';
import axios from 'axios';
import { LinearProgress } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import AlertDialog from '../components/AlertDialog';

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
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2' color='textSecondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const initialState = {
  checkedSubtitles: [],
  numOfCheckedSubtitles: 0,
};

let notes = ['note1', 'note2', 'note3'];

const SubtitlesPage = () => {
  const classes = useStyles();

  const [showList, setShowList] = useState(true);
  const [subtitles, setSubtitles] = useState([]);
  const [state, setState] = useState(initialState);
  const [showMore, setShowMore] = useState(false);
  const [videoInfo, setVideoInfo] = useState(0);
  const [writeNote, setWriteNote] = useState(false);
  const [dialog, setDialog] = useState(-1);
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const noteContent = useRef();
  const { courseId } = useParams();

  const addSubtitleToLocalStorage = (item) => {
    if (!localStorage.getItem('checkedSubtitles'))
      localStorage.setItem('checkedSubtitles', JSON.stringify([]));
    let subtitles = JSON.parse(localStorage.getItem('checkedSubtitles'));
    subtitles.push(item);
    localStorage.setItem('checkedSubtitles', JSON.stringify(subtitles));
  };

  const removeSubtitleFromLocalStorage = (subtitle) => {
    let subtitles = JSON.parse(localStorage.getItem('checkedSubtitles'));
    let filteredSubtitles = subtitles.filter((item) => item !== subtitle);
    localStorage.setItem('checkedSubtitles', JSON.stringify(filteredSubtitles));
  };

  const getCheckedSubtitles = () => {
    return JSON.parse(localStorage.getItem('checkedSubtitles'));
  };

  useEffect(() => {
    async function fetchSubtitles() {
      const response = await axios.get(
        `http://localhost:8080/api/v1/course/${courseId}/subtitle`
      );
      console.log(response.data.subTitles);
      setSubtitles(response.data.subTitles);
    }

    async function getState() {
      const checkedSubTitles = getCheckedSubtitles();
      setState({
        checkedSubtitles: checkedSubTitles ? checkedSubTitles : [],
        numOfCheckedSubtitles: checkedSubTitles?.length,
      });
    }

    fetchSubtitles();
    getState();
  }, [courseId]);

  const handleChecked = async (subtitle, title, checked) => {
    let resultSubtitles = state.checkedSubtitles;
    if (checked) {
      addSubtitleToLocalStorage(subtitle);
      resultSubtitles.push(subtitle);
    } else {
      removeSubtitleFromLocalStorage(subtitle);
      resultSubtitles.filter((item) => item !== subtitle);
    }
    setState({
      checkedSubtitles: resultSubtitles,
      numOfCheckedSubtitles: resultSubtitles.length,
    });
  };

  return (
    <main className={`${classes.main}`}>
      <section className={`${classes.subtitles}`}>
        <Box
          className={`${classes.courseContent}`}
          onClick={() => setShowList(!showList)}
        >
          <h3>Course Content</h3>
          <AiFillCloseCircle />
        </Box>
        {showList &&
          subtitles
            .map((subtitle, idx) => (
              <FilterField
                title={`Lecture ${idx + 1}`}
                options={[...Array(subtitle.title)]}
                key={idx}
                onFilter={handleChecked}
                optionOnClick={() => console.log('Get Subtitle')}
                titleStyle={{
                  fontSize: '1rem',
                  fontWeight: '500',
                }}
                checkedOptions={state.checkedSubtitles.reduce((acc, item) => {
                  acc[item] = true;
                  return acc;
                }, {})}
              />
            ))
            .slice(0, showMore ? subtitles.length : 2)}
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
        <div className={`${classes.video}`}></div>
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
                  <button
                    className={`${classes.save}`}
                    onClick={() => {
                      notes.push(noteContent.current?.value);
                      setWriteNote(false);
                    }}
                  >
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
                  <>
                    <Box className={`${classes.note}`}>
                      <div className={`${classes.noteHeader}`} key={idx}>
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
                              setDialog(idx);
                            }}
                          />
                        </div>
                      </div>
                      <div className={`${classes.noteContent}`}>
                        <p>{note}</p>
                      </div>
                    </Box>
                    <div className={`${classes.hr}`}></div>
                  </>
                ))}
              </div>
            )}
            <AlertDialog
              title={'Delete Note'}
              content={'Are you sure you want to delete this note ?'}
              open={dialog !== -1}
              handleAgree={() => {
                notes = notes.filter((note, idx) => idx !== dialog);
                setDialog(-1);
                console.log('agree');
              }}
              handleDisagree={() => {
                setDialog(-1);
                console.log('disagree');
              }}
            />
            {videoInfo === 2 && 'Reviews'}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubtitlesPage;
