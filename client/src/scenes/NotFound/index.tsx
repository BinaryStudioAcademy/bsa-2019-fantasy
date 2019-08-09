import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const NotFound = () => (
    <div className='notfound'>
        <div className='container'>
            <nav className='flex items-center justify-between flex-wrap p-6'>
                <Link to='/home'>Home</Link>
                <div>
                    <Link to='/registration' className='mr-12'>
                        Sign Up
                    </Link>
                    <Link to='/login'>Log In</Link>
                </div>
            </nav>
            <div className='jumbotron'>
                <div className='jumbotron-title'>
                    <span>4</span>
                    <div className='ball-wrapper'>
                        <div className='ball' />
                        <div className='ball-shadow' />
                    </div>
                    <span>4</span>
                </div>
                <div className='jumbotron-content'>
                    <p className='mb-4'>Looks like this freekick went off the stadium!</p>
                    <Link
                        to='/'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Take me back home
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default NotFound;
