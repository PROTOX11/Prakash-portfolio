import './App.css';
import Front_p from './assets/page1/front_p.jsx';
import CustomCursor from './assets/curs/CustomCursor.jsx';
import Navbar from './assets/page1/navbar/navbar.jsx';
import Mid_p from './assets/page1/middlepart/middlepart.jsx';
import Page2 from './assets/page2/page2.jsx';
function App() {
  return (
    <div>
      <CustomCursor />
      <Navbar />
      <Front_p />
      <Mid_p />
      <Page2 />
    </div>
  );
}

export default App;