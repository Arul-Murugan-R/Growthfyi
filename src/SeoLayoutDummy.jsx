import React from 'react'
import { ResultCard,ValidCard,TagsCard,PerCard } from './Components/Card'
import resultJson from '../ExtractedOutput.json'
import LightHouseReport from '../LightHouseOutput.json'
import classes from './Seo.module.css'
import Percentage from './Components/Percentage'

export default function SeoLayoutDummy() {
    const LHR = LightHouseReport[0].result[0]
    // console.log((LightHouseReport[0].result[0]))
    
  return (
    <div>
        <div className={classes.topOne}>
          <h3 style={{textTransform:'uppercase'}}>All About this site</h3>
          <h2>Result of {LHR.requestedUrl}</h2>
          <Percentage/>
          <div className={classes.additional}>
            <img width={500} height={250} src="https://api.dataforseo.com/cdn/screenshot/09161941-6665-0444-0000-8dd78226976c" alt="" />
          </div>
        </div>
        <div >
              <h2>OnPage Results</h2>
            <div className={classes.PageResult}>
              {Object.keys(resultJson[0].result[0].items[0].meta).map((val,index)=>{
                let Value = {}
                let temp = resultJson[0].result[0].items[0].meta[val]
                if(val.split('_').length >=2 && val.split('_').length <=3 && temp !=null && typeof temp != "object"){
                  Value ={
                    "title":val.split('_').map((str)=>str[0].toUpperCase() + str.substring(1)).join(' '),
                    "content":temp,
                    "index":index
                  }
                  return <ResultCard value={Value}/>
                }
              })}
              {Object.keys(resultJson[0].result[0].items[0].meta.content).map((val,index)=>{
                let Value = {}
                let temp = resultJson[0].result[0].items[0].meta.content[val]
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
        <h2>H Tags</h2>
      <div className={classes.tagDiv}>
        {Object.keys(resultJson[0].result[0].items[0].meta.htags).map((tag,index)=>{
          const tagContent = resultJson[0].result[0].items[0].meta.htags[tag]
          return <TagsCard data={{content:tagContent,tag:tag}}/>
        })}
      </div>
      <h2>Speed Insights</h2>
      <div className={classes.speedDiv}>
        {Object.keys(resultJson[0].result[0].items[0].page_timing).map((val,index)=>{
                let Value = {}
                let temp = resultJson[0].result[0].items[0].page_timing[val]
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
