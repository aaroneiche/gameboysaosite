import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import SpriteBuilder from './SpriteBuilder';

function App() {
  const [count, setCount] = useState(0)


  const MyPage = ()=>{
    return (
      <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
          <Link to="/other">Other</Link>
          <Link to="/spritebuilder">Sprite Builder</Link>
        </div>
      </>
    );
  }

  const OtherPage = () => {
    return (
      <>
        <div>This is just a page. </div>

        <Link to="/">Home</Link>
        <Link to="/spritebuilder">Sprite Builder</Link>
      </>
    );
  }



  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyPage />}></Route>
        <Route path="/other" element={<OtherPage />}></Route>
        <Route path="/spritebuilder" element={<SpriteBuilder />}></Route>
      </Routes>
    </Router>
  );
}

export default App
