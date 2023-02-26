import ThemeCustomization from './themes';
import Routes from './routes';
import ScrollTop from './components/ScrollTop';
import { CookiePolicy } from './components/cookie-policy/CookiePolicy';
import { InternetConnection } from './components/InternetConnection';

function App() {
  return (
    <div className="App">
      <ThemeCustomization>
        <InternetConnection>
          <>
            <ScrollTop>
              <Routes />
            </ScrollTop>
            <CookiePolicy />
          </>
        </InternetConnection>
      </ThemeCustomization>
    </div>
  );
}

export default App;
