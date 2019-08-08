import React, { Component } from 'react';
import { map } from 'lodash';

import './styles.scss';

const mockData = {
    leagues: ['One', 'Two']
};

class Leagues extends Component {
    render() {
        return (
            <div className="leagues">
                <div className="container">
                    <div className="jumbotron paper mt-24 mb-12 rounded">
                        <div className="jumbotron-content">
                            <h2 className="title mb-12 text-secondary">
                                <div className="sub title mb-4">My Leagues</div>
                                {map(mockData.leagues, (item, index) => (index === mockData.leagues.length - 1 ? item : `${item}, `))}
                            </h2>
                            <button className="bg-primary hover:bg-teal-400 text-secondary hover:text-white py-2 px-8 border-2 border-teal-300 rounded mr-6">
                                Join
                            </button>
                            <button className="g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded">
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
