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
exports.JobService = void 0;
const client_1 = require("@prisma/client");
const Job_1 = require("../models/Job");
const prisma = new client_1.PrismaClient();
class JobService {
    addJob(job) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Verifica se o cargo já existe
                const exists = yield prisma.job.findFirst({ where: { name: job.name } });
                if (exists)
                    return { success: false };
                console.log(job);
                // Adiciona o cargo
                const created = yield prisma.job.create({
                    data: {
                        name: job.name,
                        baseSalary: job.baseSalary,
                    },
                });
                return { success: true, job: new Job_1.Job(created.name, created.baseSalary) };
            }
            catch (error) {
                console.error(`[JobService] Error adding job: ${error.message}`);
                throw error;
            }
        });
    }
    getAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jobs = yield prisma.job.findMany();
                console.log(jobs);
                return jobs;
            }
            catch (error) {
                console.error(`[JobService] Error fetching jobs: ${error.message}`);
                throw error;
            }
        });
    }
}
exports.JobService = JobService;
