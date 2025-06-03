import './patch.css';

export const GPTNavbar = () => {
    return (
        <nav className="nav">
            <button className="hamburger" id="menuBtn">Menu</button>
            <ul className="menu" id="menu">
                <li>Home</li><li>About</li><li>Contact</li>
            </ul>
        </nav>)
}