import React from 'react'
import classes from './Loader.module.css'

export default function Loader() {
  return (
    <div>
      <div className={classes.spinner}></div><br/>
      <h4>Hang on, we are analyzing your page...</h4>
      <label style={{
        lineHeight:'0.4rem',
        fontSize:'1rem'
      }}>This may take a few minutes. Please do not close this window.
      </label>
    </div>
  )
}
