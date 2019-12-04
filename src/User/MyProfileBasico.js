import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ErrorMessage from '../Error';
import Repositories from '../Repositories';




const Organization = ({
  data: {
    loading,
    error,
    user
  }
}) => {
  if (loading && !user) {
    return <h4>Loading</h4>
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }


  return (
    <div>
      {user.name} {user.login}
      <ul>
        {user.repositories.edges.map(edge => {
          return <li>{edge.node.name}</li>
        })}
      </ul>
    </div>
  )
}


const REPOSITORIES_OF_ORGANIZATION = gql`
query ($user: String!) {
    user(login:$user){
      login
      name
      repositories(first: 10) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`

const REPOSITORIES_OF_ORGANIZATION_CONFIG = {
  options: ({ user }) => ({
    variables: {
      user:'the-road-to-learn-react'
    },
  }),
};

export default graphql(
  REPOSITORIES_OF_ORGANIZATION,
  REPOSITORIES_OF_ORGANIZATION_CONFIG
)(Organization);
