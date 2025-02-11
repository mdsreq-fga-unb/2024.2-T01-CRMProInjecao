# Caso de Uso 05 - Agendar Consulta



## Breve descrição
Permite ao paciente marcar consultas online ou presenciais em unidades de saúde ou com profissionais cadastrados.

## Atores
Paciente

## Fluxo de Eventos

### Fluxo Principal
Este caso de uso é iniciado quando o paciente escolher a opção *Agendar Consulta*.

1. Paciente acessa a seção "Agendar Consulta". 
2. Sistema exibe serviços de saúde disponíveis com base na localização e histórico do paciente. 
3. Paciente seleciona um serviço de saúde (ex.: clínica pediátrica). 
4. Sistema exibe horários disponíveis para o serviço selecionado. 
5. Paciente escolhe um horário e confirma o agendamento. 
6. Sistema valida o horário e registra o agendamento. 
7. Sistema envia confirmação por notificação no e-mail. 
8. O caso de uso é encerrado.
### Fluxos Alternativos

#### FA01 - Horário indisponível

No passo 5 do fluxo principal o paciente escolhe um horário para o agendamento.

5. Paciente tenta selecionar um horário já ocupado. 
6. Sistema notifica: "Horário indisponível". 
7. O sistema sugere as seguintes alternativas: [datas/horários]". 
8. Paciente escolhe uma nova opção. 
9. Sistema repete o processo de confirmação. 
10. O caso de uso é encerrado.

### Fluxos de Exceção

#### FE01 - *Falha na confirmação*:

No passo 7 do fluxo principal, o sistema notifica o paciente sobre o erro e registra a tentativa. Em seguida oferece a opção de tentar novamente ou contatar suporte.

## Requisitos Especiais

- Integração com serviço de e-mail para confirmações.
- Funcionar offline para visualização de horários pré-carregados.

## Regras de Negócio

| ID | Descrição |
|----|-----------|
| RN01 | Limitar agendamentos a uma consulta por especialidade/dia por paciente. |
| RN02 | Notificar profissionais de saúde sobre novos agendamentos em tempo real. |
| RN03 | Permitir cancelamento até 24 horas antes da consulta. |


## Pré-Condições

- Paciente deve estar logado e ter concluído o registro.
- Serviço de saúde deve ter horários cadastrados no sistema.

## Pós-Condições

- Agenda do profissional é atualizada com o novo compromisso.
- Histórico do paciente é atualizado com o agendamento.

## Histórico de Revisão


| Versão | Descrição          | Autor                                            | Data       |
| ------ | ------------------ | ------------------------------------------------ | ---------- |
| 1.1    | Adicionamento UC05 | [Fabio Torres](http://github.com/fabioaletorres) | 11/02/2025 |