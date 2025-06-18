import './App.css';
import Front_p from './assets/page1/front_p.jsx';
import CustomCursor from './assets/curs/CustomCursor.jsx';
import Navbar from './assets/page1/navbar/navbar.jsx';
function App() {
  return (
    <div>
      <CustomCursor />
      <Navbar />
      <Front_p />
    </div>
  );
}

export default App;