
import { Routes, Route } from 'react-router-dom';
import FrontBoard from './pages/FrontBoard';


function App() {
  return (
    <div className="App">
        <header>
          헤더 페이지
        </header>
        <div className=''>
          <Routes>
            <Route path='/' element={<FrontBoard/>}></Route>

          </Routes>
        </div>
        
    </div>
  );
}

export default App;
