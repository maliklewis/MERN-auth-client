import React from 'react';
import Layout from './core/Layout';

const App = () => {
  return (
    <Layout>
      <div className="col-d-6 text-center">
        <h1 className="pt-5">Parallel</h1>
        <h2 className="pb-5">A solution to all your parking needs</h2>
        <hr />
        <p className="lead">
          Parallel offers arrangements for convenient parking services.
          We do not own any of the real estate listings,
          nor do we host our own events.
        </p>
      </div>
    </Layout>
  );
};

export default App;
