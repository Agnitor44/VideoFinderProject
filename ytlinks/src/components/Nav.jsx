import React, { useState } from 'react';
import { Nav, NavItem } from 'reactstrap';
import {
 NavLink
} from "react-router-dom";
import '../styles/nav.css'
const Navi = () => {


  return (
  
  
 
 <div className = 'nav'>
      <Nav tabs>
        <NavItem className ='navElement'>
          <NavLink  to ="/" ><h3>Home</h3></NavLink>
       
        
        </NavItem>
        <NavItem  className ='navElement'>
          <NavLink to ="/list"><h3>List</h3></NavLink>
        </NavItem>
   
      </Nav>
    </div>

    

  );
}

export default Navi;
