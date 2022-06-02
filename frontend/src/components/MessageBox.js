import React from 'react';
// const mystyle = {
//   backgroundColor: 'red',
//   color: 'white',
//   padding: '4px 8px',
//   textAlign: 'center',
//   borderRadius: '5px',
//   position: 'absolute',
//   right: '50%',
// };
const div = {
  overflow: 'hidden',
  textAlign: 'center',
};

const span = {
  backgroundColor: 'red',
  color: 'white',
  textAlign: 'center',
  borderRadius: '5px',
  display: 'inline-block',
  fontSize: '2rem',

  margin: '10px 10px 0 0',
  padding: '5px 10px',
};

function MessageBox(props) {
  const { message } = props;
  return (
    <div style={div}>
      {/* <span class="closebtn" onclick="this.parentElement.style.display='none';">
        &times;
      </span>
      <strong>Danger!</strong> Indicates a dangerous or potentially negative
      action. */}
      <br />
      <span style={span}>{message}</span>
    </div>
  );
}

export default MessageBox;
