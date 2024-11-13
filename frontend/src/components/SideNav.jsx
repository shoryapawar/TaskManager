import Drawer from "./styled-components/Drawer";

const SideNav = ({ onSearch }) => {

  return (
    <div className="navbar bg-navbar">
      <div className="navbar-start">
        {/* <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><a>Dashboard</a></li>
            <li><a>Upcoming Task</a></li>
            <li><a>Overdue Task</a></li>
            <li><a>Completed Task</a></li>
          </ul>
        </div> */}
        <Drawer/>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Simple Task Manager</a>
      </div>
      <div className=" navbar-end flex items-center">
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => onSearch(e.target.value)}
          className=" bg-inputField text-primaryText p-2 rounded-md borderfocus:outline-none focus:ring-2 focus:ring-blue-500  text-white placeholder-gray-200"
        />
      </div>
      {/* <div className="navbar-end flex items-center">
        {isSearchVisible && (
          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search tasks..."
            className="input input-bordered mr-2"
          />
        )}
        <button onClick={toggleSearch} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default SideNav;
