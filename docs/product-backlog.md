## **Backlog de Produto**

Esta seção descreve o backlog de produto (preliminar ou completo), que é uma lista priorizada de todas as funcionalidades e melhorias planejadas para o software. Também aborda a priorização dessas funcionalidades e o que será entregue no Produto Mínimo Viável (MVP).

---

### **Backlog Geral**

O Backlog Geral contém todas as funcionalidades e melhorias planejadas para o software. Cada item é detalhado e priorizado para garantir uma visão clara do que será desenvolvido ao longo do projeto.

| **ID** | **Descrição**                                                                          | **Requisitos Funcionais**    | **Valor para o Negócio** | **Esforço Técnico** | **MVP** | **Épico Relacionado**          |
| ------ | -------------------------------------------------------------------------------------- | ---------------------------- | ------------------------ | ------------------- | ------- | ------------------------------ |
| 1      | Cadastrar clientes.                                                                    | RF01                         | Alto                     | Baixo               | Sim     | Gerenciamento de Clientes      |
| 2      | Vincular veiculos aos clientes.                                                        | RF07                         | Alto                     | Baixo               | Sim     | Gerenciamento de Clientes      |
| 3      | Consultar clientes com filtros (nome, status, veículo).                                | RF04, RF05                   | Alto                     | Baixo               | Sim     | Gerenciamento de Clientes      |
| 4      | Desativar clientes.                                                                    | RF02                         | Médio                    | Médio               | Sim     | Gerenciamento de Clientes      |
| 5      | Atualizar clientes.                                                                    | RF03                         | Médio                    | Médio               | Sim     | Gerenciamento de Clientes      |
| 6      | Registrar histórico de serviços realizados para um cliente.                            | RF06                         | Alto                     | Médio               | Sim     | Gerenciamento de Clientes      |
| 7      | Criar tipos de serviço para ordens de serviço.                                         | RF12                         | Alto                     | Baixo               | Sim     | Gerenciamento de Serviços      |
| 8      | Atualizar tipos de serviço.                                                            | RF14                         | Médio                    | Baixo               | Não     | Gerenciamento de Serviços      |
| 9      | Criar ordens de serviço vinculadas a clientes e veículos.                              | RF11                         | Alto                     | Médio               | Sim     | Gerenciamento de Serviços      |
| 10     | Atualizar status de ordens de serviço e enviar notificações automáticas.               | RF09, RF13, RF15, RF16, RF17 | Alto                     | Médio               | Sim     | Gerenciamento de Serviços      |
| 11     | Consultar ordens de serviço com filtros (cliente, status, veículo).                    | RF15                         | Alto                     | Médio               | Sim     | Gerenciamento de Serviços      |
| 12     | Criar orçamentos vinculando tipos de serviços.                                         | RF18                         | Alto                     | Médio               | Sim     | Gerenciamento de Orçamentos    |
| 13     | Enviar orçamentos para clientes.                                                       | RF19                         | Alto                     | Baixo               | Sim     | Gerenciamento de Orçamentos    |
| 14     | Gerar PDFs de orçamentos.                                                              | RF21                         | Médio                    | Médio               | Não     | Gerenciamento de Orçamentos    |
| 15     | Cadastrar produtos.                                                                    | RF22                         | Médio                    | Baixo               | Sim     | Produtos e Controle de Estoque |
| 16     | Atualizar informações de produtos cadastrados.                                         | RF23, RF24                   | Médio                    | Baixo               | Sim     | Produtos e Controle de Estoque |
| 17     | Criar entrada de estoque para um produto cadastrado.                                   | RF26, RF28                   | Médio                    | Médio               | Sim     | Produtos e Controle de Estoque |
| 18     | Criar saida de estoque para um produto cadastrado.                                     | RF26, RF28                   | Médio                    | Médio               | Sim     | Produtos e Controle de Estoque |
| 19     | Consultar produtos com filtros (nome, categoria).                                      | RF25                         | Médio                    | Baixo               | Sim     | Produtos e Controle de Estoque |
| 20     | Criar formulários de feedback personalizados.                                          | RF08                         | Médio                    | Médio               | Não     | Coleta e Análise de Feedback   |
| 21     | Gerar relatórios de métricas de satisfação baseados nos feedbacks coletados.           | RF10                         | Médio                    | Médio               | Não     | Coleta e Análise de Feedback   |
| 22     | Criar relatórios personalizados com dados de serviços, clientes, desempenho e estoque. | RF32, RF33, RF34, RF35       | Médio                    | Alto                | Não     | Relatórios e Análise de Dados  |
| 23     | Configurar relatórios.                                                                 | RF32, RF33, RF34, RF35       | Médio                    | Alto                | Não     | Relatórios e Análise de Dados  |
| 24     | Exibir dashboard com visão geral do negócio (KPIs: clientes, serviços, etc.).          | RF36                         | Alto                     | Alto                | Não     | Relatórios e Análise de Dados  |
| 25     | Configurar elemnetos do dashboard.                                                     | RF36                         | Alto                     | Alto                | Não     | Relatórios e Análise de Dados  |
| 26     | Autenticar usuários no sistema com login por e-mail e senha.                           | RF37                         | Alto                     | Baixo               | Sim     | Autenticação                   |
| 27     | Redefinir senha de acesso por e-mail.                                                  | RF38                         | Médio                    | Baixo               | Sim     | Autenticação                   |
| 28     | Cadastrar e gerenciar usuários administrativos.                                        | RF29, RF30, RF31             | Médio                    | Médio               | Não     | Gerenciamento Administrativo   |


## Histórias de Usuário

### Gerenciamento de Clientes

1. Como administrador eu posso cadastrar clientes para que o sistema tenha informações organizadas para gerenciamento.
2. Como administrador eu posso vincular veiculos aos clientes para ligar as informções de cada.
3. Como administrador eu posso consultar clientes com filtros (nome, status, veículo) para que a busca por informações seja mais eficiente.
4. Como administrador eu posso desativar clientes para que as informações permaneçam consistentes.
5. Como administrador eu posso atualizar clientes para que as informações permaneçam atualizadas.
6. Como administrador eu posso registrar o histórico de serviços realizados para um cliente para que seja possível acompanhar os serviços prestados.

### Gerenciamento de Serviços

7. Como administrador eu posso criar tipos de serviço para ordens de serviço para que o sistema tenha categorias organizadas para registro.
8. Como administrador eu posso atualizar tipos de serviço para que o cadastro de serviços esteja sempre atualizado.
9. Como administrador eu posso criar ordens de serviço vinculadas a clientes e veículos para que os serviços prestados sejam devidamente registrados
10. Como administrador eu posso atualizar o status das ordens de serviço e enviar notificações automáticas para que os clientes sejam informados sobre o progresso.
11. Como administrador eu posso consultar ordens de serviço com filtros (cliente, status, veículo) para que seja possível encontrar rapidamente as informações desejadas.

### Gerenciamento de Orçamentos

12. Como administrador eu posso criar orçamentos vinculando tipos de serviços para formalizar os custos dos serviços.
13. Como administrador eu posso enviar orçamentos para clientes para que eles tenham acesso aos valores previstos.
14. Como administrador eu posso gerar PDFs de orçamentos para que os clientes recebam documentos formais dos valores estimados.

### Produtos e Controle de Estoque

15. Como administrador eu posso cadastrar produtos para que o sistema tenha um controle eficiente do estoque.
16. Como administrador eu posso atualizar informações de produtos cadastrados para que os dados dos produtos estejam corretos.
17. Como administrador eu posso criar entradas de estoque para um produto cadastrado para que o controle do estoque seja atualizado.
18. Como administrador eu posso criar saidas de estoque para um produto cadastrado para que o controle do estoque seja atualizado.
19. Como administrador eu posso consultar produtos com filtros (nome, categoria) para que a busca de produtos seja mais ágil.

### Coleta e Análise de Feedback

20. Como administrador eu posso criar formulários de feedback personalizados, permitindo a configuração de diferentes tipos de perguntas (ex.: escala, dissertativa, múltipla escolha) para que os clientes possam avaliar os serviços prestados de forma abrangente.
21. Como administrador eu posso gerar relatórios de métricas de satisfação com base nos feedbacks coletados, como média de avaliações por serviço e taxa de resposta, para que o desempenho do serviço seja analisado de forma detalhada.

### Relatórios e Análise de Dados

22. Como administrador eu posso criar relatórios personalizados sobre serviços realizados, clientes atendidos e desempenho de equipes para que as decisões estratégicas sejam baseadas em dados confiáveis.
23. Como administrador eu posso configurar diferentes tipos de relatórios (ex.: gráficos, tabelas detalhadas, sumários) para atender a demandas específicas de análise.
24. Como administrador eu posso exibir um dashboard com visão geral do negócio, incluindo KPIs como quantidade de clientes ativos, serviços em andamento, taxa de satisfação e controle financeiro, para que as métricas sejam monitoradas em tempo real.
25. Como administrador eu posso configurar os elementos visíveis no dashboard (ex.: adicionar ou remover KPIs) para que ele atenda às necessidades específicas do negócio.

### Autenticação

26. Como administrador eu posso autenticar usuários no sistema com login por e-mail e senha para que o acesso seja seguro e controlado.
27. Como administrador eu posso redefinir a senha de acesso por e-mail para que os usuários possam recuperar o acesso ao sistema.

### Gerenciamento Administrativo

28. Como administrador eu posso cadastrar e gerenciar usuários administrativos para que o controle de acessos e permissões seja eficiente.


---

Aqui está a adaptação da seção **Priorização do Backlog Geral** seguindo a matriz de priorização da **Lean Inception** que utilizamos.

---

### **Priorização do Backlog Geral**

A priorização do backlog foi realizada utilizando a **Matriz de Priorização da Lean Inception**, que considera dois critérios principais:

1. **Valor para o Negócio**: Representa o impacto positivo que a funcionalidade proporciona aos objetivos do negócio e à experiência do usuário. Funcionalidades de **alto valor** são essenciais para atender as necessidades mais críticas e gerar maior retorno. Representado por uma escala de 1 a 3, sendo 1 considerado baixo valor de negócio, 2 considerado médio e 3 considerado alto.
   
2. **Esforço Técnico**: Indica o nível de complexidade e o tempo necessário para implementar a funcionalidade. Funcionalidades de **baixo esforço** são mais rápidas de serem entregues, enquanto funcionalidades de **alto esforço** requerem mais tempo e recursos. Representado por uma escala de 1 a 3, sendo 1 considerado baixo esforço técnico, 2 considerado médio e 3 considerado alto.

A matriz avalia esses critérios em três níveis: **1 (Baixo), 2 (Médio) e 3 (Alto)**.

#### **Matriz de Priorização**

| **Prioridade**       | **Valor para o Negócio** | **Esforço Técnico** |**Descrição**                                                                                              |
 -------------------- |---------------------------| --------------------| ----------------------
| **Alta**  | 3 | 1 | Funcionalidades com **alto valor para o negócio** e **baixo esforço técnico**. São entregues no MVP. |
| **Alta**  | 3 | 2 | Funcionalidades com **alto valor para o negócio** e **médio esforço técnico**. São entregues no MVP. | 
| **Média** | 2 | 2 | Funcionalidades com **médio valor para o negócio** e **médio esforço técnico**.                      |
| **Média** | 2 | 1 | Funcionalidades com **médio valor para o negócio** e **baixo esforço técnico**.                      |
| **Baixa** | 1 | 3 | Funcionalidades com **baixo valor para o negócio** e **alto esforço técnico**.                               |

#### **Visualização da Matriz**  
Na **Lean Inception**, funcionalidades foram organizadas na matriz de acordo com a combinação entre **"O que fazer" (valor)** e **"Como fazer" (esforço técnico)**:

- **Alto Valor / Baixo Esforço** → Verde: **Alta Prioridade** (entregue no MVP).  
- **Alto Valor / Alto Esforço** → Amarelo: Priorizado após o MVP, pois exige planejamento.  
- **Médio Valor / Médio Esforço** → Amarelo: Funcionalidades importantes, mas não essenciais no MVP.  
- **Baixo Valor / Qualquer Esforço** → Vermelho: **Baixa Prioridade**, para versões futuras.  

A **coluna MVP** no Backlog Geral identifica quais funcionalidades foram consideradas essenciais (**Must Have**) para compor o Produto Mínimo Viável.

---

### **MVP**

O **MVP** representa o conjunto mínimo de funcionalidades que permite que o produto seja lançado e validado pelos clientes. Ele foca nos recursos essenciais necessários para testar o mercado e validar as hipóteses de valor de negócio.

As funcionalidades incluídas no **MVP** são as que possuem "Sim" na coluna **MVP** da tabela de Backlog Geral.

<center>

| Versão | Descrição                                                  | Autor                                                 | Data       |
| ------ | ---------------------------------------------------------- | ----------------------------------------------------- | ---------- |
| 0.1    | Criação do documento de Product Backlog                    | [Vinicius Vieira](http://github.com/viniciusvieira00) | 16/12/2024 |
| 0.2    | Ajuste do Backlog a partir dos feedbacks do professor      | [Paulo André](http://github.com/PauloFilho2)          | 15/01/2025 |
| 0.3    | Ajuste do Backlog a partir dos reavaliação dos requisitos  | [Paulo André](http://github.com/PauloFilho2)          | 17/01/2025 |

</center>