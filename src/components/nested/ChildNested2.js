import React from 'react';
import { useParams } from 'react-router-dom';

export default function DisplayParams() {
  let { displayParam } = useParams();
  return (
    <React.Fragment>
      <h1>ChildNested2</h1>
      <p>{displayParam}</p>
    </React.Fragment>
  );
}
