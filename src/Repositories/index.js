import React from 'react';
import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import {
  WATCH_REPOSITORY,
  STAR_REPOSITORY,
  UNSTAR_REPOSITORY,
} from './mutations';


import FetchMore from '../FetchMore';
import Link from '../Link';

import './style.css';


const doFetchMore = (fetchMore) => (cursor, { entry }) => fetchMore({
  variables: {
    cursor,
  },
  updateQuery: (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }

    return {
      ...previousResult,
      [entry]: {
        ...previousResult[entry],
        repositories: {
          ...previousResult[entry].repositories,
          ...fetchMoreResult[entry].repositories,
          edges: [
            ...previousResult[entry].repositories.edges,
            ...fetchMoreResult[entry].repositories.edges,
          ],
        }
      }
    }
  },
});

const Repositories = ({
  loading,
  repositories,
  entry,
  fetchMore,
  onWatchToggle,
  onStarAdd,
  onStarRemove,
}) =>
  <div>
    {repositories.edges.map(repository =>
      <div key={repository.node.id} className="Repository">
        <Repository
          { ...repository.node }
          onWatchToggle={onWatchToggle}
          onStarAdd={onStarAdd}
          onStarRemove={onStarRemove}
        />

      </div>
    )}

    <FetchMore
      payload={{ entry }}
      loading={loading}
      pageInfo={repositories.pageInfo}
      doFetchMore={doFetchMore(fetchMore)}
    >
      Repositories
    </FetchMore>
  </div>

const Repository = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
}) =>
  <div>
    <div className="Repository-title">
      <h2>
        <Link href={url}>{name}</Link>
      </h2>

    </div>

    <div className="Repository-description">
      <div
        className="Repository-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="Repository-description-details">
        <div>{owner && <span>Usuario: <a href={owner.url}>{owner.login}</a></span>}</div>
      </div>
    </div>
  </div>

export default compose(
  graphql(
    WATCH_REPOSITORY.WATCH_REPOSITORY_MUTATION,
    WATCH_REPOSITORY.WATCH_REPOSITORY_CONFIG
  ),
  graphql(
    STAR_REPOSITORY.STAR_REPOSITORY_MUTATION,
    STAR_REPOSITORY.STAR_REPOSITORY_CONFIG
  ),
  graphql(
    UNSTAR_REPOSITORY.UNSTAR_REPOSITORY_MUTATION,
    UNSTAR_REPOSITORY.UNSTAR_REPOSITORY_CONFIG
  ),
)(Repositories);
