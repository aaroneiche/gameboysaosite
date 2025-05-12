import { useState } from 'react'
import './App.css'
import Navigation from './Navigation'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SpriteBuilder from './SpriteBuilder';


function App() {
  const [count, setCount] = useState(0)


  const MyPage = ()=>{
    return (
      <>
      <Navigation/>
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

  const OtherPage = () => {
    return (
      <>
        <Navigation/>
        <div>This is just a page. </div>

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
