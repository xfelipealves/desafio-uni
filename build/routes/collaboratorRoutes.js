"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CollaboratorController_1 = require("../controllers/CollaboratorController");
const router = (0, express_1.Router)();
router.post('/createCollaborator', CollaboratorController_1.CollaboratorController.createCollaborator);
router.get('/getAllCollaborators', CollaboratorController_1.CollaboratorController.getAllCollaborators);
exports.default = router;
