import React, { Component } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import cn from 'classnames';
import validator from 'validator';
import { feedback } from 'react-feedbacker';

import { resetPassword, loadCurrentUser } from 'containers/Profile/actions';

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
    isPasswordValid: false,
    isLoading: false,
    isSuccess: false,
    isError: false,
  };

  validatePassword = (password: string) => {
    return !validator.isEmpty(password) && validator.isLength(password, { min: 8 });
  };

  passwordChanged = (password: string) => {
    this.setState({ password, isPasswordValid: this.validatePassword(password) });
  };

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
      feedback.success('Successfully changed your password!');
      this.props.history.replace('/');
    } catch {
      this.setState({ isLoading: false, isError: true, isSuccess: false });
      feedback.error('Could not change the password');
    }
  };

  render() {
    const { isPasswordValid, isSuccess, isError, isLoading } = this.state;
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
            />
          </div>
          <button
            type='submit'
            className={cn(
              'font-bold rounded py-1 px-6 mr-2 border border-transparent text-secondary bg-primary shadow uppercase',
              (!isPasswordValid || isLoading) && 'opacity-50 cursor-not-allowed',
            )}
            disabled={!isPasswordValid || isLoading}
          >
            {`${isLoading ? t('wait') : t('ChangePasswordForms.changePassword')}`}
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

const actions = { resetPassword, loadCurrentUser };
//TODO: fix any type
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default withTranslation()(
  withRouter(
    //@ts-ignore
    connect(
      null,
      mapDispatchToProps,
    )(ResetPasswordForm),
  ),
);
