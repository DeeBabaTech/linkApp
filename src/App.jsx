import React from 'react'
import Header from './components/Header'
import FormsPage from './pages/LandingPage/formsPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile/profile'
import LinkPreview from './pages/linkPreview'

function App() {
  return (
    <div className=''>
      <Router>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route path='/' element={<FormsPage />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/preview' element={<LinkPreview />} />
        </Routes>
      </Router>
      < div />
    </div>
  )
}

export default App