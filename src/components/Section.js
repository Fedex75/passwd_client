import React from 'react';
import Topbar from './Topbar';

function Section(props){
  return (
    <div className="section">
      <Topbar />
      <div className="section__content" id={props.name}>
        {props.children}
      </div>
    </div>
  )
}

export default Section;
