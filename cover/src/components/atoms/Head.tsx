import React from 'react';
import Helmet from 'react-helmet';

type Props = {
  thread: any;
  serverMetas: any;
};

const Component: React.FC<Props> = ({ thread, serverMetas }) => {
  return (
    <Helmet>
      <link rel="icon" href={thread.favicon} />
      <link rel="shortcut icon" href={thread.favicon} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      {Object.keys(serverMetas).map((key) => {
        if (key === 'title') {
          return <title key="title">{serverMetas.title}</title>;
        } else if (key === 'description' || key === 'keywords') {
          return <meta key={key} name={key} content={serverMetas[key]} />;
        } else if (key === 'og:url') {
          return undefined;
        } else {
          return serverMetas[key] !== '' && <meta key={key} property={key} content={serverMetas[key]} />;
        }
      })}
      <meta property="og:url" key={'og:url'} content={`https://cover.talkn.io${thread.ch}`}></meta>;
    </Helmet>
  );
};

export default Component;
