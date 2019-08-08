import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { NavLink } from "react-router-dom";

// import styles from "./styles.module.scss";

const Sidebar = () => {
    const [isOpened, setOpened] = useState(false);
    const toggleOpened = () => setOpened(!isOpened);

    const menuItems = ["Status", "Club", "Statistics", "Transfers", "Leagues"];

    return (
        <div
            className="flex flex-col items-center py-10 bg-secondary text-primary2 h-screen"
            onClick={toggleOpened}
        >
            <div className="item">Logo</div>
            <div className="mt-32">Avatar</div>
            <div>User</div>
            <div>Points</div>
            <div className="menu mt-16">
                {menuItems.map(item => (
                    <div className="menuItem flex">
                        <div className="px-4">icon</div>
                        {isOpened && <div className="ml-4">{item}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
