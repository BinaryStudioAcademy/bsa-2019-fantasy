import React, { Component } from "react";
import RegistrationForm from "../../../components/AuthForms/RegistrationForm";
import "../styles.scss";
import "./responsive.scss";
import { withTranslation } from 'react-i18next';

class RegistrationPage extends Component {
    render() {
        const { t } = this.props;
        return (
            <div className="flex w-full md:flex-row-reverse flex-wrap login-container">
                <div className="layer" />
                <div className="w-full h-full flex-col items-center justify-center md:w-3/4 ">
                    <div className="lable-wrapper ">
                        <h1 className="main-lable w-full ">{t('RegistrationPage.register')}</h1>
                        <h1 className="main-lable w-full ">
                            {t('RegistrationPage.fantasy')}
                        </h1>
                    </div>
                </div>
                <div className="w-full h-full md:w-1/4 form-container p-6">
                    <div className="lables pl-10 mt-16">
                        <h2 className="side-lable ">{t('RegistrationPage.bsa')}</h2>
                        <h3 className="side-lable side-lable-small ">
                            {t('RegistrationPage.welcome')}
                        </h3>
                    </div>
                    <RegistrationForm/>
                </div>
            </div>
        );
    }
}

export default withTranslation()(RegistrationPage);
