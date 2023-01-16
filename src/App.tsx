import ThemeCustomization from './themes';
import Routes from './routes';
import ScrollTop from './components/ScrollTop';

function App() {
  return (
    <div className="App">
      <ThemeCustomization>
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </ThemeCustomization>
    </div>
  );
}

export default App;
