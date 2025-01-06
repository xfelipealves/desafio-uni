import { Request, Response } from 'express';
import { CollaboratorService } from '../services/CollaboratorService'; // Encapsula lógica de banco
import { Collaborator } from '../models/Collaborator';

const collaboratorService = new CollaboratorService();

export const CollaboratorController = {
  
  // Criar colaborador
  createCollaborator: async (req: Request, res: Response): Promise<void> => {
    
    try {
      const isArray = Array.isArray(req.body);
      
      if (!isArray) {
        const { fullName, birthDate, jobId } = req.body;
        const collaborator = new Collaborator(fullName, new Date(birthDate), Number(jobId));
        const result = await collaboratorService.addCollaborator(collaborator);
  
        if (result.success) {
          res.status(201).json({ message: 'Collaborator created successfully.', collaborator: result.collaborator });
        } else {
          res.status(409).json({ message: 'Collaborator already exists or job not found.' });
        }
      } else {
        res.status(400).json({ message: 'Invalid request body.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  },

  // Listar colaboradores
  getAllCollaborators: async (_req: Request, res: Response): Promise<void> => {
    try {
      const collaborators = await collaboratorService.getAllCollaborators();

      if (collaborators.length > 0) {
        res.status(200).json({ message: 'Collaborators found.', collaborators });
      } else {
        res.status(404).json({ message: 'No collaborators found.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  },
};
