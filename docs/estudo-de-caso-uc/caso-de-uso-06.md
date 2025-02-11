# Caso de Uso 06: Gerenciar Consultas Marcadas

## Nome
Gerenciar Consultas Marcadas

## Breve Descrição
Este caso de uso permite que o profissional de saúde visualize, edite e cancele consultas agendadas, garantindo um gerenciamento eficiente da agenda de atendimentos.

## Atores
- **Profissional de Saúde**

## Fluxo de Eventos

### Fluxo Principal
O caso de uso é iniciado quando o profissional de saúde acessa a opção de gerenciamento de consultas no sistema.

1. O sistema exibe a agenda do profissional de saúde com as consultas agendadas.
2. O profissional seleciona uma consulta para visualizar.
3. O sistema exibe:
   - **As informações da consulta, incluindo paciente, data, horário e local** [RN01](#rn01-consultas-marcadas)
   - **Editar a consulta** [FA01](#fa01-editar-consulta)
   - **Cancelar a consulta**, se necessário [FA02](#fa02-cancelar-consulta)
4. O profissional visualiza as informações da consulta.
5. O caso de uso é encerrado.

### Fluxos Alternativos

#### FA01 Editar Consulta

No passo 3 do fluxo principal, o profissional seleciona a opção de edição.

1. O sistema permite a alteração da data, horário ou local da consulta.
2. O profissional confirma a edição.[FE01](#fe01-editar-incorretamente) [RN01](#rn01-consultas-marcadas)
3. O sistema registra a alteração e notifica o paciente.
4. O caso de uso é encerrado

#### FA02 Cancelar Consulta

 No passo 3 do fluxo principal, o profissional seleciona a opção de cancelamento.

2. O sistema solicita a confirmação do cancelamento.
3. O profissional confirma a ação.
4. O sistema registra o cancelamento e notifica o paciente.
5. O caso de uso é encerrado

### Fluxos de Exceção

#### FE01 Editar Incorretamente

No passo 2 do fluxo alternativo 02, se a edição realizada pelo profissional estiver incorreta, o sistema exibe uma mensagem informando o erro e retorna ao passo 1.

## Requisitos Especiais

- O sistema deve estar acessível via web e dispositivos móveis.
- O tempo de resposta para operações deve ser inferior a 2 segundos.
- O sistema deve garantir a segurança e confidencialidade dos dados dos pacientes.

## Regras de Negócio

### RN01 Consultas Marcadas
| Nome                        |         Formato         | Obrigatoriedade | Valores |
|-----------------------------|:----------------------:|:--------------:|:--------|
| Data     				      |      99/99/9999        |       Sim      | -       |
| Horário			          | 99:99			       |       Sim      | -       |
| Local				          | Texto até 500 caracteres |       Sim      | -       |
| Nome Paciente				  | Texto até 500 caracteres |       Sim      | -       |
| CPF paciente			      | 999.999.999-99 	       |       Sim      | -       |




## Pré-Condições

- O profissional de saúde deve estar autenticado no sistema.
- O sistema deve possuir uma agenda com consultas cadastradas.

## Pós-Condições

- O sistema reflete as alterações realizadas na agenda.
- Os pacientes são notificados sobre qualquer modificação.

## Histórico de Revisão

| Versão | Descrição | Autor | Data |
| ------ | ------------------------------------------------------------------- | ------------ |---------- |
| 1.0 | Criação da Especificação | [Arthur Heleno](http://github.com/arthur-heleno) | 10/02/2025 |
| 2.0 | Alteração na Especificação | [Paulo Filho](http://github.com/paulofilho2) | 11/02/2025 |

