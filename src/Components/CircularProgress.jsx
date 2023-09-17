import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useEffect, useState } from 'react';

const CircularProgress = ({ percentage,title,id }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress changes (e.g., loading data)
    const interval = setInterval(() => {
      if (progress < percentage) {
        setProgress(progress + 1);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [progress]);
  return (
    <div className='progress' style={{ width: '120px' }} id={id}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          textColor: 'white',
          pathColor: '#646cff',
          trailColor: 'rgb(63, 63, 63)',
          textSize:'23px',
        })}
      />
      <label style={{fontWeight:"bold"}} >{title}</label>
    </div>
  );
};

export default CircularProgress;

