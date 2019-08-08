import React, { Component } from 'react';
import { times } from 'lodash';

import { FaStar } from 'react-icons/fa';

class CreateLeague extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            name: '',
            gameweek: 'Gameweek 1'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        const { name, gameweek } = this.state;

        return (
            <div className="create-league">
                <div className="container">
                    <div className="jumbotron paper mb-12 rounded">
                        <div className="jumbotron-content mt-12">
                            <h2 className="title text-secondary">
                                <div className="sub title mb-4 flex items-center">
                                    <FaStar />
                                    Create a League
                                </div>
                                Create a new classic league
                            </h2>
                        </div>
                    </div>
                    <div className="paper">
                        <form className="w-full max-w-lg" onSubmit={this.handleSubmit}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="league-name"
                                        type="text"
                                        name="name"
                                        onChange={this.handleChange}
                                        value={name}
                                    />
                                    <p className="text-gray-600 text-xs italic">
                                        Maximum 30 characters
                                    </p>
                                </div>
                            </div>
                            <div className="w-full mb-6">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-state"
                                >
                                    Scoring starts
                                </label>
                                <div className="relative">
                                    <select
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="league-gameweek"
                                        name="gameweek"
                                        onChange={this.handleChange}
                                        value={gameweek}
                                    >
                                        {times(38, item => (
                                            <option key={item}>{`Gameweek ${item + 1}`}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <button
                                className={`shadow bg-primary hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${!name
                                    && 'opacity-50 cursor-not-allowed'}`}
                                type="submit"
                                disabled={!name}
                            >
                                Create league
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateLeague;
