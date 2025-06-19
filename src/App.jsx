import './App.css';
import Front_p from './assets/page1/front_p.jsx';
import CustomCursor from './assets/curs/CustomCursor.jsx';
import Navbar from './assets/page1/navbar/navbar.jsx';
import Mid_p from './assets/page1/middlepart/middlepart.jsx';
import Page2 from './assets/page2/page2.jsx';
import Page3 from './assets/page3/page3.jsx';
import Page4 from './assets/page4/page4.jsx';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('projects');
  return (
    <div>
      <CustomCursor />
      <Navbar setActiveTab={setActiveTab} />
      <Front_p />
      <Mid_p />
      <Page2 setActiveTab={setActiveTab} />
      <Page3 activeTab={activeTab} setActiveTab={setActiveTab} />
      <Page4 />
    </div>
  );
}

export default App;
