import 'focus-visible';
import { globalHistory } from '@reach/router';

import Layouts from './src/shared/Layouts';

export const onInitialClientRender = () => {
  globalHistory._onTransitionComplete();
};

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  const currentPosition = getSavedScrollPosition(location);

  window.scrollTo(...(currentPosition || [0, 0]));

  return false;
};

export const wrapPageElement = Layouts;
