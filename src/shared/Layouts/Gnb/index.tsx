import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

const Gnb = (): React.ReactElement => (
  <nav>
    <ul css={css`list-style: none;`}>
      <li>
        <Link to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/books">
          Books
        </Link>
      </li>
      <li>
        <Link to="/characters">
          Characters
        </Link>
      </li>
    </ul>
  </nav>
);

export default Gnb;
