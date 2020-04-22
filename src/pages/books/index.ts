import { createElement, ReactElement } from 'react';
import { RouteComponentProps } from '@reach/router';

import Books from '@containers/Books';

const BooksPage = (props: RouteComponentProps): ReactElement => createElement(Books, props);

export default BooksPage;
