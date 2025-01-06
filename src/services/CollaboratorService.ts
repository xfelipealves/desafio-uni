import { PrismaClient } from '@prisma/client';
import { Collaborator } from '../models/Collaborator';

const prisma = new PrismaClient();

export class CollaboratorService {
  public async addCollaborator(collaborator: Collaborator): Promise<{ success: boolean; collaborator?: Collaborator }> {
    try {
      // Verifica se o Job existe
      const job = await prisma.job.findUnique({ where: { id: collaborator.jobId } });
      if (!job) return { success: false };

      // Verifica se o colaborador já existe
      const exists = await prisma.collaborator.findFirst({
        where: { fullName: collaborator.fullName, jobId: collaborator.jobId },
      });
      if (exists) return { success: false };

      // Adiciona colaborador
      const created = await prisma.collaborator.create({
        data: {
          fullName: collaborator.fullName,
          birthDate: collaborator.birthDate,
          jobId: collaborator.jobId,
        },
      });

      return { success: true, collaborator: new Collaborator(created.fullName, created.birthDate, created.jobId) };
    } catch (error: any) {
      console.error(`[CollaboratorService] Error adding collaborator: ${error.message}`);
      throw error;
    }
  }

  public async getAllCollaborators(): Promise<Collaborator[]> {
    try {
      const collaborators = await prisma.collaborator.findMany({
        include: { Job: true }, // Certifique-se de que o relacionamento está correto
      });

      return collaborators;
    } catch (error: any) {
      console.error(`[CollaboratorService] Error fetching collaborators: ${error.message}`);
      throw error;
    }
  }
}
