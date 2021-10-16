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
      {Object.keys(serverMetas).map((key) => {
        if (key === 'title') {
          return <title>{serverMetas.title}</title>;
        } else if (key === 'og:url') {
          return undefined;
        } else {
          return serverMetas[key] !== '' && <meta key={key} property={key} content={serverMetas[key]} />;
        }
      })}
      <meta property="og:url" content={`https://cover.talkn.io${thread.ch}`}></meta>;
    </Helmet>
  );
};

export default Component;
