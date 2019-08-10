import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';

import { forgotPassword } from 'containers/Profile/actions';
import { ForgotPasswordCredentials } from 'types/forgot.password.types';

type ActionType = (props: ForgotPasswordCredentials) => Promise<any>;
class ForgotPasswordForm extends Component<
  // TODO: change prop types
  any,
  { email: string; isEmailValid: boolean; isLoading: boolean }
> {
  state = {
    email: '',
    isLoading: false,
    isEmailValid: true,
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
    this.setState({ isLoading: true });
    // TODO: show loading
    try {
      await this.props.forgotPassword({ email });
    } catch {
      this.setState({ isLoading: false });
      // TODO: show error
      console.log('Something went wrong');
    }
  };

  render() {
    return (
      <div className='w-full h-full max-w-xs form-registration'>
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
          <button type='submit' className='font-medium  py-2 px-4 border  sign-up-btn'>
            Send
          </button>
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
