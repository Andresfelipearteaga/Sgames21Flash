import SelectStrategy from "../components/selectStrategy/selectStrategy";
import HelpStrategyConcept from "../components/helpStrategy/helpStrategyConcept";
import Header from '../components/common/header'
import LogoSection from "../components/logoSection/logoSection";
import background from "../assets/fondoinicio.png";

import { useState } from "react";

const Dashboard = () => {
  const [keyConcept, setKeyConcept] = useState(null);
  const selectedKey = (key) => {
    setKeyConcept(key);
  };
  return (
    <div className="bg-gray-200 h-screen w-full" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover'}}>
        <Header/>
      {/* Top text */}
      
      {/* Grid container layout */}
      <div className="grid grid-cols-14 grid-rows-8 gap-2 h-full">
        {/* Top row */}
        <div className="col-span-5 row-span-2 rounded-lg">
          <LogoSection />
        </div>
        <div className="bg-gray-300 col-span-3 row-span-2 rounded-lg"></div>
        <div className="bg-gray-900 col-span-6 row-span-2 rounded-lg"></div>
        
        {/* Bottom row */}
        <div className="bg-gray-900 col-span-3 row-span-7 rounded-lg">
          <HelpStrategyConcept SelectedKey={keyConcept} />
        </div>
        <div className="bg-gray-900 col-span-10 row-span-7 rounded-lg">
          <SelectStrategy SelectedKey={selectedKey} />
        </div>
        <div className="bg-gray-900 col-span-1 row-span-7 rounded-lg"></div>
      </div>
    </div>
  );
};
export default Dashboard
