
# Caso de Uso 02: Gerar Atendimentos

## Nome
Gerar Atendimentos de Saúde

## Breve descrição
Este caso de uso permite ao profissional de saúde criar um perfil profissional para que sejam registradas suas especializações e horários de disponibilidade. Para isso, é possível que seja realizado o cadastro, consulta e alteração dos dados do profissional de saúde.

## Atores
- **Profissional de Saúde**

## Fluxo de Eventos

### Fluxo Principal
Este caso de uso é iniciado quando o profissional de saúde escolher a opção *Profissional de Saúde*.

1. O sistema apresenta as seguintes opções:
- *Cadastrar novo Profissional de Saúde*;
- *Atualizar Dados de Profissional de Saúde* [FA01](#fa01-atualizar-dados-de-profissional-de-saude);
- *Consultar Profissional de Saúde* [FA02](#fa02-consultar-profissional-de-saude);

2. O Profissional de Saúde seleciona a opção para o cadastro de um novo Profissional de Saúde.
3. O sistema apresenta as informações a serem preenchidas para a inclusão de um novo Profissional de Saúde.
4. O Profissional de Saúde preenche as informações e solicita o cadastro.
5. O sistema valida as informações preenchidas [RN01](#rn01-validacao-de-informacoes) [FE01](#fe01-validacao-de-informacoes).
6. O sistema envia uma mensagem perguntando se o Profissional de Saúde deseja confirmar o cadastro.
7. O Profissional de Saúde seleciona a opção de confirmar o cadastro [FE03](#fe03-atualizacoes-nao-confirmadas).
8. O sistema exibe a mensagem de cadastro realizado com sucesso.
9. O caso de uso é encerrado.

### Fluxos Alternativos

#### FA01 - Atualizar dados de Profissional de Saúde

No passo 1 do fluxo básico o Profissional de Saúde seleciona a opção de Atualizar Dados de Profissional de Saúde.

1. O sistema solicita que o Profissional de Saúde informe o CRM do Profissional de Saúde que deseja atualizar.
2. O Profissional de Saúde informa o CRM e solicita a consulta [RN01](#rn01-validacao-de-informacoes) .
3. O sistema apresenta os dados do Profissional de Saúde procurado [FE02](#fe02-profissional-de-saude-nao-encontrado);
- Número de identificação do Profissional de Saúde (não liberado para edição), especialização médica e horários de disponibilidade.
4. O Profissional de Saúde realiza as atualizações necessárias.
5. O sistema valida os dados atualizados [FE01](#fe01-validacao-de-informacoes) [RN01](#rn01-validacao-de-informacoes).
6. O sistema pergunta ao Profissional de Saúde se deseja confirmar as atualizações.
7. O Profissional de Saúde confirma as atualizações [FE03](#fe03-atualizacoes-nao-confirmadas).
8. O sistema exibe a mensagem de dados atualizados com sucesso.
9. O caso de uso é encerrado.

#### FA02 - Consultar Profissional de Saúde

No passo 1 do fluxo básico o Profissional de Saúde seleciona a opção de Consultar Profissional de Saúde.

1. O sistema solicita que o Profissional de Saúde informe o Número de identificação do Profissional de Saúde que deseja atualizar.
2. O Profissional de Saúde informa o CRM e solicita a consulta [RN01](#rn01-validacao-de-informacoes) [FE01](#fe01-validacao-de-informacoes).
3. O sistema apresenta os dados do Profissional de Saúde procurado [FE02](#fe02-profissional-de-saude-nao-encontrado);
- Número de identificação do Profissional de Saúde (não liberado para edição), especialização médica e horários de disponibilidade.
4. O sistema apresenta a opção de voltar.
5. O Profissional de Saúde seleciona a opção de voltar.
6. O caso de uso é encerrado.

### Fluxos de Exceção

#### FE01 - Validação de Informações

Nos passos 5 do Fluxo Principal, 5 do FA01 ou 2 do FA02 o sistema verifica que uma ou mais informações não foram validadas (formato e/ou obrigatoriedade) e exibe uma mensagem informando ao Profissional de Saúde. O sistema retorna ao passo 4 do Fluxo Principal, 4 do FA01 ou 1 do FA02, conforme o local de onde foi chamado.

#### FE02 - Profissional de Saúde não encontrado

Nos passos 3 do FA01 ou 3 do FA02 o sistema não encontra o Profissional de Saúde informado e apresenta a mensagem. O sistema  retorna ao passo 2 do FA01 ou 2 do FA02, conforme o local de onde foi chamado.

#### FE03 - Atualizações não confirmadas

Nos passos 7 do Fluxo Principal ou 7 do FA01 o advogado não confirma as atualizações. O sistema retorna ao passo 6 do Fluxo Principal ou 6 do FA01 conforme o local de onde foi chamado.

## Requisitos Especiais

- O sistema deve estar acessível em dispositivos móveis com Android e iOS.
- O tempo máximo de resposta do sistema para validação deve ser inferior a 2 segundos.
- Os campos obrigatórios devem ser destacados e informados ao usuário caso estejam vazios.

## Regras de Negócio

### RN01 - Validação de informações
As seguintes validações devem ser realizadas:

| Nome                        |         Formato         | Obrigatoriedade | Valores |
|-----------------------------|:----------------------:|:--------------:|:--------|
| Número de identificação     |      9999999999       |       Sim      | -       |
| Especialização médica       | Texto até 500 caracteres |       Sim      | -       |
| Horários de disponibilidade | Texto até 500 caracteres |       Sim      | -       |



## Pré-Condições

- O profissional de saúde deve ter acesso ao sistema Connect Care via web ou aplicativo móvel.
- O profissional de saúde deve fornecer informações válidas para completar o registro.

## Pós-Condições

- Após o registro bem-sucedido, o profissional de saúde pode acessar sua conta e utilizar os serviços do sistema.
- O sistema armazena os dados do profissional de saúde para futuras autenticações.

## Histórico de Revisão

| Versão | Descrição | Autor | Data |
| ------ | ------------------------------------------------------------------- | ------------ |---------- |
| 1.0 | Criação da Especificação | [Arthur Heleno](http://github.com/arthur-heleno) | 10/02/2025 |