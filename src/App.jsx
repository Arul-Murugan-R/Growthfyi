import { useState } from 'react'
import classes from'./App.module.css'
import SeoLayout from './SeoLayout'
import Loader from './Components/Loader'
import {tempDic} from '../template'
import axios from 'axios'
import SeoLayoutDummy from './SeoLayoutDummy'

function App() {
  const [url,setUrl] = useState()
  const [EndPos,setEndPos] = useState()
  const [MidPos,setMidPos] = useState()
  const [ScrPos,setScrPos] = useState()
  const [fetched,setFetched] = useState(false)
  // console.log(tempDic)
  const [loading,setLoading] = useState(false)
  const urlHandler = (e) =>{
    e.preventDefault()
    setUrl(e.target.value)
  }
  const formatUrl =async (str)=>{
    while(str.indexOf('http://')==0 || str.indexOf('https://')==0 ||str.indexOf('www.')==0 ){
      if(str.indexOf('http://')==0){
        str =await str.split('http://')[1]
      }
      else if(str.indexOf('https://')==0){
        str =await str.split('https://')[1]
      }else{
        str =await str.split('www.')[1]
      }
      console.log(str)
    }
    return str
  }
  const fetchFunction =async(props) =>{
    setFetched(false)
    setLoading(true)
    const {path,data,setState} = props
    const post_array = [data]
    await axios({
      method: 'post',
      url: import.meta.env.VITE_DOS_API_URL + path,
      auth: {
        username: import.meta.env.VITE_DOS_LOGIN,
        password: import.meta.env.VITE_DOS_PASSWORD
      },
      data: post_array,
      headers: {
        'content-type': 'application/json'
      }
    }).then(async function (response) {
      var result = await response['data']['tasks'];
      // Result data
      console.log(result);
      if(setState=="midPos")
        setMidPos(result)
      else if(setState=="endPos")
        setEndPos(result)
      else if(setState=="scrShot")
        setScrPos(result)
      return result
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const makeAction = async ()=>{
    let dataDic = tempDic[0]
    let modUrl =await formatUrl(url)
    dataDic["target"] = modUrl
    console.log(dataDic)
    await axios({
      method: 'post',
      url: import.meta.env.VITE_DOS_API_URL + 'v3/on_page/task_post',
      auth: {
        username: import.meta.env.VITE_DOS_LOGIN,
        password: import.meta.env.VITE_DOS_PASSWORD
      },
      data: [dataDic],
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(async (response)=>{
      var task = await response['data']['tasks']
      console.log(task)
      let taskId
      if(task)
      taskId = task[0]["id"]
      console.log(taskId)
      dataDic = tempDic[3]
        dataDic["url"] = url
      const endPos =await fetchFunction({
          path: 'v3/on_page/lighthouse/live/json',
          data: dataDic,
          setState:'endPos'
        })
      dataDic =tempDic[2]
      dataDic['id'] = taskId
      const midPos = await fetchFunction({
          path: 'v3/on_page/pages',
          data: dataDic,
          setState:'midPos'
        })
      dataDic = tempDic[1]
      dataDic['url'] = url
      const scrshot = await fetchFunction({
        path: 'v3/on_page/page_screenshot',
        data: dataDic,
        setState:'scrShot'
      })
        console.log('worked')
      // console.log(url)
      console.log(midPos,endPos,scrshot)
      setLoading(false)
      setUrl("")
      setFetched(true)
    })
    
  }
  return (
    <div className={classes.container}>
      <div className={classes.head} >
        <input type="text" name="url" className={classes.urlInput} onChange={urlHandler} value={url} placeholder='Website Url' />
        <button onClick={makeAction}  >SEO Report For Free</button>
      </div>
      {loading&&<center>
      <Loader/>
      </center>}
      {!loading&&fetched&&<SeoLayout content1={MidPos} content2={EndPos} content3={ScrPos}/>}
      {/* <SeoLayoutDummy/> */}
    </div>
  )
}

export default App
