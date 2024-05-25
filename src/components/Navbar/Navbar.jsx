import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/main">Main</Link></li>
        <li><Link to="/info">INFO</Link></li>
      </ul>
    </nav>
  )
}
