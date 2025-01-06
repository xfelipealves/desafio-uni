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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database"); // Prisma Client configurado
const collaboratorRoutes_1 = __importDefault(require("./routes/collaboratorRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const host = '0.0.0.0';
const port = 3000;
// Criando o app do Express
const app = (0, express_1.default)();
// Middleware para o Express aceitar JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // Para requisições com `Content-Type: application/x-www-form-urlencoded`
// Rotas raizes
app.use('/jobs', jobRoutes_1.default);
app.use('/collaborators', collaboratorRoutes_1.default);
// Função para iniciar o servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            // Testa a conexão com o banco de dados
            yield database_1.prisma.$connect();
            console.log(chalk_1.default.greenBright('[DB ✅] Banco de dados conectado com sucesso.'));
        }
        catch (error) {
            console.log(chalk_1.default.greenBright('[DB ❌] Erro ao conectar ao banco de dados.'));
        }
        // Inicia o servidor
        app.listen(port, host, () => {
            console.log(chalk_1.default.greenBright('\n[SRV ✅] Servidor iniciado com sucesso!'));
            console.log(chalk_1.default.cyanBright('\nEndereços disponíveis:'));
            console.log(chalk_1.default.yellowBright(`- Local: http://127.0.0.1:${port}`));
            console.log(chalk_1.default.blueBright('\nPressione CTRL+C para parar o servidor.\n'));
        });
    }
    catch (error) {
        console.error(chalk_1.default.redBright('[SRV ❌] Erro ao iniciar o servidor:'), error.message);
        process.exit(1); // Finaliza o processo com erro
    }
});
// Verifica se está em ambiente de desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
    startServer();
}
