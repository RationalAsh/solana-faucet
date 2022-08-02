import * as React from 'react';

export interface IFooterProps {
}

export default function Footer (props: IFooterProps) {
  return (
    <footer className='footer' style={{position: "absolute", left: "0", right: "0", bottom: "0", paddingBottom: "15px", paddingLeft: "40%"}}>
        <div>
            Made by <a href='http://www.ashwinnarayan.com'>Ashwin</a> using <a href='https://reactjs.org/' rel="noreferrer" target='_blank'>React</a>.
        </div>
    </footer>
  );
}
