
import { Lock, ArrowLeft } from "lucide-react";
import { InputField } from "../common/inputFieldAuth";
import { PrimaryButton } from "../common/primaryButton";

  // Vista de Restablecer Contraseña
export const ResetPasswordView = ( { setView, setRecoverData, recoverData, checkPasswordRecovery } ) => {

    return (
    <div
      key="resetPassword"
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-md"
    >
      <div className="flex items-center mb-8">
        <button
          onClick={() => setView("recover")}
          className="mr-4 p-2 rounded-full hover:bg-purple-600 cursor-pointer transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={20} color="white" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Nueva Contraseña
          </h2>
        </div>
      </div>

      <form className="space-y-4">
        <p className="text-white text-sm mb-4">
          Crea una nueva contraseña segura que no uses en otros sitios.
        </p>

        <InputField
          icon={Lock}
          type="password"
          placeholder="Nueva contraseña"
          value=""
          onChange={(e) => { setRecoverData({ ...recoverData, password: e.target.value }); }}
        />

        <InputField
          icon={Lock}
          type="password"
          placeholder="Confirmar nueva contraseña"
          value=""
          onChange={checkPasswordRecovery}
        />

        <div className="mt-6">
          <PrimaryButton
            onClick={() => {
              alert("¡Contraseña cambiada con éxito!");
              setView("login");
            }}
          >
            Cambiar Contraseña
          </PrimaryButton>
        </div>
      </form>
    </div>
  )};