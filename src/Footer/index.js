import React from 'react';

import Link from '../Link';

import './style.css';

const Footer = () =>
  <div className="Footer">
    <div>
      <small>
        <span className="Footer-text">RETO CODE CHALLENGE RAVN </span>
        {' '}
        <Link className="Footer-link" href="https://github.com/rogerCL2020/CodeChallenge">Roger Felix Condori Larico</Link>
        {' '}
      </small>
    </div>
    <div>
      <small>
        <span className="Footer-text">Realizado con GitHub API, GraphQL, Apollo Client y React JS</span>
        {' '}
        <Link className="Footer-text">Repositorio GitHub</Link>
        {' '}
        <span className="Footer-text">realizado el 28/09/2019</span>
        {' '}
        <span className="Footer-text">.</span>
      </small>
    </div>
  </div>

export default Footer;
