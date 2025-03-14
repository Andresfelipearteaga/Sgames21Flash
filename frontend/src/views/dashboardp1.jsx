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
import Introduction from "../components/introduction/introduction";
import { useP1Context } from "../contexts/p1Context";
import LoadingHome from "../components/common/loadingHome.jsx";
import LoadingPages from "../components/common/loadingPages";
import BeforeStart from "../components/p1/before/start";
import { Bot } from "lucide-react";
import useGetPhaseStudent from "../hooks/useGetStage";
import useAgentMessage from "../hooks/useAgentMessage";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [keyConcept, setKeyConcept] = useState(null);
  const { isLoading } = useGetPhaseStudent();
  const {
    isAgentTalking,
    setIsAgentTalking,
    progress,
    setProgress,
    stage,
    isFullScreenVisible,
    setIsFullScreenVisible,
  } = useP1Context();

  const { isLoadingAgent, message, fetchAgentMessage } = useAgentMessage();
  useEffect(() => {
    // Simulación de carga progresiva
    setProgress(10);
  }, []);

  const selectedKey = (key) => {
    setKeyConcept(key);
  };
  // Función para iniciar/detener la animación de hablar
  const agentEvent = (key) => {
    console.log(key);
    setIsAgentTalking((prev) => !prev);
  };

  if (isLoading) return <LoadingPages />;

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
          <Agent isTalking={isAgentTalking} />
        </div>
        <div className="bg-gray-900 col-span-6 row-span-2 rounded-lg">
          <Responses fullMessage={message} />
        </div>

        {/* Bottom row */}
        <div className="bg-gray-900 col-span-3 row-span-7 rounded-lg">
          <HelpStrategyConcept
            SelectedKey={keyConcept}
            agentEvent={agentEvent}
          />
        </div>
        <div className="bg-gray-900 col-span-10 row-span-7 rounded-lg relative">
          {/* Mostrar overlay si el agente está hablando */}
          {isAgentTalking && (
            <div className="absolute inset-0 bg-gray-900 flex justify-center flex-col items-center z-50">
              <Bot size={50} className="text-white" />
              <span className="text-white font-semibold text-xl">
                Estoy hablando
              </span>
              <LoadingHome />
            </div>
          )}

          {/* Renderizar el componente correspondiente a la etapa */}
          {stage === "Introducción" && isFullScreenVisible
            ? (
              <Introduction
                startAgentMessage={fetchAgentMessage}
                onClose={() => setIsFullScreenVisible(false)}
              />
            )
            : stage === "Introducción" && !isFullScreenVisible
            ? <BeforeStart initCheckList={fetchAgentMessage} />
            : null}{" "}
          {stage === "CheckInicial" && (
            <SelectStrategy SelectedKey={selectedKey} />
          )}
          {stage === "CheckFinal" && <FinalChecklist />}
          {stage === "Actividad" && <BeforeStart />}
        </div>
        <div className="bg-gray-900 col-span-1 row-span-7 rounded-lg flex items-center justify-center flex-col">
          <ProgressBar progress={progress} />
          <ProfileButton />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
