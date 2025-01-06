Desafio: Cadastro de Colaboradores e Cargos

Objetivo:
Criar um sistema de cadastro e gerenciamento de colaboradores, com relacionamento entre colaboradores e cargos, incluindo funcionalidades de listagem e validações específicas.

Você deve criar um sistema que gerencie colaboradores e cargos. Cada colaborador está associado a um cargo, e os cargos possuem informações como nome e salário base.

Requisitos Funcionais
1.⁠ ⁠Cadastro de Colaboradores:

Cada colaborador deve possuir:

    Nome completo (string).
    Data de nascimento (date).
    ID único (UUID).
    Referência ao cargo que ocupa.

2.⁠ ⁠Cadastro de Cargos:

Cada cargo deve possuir:

    Nome do cargo (string).
    Salário base (decimal).
    ID único (UUID).

3.⁠ ⁠Relacionamento:

    Um cargo pode estar associado a vários colaboradores.
    Cada colaborador deve estar associado a um único cargo.

4.⁠ ⁠Listagens:

    Listar todos os colaboradores com suas informações (incluindo o nome do cargo e salário).
    Listar todos os cargos com a quantidade de colaboradores associados a cada um.


### Pra rodar a aplicação

    docker-compose up --build