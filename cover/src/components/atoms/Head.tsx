import React from 'react';
import Helmet from 'react-helmet';

type Props = {
  thread: any;
  serverMetas: any;
};

const Component: React.FC<Props> = ({ thread, serverMetas }) => {
  console.log(serverMetas);
  return (
    <Helmet>
      <link rel="icon" href={thread.favicon} />
      <link rel="shortcut icon" href={thread.favicon} />
      {Object.keys(serverMetas).map((key) => {
        if (key === 'title') {
          return <title>{serverMetas.title}</title>;
        } else {
          return serverMetas[key] !== '' && <meta key={key} name={key} content={serverMetas[key]} />;
        }
      })}
    </Helmet>
  );
};

export default Component;
