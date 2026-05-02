import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Profile from './pages/Profile';
import NewRound from './pages/NewRound';

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/create-account" element={<CreateAccount />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/new-round" element={<NewRound />} />
  </Routes>
  </BrowserRouter>
  )
}

export default App;