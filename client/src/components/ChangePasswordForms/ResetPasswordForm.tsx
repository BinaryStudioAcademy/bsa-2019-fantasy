import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';

import { resetPassword } from 'containers/Profile/actions';

class ResetPasswordForm extends Component<
  // TODO: change prop types
  any,
  { password: string; isPasswordValid: boolean; isLoading: boolean }
> {
  state = {
    password: '',
    isPasswordValid: true,
    isLoading: false,
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
    const { password } = this.state;
    const { id } = this.props.match.params;

    try {
      await this.props.resetPassword({ password, id });
    } catch {
      // TODO: show error
      console.log('Something went wrong');
    }
  };

  render() {
    const { isPasswordValid, password } = this.state;

    return (
      <form className='w-full max-w-lg' onSubmit={this.handleSubmit}>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase text-gray-700 text-xs font-bold mb-2'
              htmlFor='password'
            >
              New Password
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='password'
              type='password'
              onChange={(ev) => this.passwordChanged(ev.target.value)}
              onBlur={this.validatePassword}
            />
          </div>
        </div>
        <button
          type='submit'
          className={`shadow bg-primary hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${!password &&
            'opacity-50 cursor-not-allowed'}`}
          disabled={!isPasswordValid}
        >
          Change Password
        </button>
      </form>
    );
  }
}

const actions = { resetPassword };
//TODO: fix any type
const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(ResetPasswordForm);
