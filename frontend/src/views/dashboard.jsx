import SelectStrategy from "../components/selectStrategy/selectStrategy";
import HelpStrategyConcept from "../components/helpStrategy/helpStrategyConcept";
import Header from "../components/common/header";
import LogoSection from "../components/logoSection/logoSection";
import background from "../assets/fondoinicio.png";
import Agent from "../components/agent/agent";
import Responses from "../components/agent/responses";
import ProgressBar from "../components/progressBar/progressBar";
import ProfileButton from "../components/buttons/pofileButton";
import FinalChecklist from "../components/selectStrategy/finalSelectStrategy";

import { useState, useEffect } from "react";

const Dashboard = () => {
  const [keyConcept, setKeyConcept] = useState(null);
  const [isTalking, setIsTalking] = useState(false); // Estado de "hablando"
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulación de carga progresiva
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const selectedKey = (key) => {
    setKeyConcept(key);
  };
  // Función para iniciar/detener la animación de hablar
  const agentEvent = (key) => {
    console.log(key);
    setIsTalking((prev) => !prev);
  };
  return (
    <div
      className="bg-gray-200 space-y-2 h-screen w-full"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      <Header />
      {/* Top text */}

      {/* Grid container layout */}
      <div className="grid grid-cols-14 grid-rows-8 gap-2 h-full">
        {/* Top row */}
        <div className="col-span-5 row-span-2 rounded-lg">
          <LogoSection />
        </div>
        <div className="col-span-3 row-span-2 overflow-hidden">
          <Agent isTalking={isTalking} />
        </div>
        <div className="bg-gray-900 col-span-6 row-span-2 rounded-lg">
          {/* <Responses /> */}
        </div>

        {/* Bottom row */}
        <div className="bg-gray-900 col-span-3 row-span-7 rounded-lg">
          <HelpStrategyConcept
            SelectedKey={keyConcept}
            agentEvent={agentEvent}
          />
        </div>
        <div className="bg-gray-900 col-span-10 row-span-7 rounded-lg">
          <SelectStrategy SelectedKey={selectedKey} />
          {/* <FinalChecklist /> */}
        </div>
        <div className="bg-gray-900 col-span-1 row-span-7 rounded-lg flex items-center justify-center flex-col">
          <ProgressBar  progress={progress} />
          <ProfileButton />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
