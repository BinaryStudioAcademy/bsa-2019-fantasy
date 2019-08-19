import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cn from 'classnames';
import validator from 'validator';

import { forgotPassword } from 'containers/Profile/actions';
import { ForgotPasswordCredentials } from 'types/forgot.password.types';

import styles from '../AuthForms/styles.module.scss';

type ActionType = (props: ForgotPasswordCredentials) => Promise<any>;
class ForgotPasswordForm extends Component<
  // TODO: change prop types
  any,
  {
    email: string;
    isEmailValid: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  }
> {
  state = {
    email: '',
    isLoading: false,
    isEmailValid: true,
    isSuccess: false,
    isError: false,
  };

  validateEmail = () => {
    const { email } = this.state;
    const isEmailValid = !validator.isEmpty(email);
    this.setState({ isEmailValid });
    return isEmailValid;
  };

  emailChanged = (email: string) => this.setState({ email, isEmailValid: true });

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { isLoading, isEmailValid, email } = this.state;
    if (!isEmailValid || isLoading) {
      return;
    }
    this.setState({ isLoading: true, isSuccess: false, isError: false });

    try {
      await this.props.forgotPassword({ email });
      this.setState({
        isLoading: false,
        isSuccess: true,
        isError: false,
      });
    } catch {
      this.setState({ isLoading: false, isError: true, isSuccess: false });
      console.log('Something went wrong');
    }
  };

  render() {
    const { isEmailValid, email, isSuccess, isError, isLoading } = this.state;

    return (
      <div className={cn(styles['form-registration'], 'w-full h-full max-w-xs')}>
        <form className=' px-8 pt-6 pb-8' onSubmit={this.handleSubmit}>
          <div className='mb-4'>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Email address'
              onChange={(ev) => this.emailChanged(ev.target.value)}
              onBlur={this.validateEmail}
            />
          </div>
          <button
            type='submit'
            className={`font-bold rounded py-1 px-6 mr-2 border border-transparent text-secondary bg-primary shadow uppercase ${(!email ||
              isLoading) &&
              'opacity-50 cursor-not-allowed'}`}
            disabled={!isEmailValid || isLoading}
          >
            {`${isLoading ? 'Wait' : 'Send'}`}
          </button>
          {isSuccess && (
            <p className='text-primary font-bold mb-2'>Сheck your mailbox!</p>
          )}
          {isError && (
            <p className='text-red-500 font-bold mb-2'>Something went wrong!</p>
          )}
        </form>
      </div>
    );
  }
}

const actions = { forgotPassword };
//TODO: fix any type
const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(ForgotPasswordForm);
