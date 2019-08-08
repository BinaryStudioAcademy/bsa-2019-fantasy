import React, { Component } from "react";
import LoginForm from "../../../components/AuthForms/LoginForm";
import "../styles.scss";
import "./responsive.scss";
import { withTranslation } from 'react-i18next';

class LoginPage extends Component {
    render() {
        const { t } = this.props;
        console.log(t);
        return (
            <div className="flex w-full h-full md:flex-row-reverse flex-wrap login-container">
                <div className="layer" />
                <div className="w-full h-full flex-col items-center justify-center md:w-3/4 ">
                    <div className="lable-wrapper  ">
                        <h1 className="main-lable w-full ">{t('LoginPage.register')}</h1>
                        <h1 className="main-lable w-full ">
                            {t('LoginPage.fantasy')}
                        </h1>
                    </div>
                </div>
                <div className="w-full h-full md:w-1/4 login-form p-6">
                    <div className="lables pl-10 mt-48 mb-6">
                        <h2 className="side-lable ">{t('LoginPage.hey')}</h2>
                        <h3 className="side-lable side-lable-small ">
                            {t('LoginPage.welcome')}
                        </h3>
                    </div>
                    <LoginForm/>
                </div>
            </div>
        );
    }
}

export default withTranslation()(LoginPage);
