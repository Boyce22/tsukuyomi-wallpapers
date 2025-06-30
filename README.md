# Tsukuyomi API

## Descrição

Tsukuyomi é uma API robusta e escalável desenvolvida para gerenciar usuários, autenticação, tags e wallpapers. A aplicação inclui funcionalidades de processamento de imagem, integração com serviços de armazenamento de arquivos e comunicação com plataformas externas, como o Discord. Projetada com uma arquitetura limpa, a API visa fornecer uma base sólida para aplicações que necessitam de gerenciamento de conteúdo visual e de usuários.

## Funcionalidades

-   **Autenticação de Usuários**: Registro e autenticação de usuários com segurança.
-   **Gerenciamento de Usuários**: Funcionalidades para atualização de perfil, incluindo alteração de foto de perfil.
-   **Gerenciamento de Tags**: Criação, busca e associação de tags a conteúdos.
-   **Gerenciamento de Wallpapers**: Upload, registro e recuperação de wallpapers, incluindo metadados e tamanhos originais.
-   **Processamento de Imagens**: Compressão e otimização de imagens para diferentes usos.
-   **Integração com Armazenamento**: Suporte para serviços de armazenamento de objetos (e.g., Backblaze).
-   **Notificações**: Integração com Discord para notificações ou outras interações.

## Tecnologias Utilizadas

-   **TypeScript**: Linguagem de programação principal para tipagem estática e melhor manutenibilidade.
-   **Node.js**: Ambiente de execução JavaScript assíncrono e orientado a eventos.
-   **Express.js**: Framework web para construção de APIs RESTful.
-   **TypeORM**: ORM (Object-Relational Mapper) para interação com o banco de dados, facilitando a manipulação de entidades e migrações.
-   **Multer**: Middleware para Node.js que facilita o upload de arquivos.
-   **bcrypt**: Biblioteca para hashing de senhas.
-   **Outras**: Dependências para compressão de imagem, serviços de armazenamento e comunicação com Discord.

## Primeiros Passos

Para configurar e executar o projeto localmente, siga as instruções abaixo.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

-   Node.js (versão 18.x ou superior)
-   npm (gerenciador de pacotes do Node.js)
-   Docker e Docker Compose (recomendado para o banco de dados)

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/tsukuyomi.git
    cd tsukuyomi
    ```

2.  Instale as dependências do projeto:

    ```bash
    npm install
    ```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example` (se houver) ou com as seguintes variáveis:

```env
PORT=3000
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=user
DATABASE_PASSWORD=password
DATABASE_NAME=tsukuyomi_db
JWT_SECRET=sua_chave_secreta_jwt
BACKBLAZE_KEY_ID=sua_key_id_backblaze
BACKBLAZE_APPLICATION_KEY=sua_application_key_backblaze
DISCORD_WEBHOOK_URL=sua_webhook_url_discord
```

Certifique-se de preencher os valores com suas credenciais e configurações apropriadas.

### Executando o Banco de Dados (com Docker Compose)

Um arquivo `docker-compose.yml` foi fornecido para facilitar a configuração do banco de dados PostgreSQL. Para iniciar o banco de dados:

```bash
docker-compose up -d
```

Este comando irá iniciar um contêiner PostgreSQL e criar um volume para persistência dos dados.

### Executando Migrações

Após configurar o banco de dados, execute as migrações para criar o esquema:

```bash
npm run typeorm migration:run
```

### Executando a Aplicação

Para iniciar a API em modo de desenvolvimento:

```bash
npm run dev
```

Para construir e iniciar a aplicação em modo de produção:

```bash
npm run build
npm start
```

A API estará disponível em `http://localhost:PORT` (onde `PORT` é a porta configurada no seu arquivo `.env`).

## Endpoints da API (Visão Geral)

-   `/auth`: Endpoints para registro e autenticação de usuários.
-   `/users`: Gerenciamento de perfis de usuário.
-   `/tags`: Operações relacionadas a tags.
-   `/wallpapers`: Upload e recuperação de wallpapers.
-   `/storage`: Operações relacionadas ao armazenamento de arquivos.

## Contribuindo

Contribuições são bem-vindas! Por favor, leia o `CONTRIBUTING.md` (se disponível) para detalhes sobre nosso código de conduta e o processo para submeter pull requests.

## Licença

Este projeto está licenciado sob os termos da licença personalizada da Tsukuyomi INC. Para mais detalhes, consulte o arquivo `LICENSE` na raiz do repositório.