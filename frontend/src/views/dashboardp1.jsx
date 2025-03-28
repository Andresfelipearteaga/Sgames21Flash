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
import useUpdatePhaseStudent from "../hooks/useUpdateStage.js";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import  Activity  from "../components/p1/activity/texts.jsx";
import WordAssignment from "../components/p1/activity/WordAssignment.jsx";
// import HighlightText from "../components/p1/activity/highlighttext.jsx";
import ActorSelector from "../components/p1/activity/actorSelector.jsx";
// import TableTestimonies from "../components/p1/activity/tableTestimonies.jsx";
import JoinLine from "../components/p1/activity/JoinLine.jsx";

const Dashboard = () => {
  const [keyConcept, setKeyConcept] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { isLoading } = useGetPhaseStudent();
  const {
    isAgentTalking,
    progress,
    setProgress,
    stage,
    isFullScreenVisible,
    setIsFullScreenVisible,
  } = useP1Context();

  const { message, fetchAgentMessage } = useAgentMessage();
  const { getStageUser, isLoadingGetStage } = useUpdatePhaseStudent();
  const [NewStageNumber, setNewStageNumber] = useState(0);
  const [LocalStage, setLocalStage] = useState("Introduccion");
  useEffect(() => {
    // Simulación de carga progresiva
    setProgress(10);
  }, []);

  useEffect(() => {
    console.log("newStage", stage);
    setLocalStage(stage);
  }, [stage]);

  const selectedKey = (key) => {
    setKeyConcept(key);
  };

  useEffect(() => {
    console.log('stage', NewStageNumber)
  }, [NewStageNumber])

  const next = (stage) => {
    setIsButtonDisabled(false);
    setNewStageNumber(stage);
  };

  const nexStage = () => {
    setIsButtonDisabled(true)
    console.log('stage', NewStageNumber)
    const newStage = NewStageNumber === 3 ? 'CheckFinal' : 'Actividad'
    console.log('newStage', newStage)
    setLocalStage(newStage)
    getStageUser(NewStageNumber)
  }

  if (isLoading) return <LoadingPages />;
  if (isLoadingGetStage) return <LoadingPages />;
  

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
            agentEvent={fetchAgentMessage}
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
          {LocalStage === "Introducción" && isFullScreenVisible
            ? (
              <Introduction
                startAgentMessage={fetchAgentMessage}
                onClose={() => setIsFullScreenVisible(false)}
              />
            )
            : LocalStage === "Introducción" && !isFullScreenVisible
            ? <BeforeStart updateStage={getStageUser} />
            : null}{" "}
          {LocalStage === "CheckInicial" && (
            <SelectStrategy
              SelectedKey={selectedKey}
              initCheckInicial={fetchAgentMessage}
              next={next}
            />
          )}
          {LocalStage === "CheckFinal" && <FinalChecklist initFinalCheck={fetchAgentMessage} next={next} />}
          {LocalStage === "Actividad" &&
          // <Activity title={'Texto Primera Actividad'} text={'Manuel cada vez se daba cuenta de como los tiempos cambiaron. Las motosierras rugían, los árboles caían y el verde desaparecía. Los ganaderos expandían potreros sin límite, los agricultores talaban para sembrar a gran escala, y los madereros explotaban los árboles centenarios. Inversionistas y grandes empresas compraban tierras para proyectos urbanísticos y comerciales, destruyendo más bosque.Manuel recorrió el bosque. Los ríos eran hilos de agua, la tierra estaba seca y los animales huían. Recordó las palabras de su abuelo: "Sin árboles, no hay vida."Sabía que debía hacer algo antes de que todo desapareciera.'} />
          // <WordAssignment />
          // <HighlightText />
          <JoinLine />

          }

          <button className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition duration-300 disabled:bg-gray-600 enabled:cursor-pointer"
          disabled={isButtonDisabled}
          onClick={nexStage}
          >
            <ArrowRight size={24} />
          </button>
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
