# Requisitos de Software



### Lista de Requisitos Funcionais

##### Gerenciamento de Clientes

- **RF01** - Cadastrar Clientes: O sistema deve ser capaz de cadastrar clientes.
- **RF02** - Desativar Clientes: O sistema deve ser capaz de desativar clientes.
- **RF03** - Atualizar Clientes: O sistema deve ser capaz de atualizar as informações dos clientes.
- **RF04** - Consultar Clientes: O sistema deve ser capaz de consultar clientes cadastrados.
- **RF05** - Categorizar Clientes: O sistema deve ser capaz de categorizar clientes entre empresas e pessoas físicas.
- **RF06** - Registrar histórico de pedido: O sistema deve ser capaz de registrar o histórico de pedidos de cada cliente.
- **RF07** - Vincular Veículos ao Cliente: O sistema deve ser capaz de vincular veículos ao cliente no cadastro.

##### Coleta e Gestão de Feedbacks

- **RF08** - Criar formulário de Feedback: O sistema deve ser capaz de criar formulários personalizados de feedback.
- **RF09** - Enviar formulário de Feedback: O sistema deve ser capaz de enviar formulários de feedback aos clientes.
- **RF10** - Gerar relatório do Feedback: O sistema deve ser capaz de gerar relatórios com os resultados dos feedbacks coletados.

##### Gerenciamento de Serviços

- **RF11** - Criar ordem de serviço: O sistema deve ser capaz de criar ordem de serviço para os clientes.
- **RF12** - Criar tipo de serviço: O sistema deve ser capaz de criar um tipo de serviço.
- **RF13** - Finalizar ordem de serviço: O sistema deve ser capaz de finalizar ordem de serviço.
- **RF14** - Atualizar ordem de serviço: O sistema deve ser capaz de atualizar as informações das ordens de serviço.
- **RF15** - Consultar ordem de serviço: O sistema deve ser capaz de consultar as ordens de serviço cadastradas.
- **RF16** - Atualizar status da ordem de serviço: O sistema deve ser capaz de atualizar o status da ordem de serviço (ex.: "em andamento", "concluído").
- **RF17** - Enviar notificação de status da ordem de serviço: O sistema deve ser capaz de enviar notificações via e-mail sobre o status das ordens de serviços aos clientes.

##### Gerenciamento do Orçamento

- **RF18** - Criar orçamento: O sistema deve ser capaz de criar orçamento, baseado em tipos de serviço, produtos e valores adicionais vinculados ao orçamento.
- **RF19** - Enviar orçamentos: O sistema deve ser capaz de enviar orçamentos aos clientes.
- **RF20** - Atualizar orçamento: O sistema deve ser capaz de atualizar o status de um orçamento.
- **RF21** - Gerar PDF do orçamento: O sistema deve ser capaz de gerar um .pdf do orçamento.

##### Gerenciamento de Produtos e Estoque

- **RF22** - Cadastrar Produtos: O sistema deve ser capaz de cadastrar produtos.
- **RF23** - Desativar os Produtos: O sistema deve ser capaz de inativar produtos.
- **RF24** - Atualizar Produtos: O sistema deve ser capaz de atualizar as informações dos produtos.
- **RF25** - Consultar Produtos: O sistema deve ser capaz de consultar os produtos cadastrados.
- **RF26** - Criar entrada ou saída de estoque: O sistema deve ser capaz de gerar uma entrada ou saída para um produto cadastrado.
- **RF27** - Automatizar o Estoque: O sistema deve ser capaz de atualizar automaticamente os produtos que forem utilizados pelo pedido.
- **RF28** - Enviar notificação de baixo Estoque: O sistema deve ser capaz de enviar uma notificação ao administrador quando há um produto em baixo nível de estoque (definido pelo usuário).

##### Gerenciamento Administrativo

- **RF29** - Criar Administrador: O sistema deve ser capaz de cadastrar administradores.
- **RF30** - Atualizar Administrador: O sistema deve ser capaz de atualizar as informações dos administradores.
- **RF31** - Excluir Administrador: O sistema deve ser capaz de excluir administradores.

##### Relatório e Análise de Dados

- **RF32** - Criar relatórios personalizados: O sistema deve a partir das informações selecionadas (serviços, clientes, desempenho financeiro) o sistema deve ser capaz de gerar um relatório específico de um destes dados.
- **RF33** - Analisar negócio geral: O sistema deve ser capaz de gerar um relatório geral sobre o negócio, com informações pré-selecionadas (número de clientes atendido, serviços concluídos, etc..)

##### Autenticação

- **RF34** - Validar o acesso do usuário: O sistema deve, a partir das informações inseridas no login (email e senha), validar o acesso do usuário.

- **RF35** - Redefinir senha de acesso: O sistema deve ser capaz de gerar uma nova senha para usuário.



## Lista de Requisitos Não Funcionais (RNF)

##### Desempenho

- **RNF01**: O sistema deve suportar até 50 acessos simultâneos sem perda significativa de desempenho.
- **RNF02**: As respostas do sistema a requisições devem ter um tempo máximo de 2 segundos.
- **RNF03**: O sistema deve garantir disponibilidade de acesso 24 horas por dia.

##### Segurança

- **RNF04**: O sistema deve implementar autenticação de dois fatores para usuários administrativos.
- **RNF05**: Garantir proteção dos dados sensíveis em conformidade com a LGPD.
- **RNF06**: Realizar auditorias regulares dos logs de acesso e ações no sistema.

##### Confiabilidade

- **RNF07**: O sistema deve garantir uptime de 99% em produção.
- **RNF08**: Realizar backups automáticos diariamente.
- **RNF09**: Implementar recuperação automática em caso de falhas no sistema.

##### Usabilidade

- **RNF10**: O sistema deve possuir uma interface intuitiva e responsiva, acessível em dispositivos móveis e desktops.
- **RNF11**: As telas devem ser adaptadas para usuários com diferentes níveis de conhecimento técnico.
- **RNF12**: Fornecer uma documentação detalhada explicando como utilizar as principais funcionalidades do sistema.

##### Escalabilidade

- **RNF13**: A aplicação deve ser escalável para suportar o crescimento do número de clientes e serviços sem refatorações significativas.

##### Manutenibilidade

- **RNF14**: O sistema deve ser modular para facilitar futuras atualizações e correções.
- **RNF15**: Garantir que a base de código tenha cobertura mínima de 80% por testes automatizados.

##### Suportabilidade

- **RNF16**: Garantir compatibilidade com os principais navegadores do mercado, como Chrome, Firefox, Edge, Opera e Safari.

##### Requisitos de Implementação

- **RNF17**: O sistema deve ser desenvolvido utilizando:
  - Back-end: Nest.js como framework.
  - Front-end: Next.js como framework.
  - Banco de Dados: PostgreSQL.



## Histórico de Versão

<center>


| Versão | Descrição                                                    | Autor                                            | Data       |
| ------ | ------------------------------------------------------------ | ------------------------------------------------ | ---------- |
| 0.1    | Adicionando listas de requisitos funcionais e não funcionais | [Fábio Torres](http://github.com/fabioaletorres) | 14/12/2024 |

