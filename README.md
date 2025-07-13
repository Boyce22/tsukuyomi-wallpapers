# Tsukuyomi API

## Proposta do Projeto

Tsukuyomi é uma API open-source robusta e escalável, projetada para ser a espinha dorsal de plataformas de conteúdo visual e artístico. O objetivo principal é fornecer uma solução completa para gerenciamento de usuários, autenticação, organização de mídias (como wallpapers) e um sistema de tags flexível.

A API foi construída com foco em alta performance, arquitetura limpa e manutenibilidade, permitindo que desenvolvedores criem aplicações ricas e interativas sobre uma base sólida e confiável.

## Funcionalidades

-   **Autenticação Segura**: Sistema de registro e login de usuários utilizando hashing de senhas e tokens JWT.
-   **Gerenciamento de Perfis**: Permite que os usuários personalizem seus perfis, incluindo a alteração de fotos e banners.
-   **Organização de Conteúdo**: Upload, compressão e gerenciamento de wallpapers, com suporte para diferentes resoluções e metadados.
-   **Sistema de Tags**: Funcionalidades para criar, associar e buscar tags, facilitando a descoberta de conteúdo.
-   **Processamento de Imagem**: Otimização de imagens em tempo real para garantir performance e qualidade visual.
-   **Armazenamento Flexível**: Integração com serviços de armazenamento de objetos como Backblaze B2, AWS S3, entre outros.
-   **Notificações**: Capacidade de enviar notificações para plataformas como o Discord através de webhooks.

## Guia de Configuração (Passo a Passo)

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### 1. Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:

-   **Node.js**: Versão 18.x ou superior.
-   **npm** ou **Yarn**: Gerenciador de pacotes do Node.js.
-   **Docker** e **Docker Compose**: Para executar o banco de dados de forma isolada.
-   **Git**: Para clonar o repositório.

### 2. Clonando o Repositório

Abra seu terminal e clone o projeto:

```bash
git clone https://github.com/Boyce22/tsukuyomi.git
cd tsukuyomi
```

### 3. Instalando as Dependências

Instale todas as dependências necessárias com o seguinte comando:

```bash
npm install
```

### 4. Configurando as Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar o exemplo abaixo e preencher com suas próprias credenciais:

```env
# Configurações da Aplicação
PORT=3000

# Configurações do Banco de Dados (PostgreSQL)
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=admin
DATABASE_PASSWORD=admin
DATABASE_NAME=tsukuyomi

# Autenticação (JWT)
JWT_SECRET=your_super_secret_jwt_key

# Serviços de Armazenamento (Ex: Backblaze B2)
STORAGE_PROFILE_PICTURE_BUCKET=seu-bucket-de-fotos-de-perfil
STORAGE_PROFILE_BANNER_BUCKET=seu-bucket-de-banners-de-perfil
BACKBLAZE_KEY_ID=sua_key_id
BACKBLAZE_APPLICATION_KEY=sua_application_key

# Integrações (Ex: Discord)
DISCORD_WEBHOOK_URL=seu_webhook_do_discord
```

### 5. Executando o Banco de Dados com Docker

Para facilitar a configuração, o projeto inclui um arquivo `docker-compose.yml` para iniciar um contêiner PostgreSQL.

```bash
docker-compose up -d
```

Este comando irá baixar a imagem do PostgreSQL e iniciar o serviço em segundo plano.

### 6. Aplicando as Migrações

Com o banco de dados em execução, aplique as migrações para criar as tabelas e estruturas necessárias:

```bash
npm run migration:run
```

### 7. Executando a API

Finalmente, inicie a API em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000` (ou na porta que você definiu no arquivo `.env`).

## Como Contribuir

Ficamos felizes com o seu interesse em contribuir para o Tsukuyomi! Para garantir um processo tranquilo e eficiente para todos, siga os passos abaixo.

### 1. Encontre uma Issue ou Crie uma Nova

-   **Explore as Issues**: Verifique as [issues abertas](https://github.com/Boyce22/tsukuyomi/issues) para encontrar tarefas disponíveis, bugs que precisam de correção ou novas funcionalidades.
-   **Crie uma Issue**: Se você tem uma ideia para uma nova funcionalidade ou encontrou um bug que ainda não foi relatado, sinta-se à vontade para [criar uma nova issue](https://github.com/Boyce22/tsukuyomi/issues/new).

### 2. Faça um Fork do Repositório

Crie um fork do projeto para o seu próprio GitHub. Isso permite que você trabalhe em suas alterações sem afetar o repositório principal.

### 3. Crie uma Branch para sua Contribuição

Crie uma branch descritiva para a sua contribuição. Use um prefixo como `feat/` para novas funcionalidades ou `fix/` para correções de bugs.

```bash
git checkout -b feat/adicionar-nova-funcionalidade
```

### 4. Desenvolva e Faça o Commit das Suas Alterações

Faça as alterações necessárias no código. Siga as convenções de estilo e formatação do projeto. Ao fazer o commit, utilize mensagens claras e descritivas, seguindo o padrão de commits do projeto.

```bash
git commit -m "feat(users): Adiciona a funcionalidade X"
```

### 5. Envie um Pull Request (PR)

Após concluir suas alterações, envie um Pull Request do seu fork para a branch `main` do repositório original. No PR, descreva as alterações que você fez e vincule a issue correspondente (ex: `Closes #123`).

### 6. Revisão de Código

Aguarde a revisão do seu PR. Os mantenedores do projeto irão revisar suas alterações, fornecer feedback e, se tudo estiver correto, aprovar e fazer o merge da sua contribuição.

Agradecemos por sua ajuda em tornar o Tsukuyomi ainda melhor!

## Licença

Este projeto está licenciado sob os termos da licença ISC. Para mais detalhes, consulte o arquivo `LICENSE`.
