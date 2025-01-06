import chalk from 'chalk';
import express from 'express';
import { prisma } from './config/database'; // Prisma Client configurado
import collaboratorRoutes from './routes/collaboratorRoutes';
import jobRoutes from './routes/jobRoutes';

const host = '0.0.0.0';
const port = 3000;

// Criando o app do Express
const app = express();

// Middleware para o Express aceitar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para requisições com `Content-Type: application/x-www-form-urlencoded`

// Rotas raizes
app.use('/jobs', jobRoutes);
app.use('/collaborators', collaboratorRoutes);

// Função para iniciar o servidor
const startServer = async () => {
  try {
    try {
      // Testa a conexão com o banco de dados
      await prisma.$connect();
      console.log(chalk.greenBright('[DB ✅] Banco de dados conectado com sucesso.'));
    } catch (error: any) {
      console.log(chalk.greenBright('[DB ❌] Erro ao conectar ao banco de dados.'));
    }

    // Inicia o servidor
    app.listen(port, host, () => {
      console.log(chalk.greenBright('\n[SRV ✅] Servidor iniciado com sucesso!'));
      console.log(chalk.cyanBright('\nEndereços disponíveis:'));
      console.log(chalk.yellowBright(`- Local: http://127.0.0.1:${port}`));
      console.log(chalk.blueBright('\nPressione CTRL+C para parar o servidor.\n'));
    });
  } catch (error: any) {
    console.error(chalk.redBright('[SRV ❌] Erro ao iniciar o servidor:'), error.message);
    process.exit(1); // Finaliza o processo com erro
  }
};

// Verifica se está em ambiente de desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  startServer();
}
