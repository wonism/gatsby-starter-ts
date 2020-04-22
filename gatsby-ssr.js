import { Helmet } from 'react-helmet';

import Layouts from './src/shared/Layouts';

export const onRenderBody = (
  { setHeadComponents, setHtmlAttributes, setBodyAttributes },
) => {
  const helmet = Helmet.renderStatic();

  setHtmlAttributes(helmet.htmlAttributes.toComponent());
  setBodyAttributes(helmet.bodyAttributes.toComponent());

  setHeadComponents([
    helmet.title.toComponent(),
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
  ]);
};

export const wrapPageElement = Layouts;
