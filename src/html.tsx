import React, { Component } from 'react';

const title = 'Gatsby Starter w/ TypeScript';
const description = 'Gatsby Starter with TypeScript';
const author = 'wonism';
const keywords = [
  'Gatsby',
  'Gatsby Starter',
  'TypeScript',
].join(', ');

export default class HTML extends Component<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
  public render(): React.ReactElement {
    const {
      htmlAttributes,
      headComponents,
      bodyAttributes,
      preBodyComponents,
      body,
      postBodyComponents,
    } = this.props;

    /* eslint-disable react/jsx-props-no-spreading */
    return (
      <html {...htmlAttributes} lang="en">
        <head>
          {headComponents}
          <title>
            {title}
          </title>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="Access-Control-Allow-Origin" content="*" />
          <meta httpEquiv="Access-Control-Allow-Headers" content="*" />
          <meta httpEquiv="Access-Control-Expose-Headers" content="*" />
          <meta httpEquiv="Access-Control-Allow-Credentials" content="true" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            id="viewport"
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, viewport-fit=cover"
          />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={title} />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={description} />
          <meta property="og:locale" content="en_US" />
          {/*
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
          <link rel="icon" type="image/png" sizes="196x196" href="/favicon-196x196.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="57x57" href="/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="114x114" href="/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="120x120" href="/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="144x144" href="/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" type="image/png" sizes="152x152" href="/apple-touch-icon-152x152.png" />
          */}
        </head>
        <body {...bodyAttributes}>
          {preBodyComponents}
          <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
          {postBodyComponents}
        </body>
      </html>
    );
    /* eslint-enable react/jsx-props-no-spreading */
  }
}
