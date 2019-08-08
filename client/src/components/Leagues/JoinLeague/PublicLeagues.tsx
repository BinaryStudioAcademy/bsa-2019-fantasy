import React, { Component } from 'react';

class PublicLeagues extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="join-league-item w-full md:w-1/2 px-6">
                <h3 className="title text-secondary mb-4 font-bold">Public leagues</h3>
                <p className="mb-2">
                    Public leagues allow you to compete against 20 randomly assigned game players in
                    a classic league and up to 16 in head-to-head leagues. You can join up to 3
                    public leagues.
                </p>
                <p className="font-bold mb-6">
                    Note, you can't remove your team from a public league after the league has
                    started, once the challenge is on there's no quitting.
                </p>
                <button
                    className="shadow bg-primary hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    onClick={this.handleSubmit}
                >
                    Join public league
                </button>
            </div>
        );
    }
}

export default PublicLeagues;
