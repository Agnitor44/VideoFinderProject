import React, {useState} from 'react'
import '../styles/home.css'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import Searched from './Searched'

import { Link } from 'react-router-dom';

const YTKEY = "?????????????????"
const VKEY = '?????????????????'
const V_CLIENT = '?????????????'
const V_SECRET = '?????????????????'

export default function Home() {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear()
    today = mm + '/' + dd + '/' + yyyy;


    const [filmData, setFilmData] = useState(null)
    const [now, setNow] = useState('')
    const [error, setError] = useState(false)

    const vimeoFetch = () => {
        let link = now
        if(now.length > 13) {
            let re = /vimeo.com(.*)/g
           link =  re.exec(now)[1].slice(1)
       
        }
       


        let Vimeo = require('vimeo').Vimeo;
        let client = new Vimeo(V_CLIENT, V_SECRET, VKEY);
        client.request({
            method: 'GET',
            path: `/videos/${link}`
          }, function (error, body, status_code, headers) {
            if (error) {
              return setError(true)
            }
          
           
            const info = {
                fav: false,
                id: body.uri.slice(8),
                tumb: body.pictures.sizes[6].link,
                title: body.name,
                views: null,
                likes: body.name,
                date: today,
                platform: 'VI'

            }
             setFilmData(info)
             setError(false)

          })

       
    }
    const ytFetch = () => {
       let my = now
     
        if(now.length > 20)
        {
            if(now.length < 30) 
            {
                my = now.slice(17)
            }
            else {
                let re = /v=(.*)/g
                my =  re.exec(now)[1]
            }
 
        }
        fetch(`https://www.googleapis.com/youtube/v3/videos?id=${my}&key=${YTKEY}
        &part=snippet,contentDetails,statistics,status`).then(res => res.json()).then(data => {
            
            if(!data.items[0]) return vimeoFetch();

           

            const info = {
                fav:false,
                
                id: data.items[0].id,
                tumb: data.items[0].snippet.thumbnails.medium.url,
                title: data.items[0].snippet.title,
                views: data.items[0].statistics.viewCount,
                likes: data.items[0].statistics.likeCount,
                date: today,
                platform: 'YT'

            }
             setFilmData(info)
             setError(false)
          
        })
       
    }

    
    const handleSub = (e) => {
        e.preventDefault()
        ytFetch()
        setNow('')
        
    }
    return (
        <>
      <div className = 'form'>
        <Form onSubmit = {handleSub} inline>
        <FormGroup >
          <Label for="Link" hidden>Link</Label>
          <Input value = {now} onChange = {(e) => setNow(e.target.value)} type="link" name="link" id="exampleEmail" placeholder="Link" />
        </FormGroup>
        <Button>Search</Button>
      </Form>
    
      </div>
      {error &&
      <Alert color="danger">
        Not found
      </Alert>
}
    {filmData && <Searched setData = {setFilmData} data = {filmData}/>}
        </>
    )
}
