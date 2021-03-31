import React, {useEffect, useState, createContext, useContext} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home'
import List from './components/List'
import Navi from './components/Nav'

const Store = createContext()
export const useContextStore = () => {
  return useContext(Store)
}

function App() {
  function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
  useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }
  const [store, setStore] = useStickyState([], 'store')

  const value = {
    store: store,
    setStore: setStore,
   
  }
  return (
    <Store.Provider value = {value}>
    <Router>
      <Navi/>
      <Switch>
        <Route path = '/' exact component = {Home}/>
        <Route path = '/list' component = {List}/>
      </Switch>
    </Router>
    </Store.Provider>
  );
}

export default App;
