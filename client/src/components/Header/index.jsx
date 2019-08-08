import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Notifications from "../Notifications";

import styles from "./styles.module.scss";

const Header = () => (
    <header className="bg-primary pb-32 text-sm text-secondary2">
        <div className="mx-16">
            <nav className="flex items-center flex-wrap py-4 ">
                <div className="flex items-center">
                    <a
                        href="/dashboard"
                        className="block hover:text-white mr-12"
                    >
                        Dashboard
                    </a>
                    <Notifications />
                </div>
                <div className="flex items-center ml-auto">
                    <a href="/leagues" className="block hover:text-white mr-20">
                        Leagues
                    </a>
                    <a href="/live" className="block hover:text-white mr-20">
                        Live
                    </a>
                    <a href="/players" className="block hover:text-white mr-20">
                        Players
                    </a>
                    <a
                        href="/transfers"
                        className="block hover:text-white mr-20"
                    >
                        Transfers
                    </a>
                    <a
                        href="/fixtures"
                        className="block hover:text-white mr-20"
                    >
                        Fixtures
                    </a>
                </div>
                <div className="flex">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Search"
                    />
                </div>
            </nav>
        </div>
    </header>
);

export default Header;
