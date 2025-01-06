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
exports.JobController = void 0;
const JobService_1 = require("../services/JobService");
const Job_1 = require("../models/Job");
const jobService = new JobService_1.JobService();
exports.JobController = {
    // Criar cargo
    createJob: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(req.body);
        try {
            const isArray = Array.isArray(req.body);
            if (!isArray) {
                const { name, baseSalary } = req.body;
                const job = new Job_1.Job(name, baseSalary);
                const result = yield jobService.addJob(job);
                if (result.success) {
                    res.status(201).json({ message: 'Job created successfully.', job: result.job });
                }
                else {
                    res.status(409).json({ message: 'Job already exists.' });
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
    // Listar cargos
    getAllJobs: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const jobs = yield jobService.getAllJobs();
            if (jobs.length > 0) {
                res.status(200).json({ message: 'Jobs found.', jobs });
            }
            else {
                res.status(404).json({ message: 'No jobs found.' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Internal server error', details: error.message });
        }
    }),
};
