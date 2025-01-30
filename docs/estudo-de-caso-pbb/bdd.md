
### **US1**
**História de Usuário (Cartão):**  
Como técnico de campo posso ser capaz de selecionar o cliente cadastrado para registrar o serviço.

**Cenário (BDD):**

1) **CENÁRIO: Seleção de cliente com busca por endereço parcial**  
   
   - **Dado** que existem clientes cadastrados:
       - Carlos (ID: 001, Endereço: Av. Paulista, 1000)
       - Ana (ID: 002, Endereço: Rua Oscar Freire, 200)
   - **Quando** o técnico logado no sistema digitar "Paulista" no campo de busca
   - **Então** o sistema deve exibir apenas o cliente Carlos
   - **E** ocultar outros resultados

2) **CENÁRIO: Tentativa de seleção de cliente não cadastrado**  
  
   - **Dado** que o técnico pesquisou por "Cliente Z"
   - **E** nenhum resultado foi encontrado
   - **Quando** tentar selecionar manualmente
   - **Então** o sistema deve exibir alerta: "Cliente não cadastrado. Verifique os dados"

3) **CENÁRIO: Feedback visual de seleção**  
 
   - **Dado** que o técnico selecionou o cliente Carlos
   - **Quando** confirmar a seleção
   - **Então** o card do cliente deve:
       - Ter borda verde (HEX #00FF00)
       - Exibir ícone de checkmark
       - Mostrar tooltip: "Cliente selecionado: Carlos (ID: 001)"


### **US2**
**História de Usuário (Cartão):**  
Como técnico de campo posso ser capaz de enviar o registro do cliente para o sistema.

**Cenário (BDD):**

1) **CENÁRIO: Envio com geolocalização precisa**  
  
   - **Dado** que o GPS identificou as coordenadas:
       - Latitude: -23.5505
       - Longitude: -46.6333
   - **Quando** enviar o registro
   - **Então** o PDF deve incluir:
       - Mapa estático com raio de 50m
       - Carimbo: "Localização validada"

2) **CENÁRIO: Validação de campos obrigatórios em tempo real**  
 
   - **Dado** que o técnico deixou o campo "Tipo de Problema" vazio
   - **Quando** mover o cursor para o próximo campo
   - **Então** o sistema deve:
       - Destacar o campo em vermelho
       - Exibir ícone de alerta
       - Mostrar mensagem: "Campo obrigatório"

3) **CENÁRIO: Notificação por e-mail pós-envio**  

   - **Dado** que o registro foi enviado com sucesso
   - **Quando** o sistema processar
   - **Então** deve enviar e-mail para tecnico@empresa.com com:
       - Assunto: "Novo registro #00123"
       - Anexo PDF
       - Link para dashboard de acompanhamento


### **US3**
**História de Usuário (Cartão):**  
Como técnico de campo posso ser capaz de escrever o registro do serviço para manter as informações detalhadas.

**Cenário (BDD):**

1) **CENÁRIO: Registro para servidor corporativo**  

   - **Dado** que o equipamento é um servidor Dell PowerEdge
   - **Quando** selecionar tipo "Servidor"
   - **Então** o sistema deve exigir:
       - Log de erros (formato .log)
       - Temperatura máxima registrada
       - Modelo exato do processador

2) **CENÁRIO: Captura de interface de rede**  
   
   - **Dado** que o técnico está documentando um problema de rede
   - **Quando** usar a ferramenta de captura de tela integrada
   - **Então** o sistema deve:
       - Salvar imagem em .png
       - Adicionar timestamp na captura
       - Vincular automaticamente ao registro

3) **CENÁRIO: Checklist de configuração**  "
  
   - **Dado** que o tipo de problema é "Configuração"
   - **Quando** selecionar o checklist
   - **Então** o sistema deve oferecer opções:
       - Backup prévio realizado
       - Documentação consultada
       - Teste de rollback executado


### **US4**
**História de Usuário (Cartão):**  
Como técnico de campo posso identificar meu acesso no sistema para garantir segurança e rastreabilidade.

**Cenário (BDD):**

1) **CENÁRIO: Login com 2FA via SMS**  
 
   - **Dado** que o técnico inseriu CPF "123.123.123-12" e senha: "minhasenha" corretos
   - **Quando** o sistema enviar código "hfdhifd" via SMS para (11) 98765-4321
   - **E** o código for inserido corretamente
   - **Então** deve conceder acesso completo
   - **E** registrar o método de autenticação

2) **CENÁRIO: Bloqueio por tentativas fracassadas**  

   - **Dado** 3 tentativas de login com senha incorreta. Senha correta "minhasenha", senha digitada "MinhaSenha"
   - **Quando** tentar o 4º acesso
   - **Então** o sistema deve:
       - Bloquear a conta por 30 minutos
       - Notificar o administrador
       - Exibir código de erro: "ACESSO_BLOQUEADO_007"


### **US5**
**História de Usuário (Cartão):**  
Como técnico de campo posso selecionar o tipo do serviço para registrar corretamente o atendimento.

**Cenário (BDD):**

1) **CENÁRIO: Serviço combinado com múltiplas seleções**  

   - **Dado** que o técnico selecionou:
       - "Manutenção Preventiva"
       - "Calibração"
   - **Quando** confirmar
   - **Então** o sistema deve:
       - Gerar sub-tickets para cada serviço
       - Calcular tempo total estimado
       - Alertar sobre conflitos de procedimentos

2) **CENÁRIO: Aprovação de serviço customizado**  

   - **Dado** que o técnico selecionou "Outros: Atualização de Firmware"
   - **Quando** tentar enviar
   - **Então** o sistema deve:
       - Criar ticket de aprovação (#APR-045)
       - Notificar supervisor via push notification
       - Bloquear edição até resposta


### **US6**
**História de Usuário (Cartão):**  
Como técnico de campo posso ver as especificações de cada atendimento para obter detalhes sobre os serviços realizados.

**Cenário (BDD):**

1) **CENÁRIO: Filtragem cruzada por múltiplos critérios**  

   - **Dado** que o técnico aplicou filtros:
       - Período: Últimos 7 dias
       - Tipo: Corretiva
       - Status: Em garantia
   - **Quando** pesquisar
   - **Então** deve mostrar apenas registros que:
       - Foram concluídos há ≤7 dias
       - São do tipo selecionado
       - Estão no período de garantia

2) **CENÁRIO: Exportação técnica completa**  

   - **Dado** que o técnico selecionou um atendimento
   - **Quando** exportar para Excel
   - **Então** o arquivo deve conter:
       - Aba "Dados Técnicos" com especificações
       - Aba "Materiais" com peças utilizadas
       - Link para arquivos multimídia na nuvem