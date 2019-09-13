import React from 'react';
import { render } from 'react-dom';
import Home from './scenes/Home';
import 'i18n';
import './generated/tailwind.output.css';
import field from 'assets/images/field.svg';

// field preload
const img = new Image();
img.src = field;

const target = document.getElementById('root');
render(<Home />, target);
