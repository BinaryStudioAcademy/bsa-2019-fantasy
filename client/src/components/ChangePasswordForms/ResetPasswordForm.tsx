import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import cn from 'classnames';
import validator from 'validator';

import { resetPassword } from 'containers/Profile/actions';

import styles from '../AuthForms/styles.module.scss';

class ResetPasswordForm extends Component<
  // TODO: change prop types
  any,
  {
    password: string;
    isPasswordValid: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  }
> {
  state = {
    password: '',
    isPasswordValid: true,
    isLoading: false,
    isSuccess: false,
    isError: false,
  };

  validatePassword = () => {
    const { password } = this.state;
    const isPasswordValid = !validator.isEmpty(password);
    this.setState({ isPasswordValid });
    return isPasswordValid;
  };

  passwordChanged = (password: string) =>
    this.setState({ password, isPasswordValid: true });

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { password, isLoading, isPasswordValid } = this.state;
    const { id } = this.props.match.params;
    if (!isPasswordValid || isLoading) {
      return;
    }

    this.setState({ isLoading: true, isError: false, isSuccess: false });

    try {
      await this.props.resetPassword({ password, id });
      this.setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
      });
    } catch {
      this.setState({ isLoading: false, isError: true, isSuccess: false });
      // TODO: show error
      console.log('Something went wrong');
    }
  };

  render() {
    const { isPasswordValid, password, isSuccess, isError, isLoading } = this.state;
    const { t } = this.props;

    return (
      <div className={cn(styles['form-registration'], 'w-full h-full max-w-xs')}>
        <form className=' px-8 pt-6 pb-8' onSubmit={this.handleSubmit}>
          <div className='mb-4'>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder={t('ChangePasswordForms.passwordPlaceholder')}
              onChange={(ev) => this.passwordChanged(ev.target.value)}
              onBlur={this.validatePassword}
            />
          </div>
          <button
            type='submit'
            className={`font-bold rounded py-1 px-6 mr-2 border border-transparent text-secondary bg-primary shadow uppercase ${(!password ||
              isLoading) &&
              'opacity-50 cursor-not-allowed'}`}
            disabled={!isPasswordValid || isLoading}
          >
            {`${
              isLoading
                ? t('ChangePasswordForms.wait')
                : t('ChangePasswordForms.changePassword')
            }`}
          </button>
          {isSuccess && (
            <p className='text-primary font-bold mb-2'>
              {t('ChangePasswordForms.success.reset')}
            </p>
          )}
          {isError && (
            <p className='text-red-500 font-bold mb-2'>
              {t('ChangePasswordForms.error')}
            </p>
          )}
        </form>
      </div>
    );
  }
}

const actions = { resetPassword };
//TODO: fix any type
const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default withTranslation()(
  withRouter(
    //@ts-ignore
    connect(
      null,
      mapDispatchToProps,
    )(ResetPasswordForm),
  ),
);
