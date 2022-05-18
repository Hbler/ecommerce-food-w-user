# Planejamento E-Commerce - Capstone

## Ferramentas
- Versionamento: GitFlow
- Organização: Trello
- Padrão de código: Prettier (Extensão VScode) / CamelCase (JavaScript) / BEM (CSS) / Português

## Fluxograma
> Página Inicial:
- Modais p/ cadastro e login
- Pesquisa produto
  - utilizando campo de busca
    - por nome / categora 
  - clicando em tags
    - categoria
- Vitrine
  - cards com foto, nome, descrição, categoria (em forma de tag que ativa o filtro), preço, botão adiconar ao carrinho
  - mouse sobre o porduto -> efeito hover
- Carrinho
  - lista de produtos
    - cards com foto, nome, categoria, preço, botão remover, input de quantidade
  - preço totoal

> Dashboard:
- Lista de produtos do usuário c/ botão de editar
  - card similar ao carrinho
- Campo de registro de novo produto c/ botão de cadastrar
- Modal de edição

## Ordem de desenvolviemnto:
- Estrutura
  - **Página Inicial** -> Mobile First (CSS)
    - Layout - branch: feature/layout-home
      - HTML + CSS (Apenas página com elementos mas sem funcionalidade)
    - Modais de Cadastro e Login - branch: feature/login-cadastro
      - DOM + CSS + JavaScript
      - Não depende do layout pois serão ativados com um botão
    - Funcionalidades Vitrine - branch: feature/vitrine
      - DOM + CSS + JavaScript + API
      Não depende do layout, serão ”apendados” (rs) num node HTML
    - Funcionalidades Carrinho - branch: feature/carrinho
      - DOM + CSS + JavaScript + LocalStorage / API (-> Extra: Requisições Cart)
      - Depende do layout e da vitrine apenas para testes de adicionar e remover, que podem ser simulados
    - Funcionalidade Pesquisa - branch: feature/pesquisa-filtro
      - JavaScript / API (-> Extra: Filtrar produtos do usuário)
      - Depende de layout e vitrine
  - **Dashboard** -> Mobile First (CSS)
    - Layout - branch: feature/layout-dashboard
      - HTML + CSS (Apenas página com elementos mas sem funcionalidade)
    - Listar produtos do usuário - branch: feature/produtos-usuario
      - DOM + CSS + JavaScript + API
    - Funcionalidade cadastrar produtos - branch: feature/novo-produto
      - DOM + CSS + JavaScript + API
    - Modal de edição - branch: feature/editar-produto
      - DOM + CSS + JavaScript + API (para o botão de enviar)
      - Depende de “Listar Produtos do Usuário”

> Modelos:
- **Product** - Cada instancia tem:
>>>>>>> develop
  - Atributos
    - ID 
    - Nome 
    - Preço 
    - Descrição 
    - Categoria
    - Fonte da imagem
  - Métodos
    - Retornar um card pronto
    - Outros métodos necessários para distribuir a a criação dos cards

> Controllers (Classes Estáticas):
- Vitrine / "Vitrine" da dashboard
- Carrinho
- Filtros
- Cadastro/Edição de Produtos


## Estrutura de Arquivos
> Root
- **index**.html
- **README**.md
- **Planejamento**.md
> SRC
- > Controllers
  - **ControllerVitrine**.js
  - **ControllerCarrinho**.js
  - **ControllerFiltros**.js
  - **ControllerCadastroProdutos**.js
- > Models
  - **Produto**.js
- > Util
  - **API**.js
- > Styles
  - **style**.css 
    - importa os demais, onde estão as configs globais (estilos dos botões por exemplo)
  - **layout**.css 
    - estilos de layout iniciando pelo mobile, e “subindo” para outros tamanhos de tela
  - **dashboard**.css 
    - estilos da dashboar iniciando pelo mobile, e “subindo” para outros tamanhos de tela
  - **cards_vitrine**.css 
    - estilos dos cards iniciando pelo mobile, e “subindo” para outros tamanhos de tela
  - **cards_carrinho**.css 
    - estilos dos cards do carrinho iniciando pelo mobile, e “subindo” para outros tamanhos de tela
  - **cards_dasbhoard**.css 
    - estilos dos cards do dasboard iniciando pelo mobile, e “subindo” para outros tamanhos de tela
  - **modal**.css 
    - estilos dos três modais (cadastro, login, edição do produto cadastrado) iniciando pelo mobile, e “subindo” para outros tamanhos de tela


