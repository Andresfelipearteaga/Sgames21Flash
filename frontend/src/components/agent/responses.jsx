import nube from "../../assets/nube.png";

const responses = () => {
  return (
    <div style={{backgroundImage: `url(${nube})`, backgroundSize: 'cover'}} className="w-5/6 h-full">
      <div className="px-16 py-4">
        <p className="text-lg font-semibold text-gray-700">
            Hola soy andreina y soy el agente de tu proyecto
        </p>
      </div>
    </div>
  )
}

export default responses
