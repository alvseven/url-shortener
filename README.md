# Encurtador de URL 

Esta API permite encurtar URLs e redirecionar URLs previamente encurtadas. Ela inclui recursos para contabilizar cliques (redirecionamentos), criar e autenticar usuários, e realizar operações de listagem, atualização e exclusão de URLs encurtadas

## Como rodar a aplicação

### Requisitos

- **Docker**: Certifique-se de que o Docker está instalado em sua máquina

- **Pnpm**: Sistema de gerenciamento de pacotes (usado para instalar dependências localmente, se necessário)

#### Variáveis de ambiente

Antes de iniciar a aplicação, configure as variáveis de ambiente. Um exemplo de arquivo `.env` está disponível em `.env.example`. As variáveis principais incluem:

- `NODE_ENV`: ambiente (ex: development, production)
- `POSTGRES_USER:` Usuário do banco de dados
- `POSTGRES_PASSWORD`: Senha do usuário no banco de dados
- `DATABASE_URL`: URL de conexão com o banco de dados Postgres
- `API_PORT`: Porta onde a API será exposta.
- `API_URL`: URL da API 
- `JWT_SECRET`: Secret usado para assinar o token JWT
- `JWT_EXPIRES_IN`: Tempo de expiração do token JWT (ex: 24h)

#### Passos para rodar a aplicação com Docker

#### 1. Clone este repositório (HTTPS) e entre no diretório do projeto:

```bash
git clone https://github.com/alvseven/url-shortener.git

cd url-shortener
```

#### 2. Crie um arquivo ```.env```, utilizando o arquivo ```.env.example``` como exemplo:

```bash
cp .env.example .env
```

#### 3. Inicie a aplicação:

```bash
  docker compose up
```

> [!IMPORTANT]  
> Para facilitar e agilizar o processo, você pode usar as mesmas variáveis de ambiente definidas em ```.env.example```

## Principais tecnologias utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor

- **TypeScript**: Linguagem de programação fortemente tipada, que ajuda a detectar erros em tempo de desenvolvimento e torna o código mais robusto e fácil de manter

- **Nest**: Framework para construção de aplicações Node.js

- **Express**: Biblioteca para construção de servidores web (utilizada por padrão pelo Nest)

- **Zod**: Biblioteca para validação de dados de entrada e saída, com bom suporte a infêrencia de tipos estática

- **Prisma**: ORM para trabalhar com o banco de dados (Postgres)

- **Postgres**: Banco de dados relacional

- **Nanoid**: Biblioteca para geração de identificadores únicos curtos

- **JWT**: Biblioteca para autenticação de usuário via JSON Web Token

- **Bcryptjs**: Biblioteca para geração e comparação de hashs de senha

- **Docker**: Para conteinerização da aplicação e do ambiente de banco de dados


## Estrutura de Pastas

A aplicação segue uma estrutura modular e é separada em camadas, além de utilizar package/folder by feature nos módulos:

- **/modules**: contém os módulos da aplicação. Cada módulo possui suas próprias rotas, decorators, guards, controllers, DTOs, services, repositories, etc

  - **/auth**: módulo de autenticação de usuários

  - **/users**: módulo de gerenciamento de usuários

  - **/links**: módulo de URLs

- **/shared**: funcionalidades e configurações compartilhadas entre os módulos

  - **/config**: configurações gerais da aplicação

  - **/database**: configurações e helpers relacionados ao banco de dados

  - **/helpers**: funções e tipos auxiliares

  - **/dtos**: exemplo de DTOs e padronização de mensagens de erro

  - **/errors**: classes de erro personalizadas com mensagens e códigos HTTP apropriados