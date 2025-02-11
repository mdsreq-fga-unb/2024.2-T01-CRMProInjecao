# Caso de Uso: Realizar Agendamento

## Nome
Realizar Agendamento

## Breve Descrição
Este caso de uso permite que o paciente realize o agendamento de uma consulta ou atendimento médico disponível no sistema Connect Care. O paciente poderá escolher o profissional de saúde, o horário e confirmar os detalhes do agendamento.

## Atores
- **Paciente**

## Fluxo de Eventos

### Fluxo Principal
Este caso de uso é iniciado quando o paciente decide agendar um atendimento.

1. O sistema apresenta a opção *Realizar Agendamento* no menu principal.
2. O paciente seleciona a opção *Realizar Agendamento*.
3. O sistema exibe uma lista de profissionais de saúde disponíveis, juntamente com suas especialidades.
4. O paciente seleciona o profissional de saúde desejado.
5. O sistema apresenta os horários disponíveis para o profissional selecionado.
6. O paciente escolhe o horário de atendimento desejado.
7. O sistema exibe um resumo do agendamento, contendo:
   - Nome do profissional
   - Data e hora do atendimento
   - Especialidade e local do atendimento
8. O paciente confirma os detalhes do agendamento [FA01](#fa01-cancelamento-na-confirmacao).
9. O sistema valida as informações inseridas [RN01](#rn01-validacao-dos-dados-do-agendamento) [FE01](#fe01-dados-invalidos).
10. Se os dados estiverem corretos, o sistema registra o agendamento e exibe a mensagem “Agendamento Realizado com Sucesso”.
11. O caso de uso é encerrado.

### Fluxos Alternativos

#### FA01 Cancelamento na Confirmação
1. No passo 8 do fluxo principal, se o paciente optar por não confirmar o agendamento, o sistema exibe uma mensagem informando o cancelamento.
2. O paciente é redirecionado para a tela de seleção de horário (volta ao passo 5).
3. O paciente pode escolher outro horário ou cancelar a operação.

### Fluxos de Exceção

#### FE01 Dados Inválidos
1. Se, no passo 9 do fluxo principal, as informações inseridas forem inválidas (por exemplo, horário já reservado ou dados incompletos), o sistema exibe uma mensagem de erro.
2. O paciente é orientado a revisar e corrigir os dados, retornando ao passo 5 para nova seleção de horário.

## Requisitos Especiais

- O sistema deve estar acessível via web e aplicativo móvel (Android e iOS).
- O tempo máximo de resposta do sistema para validação e registro do agendamento deve ser inferior a 2 segundos.
- Os campos obrigatórios no formulário de agendamento devem ser destacados e validados antes da confirmação.

## Regras de Negócio

### RN01 – Validação dos Dados do Agendamento
As seguintes validações devem ser realizadas:
| Campo                   | Formato                                   | Obrigatoriedade |
|-------------------------|-------------------------------------------|-----------------|
| Nome do Profissional    | Texto até 100 caracteres                  | Sim             |
| Data e Hora             | Formato: DD/MM/AAAA HH:MM                   | Sim             |
| Especialidade           | Texto até 50 caracteres                   | Sim             |
| Local do Atendimento    | Texto até 50 caracteres                   | Sim             |

## Pré-Condições

- O paciente deve estar autenticado no sistema Connect Care.
- O paciente deve ter acesso à internet e aos dados atualizados dos profissionais de saúde e seus horários.
- O sistema deve possuir um banco de dados com as informações dos profissionais e suas agendas.

## Pós-Condições

- Após a confirmação, o agendamento é registrado no sistema e fica disponível para consulta pelo paciente.
- O paciente recebe uma notificação de confirmação do agendamento (por e-mail ou notificação no aplicativo).
- O profissional de saúde tem seu calendário atualizado com o novo atendimento agendado.

## Histórico de Revisão

| Versão | Descrição             | Autor                                    | Data       |
|--------|-----------------------|------------------------------------------|------------|
| 1.0    | Criação do Documento  | [Bruno Bragança dos Reis](https://github.com/BrunoBReis)                   | 11/02/2025 |
