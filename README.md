# CRM-ProInjecao

## Equipe

| Foto      | ![Foto](https://avatars.githubusercontent.com/u/62809606?v=4) | ![Foto](https://avatars.githubusercontent.com/u/131913211?v=4) | ![Foto](https://avatars.githubusercontent.com/u/111324066?v=4) | ![Foto Pedro](https://avatars.githubusercontent.com/u/98167728?v=4) | ![Foto](https://avatars.githubusercontent.com/u/64455111?v=4)              |
| --------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Nome      | [Bruno Bragança dos Reis](https://github.com/BrunoBReis)                    | [Paulo André Valadão de Brito Filho](https://github.com/paulofilho2)         | [Fábio Alessandro Torres Santos](https://github.com/fabioaletorres)             | [Pedro Henrique Braga de Morais](https://github.com)             | [Vinicius Angelo de Brito Vieira](https://github.com/viniciusvieira00) |
| Matrícula | 221007902                                                        | 221031229                                                        | 200037170                                                        | 211062384                                                        | 190118059                                                              |
| Cargo     | Desenvolvedor                                                    | Desenvolvedor                                                    | Desenvolvedor                                                    | Desenvolvedor                                                    | Desenvolvedor                                                          |

## Instruções para os desenvolvedores

Para executar a documentação localmente, siga os seguintes passos:

  1. **Clone o repositório do projeto**:
    Utilize o método de sua preferência:
    ```bash
    # Via SSH:
    git clone git@github.com:mdsreq-fga-unb/2024.2-T01-CRMProInjecao.git

    # Via HTTPS:
    git clone https://github.com/mdsreq-fga-unb/2024.2-T01-CRMProInjecao.git
    ```
    Em seguida, entre no diretório do projeto:
    ```bash
    cd 2024.2-T01-CRMProInjecao
    ```

  2. **Mude para a branch `api`**:
    ```bash
    git checkout api
    ```

### Configuração do Sistema na Pasta `api`

  1. **Configurar variáveis de ambiente**:
    Copie o arquivo `.env.example` para `.env` na raiz do projeto e adicione as seguintes variáveis:
    ```
    DATABASE_HOST=
    DATABASE_PORT=
    DATABASE_USER=
    DATABASE_PASSWORD=
    DATABASE_NAME=
    JWT_SECRET=
    JWT_EXPIRES_IN=
    SALT_ROUNDS=10
    ```
  2. **Configurar o banco de dados utilizando Docker**:
    Utilize o arquivo `docker-compose.yml` para subir o banco de dados PostgreSQL:
    ```bash
    docker-compose up -d
    ```
    Isso irá iniciar um contêiner com o PostgreSQL configurado conforme as variáveis de ambiente definidas no arquivo `docker-compose.yml`.

  3. **Preencher as informações do banco de dados**:
    Após subir o banco de dados utilizando Docker, preencha corretamente as variáveis de ambiente no arquivo `.env` com as informações do banco de dados:
    ```
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=seu_usuario
    DATABASE_PASSWORD=sua_senha
    DATABASE_NAME=nome_do_banco
    JWT_SECRET=sua_chave_secreta
    JWT_EXPIRES_IN=tempo_de_expiracao
    SALT_ROUNDS=10
    ```

  4. **Configurar o Data Source**:
    O arquivo `api/db/data-source.ts` já está configurado para utilizar as variáveis de ambiente definidas no `.env`.

  5. **Instalar as dependências do projeto**:
    ```bash
    yarn
    ```

  6. **Adicionar uma chave JWT_SECRET no arquivo `.env`**:
    Certifique-se de adicionar uma chave secreta para o JWT no arquivo `.env`:
    ```
    JWT_SECRET=sua_chave_secreta
    ```
  7. **Gerar uma chave JWT_SECRET**:
    Utilize o comando `openssl` para gerar uma chave secreta segura:
    ```bash
    openssl rand -base64 32
    ```
    Copie a chave gerada e adicione no arquivo `.env`:
    ```bash
    JWT_SECRET=sua_chave_secreta_gerada
    ```

  8. **Executar o projeto em modo de desenvolvimento**:
    ```bash
    yarn start:dev
    ```

  9. **Estrutura do Projeto**:
    - `api/src/app.module.ts`: Módulo principal da aplicação.
    - `api/src/auth/auth.module.ts`: Módulo de autenticação.
    - `api/src/user/user.module.ts`: Módulo de usuários.
    - `api/src/user/user.service.ts`: Serviço de usuários.
    - `api/src/user/user.controller.ts`: Controlador de usuários.
    - `api/src/user/entities/user.entity.ts`: Entidade de usuário.
    - `api/src/auth/auth.service.ts`: Serviço de autenticação.
    - `api/src/auth/auth.controller.ts`: Controlador de autenticação.
    - `api/src/auth/dto/create-user.dto.ts`: DTO para criação de usuário.
    - `api/src/auth/dto/update-user.dto.ts`: DTO para atualização de usuário.
    - `api/src/auth/dto/signin.dto.ts`: DTO para login de usuário.
    - `api/src/main.ts`: Arquivo principal para bootstrap da aplicação.

### Build, Push e Deploy de Alterações

  1. **Gerar o build da aplicação**:
    ```bash
    yarn build
    ```
    Isso criará uma pasta `dist` com os arquivos compilados.

  2. **Adicionar e commitar as alterações**:
    ```bash
    git add .
    git commit -m "Build da aplicação"
    ```

  3. **Fazer push das alterações para a branch `main`**:
    ```bash
    git push origin main
    ```
