import { useState} from 'react'
import './App.css'
import Navigation from './Navigation'
import { BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom";
import SpriteBuilder from './SpriteBuilder';
import SpriteGrouper from './ExperimentalBuilder';


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

  const OtherPage = () => {
    return (
      <>
        
        <div>This is just a page. </div>

      </>
    );
  }



  function Layout(){
      return (
        <>
          <Navigation />
          <Outlet />
        </>
      );
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MyPage />} />
          <Route path="/other" element={<OtherPage />} />
          <Route path="/spritebuilder" element={<SpriteBuilder />} />
          <Route path="/exbuilder" element={<SpriteGrouper />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
