import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function ParentNested() {
  let navigate = useNavigate();
  const handleButton = () => {
    navigate(`/parentNested/helloThisIsNested`);
  };
  return (
    <React.Fragment>
      <h1>ParentNested</h1>
      <NavLink to='childNested'>Nested route</NavLink>
      <br />
      <button onClick={handleButton}>Click me to se params </button>
      <Outlet />
    </React.Fragment>
  );
}
