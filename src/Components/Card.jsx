import React from 'react'
import classes from './Card.module.css'
export function ResultCard(props) {
  const {content,title,index,unit} = props.value
  return (
    <div className={classes.resCard + `${unit?" "+classes.speed:""}`} key={index + content}>
      <h3>{content || '139'}{unit&&unit}</h3>
      <label>{title || 'Internal Links'}</label>
    </div>
  )
}


export function ValidCard() {
    return (
      <div className={classes.valCard}>
        <div className={classes.success}>
        <svg width="1em" height="1em"viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path></svg>
        </div>
        <div>
        <h6>Duplicate Title</h6>
        <label>Your page does not have a cache control header. 
            This can negatively impact your page load speed and user experience.</label>
        </div>
      </div>
    )
  }

  export function TagsCard(props) {
    const {content,tag} = props.data
    return (
      <div className={classes.tagsCard}>
        <h3>We found <span className={classes.highlight}>#{content?content.length:'0'}</span> <span className={classes.highlight}>{tag}</span> tags on this page.</h3>
        <ul>
          {content.map((val)=>{
            return <li>{val}</li>
          })}
            {/* <li>Full Stack Development Course</li>
            <li>Data Science Course</li>
            <li>Human Resource Management Course</li>
            <li>Digital Marketing Course</li>
            <li>UI/UX Design Course</li> */}
        </ul>
      </div>
    )
  }

  export function PerCard(props) {
    const {title,description,score,id,auditRefs} = props.value
    const audits = props.audits
    console.log(auditRefs.length)
    // if(description)
    // console.log(description.split('[')[0])
    function formatDesc(str){
      let res = ``
      let split = str.indexOf('[')
      let i =0
      while(split!=-1){
        res +=str.substring(i,split) +`<a href='`
        str = str.substring(split+1)
        let linkIndex = str.indexOf('](')
        let close = str.indexOf('). ') || str.indexOf(') ')
        let temp =str.substring(linkIndex,close)
        // let temp= str.substring(i,linkIndex-1)
        res+=str.substring(linkIndex+2).substring(0,str.substring(linkIndex+2).length-2)
        res+=`'>`+temp + `</a>`
        i = close+1
        split = str.indexOf('[')
      }
      
      return res!=``?res:str
    }
    return (
      <div className={classes.PerCard} key={id}>
        <div className={classes.heading}>
        <h2>{title} Details - {parseInt(score*100)}%</h2>
        {description&&
        <p>{description.split('[')[0]}
        <a href={description.split('[')[1].split(']')[1].substring(1,description.split('[')[1].split(']')[1].length-3)}>{description.split('[')[1].split(']')[0]}</a>
        </p>}
        </div>
        <div className={classes.mainCard}>
        {auditRefs.slice(0,14).map((key,index)=>{
          // console.log(audits[key.id])
          const {title,description,displayValue,id,score,scoreDisplayMode} = audits[key.id]
          return <div className={classes.subCard} key={id} id={id}>
          {(score!==null && score<0.5)?<div className={classes.failure}>
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
            </svg>
          </div>:
          <div className={classes.success}>
          <svg width="1em" height="1em"viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path></svg>
          </div>}
          <div>
          <h3>{title} {displayValue&&" - "+displayValue}
          {(score!==null && score<0.5)?<label className={classes.failure}>
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5858L9.17157 7.75736L7.75736 9.17157L10.5858 12L7.75736 14.8284L9.17157 16.2426L12 13.4142L14.8284 16.2426L16.2426 14.8284L13.4142 12L16.2426 9.17157L14.8284 7.75736L12 10.5858Z"></path>
            </svg>
          </label>:
          <label className={classes.success}>
          <svg width="1em" height="1em"viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path></svg>
          </label>}
          </h3>
          {description&&
        <p>{description.split('[')[0]}
        <a href={description.split('[')[1].split(']')[1].substring(1,description.split('[')[1].split(']')[1].length-2)[-1]==")"?
        description.split('[')[1].split(']')[1].substring(1,description.split('[')[1].split(']')[1].length-3):
        description.split('[')[1].split(']')[1].substring(1,description.split('[')[1].split(']')[1].length-2)}>{description.split('[')[1].split(']')[0]}</a>
        </p>}
          </div>
          
        </div>
        })}
        </div>
      </div>
    )
  }
