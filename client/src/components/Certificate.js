import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  certificate: {
    width: '696px',
    height: '520px',
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(./certificateBackground.jpg)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '3rem',
  },
  logo: {
    width: '5rem',
    height: '5rem',
    borderRadius: '50%',
  },
  main: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem',
  },
}));

const Certificate = ({ name, course }) => {
  const inputRef = useRef(null);
  const classes = useStyles();

  name = name || 'michael';
  course = course || 'React Course';

  const downloadCertificate = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save(`${name}-certificate.pdf`);
    });
  };

  return (
    <>
      <h1>Certificate generator</h1>
      <div>
        <button onClick={downloadCertificate}>Download</button>
      </div>
      <Box ref={inputRef} className={`${classes.certificate}`}>
        <header className={`${classes.header}`}>
          {/* <img
            src='https://t4.ftcdn.net/jpg/03/49/04/11/360_F_349041172_7p4d3KBfqpM2fg51vuPq4jhLkkwnnrFk.jpg'
            alt=''
            className={`${classes.logo}`}
          /> */}

          <h1
            style={{
              // marginLeft: '6rem',
              fontSize: '2rem',
              fontWeight: '600',
              color: '#000',
            }}
          >
            Certificate of completion
          </h1>
        </header>
        <main className={`${classes.main}`}>
          <p>Awarded to</p>
          <p>
            <strong>{name}</strong>
          </p>
          <p>for successfully completing</p>
          <p>
            <strong>{course}</strong>
          </p>
        </main>
        <footer className={`${classes.footer}`}>
          <p>
            <strong>Issued by</strong>
          </p>
          <p>Nerd academy</p>
        </footer>
      </Box>
    </>
  );
};
export default Certificate;
