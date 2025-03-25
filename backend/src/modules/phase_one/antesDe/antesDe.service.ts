import { AntesDeRepository } from "./antesDe.repository";
import { Meta } from "../../../interfaces/meta.interface";

export class AntesDeService {
  static async getInfoPhaseStudent(id: number): Promise<Meta> {
    if (!id) {
      throw new Error("No hay id");
    }

    try {
      const info = await AntesDeRepository.getInfoPhaseStudent(id);
      if (!info) {
        throw new Error("No se pudo obtener la información de fase");
      }
      return {
        success: true,
        message: "Información de fase obtenida correctamente",
        data: info,
      };
    } catch (error: any) {
      throw new Error(
        "Error al obtener la información de fase: " + error.message,
      );
    }
  }

  static async updateInfoPhaseStudent(
    id_stage: number,
    id_user: number,
  ): Promise<Meta> {
    if (!id_stage || !id_user) {
      throw new Error("Sin etapas o sin usuarios proporcionados");
    }
    try {
      const info = await AntesDeRepository.updateInfoStageStudent(id_stage, id_user);
      if (!info) {
        throw new Error("No se pudo actualizar el progreso");
      }
      const newStage = await AntesDeRepository.getInfoPhaseStudent(id_user)
      if (!newStage) {
        throw new Error("No se pudo obtener la nueva fase")
      }
      return {
        success: true,
        message: "Nueva Etapa actualizada",
        data: newStage
      };
    } catch (error: any) {
      throw new Error(
        "Error al actualizar el progreso: " + error.message,
      );
    }
  }

  static async updatedStrategyStudent(id: number, strategy: string, organizer: string, tool: string): Promise<Meta> {
    if (!id || !strategy || !organizer || !tool) {
      throw new Error("Sin etapas o sin usuarios proporcionados");
    }
    try {
      const updatedStrategy = await AntesDeRepository.updateStrategySudent(id, strategy, organizer, tool);
      if (!updatedStrategy) {
        throw new Error("No se pudo actualizar la estrategia");
      }

      const strategyStudent = await AntesDeRepository.getStrategyStudent(id)
      if (!strategyStudent) {
        throw new Error("No se pudo obtener la nueva estrategia")
      }
      return {
        success: true,
        message: "Nueva estrategia actualizada",
        data: strategyStudent
      };
    } catch (error: any) {
      throw new Error(
        "Error al actualizar la estrategia: " + error.message,
      );
    }
  }
}
