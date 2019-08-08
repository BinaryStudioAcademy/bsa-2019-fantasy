import React from 'react';

import { FaStar } from 'react-icons/fa';

import PrivateLeagues from './PrivateLeagues';
import PublicLeagues from './PublicLeagues';

import './styles.scss';

const JoinLeague = () => (
    <div className="join-league">
        <div className="container">
            <div className="jumbotron paper mb-12 rounded">
                <div className="jumbotron-content mt-12">
                    <h2 className="title text-secondary">
                        <div className="sub title mb-4 flex items-center">
                            <FaStar />
                            Join a League
                        </div>
                        Join an existing league
                    </h2>
                </div>
            </div>
            <div className="join-league-content paper flex flex-col md:flex-row">
                <PublicLeagues />
                <PrivateLeagues />
            </div>
        </div>
    </div>
);

export default JoinLeague;
