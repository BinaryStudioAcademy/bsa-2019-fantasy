import React, { Component } from 'react';

import { map } from 'lodash';

const mockData = {
    leagues: ['Barcelona', 'Dnipro']
};

class Leagues extends Component {
    render() {
        return (
            <div className="leagues">
                <div className="container">
                    <div className="jumbotron paper mt-24 mb-12 rounded">
                        <div className="jumbotron-content">
                            <h2 className="title">
                                <div className="sub title">My leagues</div>
                                {map(mockData.leagues, (item, index) => (index === mockData.leagues.length - 1 ? item : `${item}, `))}
                            </h2>
                            <button className="bg-primary hover:bg-teal-400 text-white py-2 px-4 border-2 border-teal-300 rounded mr-3">
                                Join
                            </button>
                            <button className="g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-4 border-2 border-gray-700 hover:border-transparent rounded">
                                New League
                            </button>
                        </div>
                        {/* TODO: implement images */}
                    </div>
                    <div className="paper">hi</div>
                </div>
            </div>
        );
    }
}

export default Leagues;
