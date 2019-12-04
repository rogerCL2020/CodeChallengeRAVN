import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ErrorMessage from '../Error';

import Repositories from '../Repositories';
import REPOSITORY_FRAGMENT from '../Repositories/fragments';



const User = ({
  data: {
    loading,
    error,
    user,
    fetchMore,
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
      <p><b>Datos Usuario </b>: {user.name} </p>
      <b>email:{user.email}</b>
      <Repositories
        repositories={user.repositories}
        fetchMore={fetchMore}
        entry={'user'}
      />
    </div>
  )
}


const REPOSITORIES_OF_USER = gql`
query ($user: String!, $cursor: String) {
    user(login:$user){
      login
      name
      url
      email
      repositories(first: 5,after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}

`

const REPOSITORIES_OF_USER_CONFIG = {
  options: ({ user }) => ({
    variables: {
      user,
      cursor: null,
    },
    skip: user === '',
    notifyOnNetworkStatusChange: true,
  }),
};

export default graphql(
  REPOSITORIES_OF_USER,
  REPOSITORIES_OF_USER_CONFIG
)(User);
