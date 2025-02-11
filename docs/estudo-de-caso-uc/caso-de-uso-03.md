
# Caso de Uso 03: Buscar Serviços

## Nome
Buscar Serviços

## Breve descrição
O caso de uso permite que o paciente possa buscar os serviços de saúde disponíveis, a partir de um filtro que permite a busca por localização, por disponibilidade e por tipo de atendimento.

## Atores
- **Paciente**

## Fluxo de Eventos

### Fluxo Principal
Este caso de uso é iniciado quando o paciente escolher a opção de buscar serviços.

1. O sistema apresenta as seguintes opções de busca:

    - *Realizar a busca utilizando os filtros.* [RN01](#rn01-filtros-disponiveis);
    - *Realizar a busca a partir da pesquisa de um nome específico* [FA01](#fa01-realizar-a-busca-a-partir-da-pesquisa-de-um-nome-especifico);

2. O paciente clica em busca utilizando filtros.
3. O sistema irá mostrar os filtros de localização, de disponibilidade e por tipo de atendimento.
4. O paciente irá clicar nos filtros desejados e realizará a pesquisa.
5. O sistema irá apresentar todos os serviços de saúde de acordo com os critérios do paciente.
6. O paciente irá clicar em um serviço.
7. O caso de uso é encerrado.


### Fluxos Alternativos

#### FA01 Realizar a busca a partir da pesquisa de um nome específico

No passo 1 o Paciente escolhe a opção de realizar a busca a partir da pesquisa de um nome específico

1. O sistema irá solicitar o nome do serviço.
2. O paciente irá colocar o nome do serviço desejado.
3. O sistema irá buscar o serviço pelo nome.[FE01](#fe01-servico-nao-encontrado) [RN02](#rn02-servicos-disponiveis);
4. O sistema irá mostrar o serviço encontrado.
5. O paciente irá clicar no serviço.
6. O caso de uso é encerrado.

### Fluxos de Exceção

#### FE01 Serviço não encontrado

No passo 3 do fluxo alternativo 1 FA01 o sistema não encontra o serviço pesquisado pelo nome e exibe uma mensagem “serviço não encontrado”, o sistema retorna para o passo 1 do FA01.

## Requisitos Especiais

- O sistema deve estar acessível em dispositivos móveis com Android e iOS.
- O tempo máximo de resposta do sistema para validação deve ser inferior a 2 segundos.
- Os sistema deve ter acesso à localização do dispositivo do paciente.

## Regras de Negócio

### RN01 Filtros disponíveis
| Nome                           |         Formato         | Obrigatoriedade | Valores |
|--------------------------------|:----------------------:|:--------------:|:--------|
| Filtro por localização         |             -          |       -      | Ativo/Inativo      |
| Filtro por disponibilidade     |             -          |       -      | Ativo/Inativo      |
| Filtro por tipo de atendimento |             -          |       -      | Ativo/Inativo      |

### RN02 Serviços disponíveis
| Nome                   |         Formato          | Obrigatoriedade | Valores |
|------------------------|:------------------------:|:--------------:|:--------|
| Busca por nome         | Texto até 500 caracteres |       Sim      |    -    |


## Pré-Condições

- O paciente deve ter acesso ao sistema Connect Care via web ou aplicativo móvel.
- O paciente deve estar registrado para poder acessar a funcionalidade de busca.
- O sistema deve apresentar um banco de dados com todos os serviços cadastrados

## Pós-Condições

- Após a busca bem-sucedido, o paciente pode acessar os serviços apresentados e escolher o serviço que mais lhe agrada.

## Histórico de Revisão

| Versão | Descrição | Autor | Data |
| ------ | ------------------------------------------------------------------- | ------------ |---------- |
| 1.0 | Criação da Especificação | [Paulo Filho](http://github.com/paulofilho2) | 10/02/2025 |