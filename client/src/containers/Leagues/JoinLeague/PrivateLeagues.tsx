import React, { Component } from 'react';

class PrivateLeagues extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            code: ''
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
    }

    render() {
        const { code } = this.state;

        return (
            <div className="join-league-item w-full md:w-1/2 px-6">
                <h3 className="title text-secondary mb-4 font-bold">Private leagues</h3>
                <p className="mb-4">
                    Join a private league if somebody has given you a league code to enter.
                </p>
                <form className="w-full max-w-lg" onSubmit={this.handleSubmit}>
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
                                name="code"
                                onChange={this.handleChange}
                                value={code}
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
    }
}

export default PrivateLeagues;
