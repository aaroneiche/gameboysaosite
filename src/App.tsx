import './App.css'
import Navigation from './Navigation'
import { BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom";
import SpriteBuilder from './SpriteBuilder';
import { CharacterBuilder } from './CharacterBuilder';
import { BackgroundBuilder } from './BackgroundBuilder';

function App() {

  const Home = ()=>{
    return (
      <>
        <h1>GameBoy SAO</h1>
        <div>The GameBoy SAO is a simple add-on for your electronics conference badges</div>

        <h3>What is this?</h3>
        <p>SAOs are little 'add-on' badges that you can attach to your electronic conference badge with the SAO connector. This SAO is one that looks like a 1989 Nintendo Gameboy.</p>

        <h3>Does it play games?</h3>
        <p>It does not play any games. It's not outside the realm of possibility that you could display sprites and feed data through the I2C interface to "play a game", but I haven't really built it for that. So no promises. </p>

        <h3>Can I make it display other stuff?</h3>
        <p>Yes! There is a full-featured interface for displaying what you want to display on the SAO. You can create backgrounds, and move charactes in front of those backgrounds. For more information, visit the "Getting Started" section of this website to learn how to send commands to the SAO. You can also look at the Sprite Builder section for some helpful tools for making sprites, characters, and backgrounds.</p>

        <h3>Can I recreate my favorite gameboy game with this?</h3>
        <p>Yes! Sort of. You can probably make a pretty decent approximiation. The biggest limitation is that this display is 128x128 pixels. This falls short of the Gameboy's 160 x 144 pixels. Additionally, because of the display's ratio and the PCB, some parts of the display on the SAO are hidden, so you don't even get the full 128x128. Beyond that, it's mostly a matter of what and how you can animate things on the screen. There's limited memory available to the microcontroller, and the  </p>

        <h3>Why did you make this?</h3>
        <p>It's fun. Making SAOs started for me in 2023. I went to Hackaday Supercon and thought the badge SAOs were very cool. I went back in 2024 with my own [The MacSAO](https://aeiche.com/macsao). The GameBoySAO seemed like a fun idea, and it's one that I'm taking to Supercon in 2025.</p>
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
          <Route index element={<Home />} />
          <Route path="/spritebuilder" element={<SpriteBuilder />} />
          <Route path="/characterbuilder" element={<CharacterBuilder />} />
          <Route path="/backgroundbuilder" element={<BackgroundBuilder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
