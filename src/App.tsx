import { useState} from 'react'
import './App.css'
import Navigation from './Navigation'
import { BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom";
import SpriteBuilder from './SpriteBuilder';
import { CharacterBuilder } from './CharacterBuilder';
import { BackgroundBuilder } from './BackgroundBuilder';

function App() {
  const [count, setCount] = useState(0)


  const MyPage = ()=>{
    return (
      <>

        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
      </>
    );
  }

  function Layout(){
      return (
        <div className="gbWrapper">
          <div className="screen">
            <Navigation />
            <Outlet />
          </div>
        </div>
      );
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MyPage />} />
          <Route path="/spritebuilder" element={<SpriteBuilder />} />
          <Route path="/characterbuilder" element={<CharacterBuilder />} />
          <Route path="/backgroundbuilder" element={<BackgroundBuilder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
