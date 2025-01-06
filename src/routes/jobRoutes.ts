import { Router } from 'express';
import { JobController } from '../controllers/JobController';

const router = Router();

router.post('/createJob', JobController.createJob);

router.get('/getAllJobs', JobController.getAllJobs);

export default router;
