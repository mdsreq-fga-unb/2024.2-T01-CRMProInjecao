## **Backlog de Produto**

Esta seção descreve o backlog de produto (preliminar ou completo), que é uma lista priorizada de todas as funcionalidades e melhorias planejadas para o software. Também aborda a priorização dessas funcionalidades e o que será entregue no Produto Mínimo Viável (MVP).

---

### **Backlog Geral**

O Backlog Geral contém todas as funcionalidades e melhorias planejadas para o software. Cada item é detalhado e priorizado para garantir uma visão clara do que será desenvolvido ao longo do projeto.

| **ID** | **Descrição**                                                                          | **Requisitos Funcionais**    | **Valor para o Negócio** | **Esforço Técnico** | **MVP** | **Épico Relacionado**          |
| ------ | -------------------------------------------------------------------------------------- | ---------------------------- | ------------------------ | ------------------- | ------- | ------------------------------ |
| 1      | Cadastrar clientes.                                                                    | RF01                         | Alto                     | Baixo               | Sim     | Gerenciamento de Clientes      |
| 2      | Cadastrar veiculos.                                                                    | RF07                         | Alto                     | Baixo               | Sim     | Gerenciamento de Clientes      |
| 3      | Vincular veiculos aos clientes.                                                        | RF08                         | Alto                     | Baixo               | Sim     | Gerenciamento de Clientes      |
| 4      | Consultar clientes com filtros (nome, status, veículo).                                | RF04, RF05                   | Alto                     | Baixo               | Sim     | Gerenciamento de Clientes      |
| 5      | Desativar clientes.                                                                    | RF02                         | Médio                    | Médio               | Sim     | Gerenciamento de Clientes      |
| 6      | Atualizar clientes.                                                                    | RF03                         | Médio                    | Médio               | Sim     | Gerenciamento de Clientes      |
| 7      | Registrar histórico de serviços realizados para um cliente.                            | RF06                         | Alto                     | Médio               | Sim     | Gerenciamento de Clientes      |
| 8      | Criar tipos de serviço para ordens de serviço.                                         | RF13                         | Alto                     | Baixo               | Sim     | Gerenciamento de Serviços      |
| 9      | Atualizar tipos de serviço.                                                            | RF15                         | Médio                    | Baixo               | Não     | Gerenciamento de Serviços      |
| 10      | Criar ordens de serviço vinculadas a clientes e veículos.                              | RF12                         | Alto                     | Médio               | Sim     | Gerenciamento de Serviços      |
| 11     | Atualizar status de ordens de serviço e enviar notificações automáticas.               | RF10, RF14, RF16, RF17, RF18 | Alto                     | Médio               | Sim     | Gerenciamento de Serviços      |
| 12     | Consultar ordens de serviço com filtros (cliente, status, veículo).                    | RF16                         | Alto                     | Médio               | Sim     | Gerenciamento de Serviços      |
| 13     | Criar orçamentos vinculando tipos de serviços.                                         | RF19                         | Alto                     | Médio               | Sim     | Gerenciamento de Orçamentos    |
| 14     | Enviar orçamentos para clientes.                                                       | RF20                         | Alto                     | Baixo               | Sim     | Gerenciamento de Orçamentos    |
| 15     | Gerar PDFs de orçamentos.                                                              | RF22                         | Médio                    | Médio               | Não     | Gerenciamento de Orçamentos    |
| 16     | Cadastrar produtos.                                                                    | RF23                         | Médio                    | Baixo               | Sim     | Produtos e Controle de Estoque |
| 17     | Atualizar informações de produtos cadastrados.                                         | RF24, RF25                   | Médio                    | Baixo               | Sim     | Produtos e Controle de Estoque |
| 18     | Criar entrada de estoque para um produto cadastrado.                                   | RF27, RF29                   | Médio                    | Médio               | Sim     | Produtos e Controle de Estoque |
| 19     | Criar saida de estoque para um produto cadastrado.                                     | RF27, RF29                   | Médio                    | Médio               | Sim     | Produtos e Controle de Estoque |
| 20     | Consultar produtos com filtros (nome, categoria).                                      | RF26                         | Médio                    | Baixo               | Sim     | Produtos e Controle de Estoque |
| 21     | Criar formulários de feedback personalizados.                                          | RF09                         | Médio                    | Médio               | Não     | Coleta e Análise de Feedback   |
| 22     | Gerar relatórios de métricas de satisfação baseados nos feedbacks coletados.           | RF11                         | Médio                    | Médio               | Não     | Coleta e Análise de Feedback   |
| 23     | Criar relatórios personalizados de serviços                                            | RF33                         | Médio                    | Alto                | Não     | Relatórios e Análise de Dados  |
| 24     | Criar relatórios personalizados de clientes                                            | RF34                         | Médio                    | Alto                | Não     | Relatórios e Análise de Dados  |
| 25     | Criar relatórios personalizados de desempoenho de equipe                               | RF35                         | Médio                    | Alto                | Não     | Relatórios e Análise de Dados  |
| 26     | Criar relatórios personalizados de status de produto em estoque                        | RF36                         | Médio                    | Alto                | Não     | Relatórios e Análise de Dados  |
| 27     | Configurar relatórios.                                                                 | RF33, RF34, RF35, RF36       | Médio                    | Alto                | Não     | Relatórios e Análise de Dados  |
| 28     | Exibir painel de informações dos clientes atendidos.                                   | RF37                         | Alto                     | Alto                | Não     | Relatórios e Análise de Dados  |
| 29     | Exibir painel de informações dos serviços prestados.                                   | RF38                         | Alto                     | Alto                | Não     | Relatórios e Análise de Dados  |
| 30     | Exibir painel de informações do desempenho da equipe.                                  | RF39                         | Alto                     | Alto                | Não     | Relatórios e Análise de Dados  |
| 31     | Exibir painel de informações do status dos produtos em estoque.                        | RF40                         | Alto                     | Alto                | Não     | Relatórios e Análise de Dados  |
| 32     | Autenticar usuários no sistema com login por e-mail e senha.                           | RF41                         | Alto                     | Baixo               | Sim     | Autenticação                   |
| 33     | Redefinir senha de acesso por e-mail.                                                  | RF42                         | Médio                    | Baixo               | Sim     | Autenticação                   |
| 34     | Cadastrar e gerenciar usuários administrativos.                                        | RF30, RF31, RF32             | Médio                    | Médio               | Não     | Gerenciamento Administrativo   |


## Histórias de Usuário

### Gerenciamento de Clientes

1. Como administrador eu posso cadastrar clientes para que o sistema tenha informações organizadas para gerenciamento.
2. Como administrador eu posso cadasdrar veiculo para que o sistema tenha informações para gerenciamento.
3. Como administrador eu posso vincular veiculos aos clientes para ligar as informções de cada.
4. Como administrador eu posso consultar clientes com filtros (nome, status, veículo) para que a busca por informações seja mais eficiente.
5. Como administrador eu posso desativar clientes para que as informações permaneçam consistentes.
6. Como administrador eu posso atualizar clientes para que as informações permaneçam atualizadas.
7. Como administrador eu posso registrar o histórico de serviços realizados para um cliente para que seja possível acompanhar os serviços prestados.

### Gerenciamento de Serviços

8. Como administrador eu posso criar tipos de serviço para ordens de serviço para que o sistema tenha categorias organizadas para registro.
9. Como administrador eu posso atualizar tipos de serviço para que o cadastro de serviços esteja sempre atualizado.
10. Como administrador eu posso criar ordens de serviço vinculadas a clientes e veículos para que os serviços prestados sejam devidamente registrados
11. Como administrador eu posso atualizar o status das ordens de serviço e enviar notificações automáticas para que os clientes sejam informados sobre o progresso.
12. Como administrador eu posso consultar ordens de serviço com filtros (cliente, status, veículo) para que seja possível encontrar rapidamente as informações desejadas.

### Gerenciamento de Orçamentos

13. Como administrador eu posso criar orçamentos vinculando tipos de serviços para formalizar os custos dos serviços.
14. Como administrador eu posso enviar orçamentos para clientes para que eles tenham acesso aos valores previstos.
15. Como administrador eu posso gerar PDFs de orçamentos para que os clientes recebam documentos formais dos valores estimados.

### Produtos e Controle de Estoque

16. Como administrador eu posso cadastrar produtos para que o sistema tenha um controle eficiente do estoque.
17. Como administrador eu posso atualizar informações de produtos cadastrados para que os dados dos produtos estejam corretos.
18. Como administrador eu posso criar entradas de estoque para um produto cadastrado para que o controle do estoque seja atualizado.
19. Como administrador eu posso criar saidas de estoque para um produto cadastrado para que o controle do estoque seja atualizado.
20. Como administrador eu posso consultar produtos com filtros (nome, categoria) para que a busca de produtos seja mais ágil.

### Coleta e Análise de Feedback

21. Como administrador eu posso criar formulários de feedback personalizados, permitindo a configuração de diferentes tipos de perguntas (ex.: escala, dissertativa, múltipla escolha) para que os clientes possam avaliar os serviços prestados de forma abrangente.
22. Como administrador eu posso gerar relatórios de métricas de satisfação com base nos feedbacks coletados, como média de avaliações por serviço e taxa de resposta, para que o desempenho do serviço seja analisado de forma detalhada.

### Relatórios e Análise de Dados

23. Como administrador eu posso criar relatórios personalizados sobre serviços realizados para que as decisões estratégicas sejam baseadas em dados confiáveis.
24. Como administrador eu posso criar relatórios personalizados sobre clientes atendidos para que as decisões estratégicas sejam baseadas em dados confiáveis.
25. Como administrador eu posso criar relatórios personalizados sobre desempenho de equipes para que as decisões estratégicas sejam baseadas em dados confiáveis.
26. Como administrador eu posso criar relatórios personalizados sobre status de produtos em estoque para que as decisões estratégicas sejam baseadas em dados confiáveis.
27. Como administrador eu posso configurar diferentes tipos de relatórios (ex.: gráficos, tabelas detalhadas, sumários) para atender a demandas específicas de análise.
28. Como administrador eu posso criar um painel consolidado com informações gerais do negócio dos clientes atendidos
29. Como administrador eu posso criar um painel consolidado com informações gerais do negócio dos serviços concluídos
30. Como administrador eu posso criar um painel consolidado com informações gerais do negócio do desempenho de equipe 
31. Como administrador eu posso criar um painel consolidado com informações gerais do negócio do status do estoque.

### Autenticação

32. Como administrador eu posso autenticar usuários no sistema com login por e-mail e senha para que o acesso seja seguro e controlado.
33. Como administrador eu posso redefinir a senha de acesso por e-mail para que os usuários possam recuperar o acesso ao sistema.

### Gerenciamento Administrativo

34. Como administrador eu posso cadastrar e gerenciar usuários administrativos para que o controle de acessos e permissões seja eficiente.


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
| 0.3    | Ajuste do Backlog a partir dos reavaliação dos requisitos  | [Paulo André](http://github.com/PauloFilho2)          | 19/01/2025 |

</center>