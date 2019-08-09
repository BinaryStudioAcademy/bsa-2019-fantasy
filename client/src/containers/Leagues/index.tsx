import React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import { FaStar, FaArrowUp, FaArrowDown } from 'react-icons/fa';

import { LeagueTable } from 'components/Leagues/LeagueTables';

import FirstPlayer from 'assets/images/player.png';
import SecondPlayer from 'assets/images/1966.png';
import './styles.scss';

// mock data
const mockData = {
    leagues: ['Barcelona']
};

const columns = [
    {
        Header: () => <span className="table-title uppercase font-bold">League</span>,
        accessor: 'league',

        Cell: (props: { value: string }) => <span className="table-title-row">{props.value}</span>
    },
    {
        Header: () => <span className="table-title uppercase font-bold">Current Rank</span>,
        accessor: 'rank',

        Cell: (props: { value: { movement: string; current: number } }) => (
            <div className="rank flex justify-center items-center">
                <span className={`movement mr-1 ${props.value.movement === 'up' ? 'up' : 'down'}`}>
                    {props.value.movement === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                </span>
                {' '}
                {props.value.current}
            </div>
        )
    },
    {
        Header: () => <span className="table-title uppercase font-bold">Last Rank</span>,
        accessor: 'rank',

        Cell: (props: { value: { movement: string; last: number } }) => (
            <div className="rank flex justify-center items-center">
                <span className={`movement mr-1 ${props.value.movement === 'up' ? 'up' : 'down'}`}>
                    {props.value.movement === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                </span>
                {' '}
                {props.value.last}
            </div>
        )
    }
];

// mock data
const table = [
    {
        league: 'Tanner Linsley',
        movement: 'well',
        rank: {
            movement: 'up',
            current: 123,
            last: 23
        }
    },
    {
        league: 'Tanner Linsley',
        movement: 'well',
        rank: {
            movement: 'down',
            current: 123,
            last: 23
        }
    }
];

const Leagues = () => {
    const titles = [
        {
            title: 'Private classic leagues',
            id: '0'
        },
        {
            title: 'Public classic leagues',
            id: '1'
        },
        {
            title: 'Global leagues',
            id: '2'
        }
    ];

    return (
        <div className="leagues">
            <div className="container">
                <div className="jumbotron paper mb-12 rounded flex items-end justify-between pt-6">
                    <div className="jumbotron-content mt-12 mb-12">
                        <h2 className="title mb-12 text-secondary">
                            <div className="sub title mb-4 flex items-center">
                                <FaStar />
                                My Leagues
                            </div>
                            {map(mockData.leagues, (item, index) => (index === mockData.leagues.length - 1 ? item : `${item}, `))}
                        </h2>
                        <Link
                            to="/leagues/join"
                            className="bg-primary hover:bg-teal-400 text-secondary hover:text-white py-2 px-8 border-2 border-teal-300 rounded mr-6"
                        >
                            Join
                        </Link>
                        <Link
                            to="/leagues/create"
                            className="g-transparent hover:bg-teal-400 text-secondary hover:text-white py-2 px-6 border-2 border-gray-700 hover:border-transparent rounded"
                        >
                            New League
                        </Link>
                    </div>
                    <div className="players flex">
                        <img src={FirstPlayer} alt="player" />
                        <img src={SecondPlayer} alt="player" />
                    </div>
                </div>
                <div className="tables">
                    {map(titles, item => (
                        <LeagueTable columns={columns} data={table} title={item} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Leagues;
