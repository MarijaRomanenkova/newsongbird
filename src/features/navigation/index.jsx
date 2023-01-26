import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logoSourceSVG from 'shared/assets/logoSourceSVG.svg';
import Score from 'features/game/score';
import { availableRoutesList } from 'app/routes/available-routes-list';
import LanguageSwitch from 'shared/ui/language-switch/index';

import styles from './index.module.scss';

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
