import React, { Component } from 'react';
import validator from 'validator';

class ForgotPasswordForm extends Component<{}, { email: string; isEmailValid: boolean }> {
  state = {
    email: '',
    isEmailValid: true,
  };

  validateEmail = () => {
    const { email } = this.state;
    const isEmailValid = !validator.isEmpty(email);
    this.setState({ isEmailValid });
    return isEmailValid;
  };

  emailChanged = (email: string) => this.setState({ email, isEmailValid: true });

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { email } = this.state;
    console.log('sent');
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

export default ForgotPasswordForm;
