import { Link } from "react-router-dom";
import icons from "../../styles/icons";
import "./sidebar.css"

const Sidebar = () => {
    return <div className="sidebar">
        <Link to="/"> <img className="icon" src={icons.home} alt="home" /> </Link>
        <Link to="/despesa/add"> <img className="icon" src={icons.add} alt="adicidinar despesa" /> </Link>
        <Link to="#"> <img className="icon" src={icons.config} alt="configurações" /> </Link>
        <Link to="#"> <img className="icon" src={icons.logout} alt="logout" /> </Link>
    </div>
}

export default Sidebar;