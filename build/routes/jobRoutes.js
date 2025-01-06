"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JobController_1 = require("../controllers/JobController");
const router = (0, express_1.Router)();
router.post('/createJob', JobController_1.JobController.createJob);
router.get('/getAllJobs', JobController_1.JobController.getAllJobs);
exports.default = router;
