
### **US1**
**História de Usuário (Cartão):**  
Como técnico de campo posso ser capaz de selecionar o cliente cadastrado para registrar o serviço.

**Critérios de Aceitação:**  

1. O sistema deve gerar uma lista de clientes deve exibir: nome, ID e endereço  
2. O sistema deve permitir busca por: nome, ID ou endereço parcial  
3. O sistema deve bloquear a seleção de cliente não cadastrado
4. O sistema deve possir uma mensagem clara de sucesso, com uma confirmação visual (card destacado) mais mensagem de sucesso
5. O sistema deve exibir status offline claramente  


### **US2**
**História de Usuário (Cartão):**  
Como técnico de campo posso ser capaz de enviar o registro do cliente para o sistema.

**Critérios de Aceitação:**  

1. O registro deve incluir: timestamp, geolocalização e versão PDF  
2. O sistema deve bloquear o envio do registro com campos obrigatórios nulos
3. O sistema deve tentar o reenvio em três vezes, em falha de conexão  
4. O sistema deve enviar uma mensagem de sucesso após o envio do registro pelo e-mail
5. O envio do registro é armazenado no sistema com informações de data e hora.  
 

### **US3**
**História de Usuário (Cartão):**  
Como técnico de campo posso ser capaz de escrever o registro do serviço para manter as informações detalhadas.

**Critérios de Aceitação:**  

1. O sistema deve possuir campos obrigatórios devem variar por tipo de equipamento:
    - Servidores: log de erros, temperatura operacional
    - Redes: topologia afetada, protocolos envolvidos
    - Impressoras: contador de páginas, tipo de toner
    - Automação: diagrama do sistema, versão do firmware
2. O sistema deve permitir documentação multimídia: Upload de fotos/vídeos do equipamento e Captura de prints de interfaces de rede
3. O sistema deve possuir a opção de checklist de manutenção, podendo ser: Hardware ou Software ou Conectividade ou Configuração


### **US4**
**História de Usuário (Cartão):**  
Como técnico de campo posso identificar meu acesso no sistema para garantir segurança e rastreabilidade.

**Critérios de Aceitação:**  

1. O sistema deve requerer o login com o CPF válido e senha com 2FA via SMS  
2. O sistema deve registrar logs de acesso como IP, dispositivo e geolocalização  
3. O sistema deve realizar o bloqueio automático após 3 tentativas fracassadas  
4. O sistema deve expirar a sessão após 15 minutos de inatividade  


### **US5**
**História de Usuário (Cartão):**  
Como técnico de campo posso selecionar o tipo do serviço para registrar corretamente o atendimento.

**Critérios de Aceitação:**  

1. O sistema deve possuir o campo tipos pré-aprovados: Preventiva, Corretiva, Instalação, Calibração  
2. O sistema deve requerer a aprovação do supevisor quando o técnico registra a Opção "Outros"   
3. O sistema deve possuir uma seleção múltipla para serviços combinados  


### **US6**
**História de Usuário (Cartão):**  
Como técnico de campo posso ver as especificações de cada atendimento para obter detalhes sobre os serviços realizados.

**Critérios de Aceitação:**  

1. O sistema deve possuir os detalhes com as opções de fotos anexadas, checklist assinado digitalmente e gráfico de consumo de peças  
2. O sistema deve possuir os filtros de período, tipo de serviço, status de garantia  
3. O sistema deve realizar a exportação para PDF/Excel com 1 clique  

### **US7**
**História de Usuário (Cartão):**  
Como técnico de campo posso ver todos os atendimentos do cliente para ter uma visão completa do histórico.

**Critérios de Aceitação:**  

1. O sistema deve exibir uma lista consolidada de atendimentos com:  
      - Data do serviço  
      - Tipo de atendimento  
      - Status de conclusão  
2. O sistema deve permitir ordenação por:  
      - Data (mais recente/mais antigo)  
      - Prioridade do serviço  
      - Custo do reparo  
3. O sistema deve exibir o banner "Nenhum atendimento registrado" quando aplicável  


### **US8**
**História de Usuário (Cartão):**  
Como técnico de campo posso selecionar o cliente cadastrado para acessar o histórico de atendimentos.

**Critérios de Aceitação:**  

1. O sistema deve mostrar clientes com:  
      - Ícone de status (ativo/inativo)  
      - Último atendimento realizado  
2. O sistema deve permitir busca por:  
      - Nome parcial  
      - Código do cliente  
      - Endereço geográfico  
3. O sistema deve bloquear seleção de clientes com status "inativo"  
4. O sistema deve exibir pop-up de confirmação com dados básicos do cliente  


### **US9**
**História de Usuário (Cartão):**  
Como atendente posso selecionar o técnico próximo ao cliente para agendamento para otimizar o tempo e os recursos.

**Critérios de Aceitação:**  

1. O sistema deve exibir mapa com:  
      - Localização do cliente  
      - Raio de 10km com técnicos disponíveis  
      - Status de ocupação dos técnicos  
2. O sistema deve calcular rotas otimizadas usando API de navegação  
3. O sistema deve alertar quando nenhum técnico estiver disponível em até 50km  


### **US10**
**História de Usuário (Cartão):**  
Como atendente posso selecionar o horário do técnico para agendamento para garantir a disponibilidade do serviço.

**Critérios de Aceitação:**  

1. O sistema deve sincronizar agendas em tempo real  
2. O sistema deve bloquear horários com conflito de serviços  
3. O sistema deve sugerir janelas de tempo com base na complexidade do serviço  
4. O sistema deve enviar confirmação para o calendário do técnico  


### **US11**
**História de Usuário (Cartão):**  
Como atendente posso enviar uma notificação de confirmação ao técnico para informar sobre o agendamento realizado.

**Critérios de Aceitação:**  

1. O sistema deve enviar notificações por:  
      - Aplicativo móvel (prioritário)  
      - SMS  
      - E-mail corporativo  
2. O sistema deve incluir no alerta:  
      - QR code de acesso ao local  
      - Documentos técnicos relevantes  
      - Contato de emergência do cliente  
3. O sistema deve registrar confirmação de leitura pelo técnico  