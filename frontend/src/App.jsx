// App.jsx
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './components/Home/Home'
import HomeBtn from './components/common/HomeBtn'
import Sound from './components/common/Sound'
import About from './components/About/About'
import ProjectsPage from './components/projects/page'
import ContactPage from './components/contact/contactpage'
import Form from './components/contact/Form'
// import ContactPage from './components/contact/ContactPage'
import EncrPage from './components/Encryption/page'

function App() {
  return (
    <BrowserRouter>
      {/* <div className="w-full h-screen relative overflow-hidden bg-black"> */}
      <div className="flex min-h-screen flex-col items-center justify-center relative ">
          <div className="z-50">
          <HomeBtn />
          <Sound />
        </div>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={< ProjectsPage/>} />
          <Route path="/contact" element={< ContactPage/>} />
          <Route path="/encryption" element={< EncrPage/>} />

          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
