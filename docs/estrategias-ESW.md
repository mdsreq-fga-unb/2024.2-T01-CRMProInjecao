## Estratégia Priorizada 

- **Abordagem**: Ágil
- **Ciclo de Vida**: Ágil
- **Processo**: ScrumXP


## Quadro Comparativo

|       Características       |                                             ScrumXP                                             |                                           RAD (Rapid Application Development)                                            |
| :-------------------------: | :---------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
|       Abordagem Geral       |            Iterativo e incremental com foco em entregas rápidas e feedback contínuo.            |       Metodologia centrada em ciclos rápidos de desenvolvimento, com ênfase na criação e validação de protótipos.        |
|  Complexidade do Processo   |          Mais leve e ágil, com menos documentação formal e foco na entrega funcional.           |           Processo simplificado, com menos formalidade e foco na criação rápida de funcionalidades essenciais.           |
|      Qualidade Técnica      | Alta ênfase em qualidade, utilizando práticas como TDD, pair programming e integração contínua. |            Qualidade aprimorada com base em feedback contínuo durante as revisões dos protótipos e iterações.            |
| Práticas de Desenvolvimento |           Inclui práticas robustas como TDD, refatoração contínua e pair programming.           |   Concentra-se em iterações curtas e ajustes colaborativos, com foco na rápida implementação e refinamento das ideias.   |
|    Adaptação ao Projeto     |     Ideal para projetos que necessitam de evolução contínua e alta interação com o cliente.     |     Adequado para projetos com requisitos em constante mudança e que beneficiam-se de protótipos ágeis e flexíveis.      |
|        Documentação         |               Minimiza a documentação formal, com foco em comunicação e feedback.               |       Documentação enxuta, que prioriza a agilidade e apenas os registros essenciais para guiar o desenvolvimento.       |
|    Controle de Qualidade    |  Controlado através de práticas como TDD e integração contínua, garantindo testes frequentes.   | Baseado em revisões e feedback constantes, permitindo ajustes rápidos para corrigir falhas identificadas nos protótipos. |
|       Escalabilidade        |           Mais indicado para equipes menores e médias, devido à colaboração intensa.            |         Melhor para projetos menores ou de médio porte, onde a flexibilidade e mudanças rápidas são necessárias.         |
|      Suporte a Equipes      |                 Suporta equipes menores e colaborativas, com papéis flexíveis.                  |               Ideal para equipes compactas, promovendo integração e colaboração próximas entre os membros.               |

## Justificativa

- **Diferença de conhecimentos da equipe**: A escolha pelo ScrumXP foi influenciada pela heterogeneidade nos conhecimentos da equipe, onde cada membro possui diferentes níveis de experiência e especializações. O ScrumXP se destaca por promover a colaboração constante e o compartilhamento de conhecimentos por meio de práticas como pares de programação e revisão de código. Esse aspecto facilita a distribuição e o nivelamento de conhecimentos entre todos, garantindo que mesmo os membros com menos experiência possam evoluir rápido e contribuir de forma efetiva para o projeto. Por outro lado, metodologias como o RAD podem falhar em integrar e gerenciar equipes com diferentes níveis de conhecimento de maneira tão eficiente.

- **Disponibilidade da Pro Injeção**: A ampla disponibilidade da Pro Injeção, que atua como um stakeholder crucial para o desenvolvimento do projeto, foi um fator importante na escolha pelo ScrumXP. Esse framework permite que a equipe aproveite ao máximo a presença constante da Pro Injeção, integrando feedback frequente e colaborando de maneira contínua para alinhar as entregas com as expectativas do cliente. As iterações curtas e a flexibilidade do ScrumXP ajudam a garantir que as prioridades do cliente sejam rapidamente incorporadas, otimizando o desenvolvimento. Diferente de processos como o RAD, que podem depender de interações mais intensivas em fases específicas, o ScrumXP possibilita uma colaboração contínua e eficiente.

- **Metodologias de desenvolvimento**: O ScrumXP combina aspectos ágeis e práticas de engenharia do Extreme Programming, tornando-o ideal para projetos que necessitam de alta qualidade de entrega em ciclos rápidos. Metodologias como o RAD priorizam a entrega rápida de protótipos funcionais, mas podem comprometer a manutenção do código a longo prazo devido à menor ênfase em práticas de engenharia robustas. O ScrumXP, por outro lado, utiliza práticas como desenvolvimento orientado a testes (TDD) e integração contínua, que asseguram que cada incrementação seja desenvolvida com um alto padrão de qualidade. Isso garante um processo que é ágil, mas sem abrir mão da manutenção e da extensibilidade do software.

- **Adaptabilidade aos requisitos**: A natureza dos requisitos do projeto em questão é bastante dinâmica, com mudanças frequentes nas necessidades e objetivos. Nesse cenário, a capacidade de resposta é essencial, e o ScrumXP oferece um modelo de desenvolvimento altamente adaptável. O uso de sprints curtos, a retrospectiva constante e a revisão de backlog permitem ajustes rápidos no rumo do projeto, assegurando que as mudanças de requisitos sejam incorporadas sem interrupções significativas. Em contraste, o RAD, embora flexível, pode ter limitações quando se trata de adaptar rapidamente funcionalidades ou de refatorar código para requisitos que mudam com frequência, uma vez que o foco principal está na entrega de protótipos rápidos.

## Referencial Teórico Utilizado

Para a construção do quadro comparativo entre as metodologias ScrumXP e RAD, utilizou-se como base literaturas clássicas sobre metodologias ágeis, assim como publicações recentes que abordam estudos de caso e boas práticas no desenvolvimento ágil. Abaixo, são citadas as principais referências teóricas que fundamentaram a comparação:

1. **Beck, K., & Andres, C. (2004). *Extreme Programming Explained: Embrace Change*.**
   
      - Este livro é considerado um dos principais referências sobre o Extreme Programming (XP), abordando as práticas de desenvolvimento como TDD, refatoração e pair programming, que foram consideradas na comparação das práticas de desenvolvimento e da qualidade técnica.

2. **Schwaber, K., & Sutherland, J. (2017). *The Scrum Guide*.**
   
      - A guia oficial do Scrum foi utilizada para entender as principais características do framework Scrum, sua abordagem iterativa e incremental, e como isso contribui para a flexibilidade e colaboração constante, aspectos relevantes para o quadro comparativo.

3. **Martin, R. C. (2009). *Clean Code: A Handbook of Agile Software Craftsmanship*.**
   
      - A obra de Robert C. Martin contribuiu na análise dos aspectos de qualidade técnica e das boas práticas de engenharia de software. As práticas de qualidade associadas ao ScrumXP foram fundamentadas a partir das discussões sobre código limpo e manutenção.

4. **Pressman, R. S. (2014). *Software Engineering: A Practitioner's Approach*.**
   
      - O livro de Pressman foi utilizado como referência para a caracterização do RAD, detalhando o processo de desenvolvimento rápido de aplicações e destacando suas vantagens e limitações em comparação com outras metodologias ágeis.

5. **Boehm, B., & Turner, R. (2003). *Balancing Agility and Discipline: A Guide for the Perplexed*.**
   
      - O livro de Boehm e Turner ajudou a compreender os pontos fortes e fracos de cada metodologia em relação à complexidade do processo e à necessidade de documentação formal, aspectos diretamente abordados no quadro comparativo.

Essas fontes permitiram uma análise detalhada e fundamentada das características de cada metodologia, destacando os pontos fortes e as limitações em diferentes contextos de projeto, de modo a justificar a escolha mais adequada para o projeto, vale ressaltar que acessamos resumos sobre as obras citadas, pois não tivemos tempo hábil para a leitura completa das mesmas.


## Histórico de Versão

<center>


| Versão | Descrição                             | Autor                                                                                                                                                                                                                                           | Data       |
| ------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 0.1    | Primeira ideia do projeto             | [Bruno Bragança](http://github.com/BrunoBReis), [Fábio Torres](http://github.com/fabioaletorres), [Paulo Filho](http://github.com/PauloFilho2), [Pedro Braga](http://github.com/Stain19), [Vinicius Vieira](http://github.com/viniciusvieira00) | 07/11/2024 |
| 0.2    | Atualizações do feedback do professor | [Bruno Bragança](http://github.com/BrunoBReis), [Fábio Torres](http://github.com/fabioaletorres), [Paulo Filho](http://github.com/PauloFilho2), [Pedro Braga](http://github.com/Stain19), [Vinicius Vieira](http://github.com/viniciusvieira00) | 08/11/2024 |
| 0.3    | Adição de referencial teórico         | [Vinicius Vieira](http://github.com/viniciusvieira00)                                                                                                                                                                                           | 19/11/2024 |

</center>