import React, { Component } from 'react';
import './style.css';
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import User from '../User';
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-boost'

import Footer from '../Footer';
import Navigation from '../Navigation';

const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })
const USER_DEFAULT = 'patito';

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${
        process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
      }`
    }
  }
});

const link = authLink.concat(httpLink)

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});

class App extends Component {

  constructor() {
    super();

    this.state = {
      value: USER_DEFAULT,
      user: USER_DEFAULT,
      // organization: '',
    };
  }

  onSubmit = (event) => {
    const { value } = this.state;

    this.setState({ user: value });

    event.preventDefault();
  }

  onChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { value, user } = this.state;

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h4>___</h4>
        <h1>Repositorios GitHub API</h1>

        <Navigation
          value={value}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />

        <div className="App-main">
          <User
              user={user}
          />
        </div>

        <Footer />
      </div>
      </ApolloProvider>
  );
 }
}

export default App;
