"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorService = void 0;
const client_1 = require("@prisma/client");
const Collaborator_1 = require("../models/Collaborator");
const prisma = new client_1.PrismaClient();
class CollaboratorService {
    addCollaborator(collaborator) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica se o Job existe
                const job = yield prisma.job.findUnique({ where: { id: collaborator.jobId } });
                if (!job)
                    return { success: false };
                // Verifica se o colaborador já existe
                const exists = yield prisma.collaborator.findFirst({
                    where: { fullName: collaborator.fullName, jobId: collaborator.jobId },
                });
                if (exists)
                    return { success: false };
                // Adiciona colaborador
                const created = yield prisma.collaborator.create({
                    data: {
                        fullName: collaborator.fullName,
                        birthDate: collaborator.birthDate,
                        jobId: collaborator.jobId,
                    },
                });
                return { success: true, collaborator: new Collaborator_1.Collaborator(created.fullName, created.birthDate, created.jobId) };
            }
            catch (error) {
                console.error(`[CollaboratorService] Error adding collaborator: ${error.message}`);
                throw error;
            }
        });
    }
    getAllCollaborators() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collaborators = yield prisma.collaborator.findMany({
                    include: { Job: true }, // Certifique-se de que o relacionamento está correto
                });
                return collaborators;
            }
            catch (error) {
                console.error(`[CollaboratorService] Error fetching collaborators: ${error.message}`);
                throw error;
            }
        });
    }
}
exports.CollaboratorService = CollaboratorService;
