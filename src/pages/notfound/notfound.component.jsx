import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { availableRoutesList } from 'routes/availableRoutesList';

import styles from './notfound.module.scss';

function NotFound() {
  return (
    <div className={styles.NotFound_Container}>
      <div className={styles.NotFound_Wrapper}>
        <p className={styles.NotFound_Text}>
          <FormattedMessage
            id="notFound"
            defaultMessage="Ooops... Page not found"
          />
        </p>
        <Link to={availableRoutesList.HOME} className={styles.NotFound_Link}>
          {' '}
          <h1>Go to Homepage </h1>
          <p className={styles.NotFound_Arrow}>&#8594;</p>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
