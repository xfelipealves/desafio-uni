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
exports.CollaboratorController = void 0;
const CollaboratorService_1 = require("../services/CollaboratorService"); // Encapsula lógica de banco
const Collaborator_1 = require("../models/Collaborator");
const collaboratorService = new CollaboratorService_1.CollaboratorService();
exports.CollaboratorController = {
    // Criar colaborador
    createCollaborator: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isArray = Array.isArray(req.body);
            if (!isArray) {
                const { fullName, birthDate, jobId } = req.body;
                const collaborator = new Collaborator_1.Collaborator(fullName, new Date(birthDate), Number(jobId));
                const result = yield collaboratorService.addCollaborator(collaborator);
                if (result.success) {
                    res.status(201).json({ message: 'Collaborator created successfully.', collaborator: result.collaborator });
                }
                else {
                    res.status(409).json({ message: 'Collaborator already exists or job not found.' });
                }
            }
            else {
                res.status(400).json({ message: 'Invalid request body.' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }),
    // Listar colaboradores
    getAllCollaborators: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const collaborators = yield collaboratorService.getAllCollaborators();
            if (collaborators.length > 0) {
                res.status(200).json({ message: 'Collaborators found.', collaborators });
            }
            else {
                res.status(404).json({ message: 'No collaborators found.' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }),
};
