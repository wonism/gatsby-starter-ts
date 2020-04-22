import { createElement, ReactElement } from 'react';
import { RouteComponentProps } from '@reach/router';

import Characters from '@containers/Characters';

const CharactersPage = (props: RouteComponentProps): ReactElement => createElement(Characters, props);

export default CharactersPage;
