import ThemeCustomization from './themes';
import Routes from './routes';
import ScrollTop from './components/ScrollTop';
import { CookiePolicy } from './components/CookiePolicy';

function App() {
  return (
    <div className="App">
      <ThemeCustomization>
        <>
          <ScrollTop>
            <Routes />
          </ScrollTop>
          <CookiePolicy />
        </>
      </ThemeCustomization>
    </div>
  );
}

export default App;
