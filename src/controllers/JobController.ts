import { Request, Response } from 'express';
import { JobService } from '../services/JobService';
import { Job } from '../models/Job';

const jobService = new JobService();

export const JobController = {
  // Criar cargo
  createJob: async (req: Request, res: Response): Promise<void> => {
    // console.log(req.body);
    try {
      const isArray = Array.isArray(req.body);

      if (!isArray) {
        const { name, baseSalary } = req.body;
        const job = new Job(name, baseSalary);
        const result = await jobService.addJob(job);
        
        if (result.success) {
          res.status(201).json({ message: 'Job created successfully.', job: result.job });
        } else {
          res.status(409).json({ message: 'Job already exists.' });
        }
      } else {
        res.status(400).json({ message: 'Invalid request body.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  },

  // Listar cargos
  getAllJobs: async (_req: Request, res: Response): Promise<void> => {
    try {
      const jobs = await jobService.getAllJobs();

      if (jobs.length > 0) {
        res.status(200).json({ message: 'Jobs found.', jobs });
      } else {
        res.status(404).json({ message: 'No jobs found.' });
      }
    } catch (error: any) {
      res.status(500).json({ message: 'Internal server error', details: error.message });
    }
  },
};
