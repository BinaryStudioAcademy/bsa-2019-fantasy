import React from 'react';

import { FaStar } from 'react-icons/fa';

const PrivateLeagues = () => (
    <div className="w-full md:w-1/2 px-4">
        <h3 className="title">Private leagues</h3>
        <p>Join a private league if somebody has given you a league code to enter.</p>
        <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                    <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="league-code"
                    >
                        League Code
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="league-code"
                        type="text"
                    />
                </div>
            </div>
            <button
                className={`shadow bg-primary hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${false
                    && 'opacity-50 cursor-not-allowed'}`}
                type="submit"
                disabled={false}
            >
                Join private league
            </button>
        </form>
    </div>
);

const PublicLeagues = () => (
    <div className="w-full md:w-1/2 px-4">
        <h3 className="title">Public leagues</h3>
        <p className="mb-2">
            Public leagues allow you to compete against 20 randomly assigned game players in a
            classic league and up to 16 in head-to-head leagues. You can join up to 3 public
            leagues.
        </p>
        <p className="bold">
            Note, you can't remove your team from a public league after the league has started, once
            the challenge is on there's no quitting.
        </p>
        <button
            className={`shadow bg-primary hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${false
                && 'opacity-50 cursor-not-allowed'}`}
            type="submit"
            disabled={false}
        >
            Join public league
        </button>
    </div>
);

const JoinLeague = () => (
    <div className="join-leagues">
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
            <div className="paper flex flex-col md:flex-row">
                <PublicLeagues />
                <PrivateLeagues />
            </div>
        </div>
    </div>
);

export default JoinLeague;
