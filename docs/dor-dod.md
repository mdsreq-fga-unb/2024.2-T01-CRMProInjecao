## Definition of Ready (DoR)

O **Definition of Ready (DoR)** é um conjunto de critérios acordados entre o time de desenvolvimento e o Product Owner (PO) que define quando um requisito está pronto para ser puxado para uma Sprint. Esses critérios garantem que o time tenha todas as informações e condições necessárias para iniciar o trabalho no requisito, minimizando ambiguidades e bloqueios durante o desenvolvimento.

### Critérios do Definition of Ready (DoR)

1. **Requisito sem ambiguidade**
    - O requisito possui detalhes suficientes para que o time de desenvolvimento entenda o que precisa ser feito, sem ambiguidades.

2. **Requisito cabe em uma Sprint**
    - O requisito é suficientemente pequeno e está ajustado para ser concluído dentro de uma única Sprint.

3. **Representação no formato de história de usuário**
    - O requisito está descrito no formato de história de usuário, seguindo o padrão:
        - "Como **persona**, quero **funcionalidade**, para **valor de negócio**."

4. **Cobertura por critérios de aceite**
    - O requisito está acompanhado de critérios de aceitação, seguindo os modelos de valor de negócio da Lean Inception.

5. **Mapeamento para uma interface (quando necessário)**
    - Caso o requisito envolva uma interface, ela está definida e descrita, garantindo clareza para o desenvolvimento.

6. **Identificação de dependências**
    - Todas as dependências do requisito foram identificadas e estão resolvidas ou com planos claros para serem tratadas.

7. **Prioridade e aprovação**
    - O requisito foi priorizado pelo Product Owner e aprovado para ser trabalhado na próxima Sprint.

8. **Estimativa de esforço**
    - O time de desenvolvimento estimou o esforço necessário para implementar o requisito (ex.: pontos por história).

9. **Alinhamento com os objetivos do Sprint**
    - O requisito está alinhado com os objetivos do Sprint e contribui diretamente para a entrega de valor ao cliente.


## Definition of Done (DoD)

O **Definition of Done (DoD)** é um conjunto de critérios acordados entre o time de desenvolvimento e o Product Owner (PO) que define quando uma funcionalidade ou requisito está finalizado e pronto para ser liberado ou apresentado. Esses critérios garantem que o trabalho atende aos padrões de qualidade e está em conformidade com os objetivos do projeto.

Se um requisito não atender ao DoD, ele não deve ser considerado pronto para a Sprint Review ou liberado para o cliente.

### Critérios do Definition of Done (DoD)

1. **Entrega um incremento do produto**
    - A funcionalidade implementada agrega valor ao produto, resultando em um incremento utilizável e funcional.

2. **Atende aos critérios de aceite**
    - Todos os critérios de aceitação definidos previamente foram cumpridos, garantindo o comportamento esperado.

3. **Está documentado**
    - A documentação técnica e funcional está atualizada e disponível, facilitando o uso, manutenção e continuidade do desenvolvimento.

4. **Está aderente aos padrões de codificação**
    - O código segue os padrões de codificação definidos pela equipe, garantindo qualidade, consistência e facilidade de manutenção.

5. **Mantém os índices de performance**
    - A funcionalidade implementada respeita os requisitos de desempenho, sem impactar negativamente a performance do sistema.

6. **Testes unitários e de integração aprovados**
    - Todos os testes unitários e de integração foram executados e aprovados, garantindo que o sistema funcione corretamente e de forma integrada.

7. **Revisão de código concluída**
    - O código foi revisado por outros membros da equipe para garantir qualidade, identificar melhorias e evitar problemas futuros.

8. **Validação de QA**
    - A equipe de QA validou a funcionalidade, verificou conformidade com a LGPD (quando aplicável) e assegurou alta qualidade do código.

9. **Feedback do cliente incorporado (quando aplicável)**
    - O feedback do cliente foi revisado e incorporado, garantindo que as expectativas foram atendidas.

10. **Integração com o banco de dados garantida**
    - No caso de funcionalidades que envolvam persistência, a integração com o banco de dados PostgreSQL (via TypeORM) foi testada e validada.

11. **Documentação de API (para back-end com NestJS)**
    - Se a funcionalidade incluiu alterações na API, a documentação foi atualizada, facilitando a integração com o front-end.

12. **Compatibilidade com o front-end (ReactJS e NextJS)**
    - A funcionalidade foi testada no front-end e está integrada corretamente, garantindo o funcionamento esperado nas interfaces de usuário.

13. **Deploy em ambiente de teste concluído**
    - O incremento foi deployado em um ambiente de teste e validado antes da liberação para o cliente ou produção.

---

Os critérios de **Definition of Done** garantem que cada incremento entregue esteja de acordo com os padrões de qualidade esperados, contribuindo para o sucesso do projeto e a satisfação do cliente.


<center>

| Versão | Descrição                      | Autor                                          | Data       |
| ------ | ------------------------------ | ---------------------------------------------- | ---------- |
| 0.1    | Criação do DoR e DoD | [Bruno Bragança](http://github.com/BrunoBReis) | 16/12/2024 |

</center>