import React from 'react';
import { render } from 'react-dom';
import Home from './scenes/Home';
import 'i18n';
import './generated/tailwind.output.css';

const target = document.getElementById('root');
render(<Home />, target);
