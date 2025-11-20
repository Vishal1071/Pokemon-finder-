import { Link } from 'react-router-dom';
import './Header.css'

function Header(){
    return(
        <header>
            <div className="hea-der">
            <h1>Vishal's projects</h1>
            <div className="mainu">
                <Link to={"/"}>Pokemon </Link>
                <Link to={"/todo"}>To do list </Link>
                <Link to={"/pukee"}>sate </Link>
                <Link to={"/axios"}>CRUD </Link>
                <Link to={"/accoedion"}>Accoedion </Link>
                <Link to={"/"}>Home </Link>
            </div>
            </div>
        </header>
    );
}

export default Header