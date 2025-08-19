import { Link } from "react-router-dom";


export default function Navigation() {

    return (
      <>
        <Link to="/">Home</Link> | 
        <Link to="/other">Other</Link> | 
        <Link to="/spritebuilder">Sprite Builder</Link> |
        <Link to="/exbuilder">Experimental Builder</Link>
      </>
    );
}