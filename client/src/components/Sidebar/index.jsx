import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import styles from "./styles.module.scss";

const Sidebar = () => (
    <div className="flex flex-col items-center py-10 bg-secondary text-primary2 h-screen">
        <div className="block">Logo</div>
        <div className="mt-32">Avatar</div>
        <div>Username</div>
        <div>Points</div>
        <div className="mt-16">Menu</div>
    </div>
);

export default Sidebar;
