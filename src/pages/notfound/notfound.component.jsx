import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { availableRoutesList } from 'routes/availableRoutesList';

import styles from './notfound.module.scss';

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className={styles.NotFound_Container}>
      <div className={styles.NotFound_Wrapper}>
        <p className={styles.NotFound_Text}>{t('not-found')} </p>
        <Link to={availableRoutesList.HOME} className={styles.NotFound_Link}>
          <h1> {t('not-found-link')}</h1>
          <p className={styles.NotFound_Arrow}>&#8594;</p>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
