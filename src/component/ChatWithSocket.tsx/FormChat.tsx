import React from "react";

const FormChat = () => {




  let body;
  // if (
  // ) {
  //   body = (
  //     <div>
        
  //         <div >
  //           <h3></h3>
  //           <p></p>
  //         </div>
  //     </div>
  //   );
  // } else {
  //   body = (
  //     <button >
  //       Join 
  //     </button>
  //   );
  // }
  return (
    <div>
      <h1>Welcome to room chat</h1>
      <div>
        <div>
          <h2>Menu</h2>
          <div>
            <h3>Room Type</h3>
          </div>
          <div>
            <h3>All user in room</h3>
          </div>
        </div>
        <div>
          <div>Name room: </div>
          <div>{body}</div>
          <input
            type="text"
            // value={message}
            // onKeyPress={handleKeyPress}
            placeholder="text here..."
            // onChange={handleMessageChange}
          /><button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default FormChat;
