# Caso de Uso 06: Gerar Atendimentos de Saúde

## Nome
Gerar Atendimentos de Saúde

## Breve Descrição
Este caso de uso permite que o Profissional de Saúde possa gerar novos atendimentos para os pacientes, agendando consultas e definindo os detalhes necessários, como data, hora, tipo de atendimento e observações. Essa funcionalidade visa organizar a agenda do profissional e assegurar que os atendimentos sejam registrados de forma clara e precisa no sistema.

## Atores
- **Profissional de Saúde**

## Fluxo de Eventos

### Fluxo Principal
Este caso de uso é iniciado quando o Profissional de Saúde seleciona a opção *Gerar Atendimentos de Saúde* no sistema.

1. O sistema apresenta o menu com as seguintes opções:
    - *Criar Novo Atendimento*
    - *Visualizar Atendimentos Agendados* [FA01](#fa01-visualizar-atendimentos-agendados)
2. O Profissional de Saúde seleciona a opção *Criar Novo Atendimento*.
3. O sistema exibe um formulário para o cadastro do atendimento [RN02](#rn02-validacao-dos-campos-do-formulario-de-atendimento)
4. O Profissional de Saúde preenche os dados necessários e confirma o cadastro.
5. O sistema valida as informações inseridas [RN01](#rn01-validacao-de-informacoes) [FE01](#fe01-dados-invalidos).
6. Se os dados estiverem corretos, o sistema exibe uma mensagem solicitando a confirmação final da geração do atendimento.
7. O Profissional de Saúde confirma a operação [FE02](#fe02-nao-confirmacao-de-atendimento).
8. O sistema registra o atendimento e exibe a mensagem “Atendimento Gerado com Sucesso”.
9. O caso de uso é encerrado.

### Fluxos Alternativos

#### FA01 Visualizar Atendimentos Agendados

1. No passo 1, o Profissional de Saúde seleciona a opção *Visualizar Atendimentos Agendados*.
2. O sistema apresenta uma lista com todos os atendimentos previamente agendados, exibindo informações resumidas como data, hora e tipo de atendimento.
3. O Profissional de Saúde pode selecionar um atendimento para visualizar detalhes adicionais.
4. Após a consulta, o Profissional de Saúde opta por retornar ao menu principal.
5. O caso de uso é encerrado.

### Fluxos de Exceção

#### FE01 Dados Inválidos
- Se, no passo 5, as informações preenchidas não atenderem aos critérios de validação, o sistema exibe uma mensagem de erro e retorna ao passo 3 para que o Profissional de Saúde corrija os dados.

#### FE02 Não Confirmação de Atendimento
- Se, no passo 7, o Profissional de Saúde não confirmar a operação, o sistema cancela a geração do atendimento e retorna ao passo 3 do fluxo principal.

## Requisitos Especiais

- O sistema deve estar acessível em dispositivos móveis com Android e iOS.
- O tempo máximo de resposta do sistema para validação das informações deve ser inferior a 2 segundos.
- O formulário deve destacar os campos obrigatórios e alertar o usuário caso algum campo essencial esteja vazio.

## Regras de Negócio

### RN01 Validação de Informações
As seguintes validações devem ser realizadas no formulário de atendimento:

| Campo                      | Formato                        | Obrigatoriedade |
|----------------------------|--------------------------------|-----------------|
| Nome do Paciente           | Texto até 100 caracteres       | Sim             |
| Data e Hora do Atendimento | Formato de data e hora         | Sim             |
| Tipo de Atendimento        | Texto até 50 caracteres        | Sim             |
| Observações                | Texto até 500 caracteres       | Não             |

### RN02 Validação dos Campos do Formulário de Atendimento

Para o cadastro do atendimento, os seguintes campos devem ser validados conforme as regras abaixo:

| Campo                      | Formato                                  | Obrigatoriedade |
|----------------------------|------------------------------------------|-----------------|
| Nome do Paciente           | Texto (até 100 caracteres)               | Sim             |
| Data e Hora do Atendimento | Data e hora (Formato: DD/MM/AAAA HH:MM)    | Sim           |
| Tipo de Atendimento        | Texto (até 50 caracteres)                | Sim             |
| Observações                | Texto (até 500 caracteres)               | Não             |



## Pré-Condições

- O Profissional de Saúde deve estar autenticado no sistema Connect Care.
- O Profissional de Saúde deve possuir as permissões necessárias para gerar atendimentos.

## Pós-Condições

- Após a geração do atendimento, os dados são registrados no sistema e ficam disponíveis para consulta e eventuais atualizações.
- O paciente associado ao atendimento poderá visualizar os detalhes do seu agendamento.

## Histórico de Revisão

| Versão | Descrição             | Autor                                            | Data       |
|--------|-----------------------|--------------------------------------------------|------------|
| 1.0    | Criação do Documento  | [Bruno Bragança dos Reis](https://github.com/BrunoBReis)         | 11/02/2025 |
