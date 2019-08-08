import React, { Component, useMemo } from 'react';
import { map } from 'lodash';

import { LeagueTable } from '../../components/LeagueTables';

import './styles.scss';

const mockData = {
    leagues: ['Barcelona', 'Somethin']
};

const columns = [
    {
        Header: () => <span className="table-cell">League</span>,
        accessor: 'league',

        Cell: (props: { value: string }) => <span className="title">{props.value}</span>
    },
    {
        Header: () => <span className="table-cell">Movement</span>,
        accessor: 'movement',
        Cell: (props: { value: string }) => <span className="movement">{props.value}</span>
    },
    {
        Header: () => <span className="table-cell">Current Rank</span>,
        accessor: 'rank.current',

        Cell: (props: { value: number }) => <span className="rank">{props.value}</span>
    },
    {
        Header: () => <span className="table-cell">Last Rank</span>,
        accessor: 'rank.last',

        Cell: (props: { value: number }) => <span className="rank">{props.value}</span>
    }
];

const table = [
    {
        league: 'Tanner Linsley',
        movement: 'well',
        rank: {
            current: 123,
            last: 23
        }
    }
];

const Leagues = () => {
    const titles = [
        {
            title: 'Private classic leagues',
            id: 0,
        },
        {
            title: 'Public classic leagues',
            id: 1
        },
        {
            title: 'Global leagues',
            id: 2
        }
    ];

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
                {map(titles, (item) => 
                <LeagueTable columns={columns} data={table} title={item.title} key={item.id} />
                )}
            </div>
        </div>
    );
};

export default Leagues;
