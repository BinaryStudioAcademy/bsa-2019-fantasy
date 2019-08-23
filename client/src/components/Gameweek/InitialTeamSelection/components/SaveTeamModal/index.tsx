import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import Button from 'components/Button';

type Props = {
  onDismiss?: (e: React.SyntheticEvent) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
};

class SaveTeamModal extends React.Component<Props> {
  target = document.querySelector('#modal');
  render() {
    if (!this.target) return;

    return ReactDOM.createPortal(
      <div className='font-sans'>
        <div
          className='dimmer flex absolute inset-0 bg-modalDimmer'
          onClick={this.props.onDismiss}
          tabIndex={-1}
          role='presentation'
        >
          <form
            className='flex flex-col modal m-auto max-w-full max-h-full p-12 bg-white rounded-sm'
            onClick={(e) => e.stopPropagation()}
            onSubmit={(ev) => this.props.onSubmit(ev)}
            role='presentation'
          >
            <div className='header'>
              <h3 className='text-2xl font-semibold mb-4'>Enter your team name</h3>
            </div>
            <input
              className='border-2 p-2 border-gray-400 focus:border-blue-500'
              type='text'
              placeholder='Team name'
            />
            <Button className='mt-3'>
              <p>Save</p>
            </Button>
          </form>
        </div>
      </div>,
      this.target,
    );
  }
}

export default SaveTeamModal;
