import React, { Component } from 'react';

import RegistrationForm from '../../../components/AuthForms/RegistrationForm';

import '../styles.scss';
import './responsive.scss';

class RegistrationPage extends Component {
    render() {
        return (
            <div className='flex w-full md:flex-row-reverse flex-wrap login-container'>
                <div className='layer' />
                <div className='w-full h-full flex-col items-center justify-center md:w-3/4 '>
                    <div className='lable-wrapper '>
                        <h1 className='main-lable w-full '>Register to play</h1>
                        <h1 className='main-lable w-full '>Fantasy Premier League</h1>
                    </div>
                </div>
                <div className='w-full h-full md:w-1/4 form-container p-6'>
                    <div className='lables pl-10 mt-16'>
                        <h2 className='side-lable '>We are the BSA!</h2>
                        <h3 className='side-lable side-lable-small '>
                            Welcome to the BSA! Please, fill the form
                        </h3>
                    </div>
                    <RegistrationForm />
                </div>
            </div>
        );
    }
}

export default RegistrationPage;
