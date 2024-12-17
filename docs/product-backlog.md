## **Backlog de Produto**

Esta seção descreve o backlog de produto (preliminar ou completo), que é uma lista priorizada de todas as funcionalidades e melhorias planejadas para o software. Também aborda a priorização dessas funcionalidades e o que será entregue no Produto Mínimo Viável (MVP).

---

### **Backlog Geral**

O Backlog Geral contém todas as funcionalidades e melhorias planejadas para o software. Cada item é detalhado e priorizado para garantir uma visão clara do que será desenvolvido ao longo do projeto.

| **ID** | **Descrição**                                                                 | **Requisitos Funcionais**    | **Valor para o Negócio** | **Esforço Técnico** | **MVP** | **Épico Relacionado**          |
| ------ | ----------------------------------------------------------------------------- | ---------------------------- | ------------------------ | ------------------- | ------- | ------------------------------ |
| 1      | Cadastrar clientes e seus veículos.                                           | RF01, RF07                   | Alto                     | Baixo               | Sim     | Gerenciamento de Clientes      |
| 2      | Consultar clientes com filtros (nome, status, veículo).                       | RF04, RF05                   | Alto                     | Baixo               | Sim     | Gerenciamento de Clientes      |
| 3      | Atualizar e desativar clientes.                                               | RF02, RF03                   | Médio                    | Médio               | Sim     | Gerenciamento de Clientes      |
| 4      | Registrar histórico de serviços realizados para um cliente.                   | RF06                         | Alto                     | Médio               | Sim     | Gerenciamento de Clientes      |
| 5      | Criar tipos de serviço para ordens de serviço.                                | RF12                         | Alto                     | Baixo               | Sim     | Gerenciamento de Serviços      |
| 6      | Atualizar tipos de serviço.                                                   | RF14                         | Médio                    | Baixo               | Não     | Gerenciamento de Serviços      |
| 7      | Criar ordens de serviço vinculadas a clientes e veículos.                     | RF11                         | Alto                     | Médio               | Sim     | Gerenciamento de Serviços      |
| 8      | Atualizar status de ordens de serviço e enviar notificações automáticas.      | RF09, RF13, RF15, RF16, RF17 | Alto                     | Médio               | Sim     | Gerenciamento de Serviços      |
| 9      | Consultar ordens de serviço com filtros (cliente, status, veículo).           | RF15                         | Alto                     | Médio               | Sim     | Gerenciamento de Serviços      |
| 10     | Criar orçamentos vinculando tipos de serviços e produtos.                     | RF18                         | Alto                     | Médio               | Sim     | Gerenciamento de Orçamentos    |
| 11     | Enviar orçamentos para clientes.                                              | RF19                         | Alto                     | Baixo               | Sim     | Gerenciamento de Orçamentos    |
| 12     | Gerar PDFs de orçamentos.                                                     | RF21                         | Médio                    | Médio               | Não     | Gerenciamento de Orçamentos    |
| 13     | Cadastrar produtos.                                                           | RF22                         | Médio                    | Baixo               | Sim     | Produtos e Controle de Estoque |
| 14     | Atualizar informações de produtos cadastrados.                                | RF23, RF24                   | Médio                    | Baixo               | Sim     | Produtos e Controle de Estoque |
| 15     | Criar entrada ou saída de estoque para um produto cadastrado.                 | RF26, RF28                   | Médio                    | Médio               | Sim     | Produtos e Controle de Estoque |
| 16     | Consultar produtos com filtros (nome, categoria).                             | RF25                         | Médio                    | Baixo               | Sim     | Produtos e Controle de Estoque |
| 17     | Criar formulários de feedback personalizados.                                 | RF08                         | Médio                    | Médio               | Não     | Coleta e Análise de Feedback   |
| 18     | Gerar relatórios de métricas de satisfação baseados nos feedbacks coletados.  | RF10                         | Médio                    | Médio               | Não     | Coleta e Análise de Feedback   |
| 19     | Criar relatórios personalizados com dados de serviços, clientes e desempenho. | RF32                         | Médio                    | Alto                | Não     | Relatórios e Análise de Dados  |
| 20     | Exibir dashboard com visão geral do negócio (KPIs: clientes, serviços, etc.). | RF33                         | Alto                     | Alto                | Não     | Relatórios e Análise de Dados  |
| 21     | Autenticar usuários no sistema com login por e-mail e senha.                  | RF34                         | Alto                     | Baixo               | Sim     | Autenticação                   |
| 22     | Redefinir senha de acesso por e-mail.                                         | RF35                         | Médio                    | Baixo               | Sim     | Autenticação                   |
| 23     | Cadastrar e gerenciar usuários administrativos.                               | RF29, RF30, RF31             | Médio                    | Médio               | Não     | Gerenciamento Administrativo   |

## Histórias de Usuário

### Gerenciamento de Clientes

1. Como administrador eu posso cadastrar clientes e seus veículos para que o sistema tenha informações organizadas para gerenciamento.
2. Como administrador eu posso consultar clientes com filtros (nome, status, veículo) para que a busca por informações seja mais eficiente.
3. Como administrador eu posso atualizar e desativar clientes para que as informações permaneçam consistentes e atualizadas.
4. Como administrador eu posso registrar o histórico de serviços realizados para um cliente para que seja possível acompanhar os serviços prestados.

### Gerenciamento de Serviços

5. Como administrador eu posso criar tipos de serviço para ordens de serviço para que o sistema tenha categorias organizadas para registro.
6. Como administrador eu posso atualizar tipos de serviço para que o cadastro de serviços esteja sempre atualizado.
7. Como administrador eu posso criar ordens de serviço vinculadas a clientes e veículos para que os serviços prestados sejam devidamente registrados
8. Como administrador eu posso atualizar o status das ordens de serviço e enviar notificações automáticas para que os clientes sejam informados sobre o progresso.
9. Como administrador eu posso consultar ordens de serviço com filtros (cliente, status, veículo) para que seja possível encontrar rapidamente as informações desejadas.

### Gerenciamento de Orçamentos

10. Como administrador eu posso criar orçamentos vinculando tipos de serviços e produtos para que os custos dos serviços sejam formalizados.
11. Como administrador eu posso enviar orçamentos para clientes para que eles tenham acesso aos valores previstos.
12. Como administrador eu posso gerar PDFs de orçamentos para que os clientes recebam documentos formais dos valores estimados.

### Produtos e Controle de Estoque

13. Como administrador eu posso cadastrar produtos para que o sistema tenha um controle eficiente do estoque.
14. Como administrador eu posso atualizar informações de produtos cadastrados para que os dados dos produtos estejam corretos.
15. Como administrador eu posso criar entradas ou saídas de estoque para um produto cadastrado para que o controle do estoque seja atualizado.
16. Como administrador eu posso consultar produtos com filtros (nome, categoria) para que a busca de produtos seja mais ágil.

### Coleta e Análise de Feedback

17. Como administrador eu posso criar formulários de feedback personalizados para que os clientes possam avaliar os serviços prestados.
18. Como administrador eu posso gerar relatórios de métricas de satisfação baseados nos feedbacks coletados para que o desempenho do serviço seja analisado.

### Relatórios e Análise de Dados

19. Como administrador eu posso criar relatórios personalizados com dados de serviços, clientes e desempenho para que decisões estratégicas possam ser tomadas.
20. Como administrador eu posso exibir um dashboard com visão geral do negócio (KPIs: clientes, serviços, etc.) para que tenha acesso às métricas em tempo real.

### Autenticação

21. Como administrador eu posso autenticar usuários no sistema com login por e-mail e senha para que o acesso seja seguro e controlado.
22. Como administrador eu posso redefinir a senha de acesso por e-mail para que os usuários possam recuperar o acesso ao sistema.

### Gerenciamento Administrativo

23. Como administrador eu posso cadastrar e gerenciar usuários administrativos para que o controle de acessos e permissões seja eficiente.


---

Aqui está a adaptação da seção **Priorização do Backlog Geral** seguindo a matriz de priorização da **Lean Inception** que utilizamos.

---

### **Priorização do Backlog Geral**

A priorização do backlog foi realizada utilizando a **Matriz de Priorização da Lean Inception**, que considera dois critérios principais:

1. **Valor para o Negócio**: Representa o impacto positivo que a funcionalidade proporciona aos objetivos do negócio e à experiência do usuário. Funcionalidades de **alto valor** são essenciais para atender as necessidades mais críticas e gerar maior retorno.
   
2. **Esforço Técnico**: Indica o nível de complexidade e o tempo necessário para implementar a funcionalidade. Funcionalidades de **baixo esforço** são mais rápidas de serem entregues, enquanto funcionalidades de **alto esforço** requerem mais tempo e recursos.

A matriz avalia esses critérios em três níveis: **Alto, Médio e Baixo**.

#### **Matriz de Priorização**

| **Prioridade**       | **Descrição**                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Alta Prioridade**  | Funcionalidades com **alto valor para o negócio** e **baixo ou médio esforço técnico**. São entregues no MVP. |
| **Média Prioridade** | Funcionalidades com **médio valor para o negócio** e **médio ou baixo esforço técnico**.                      |
| **Baixa Prioridade** | Funcionalidades com **baixo valor para o negócio** ou **alto esforço técnico**.                               |

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

| Versão | Descrição                               | Autor                                                 | Data       |
| ------ | --------------------------------------- | ----------------------------------------------------- | ---------- |
| 0.1    | Criação do documento de Product Backlog | [Vinicius Vieira](http://github.com/viniciusvieira00) | 16/12/2024 |

</center>