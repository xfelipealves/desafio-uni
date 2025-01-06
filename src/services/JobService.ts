import { PrismaClient } from '@prisma/client';
import { Job } from '../models/Job';

const prisma = new PrismaClient();

export class JobService {
  public async addJob(job: Job): Promise<{ success: boolean; job?: Job }> {
    try {
      // Verifica se o cargo já existe
      const exists = await prisma.job.findFirst({ where: { name: job.name } });
      if (exists) return { success: false };
      console.log(job);

      // Adiciona o cargo
      const created = await prisma.job.create({
        data: {
          name: job.name,
          baseSalary: job.baseSalary,
        },
      });

      return { success: true, job: new Job(created.name, created.baseSalary) };
    } catch (error: any) {
      console.error(`[JobService] Error adding job: ${error.message}`);
      throw error;
    }
  }

  public async getAllJobs(): Promise<Job[]> {
    try {
      const jobs = await prisma.job.findMany();
      console.log(jobs);
      return jobs;
    } catch (error: any) {
      console.error(`[JobService] Error fetching jobs: ${error.message}`);
      throw error;
    }
  }
}
