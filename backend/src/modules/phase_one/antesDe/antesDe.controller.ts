import { Request, Response } from "express";
import { AntesDeService } from "./antesDe.service";

export class AntesDeController {
  static async getMessage(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await AntesDeService.getInfoPhaseStudent(Number(id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updatedStage(req: Request, res: Response) {
    const { id_stage, id_user } = req.body;
    try {
      const response = await AntesDeService.updateInfoPhaseStudent(id_stage, id_user)
      res.status(201).json(response)
  }  catch (error: any) {
    res.status(400).json({ success: false, message: error.message });

  }
}
}