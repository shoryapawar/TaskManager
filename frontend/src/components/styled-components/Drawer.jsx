import React from "react";
import { Link } from "react-router-dom";

const Drawer = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content h-full w-80 p-4 flex flex-col items-center justify-center space-y-4">
          <li className="text-2xl font-semibold">
            <Link to="/">DASHBOARD</Link>
          </li>
          <li className="text-2xl font-semibold">
            <Link to="/UpcomingTask">UPCOMING TASK</Link>
          </li>
          <li className="text-2xl font-semibold">
            <Link to="/OverDueTask">OVERDUE TASK</Link>
          </li>
          <li className="text-2xl font-semibold">
            <Link to="/CompletedTask">COMPLETED TASK</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
