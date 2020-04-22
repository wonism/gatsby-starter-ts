import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import Context, { initialState, State } from '@contexts/characters';
import Characters from '@components/Characters';

const CharactersContainer = (props: RouteComponentProps): React.ReactElement => {
  const [state, setState] = useState<State>(initialState);

  return (
    <Context.Provider value={[state, setState]}>
      {React.createElement(Characters, props)}
    </Context.Provider>
  );
};

export default CharactersContainer;
