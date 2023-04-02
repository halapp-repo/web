import { CookiePolicy } from './components/cookie-policy/CookiePolicy';
import { InternetConnection } from './components/InternetConnection';
import ScrollTop from './components/ScrollTop';
import Routes from './routes';
import ThemeCustomization from './themes';

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
