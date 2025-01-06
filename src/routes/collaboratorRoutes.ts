import { Router } from 'express';
import { CollaboratorController } from '../controllers/CollaboratorController'; 

const router = Router();

router.post('/createCollaborator', CollaboratorController.createCollaborator);

router.get('/getAllCollaborators', CollaboratorController.getAllCollaborators);

export default router;