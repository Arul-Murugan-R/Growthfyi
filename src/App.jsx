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
  const [fetched,setFetched] = useState(false)
  const [loading,setLoading] = useState(false)
  const urlHandler = (e) =>{
    e.preventDefault()
    setUrl(e.target.value)
  }
  const fetchFunction =async(props) =>{
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
      
      return result
    }).then((result)=>{
      if(setState=="midPos")
        setMidPos(result)
      else if(setState=="endPos")
        setEndPos(result)
      return result
    })
    .catch(function (error) {
      console.log(error);
      return error
    });
  }
  const makeAction = async (e)=>{
    e.preventDefault()
    let dataDic = tempDic[0]
    let modUrl =url.split('http://')[1] ||
    url.split('https://')[1] ||
    url.split('www.')[1] 
    dataDic["target"] = url
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
      let taskId
      if(task)
      taskId = task[0]["id"]
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
      setLoading(false)
      setUrl("")
      setFetched(true)
    })
    
  }
  return (
    <div className={classes.container}>
      <div className={classes.head} >
        <input type="text" name="url" className={classes.urlInput} onChange={urlHandler} value={url} placeholder='Website Url' />
        <button  >SEO Report For Free</button>
      </div>
      {loading&&<center>
      <Loader/>
      </center>}
      {!loading&&fetched&&<SeoLayout content1={MidPos} content2={EndPos}/>}
      {/* <SeoLayoutDummy/> */}
    </div>
  )
}

export default App
