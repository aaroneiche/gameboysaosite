import { Link } from "react-router-dom";

export default function Navigation() {

    return (
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="gettingstarted">Getting Started</Link>
        <Link to="reference">Reference</Link>
        <Link to="/commandbuilder">Command Builder</Link>
        <Link to="/spritebuilder">Sprite Builder</Link>
      </div>
    );
}