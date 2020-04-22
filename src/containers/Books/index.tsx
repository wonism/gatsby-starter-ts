import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import Context, { initialState, State } from '@contexts/books';
import Books from '@components/Books';

const BooksContainer = (props: RouteComponentProps): React.ReactElement => {
  const [state, setState] = useState<State>(initialState);

  return (
    <Context.Provider value={[state, setState]}>
      {React.createElement(Books, props)}
    </Context.Provider>
  );
};

export default BooksContainer;
