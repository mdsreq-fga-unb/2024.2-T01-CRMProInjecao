# Política de Branches


## Para o repositório Doc

### Main
<p align="justify" style="text-indent: 20px">
    Branch principal do repositório, apresenta código em sua última versão e estável para o usuário final. Por isso possui as seguintes regras:
</p>

- Só existe uma main no projeto;
- Commits não são permitidos diretamente nessa branch;

### Docs
<p align="justify" style="text-indent: 20px">
    As branches são nomeadas seguindo um padrão para uma melhor organização do repositório e rastreio de commits. Por se tratar de um projeto baseado em documentos, terá apenas um tipo de nomenclatura de branch. Todas as branchs devem ser criadas a partir da main e devem estar nomeadas da seguinte maneira:
</p>

```bash
  doc/X-nome_documento
  
  Exemplo: 
  doc/1-guia_contribuicao
```

<p align="justify" style="text-indent: 20px">
    Onde:
</p>

- X: o número da issue associada
- nome_documento: nome do artefato construído

<p align="justify" style="text-indent: 20px">
    Caso não tenha um documento/artefato sendo construído coloque apenas o número da issue.
</p>


### Hotfix
<p align="justify" style="text-indent: 20px">
    Branch destinada a resolver incidentes em produção/main. Suas regras são:
</p>

- Deve ser derivada da main;
- Dever ser mesclada a main após concluída;

```bash
hotfix/nome_documento

Exemplo:
hotfix/guia_contribuicao
``` 

<p align="justify" style="text-indent: 20px">
    Onde:
</p>

- nome_documento: nome do artefato que está sendo corrigido.

## Para os repositórios de Desenvolvimento

### Main

<p align="justify" style="text-indent: 20px">
    Branch principal do 2024.2-T01-CRMProInjeca, apresenta código em sua última versão e estável para o usuário final. Por isso possui as seguintes regras:
</p>

- Só existe uma main/master no projeto;
- Commits não são permitidos diretamente nessa branch;
- Mudanças nela só ocorrem por meio de pull requests das branches release ou hotfix.

### Develop

<p align="justify" style="text-indent: 20px">
    Branch destinada ao desenvolvimento, onde as novidades partem dela. Suas regras são:
</p>

- Só existe uma branch develop no projeto;
- Deve ser sincronizada com todas as outras branches;
- Deve ser derivada da main/master.


### Feature
<p align="justify" style="text-indent: 20px">
    Branch destinada as novas funcionalidades. Suas regras são:
</p>

- Deve ser derivada da develop;
- Deve ser mesclado de volta a develop após a funcionalidade ser desenvolvida;
- Toda nova funcionalidade tem sua própria branch, seguindo o seguite padrão de nome:

```bash
feature/X-nome_da_funcionalidade

Exemplo:
feature/2-crud_usuarios
```

<p align="justify" style="text-indent: 20px">
    Onde:
</p>

- X: número da issue associada.
- nome_da_funcionalidade: nome da funcionalidade desenvolvida.

### Release
<p align="justify" style="text-indent: 20px">
    Branch com um lote de funcionalidades que posteriormente serão adicionadas a main. Suas regras são:
</p>

- Deve ser derivada da develop;
- Após ser concluída deve ser mesclada na main/master;
- Nenhuma nova funcionalidade pode ser inserida na main/master se não por meio da release;
- Somente aceita mesclagens do tipo bugfix;
- O nome dessa branch deve seguir o padrão:

```bash
release/vnumero.numero.numero

Exemplo:
release/v1.0.28
```

<p align="justify" style="text-indent: 20px">
    Onde:
</p>

- numero: versionamento.

### Bugfix
<p align="justify" style="text-indent: 20px">
    Branch responsável por corrigir bugs encontrados na release. Suas regras são:
</p>

- Deve ser derivada da release;
- Deve ser mesclada a release após concluída;
- Seu nome segue o seguinte padrão.

```bash
bugfix/X-nome_do_bugfix

Exemplo:
bugfix/32-corrige_erro_listagem_usuarios
```

<p align="justify" style="text-indent: 20px">
    Onde:
</p>

- X: número issue associada.
- nome_do_bugfix: Bug que foi corrigido.

### Hotfix
<p align="justify" style="text-indent: 20px">
    Branch destinada a resolver incidentes em produção/main. Suas regras são:
</p>

- Deve ser derivada da main/master;
- Dever ser mesclada a main/master após concluída;
- A cada novo hotfix, a versão do produto deve ser modificado, incrementando uma unidade ao número extremo direito. O nome segue o seguinte padrão:

```bash
hotfix/vnumero.numero.numero

Exemplo:
hotfix/v2.4.3
``` 

<p align="justify" style="text-indent: 20px">
    Onde:
</p>

- numero: versionamento.

## Referências

> [1] DRIESSEN, Vincent. A successful Git branching model. [S. l.], 5 jan. 2010. Disponível em: <a href="https://nvie.com/posts/a-successful-git-branching-model/">https://nvie.com/posts/a-successful-git-branching-model/</a>. Acesso em: 18 novembro. 2024.

> [2] GITFLOW Workflow. [S. l.], 201-. Disponível em: <a href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow">https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow</a>. Acesso em: 18 novembro. 2024.

## Histórico de Versão

<center>

| Versão | Data       | Descrição                   | Autor                                                  |
| ------ | ---------- | --------------------------- | ------------------------------------------------------ |
| 1.0    | 18/11/2024 | Versão inicial do documento | [Vinicius Vieira](https://github.com/viniciusvieira00) |
| 1.1    | 26/11/2024 | Alterando a criação de branch de docs | [Bruno Bragança](http://github.com/BrunoBReis) |

</center>