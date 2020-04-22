import React from 'react';

import Gnb from './Gnb';
import Footer from './Footer';

interface Props {
  element: React.ReactNode;
}

const Layouts = ({ element }: Props): React.ReactElement => (
  <>
    <Gnb />
    <main>
      {element}
    </main>
    <Footer />
  </>
);

export default Layouts;
