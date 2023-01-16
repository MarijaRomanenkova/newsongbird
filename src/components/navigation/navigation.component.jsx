import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logoSourceSVG from 'assets/logoSourceSVG.svg';
import Score from 'components/score/score.component';
import { availableRoutesList } from 'routes/availableRoutesList';
import LanguageSwitch from 'components/language-switch/index';

import styles from './navigation.module.scss';

function Navigation({ handleClick }) {
  const { t } = useTranslation();
  return (
    <nav className={styles.Navigation_Container}>
      <NavLink to={availableRoutesList.HOME}>
        <div>
          <img className={styles.Logo} src={logoSourceSVG} alt="Logo" />
        </div>
      </NavLink>

      <div className={styles.Navigation_Score_Wrapper}>
        <Score />
      </div>

      <div className={styles.Navigation_Link_Wrapper}>
        <div>
          <NavLink
            className={styles.Navigation_Link}
            to={availableRoutesList.LOGIN}
          >
            {t('login')}
          </NavLink>
          <NavLink
            className={styles.Navigation_Link}
            to={availableRoutesList.SIGN_UP}
          >
            {t('signup')}
          </NavLink>
        </div>
        <div className={styles.Navigation_LanguageSwitch_Wrapper}>
          <LanguageSwitch handleClick={handleClick} />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
