import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {FormattedMessage} from 'react-intl';

import ContactList from "./components/ContactList";

class App extends Component {

  // default State object
  state = {
    contacts: []
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {

        // create an array of contacts only with relevant data
        const newContacts = response.data.map(c => {
          return {
            id: c.id,
            name: c.name
          };
        });

        // create a new "State" object without mutating
        // the original State object.
        const newState = Object.assign({}, this.state, {
          contacts: newContacts
        });

        // store the new state object in    the component's state
        this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  render() { return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"><FormattedMessage
                                              id="TITLE"
                                              defaultMessage={`Hello {name}, you have {unreadCount, number} {unreadCount, plural,
                                                          one {message}
                                                          other {messages}
                                                        }`}
                                            /></h1>
      </header>
        <ContactList contacts={this.state.contacts} />
              </div>
  );
  }
}

 export default App;

