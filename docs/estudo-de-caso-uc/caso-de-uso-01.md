# Caso de Uso 01 - Registrar Paciente

## Nome
Registrar Paciente

## Breve Descrição
Este caso de uso permite que o paciente do Connect Care possa registrar um novo perfil ou fazer login em sua conta. Para realizar o login, o paciente deve ter se registrado previamente.

## Atores
- **Paciente**

## Fluxo de Eventos

### Fluxo Principal
Este caso de uso é iniciado quando o paciente entra no sistema.

1. O sistema apresenta as seguintes opções:
    - **Registro de novo usuário**
    - **Realizar login do usuário** [FA01](#fa01-realizar-login)
2. O paciente seleciona a opção de **registro de novo usuário**.
3. O sistema apresenta as informações a serem preenchidas para o registro.
4. O paciente preenche as informações do registro de novo usuário.
5. O paciente confirma as alterações.
6. O sistema valida as informações de registro [RN01](#rn01-validacao-de-informacoes) [FE01](#fe01-dados-invalidos).
7. O sistema envia uma mensagem “Registro Confirmado”.
8. O caso de uso é encerrado.

### Fluxo Alternativos

#### FA01 Realizar Login
Este fluxo alternativo ocorre quando o paciente já possui registro e opta por fazer login.

1. No passo 1, o paciente seleciona a opção de **realizar login**.
2. O sistema apresenta as informações a serem preenchidas para o login.
3. O paciente preenche as informações de login.
4. O paciente confirma as alterações.
5. O sistema valida o login [RN01](#rn01-validacao-de-informacoes) [FE01](#fe01-dados-invalidos).
6. O caso de uso é encerrado.

### Fluxo de Exceção

#### FE01 Dados Inválidos

1. Se no passo 6 do fluxo principal as informações preenchidas pelo paciente forem inválidas, o sistema exibe uma mensagem de erro e retorna ao passo 3 do fluxo principal.

## Requisitos Especiais

- O sistema deve estar acessível em dispositivos móveis com Android e iOS.
- O tempo máximo de resposta do sistema para validação deve ser inferior a 2 segundos.
- Os campos obrigatórios devem ser destacados e informados ao usuário caso estejam vazios.

## Regras de Negócio

### RN01 Validação de Informações
As seguintes validações devem ser realizadas:

| Campo                | Formato                        | Obrigatoriedade |
|----------------------|------------------------------|----------------|
| E-mail              | Formato válido de e-mail      | Sim            |
| Senha               | Mínimo 8 caracteres, 1 número | Sim            |

---

## Pré-Condições
- O paciente deve ter acesso ao sistema Connect Care via web ou aplicativo móvel.
- O paciente deve fornecer informações válidas para completar o registro.


## Pós-Condições
- Após o registro bem-sucedido, o paciente pode acessar sua conta e utilizar os serviços do sistema.
- O sistema armazena os dados do paciente para futuras autenticações.


## Histórico de Revisão

| Versão | Descrição                                  | Autor            | Data       |
|--------|------------------------------------------|-----------------|------------|
| 1.0    | Criação do Documento                    | [Bruno Bragança dos Reis](https://github.com/BrunoBReis)     | 10/02/2025 |

