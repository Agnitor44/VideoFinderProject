import React, {useState} from 'react'
import {
    Card, Button, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, Alert
  } from 'reactstrap';
  import '../styles/home.css'
  import {useContextStore} from '../App'


export default function Searched({data, setData}) {
    const {store, setStore} = useContextStore()
    const [add, setAdd] = useState(false)
    const [error, setError] = useState(false)
    const handleAdd = () => {
       const ktore = store.findIndex(item => item.id === data.id)
       if(ktore > -1) {
           
           setError(true)
       return setTimeout(() => {
            setError(false)
            setData(null)
        }, 2000)
       }
        setStore([...store, data])
        setAdd(true)
       
        setTimeout(() => {
            setAdd(false)
            setData(null)
        }, 2000)
    }
    return (
        add ?
        <Alert color="success">You have added</Alert>
        :
        <>
        <div className="vidContainer">
      
      <Card >
          
        <CardImg className = 'imgHolder' width = '40%' bottom  src={data.tumb} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{data.title}</CardTitle>
      
          <Button onClick = {handleAdd}>Add</Button>
        </CardBody>
      </Card>
      </div>
        {error && <Alert color = 'danger'>Already on your list</Alert> }
        </>
    )
}
