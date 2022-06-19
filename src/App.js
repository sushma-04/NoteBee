import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>

          <Navbar />
          {/* <Alert message="~Welcome to my app"/> */}
          <div className="container my-3">
          <Routes>
            <Route exact path="Home" element={<Home />} />
            <Route exact path="About" element={<About />} />
            <Route exact path="Login" element={<Login />} />
            <Route exact path="Signup" element={<Signup />} />
          </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
