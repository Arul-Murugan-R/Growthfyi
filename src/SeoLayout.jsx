import React from 'react'
import { ResultCard,ValidCard,TagsCard,PerCard } from './Components/Card'
import resultJson from '../ExtractedOutput.json'
import LightHouseReport from '../LightHouseOutput.json'
import classes from './Seo.module.css'

export default function SeoLayout(props) {
    const {content1:midPos,content2:endPos} = props
    console.log('lay',endPos,midPos,props)
    const LHR = endPos[0].result[0]||LightHouseReport[0].result[0]
    // console.log((LightHouseReport[0].result[0]))

    const middleResult = midPos[0].result[0].items?midPos[0].result[0].items[0] : resultJson[0].result[0].items[0]

    
  return (
    <div>
      <div className={classes.topOne}>
          <h3 style={{textTransform:'uppercase'}}>All About this site</h3>
          <h2>Result of {LHR.requestedUrl}</h2>
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
      <h2>H Tags</h2>
      <div className={classes.tagDiv}>
        {Object.keys(middleResult.meta.htags).map((tag,index)=>{
          const tagContent = middleResult.meta.htags[tag]
          return <TagsCard data={{content:tagContent,tag:tag}}/>
        })}
      </div>
      <h2>Speed Insights</h2>
      <div className={classes.speedDiv}>
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

      </div>
      {Object.keys(LHR.categories).map((value,index)=>{
        return <PerCard value={LHR.categories[value]} keys={index} audits={LHR.audits}/>
      })}
    </div>
  )
}
