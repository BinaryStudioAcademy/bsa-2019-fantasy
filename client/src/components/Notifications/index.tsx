import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { NavLink } from "react-router-dom";

// import styles from "./styles.module.scss";

const Notifications = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => setVisible(!visible);

    return (
        <div className="relative">
            <div
                className="hover:text-white cursor-pointer"
                onClick={toggleVisible}
            >
                Ring icon
            </div>
            {visible && (
                <div className="absolute left-0 p-8 bg-background">
                    Notifications
                </div>
            )}
        </div>
    );
};

export default Notifications;
