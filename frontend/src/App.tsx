import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users/Users';
import CreateUsers from './pages/Users/CreateUsers';
import EditUsers from './pages/Users/EditUsers';
import './App.css';
import setAuthToken from './api/setAuthToken';

function App() {

  const token = localStorage.getItem("token");
    if (token){
      setAuthToken(token);
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/dashboard' element={ <Dashboard /> }/>
        <Route path='/users' element={ <Users /> }/>
        <Route path='/users/create' element={ <CreateUsers /> }/>
        <Route path='/users/edit/:id' element={ <EditUsers /> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
