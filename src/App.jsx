import { useState } from 'react'
import reactLogo from './assets/react.svg'
import workintech from '/workintech.svg'
import Banner from './components/Banner'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import FormPage from './components/FormPage'
import SuccessPage from './components/SuccessPage'

function App() {
  

  return (
    <BrowserRouter>
    <Switch>

      <Route exact path="/">
        <Banner/>
     </Route>

      <Route path="/formPage">
        <FormPage/>
      </Route>

      <Route path="/successPage">
        <SuccessPage/>
      </Route>

    </Switch>
    </BrowserRouter>
  )
}

export default App
