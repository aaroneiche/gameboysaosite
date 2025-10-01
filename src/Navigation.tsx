import { Link } from "react-router-dom";

export default function Navigation() {

    return (
      <div className="nav">
        <Link to="/">Home</Link> - 
        <Link to="/spritebuilder">Sprites</Link> -  
        <Link to="/characterbuilder">Characters</Link> - 
        <Link to="/backgroundbuilder">Backgrounds</Link>
      </div>
    );
}