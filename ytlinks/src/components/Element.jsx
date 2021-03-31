import React from 'react'
import '../styles/list.css'
import {useContextStore} from '../App'
import { Card, Button, CardTitle, CardText,CardImg , Table} from 'reactstrap';
export default function Element({item, sq, setModal}) {
    const {store, setStore, } = useContextStore()
    const handleDel = () => {
        const newArr = [...store].filter(thing => thing.id !== item.id)
        setStore(newArr)
    }
    const handleFav = () => {
        const ktore = [...store].findIndex(thing => thing.id === item.id)
    
        const newArr = [...store]
        newArr[ktore].fav = !newArr[ktore].fav
        setStore(newArr)
    }
    return (
        sq ?
        <Card className = 'card' body outline color="secondary">
        <p>{item.date}</p>
        <div className="titleSQ">
        <CardTitle tag="h7" >{item.title}</CardTitle>
        </div>
   <div className="listImgSQ">
   <CardImg onClick = {() => setModal(item)} className = 'imgHolderSQ' width = '40%' bottom  src={item.tumb} alt="Card image cap" />
   </div>
   <div className="statsSQ">
        <h4><i class="far fa-eye"></i>{item.views}</h4>
        <h4><i class="fas fa-heart"></i>{item.likes ? item.likes : "Blocked"}</h4>
    </div>
    <div className="buttonsZoneSQ" >
    <Button onClick = {handleDel}><i class="fas fa-trash"></i></Button>
    <Button onClick = {handleFav} ><i style = {item.fav ? {color: 'red'}: {color: 'black'}}  class="fas fa-heart"></i></Button>
 
    </div>
   
  
  </Card>
  :
  <Table className = 'tableZone'>
<p>{item.date}</p>
 <tbody>
 <tr>
   
   <img onClick = {() => setModal(item)} src = {item.tumb} />
   <td>
       <div className="daneFilmu">
           <h3>{item.title}</h3>
           <h4><i class="far fa-eye"></i>{item.views}</h4>
           <h4><i class="fas fa-heart"></i>{item.likes ? item.likes : "Blocked"}</h4>
       </div>
   </td>
   <td>
   <div className="listButtons">
<Button onClick = {handleDel}><i class="fas fa-trash"></i></Button>
    <Button onClick = {handleFav} style = {item.fav ? {color: 'red'}: {color: 'black'}}><i class="fas fa-heart"></i></Button>
</div>
   </td>
 </tr>
 


</tbody>
  </Table>
    )
}
