# CRM-ProInjecao

## Equipe

| Foto      | ![Foto](https://avatars.githubusercontent.com/u/62809606?v=4) | ![Foto](https://avatars.githubusercontent.com/u/131913211?v=4) | ![Foto](https://avatars.githubusercontent.com/u/111324066?v=4) | ![Foto Pedro](https://avatars.githubusercontent.com/u/98167728?v=4) | ![Foto](https://avatars.githubusercontent.com/u/64455111?v=4) | ![Foto](https://avatars.githubusercontent.com/u/55404289?v=4) |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Nome      | [Bruno Bragança dos Reis](https://github.com/BrunoBReis)     | [Paulo André Valadão de Brito Filho](https://github.com/paulofilho2) | [Fábio Alessandro Torres Santos](https://github.com/fabioaletorres) | [Pedro Henrique Braga de Morais](https://github.com)         | [Vinicius Angelo de Brito Vieira](https://github.com/viniciusvieira00) | [Arthur Heleno do Couto da Silva](https://github.com/arthur-heleno) |
| Matrícula | 221007902                                                    | 221031229                                                    | 200037170                                                    | 211062384                                                    | 190118059                                                    | 180116746                                                    |
| Cargo     | Gerente de Projeto                                           |  Desenvolvedor Back-end                                                 | Analista de Qualidade                                        | Product Owner                                       | Scrum Master // Desenvolvedor Front-end                      | Analista de Requisitos                                       |

## Instruções para os desenvolvedores

Para executar a documentação localmente, siga os seguintes passos:

1. **Clone o repositório do projeto**:
   Utilize o método de sua preferência:
   ```bash
   # Via SSH:
   git clone git@github.com:mdsreq-fga-unb/2024.2-T01-CRMProInjecao.git
   
   # Via HTTPS:
   git clone https://github.com/mdsreq-fga-unb/2024.2-T01-CRMProInjecao.git
   ```
   Em seguida, entre no diretório do projeto:
   ```bash
   cd 2024.2-T01-CRMProInjecao
   ```

2. **Mude para a branch `docs`**:
   ```bash
   git checkout docs
   ```

3. **Crie e ative um ambiente virtual (venv)**:
   ```bash
   python -m venv venv --prompt="mkdocs"
   
   # Ative o ambiente virtual:
   # No Windows:
   .\venv\Scripts\activate
   # No macOS/Linux:
   source venv/bin/activate
   ```

4. **Instale as dependências do projeto**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Execute o servidor do mkdocs**:
   ```bash
   mkdocs serve
   ```

6. **Acesse a documentação**:
   Abra o navegador e acesse `http://127.0.0.1:8000/` para visualizar a documentação localmente.

### Build, Push e Deploy de Alterações

1. **Gerar o build da documentação**:
   ```bash
   mkdocs build
   ```
   Isso criará uma pasta `site` com os arquivos estáticos gerados.

2. **Adicionar e commitar as alterações**:
   ```bash
   git add .
   git commit -m "Atualização na documentação"
   ```

3. **Fazer push das alterações para a branch `docs`**:
   ```bash
   git push origin docs
   ```

4. **Deploy da documentação**:
   O deploy da documentação pode ser feito utilizando o comando `mkdocs gh-deploy`, que realiza a publicação diretamente no GitHub Pages.
