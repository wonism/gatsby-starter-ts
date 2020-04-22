import React from 'react';
import { Helmet } from 'react-helmet';

import { visuallyHidden } from '@constants/styles';

interface Props {
  title: string;
  hide?: boolean;
}

const Head = ({ title, hide = false }: Props): React.ReactElement => (
  <>
    <Helmet>
      <title>
        {title}
      </title>
    </Helmet>
    <h1 css={hide ? visuallyHidden : undefined}>
      {title}
    </h1>
  </>
);

export default Head;
