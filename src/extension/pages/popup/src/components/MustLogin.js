import React from "react";

class MustLogin extends React.Component {
  render() {
    return (
      <div>
        <p>You are not logged in. Please log in!</p>
        <p>
          In order to surf the web and also get full protection from Digithrone,
          you first have to authenticate.
        </p>
      </div>
    );
  }
}

export default MustLogin;
