
import { Routes, Route } from 'react-router-dom';
import FrontBoard from './pages/FrontBoard';
import Hellow from './pages/Hellow';
import MyPage from './pages/MyPage';

function App() {
  return (
    <div className="App">
        <header>
          헤더 페이지
        </header>
        <div className=''>
          <Routes>
            <Route path='/' element={<FrontBoard/>}></Route>
            <Route path='/hello' element={<Hellow/>}></Route>
            <Route path='/my' element={<MyPage/>}></Route>
          </Routes>
        </div>
        
    </div>
  );
}

export default App;
