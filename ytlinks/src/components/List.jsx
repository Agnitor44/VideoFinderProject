import React, {useState, useEffect} from 'react'
import {useContextStore} from '../App'
import { Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Element from './Element'
import ModalZone from './Modal'
import dataJSON from '../demoData.json'
export default function List() {
    const {store, setStore} = useContextStore()
    const [sq, setSq] = useState(false) 
    const [pag, setPag] = useState(1)
    const [per, setPer] = useState(3)
    const [fav, setFav] = useState(false)
    const [modal, setModal] = useState(false)

    // Need this for pagination
    const indexOfLastTodo = pag * per;
    const indexOfFirstTodo = indexOfLastTodo - per;
    const currentStore = fav ? store.filter(thing => thing.fav).slice(indexOfFirstTodo, indexOfLastTodo) : store.slice(indexOfFirstTodo, indexOfLastTodo);

    const handleClick = (number) => {
        setPag(number)
    }
   
    const pageNumbers = [];
   

    for (let i = 1; i <= Math.ceil(store.length / per); i++) {
   
      pageNumbers.push(i)
     
    }
    
  
  
  
    const listSq = currentStore.map(item => <Element modal = {modal} setModal = {setModal} sq = {sq} item = {item}/>)

    const renderPageNumbers = pageNumbers.map(number => <PaginationItem key={number} id={number} onClick={() => handleClick(number)}>   <PaginationLink href="#">{number}</PaginationLink></PaginationItem>) 
   
  
  
    return (
     <>
   {modal && <ModalZone modal = {modal} setModal = {setModal}/>}

        <div className="container">
          <div className="panel" >
          <div className="pagi">
        {
   <Pagination aria-label="Page navigation example">
 
        {renderPageNumbers}
 </Pagination>
        }
     
      
     
      </div>
      <div>
            <Button className = 'panelB' onClick = {() => setFav(prev => !prev) }>{fav ?  <i class="fas fa-angle-down"></i> :  <i class="fas fa-heart"></i>}</Button>
            <Button className = 'panelB' onClick = {() => setSq(prev => !prev) }>{sq ?  <i class="fas fa-list"></i>: <i class="fas fa-square"></i>}</Button>
            <Button className = 'panelB' onClick = {() => setStore(dataJSON) }>Demo</Button>
            <Button className = 'panelB' onClick = {() => setStore([]) }><i class="fas fa-trash"></i></Button> 
            </div>
          </div>
       
 <div className = 'list'>
            {listSq}
        
      </div>
 
        </div>

      
      </> 
    )
}
