import React from 'react';

import Button from '../Button';
import Input from '../Input';

import './style.css';

const Navigation = ({
  value,
  onChange,
  onSubmit,
}) =>
  <header className="Navigation">

  <div className="Navigation-link">USUARIO</div>

      <OrganizationSearch
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
      />

  </header>

const OrganizationSearch = ({
  value,
  onChange,
  onSubmit,
}) =>
  <div className="Navigation-search">
    <form onSubmit={onSubmit}>
      <Input
        color={'white'}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {' '}
      <Button color={'white'} type="submit">Buscar</Button>
    </form>
  </div>

export default Navigation;
