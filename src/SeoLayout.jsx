import React from 'react'
import { ResultCard,ValidCard,TagsCard,PerCard } from './Components/Card'
import resultJson from '../tempJsons/ExtractedOutput.json'
import LightHouseReport from '../tempJsons/LightHouseOutput.json'
import classes from './Seo.module.css'
import CircularProgress from './Components/CircularProgress'
import altimg from '../public/404.jpg'

export default function SeoLayout(props) {
    const {content1:midPos,content2:endPos,content3:scrPos} = props
    // console.log('lay',endPos,midPos,props)
    const LHR = endPos?endPos[0].result[0]:LightHouseReport[0].result[0]
    // console.log((LightHouseReport[0].result[0]))
    const scrResult = scrPos?scrPos[0].result[0].items[0]:{}
    const middleResult = midPos&&midPos[0].result[0].items?midPos[0].result[0].items[0] : resultJson[0].result[0].items[0]

    
  return (
    <div>
      <div className={classes.topOne}>
        {!midPos&&<p>This is not the actual data to be generated!! something went wrong<br/>
        The data below generated is hard coded!!</p>}
          <h3 style={{textTransform:'uppercase'}}>All About this site</h3>
          <h2>Result of {LHR.requestedUrl}</h2>
          <div className={classes.additional}>
          <div className={classes.stats}>
          <CircularProgress
           percentage={middleResult.onpage_score.toFixed()}
           title="Page Score"
           />
          <div className={classes.substats}>
            {Object.keys(LHR.categories).slice(0,4).map((key)=>{
              const Dic = LHR.categories[key]
              return <CircularProgress percentage={(Dic.score*100).toFixed()}
              title={Dic.title} id={Dic.id}
              />
            })}
          </div>
          </div>
            {!scrResult.image&&<div>
            <img src={altimg} alt="" /><br />
            <h2 style={{margin:0}}>Image Not Found</h2>
            </div>}
            {scrResult.image&&<img src={scrResult.image} alt="" />}
          </div>
        </div>
        <div >
              <h2>OnPage Results</h2>
            <div className={classes.PageResult}>
              {Object.keys(middleResult.meta).map((val,index)=>{
                let Value = {}
                let temp = middleResult.meta[val]
                if(val.split('_').length >=2 && val.split('_').length <=3 && temp !=null && typeof temp != "object"){
                  Value ={
                    "title":val.split('_').map((str)=>str[0].toUpperCase() + str.substring(1)).join(' '),
                    "content":temp,
                    "index":index
                  }
                  return <ResultCard value={Value}/>
                }
              })}
              {Object.keys(middleResult.meta.content).map((val,index)=>{
                let Value = {}
                let temp = middleResult.meta.content[val]
                temp = temp%1 !=0&&temp.toFixed(2)
                // let condt =val[0].toLowerCase()!=='c' && val[0].toLowerCase()!=='d' && val[0].toLowerCase()!=='f'
                if(val.split('_').length >2 && val.split('_').length <=4 && temp !=null && typeof temp != "object"){
                  Value ={
                    "title":val.split('_').map((str)=>str[0].toUpperCase() + str.substring(1)).join(' '),
                    "content":temp,
                    "index":index
                  }
                  return <ResultCard value={Value}/>
                }
              })}

            </div>
        </div>
      {/* <ValidCard/> */}
      {middleResult.meta.htags&&<h2>H Tags</h2>}
      {middleResult.meta.htags&&<div className={classes.tagDiv}>
        {Object.keys(middleResult.meta.htags).map((tag,index)=>{
          const tagContent = middleResult.meta.htags[tag]
          if(tagContent){
            return <TagsCard data={{content:tagContent,tag:tag}}/>
          }
        })}
      </div>}
      {middleResult.page_timing&&<h2>Speed Insights</h2>}
      {middleResult.page_timing&&<div className={classes.speedDiv}>
        {Object.keys(middleResult.page_timing).map((val,index)=>{
                let Value = {}
                let temp = middleResult.page_timing[val]
                if(val.split('_').length >=2 && val.split('_').length <=4 && temp !=null && typeof temp != "object"){
                  Value ={
                    "title":val.split('_').map((str)=>str[0].toUpperCase() + str.substring(1)).join(' '),
                    "content":temp,
                    "index":index,
                    "unit":'ms'
                  }
                  return <ResultCard value={Value}/>
                }
              })}

      </div>}
      {Object.keys(LHR.categories).map((value,index)=>{
        if(LHR.categories[value])
        return <PerCard value={LHR.categories[value]} keys={index} audits={LHR.audits}/>
      })}
    </div>
  )
}
