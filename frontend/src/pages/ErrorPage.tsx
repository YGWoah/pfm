import React from 'react';
import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error: Error | unknown = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error instanceof Error ? error.message : String(error)}
        </i>
      </p>
    </div>
  );
}

export default ErrorPage;
