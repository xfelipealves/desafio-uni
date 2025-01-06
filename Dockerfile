# Use a imagem oficial do Node.js
FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos para o container
COPY . .

# Realize o build do TypeScript
RUN npm run build

# Exponha a porta da aplicação
EXPOSE 3000

# Gera o Prisma Client e inicia o servidor
CMD ["sh", "-c", "npx prisma generate && npm run start"]
