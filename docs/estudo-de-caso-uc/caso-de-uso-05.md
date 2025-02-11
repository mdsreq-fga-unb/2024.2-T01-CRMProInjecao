
# Caso de Uso 02: Registrar Campanhas de Saúde

## Nome
Registrar Campanhas de Saúde

## Breve descrição
Este caso de uso permite que as organizações de saúde possam registrar campanhas de saúde para que sejam divulgadas e realizadas. Para isso, é possível que seja realizado o cadastro, consulta e alteração das campanhas de saúde.

## Atores
- **Organizações**

## Fluxo de Eventos

### Fluxo Principal
Este caso de uso é iniciado quando a organização escolher a opção *Campanhas de Saúde*.

1. O sistema apresenta as seguintes opções:
   
    - *Cadastrar nova Campanha de Saúde*;
    - *Remover Campanha de Saúde* [FA01](#fa01-remover-campanha-de-saude);

2. A Organização seleciona a opção para o cadastro de uma nova campanha de saúde.
3. O sistema apresenta as informações a serem preenchidas para a inclusão de uma nova campanha de saúde.
4. A Organização preenche as informações e solicita o cadastro.
5. O sistema valida as informações preenchidas [RN01](#rn01-validacao-de-informacoes) [FE01](#fe01-validacao-de-informacoes).
6. O sistema verifica se a campanha já existe [RN02](#rn02-verificacao-de-campanha-existente) [FE02](#fe02-validacao-de-camapanha-existente).
7. O sistema envia uma mensagem perguntando se a Organização desja confirmar o cadastro.
9. A Organização seleciona a opção de confirmar o cadastro [FE03](#fe03-nao-confirmacao-de-cadastro).
10. O sistema exibe a mensagem de campanha cadastrada com sucesso.
11. O caso de uso é encerrado.

### Fluxos Alternativos

#### FA01 Remover Campanha de Saúde

No passo um do Fluxo Principal o Profissional de Saúde seleciona a opção de Atualizar Dados de Profissional de Saúde.

1. O sistema mostra as campanhas de saúde cadastradas [FE04](#fe04-campanhas-de-saude-nao-encontradas).
2. A Organização seleciona uma campanha de saúde.
3. O sistema apresenta um resumo das informações da campanha de saúde selecionada;
4. O sistema apresenta a opção de remover a campanha de saúde.
5. A Organização seleciona a opção de remover.
6. O sistema exibe uma mensagem de confirmação [FE05](#fe05-nao-confirmacao-de-remocao).
7. A Organização confirma a remoção.
8. O sistema exibe a mensagem de campanha de saúde removida com sucesso.
9. O caso de uso é encerrado.

### Fluxos de Exceção

#### FE01 Validação de Informações

No fluxo principal na etapa 5, o sistema valida as informações preenchidas pela Organização. Caso as informações estejam inválidas (formatacação ou obrigatoriedade), o sistema exibe uma mensagem de erro informando a organização e retorna ao passo 3 do fluxo principal.

#### FE02 Validação de camapanha existente

No fluxo principal na etapa 6, o sistema verifica se a campanha de saúde já existe. Caso a campanha já exista, o sistema exibe uma mensagem de erro informando a organização e retorna ao passo 3 do fluxo principal.

#### FE03 Não confirmação de cadastro

No fluxo principal na etapa 9, o sistema exibe uma mensagem perguntando se a Organização deseja confirmar o cadastro. Caso a Organização não confirme o cadastro, o sistema exibe uma mensagem de cancelamento e retorna ao passo 3 do fluxo principal.

#### FE04 Campanhas de saúde não encontradas

No fluxo alternativo na etapa 1, o sistema verifica se existem campanhas de saúde cadastradas. Caso não existam campanhas de saúde cadastradas, o sistema exibe uma mensagem informando a Organização e retorna ao passo 1 do fluxo principal.


#### FE05 Não confirmação de remoção

No fluxo alternativo na etapa 7, o sistema exibe uma mensagem perguntando se a Organização deseja confirmar a remoção. Caso a Organização não confirme a remoção, o sistema exibe uma mensagem de cancelamento e retorna ao passo 3 do fluxo alternativo.


## Requisitos Especiais

- O sistema deve estar acessível em dispositivos móveis com Android e iOS.
- O tempo máximo de resposta do sistema para validação deve ser inferior a 2 segundos.
- Os campos obrigatórios devem ser destacados e informados ao usuário caso estejam vazios.

## Regras de Negócio

### RN01 Validação de informações
As seguintes validações devem ser realizadas:

| Campo                | Formato                        | Obrigatoriedade |
|----------------------|------------------------------|----------------|
| Nome da Campanha     | Texto em até 50 caracteres                          | Sim            |
| Descrição            | Texto em até 500 caracteres                          | Sim            |
| Data de Início       | Data                    | Sim            |
| Data de Término      | Data                    | Sim            |
| Local                | Texto em até 50 caracteres                          | Sim            |
| Público Alvo         | Texto em até 50 caracteres                          | Sim            |


### RN02 Verificação de campanha existente

No passo 6 do fluxo principal, o sistema verifica se a campanha de saúde já existe no mesmo dia, hora, local e público alvo. Caso a campanha já exista, o sistema exibe uma mensagem de erro informando a organização e retorna ao passo 3 do fluxo principal.

## Pré-Condições

- A organização de saúde deve ter acesso ao sistema Connect Care via web ou aplicativo móvel.
- A Organização de saúde deve fornecer informações válidas para completar o registro.

## Pós-Condições

- Após o registro bem-sucedido, a campanha de saúde pode ser visualizada.

## Histórico de Revisão

| Versão | Descrição | Autor | Data |
| ------ | ------------------------------------------------------------------- | ------------ |---------- |
| 1.0 | Criação da Especificação | [Bruno Bragança dos Reis](https://github.com/BrunoBReis) | 11/02/2025 |