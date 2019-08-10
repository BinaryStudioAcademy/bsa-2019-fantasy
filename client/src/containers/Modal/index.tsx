import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  title?: string;
  content: ReactNode;
  actions?: ReactNode;
  onDismiss?: (e: React.SyntheticEvent) => void;
};

class Modal extends React.Component<Props> {
  target = document.querySelector('#modal');
  render() {
    if (!this.target) return;

    return ReactDOM.createPortal(
      <div>
        <div
          className='dimmer flex absolute inset-0 bg-modalDimmer'
          onClick={this.props.onDismiss}
          tabIndex={-1}
          role='presentation'
        >
          <form
            className='modal m-auto max-w-full max-h-full bg-white'
            onClick={(e) => e.stopPropagation()}
            role='presentation'
          >
            <div className='header'>
              <h3>{this.props.title}</h3>
            </div>
            <div className='content'>{this.props.content}</div>
            <div className='actions'>{this.props.actions}</div>
          </form>
        </div>
      </div>,
      this.target,
    );
  }
}

export default Modal;
