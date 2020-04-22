import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Router, RouteComponentProps } from '@reach/router';

import ErrorBoundary from '@shared/ErrorBoundary';
import Fallback from '@shared/Fallback';

const List = lazy(() => import('./List'));
const Detail = lazy(() => import('./Detail'));

type Props = RouteComponentProps<{ id: string }>;

const CharactersHome: React.FC<Props> = (): React.ReactElement => {
  const [requestRender, setRequestRender] = useState(false);

  useEffect(() => {
    setRequestRender(true);
  }, []);

  if (!requestRender) {
    return (
      <Fallback />
    );
  }

  /**
   * NOTE:
   * Gatsby uses ReactDOMServer.
   * To avoid https://reactjs.org/docs/error-decoder.html/?invariant=294
   * Render Suspense after component mounted.
   */
  return (
    <Suspense
      fallback={(
        <Fallback />
      )}
    >
      <ErrorBoundary
        fallback={(
          <Fallback />
        )}
      >
        <Router basepath="/characters">
          <Detail path="/:id" />
          <List path="/" default />
        </Router>
      </ErrorBoundary>
    </Suspense>
  );
};

export default CharactersHome;
