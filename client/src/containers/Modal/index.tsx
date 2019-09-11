import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children?: ReactNode;
  onDismiss?: (e: React.SyntheticEvent) => void;
};

class Modal extends React.Component<Props> {
  target = document.querySelector('#modal');
  render() {
    if (!this.target) return;

    return ReactDOM.createPortal(
      <div className='font-sans'>
        <div
          className='dimmer flex absolute inset-0 bg-modalDimmer z-20'
          onClick={this.props.onDismiss}
          tabIndex={-1}
          role='presentation'
        >
          <div
            className='modal m-auto max-w-full max-h-full bg-white rounded'
            onClick={(e) => e.stopPropagation()}
            role='presentation'
          >
            {this.props.children}
          </div>
        </div>
      </div>,
      this.target,
    );
  }
}

export default Modal;
