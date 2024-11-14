import { Link } from "react-router-dom";
import Drawer from "./styled-components/Drawer";
import { IoMdSearch } from "react-icons/io";
const SideNav = ({ onSearch, openSearchModal }) => {
  return (
    <div className="navbar bg-navbar mb-2 rounded-lg fixed top-0 w-[98%] bg-black p-4 shadow-lg z-50">
      <div className="navbar-start">
        <Drawer />
      </div>
      <div className="navbar-center">
        <Link to="/" className="text-xl text-white font-semibold tracking-wide hover:text-gray-300">
          📋Task Manager
        </Link>
      </div>
      <div className="navbar-end flex items-center">
        {/* <button
          onClick={openSearchModal} // Trigger search modal opening
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          Search
        </button> */}
        <button
          onClick={openSearchModal} // Trigger search modal opening
          className="ml-2 p-2 bg-background text-white rounded-full"
        > 
        <IoMdSearch />
        </button>
      </div>
    </div>
  );
};

export default SideNav;
