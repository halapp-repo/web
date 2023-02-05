import { useLocation } from 'react-router-dom';
import useCookie from '../../hooks/useCookie';
import { useEffect } from 'react';
import { CookiePolicyContent } from './CookiePolicyContent';
import { CookieConsent } from '../../models/cookie-consent';

const CookiePolicy = () => {
  const { pathname } = useLocation();
  const [consent, setConsent] = useCookie('consent', '');

  useEffect(() => {
    if (consent) {
      const cookieConsent: CookieConsent = JSON.parse(consent);
      if (cookieConsent.AnalyticsCookies) {
        if (window) {
          window.gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted'
          });
        }
      }
    }
  }, [consent]);

  const getContent = () => {
    const canNotBeSeen =
      pathname === '/cerez-politikasi' || pathname === '/privacy' || consent !== '';
    if (canNotBeSeen) {
      return null;
    }
    return <CookiePolicyContent SetConsent={setConsent} />;
  };

  return getContent();
};

export { CookiePolicy };
