import './App.css';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import AddUser from './AddUser/AddUser';

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/add-user' element={<AddUser/>}/>
        </Routes>
 
      </BrowserRouter>
    
  );
}

export default App;
