#Trabalho final


> Utilizando a estrutura inicial disponibilizada via git vamos fazer uma ferramenta capaz de identificar o formulário de avaliação do curso, montar o formulário na tela e disponibilizar as respostas baseadas na pessoa que o avaliou. Efetue uma avaliação na URL https://yurikilian.typeform.com/to/ekBkXM

> - O sistema tem que ser capaz de efetuar um request com a chave da api do typeform: https://tools-typeform-api.herokuapp.com/

> - A partir do resultado desta requisição, construir uma aplicação para interpretar o formulário e montar os campos do formulário preenchidos com o request das respostas do formulário. 
Escolha uma questão como a primária para identificar o formulário. Onde é informado o nome do usuário que preencheu o formulário.


- Podendo utilizar a estrutura de wizards feita durante as aulas, disponibilizar:
	
	- Uma tela de carregamento de formulário que habilitará a próxima  após o carregamento do formulário (trabalhar com o $http provider e ng-disabled).
	
	- Uma tela que mostra todas as questões elaboradas no formulário tratando os tipos de questões de acordo com os componentes do formulário.
	
	- Uma tela final que apresente os resultados da avaliação deste typeform.


### Estruturas angular JS que serão avaliadas:

1 - Controllers para construir a tela principal e para mostrar os formulários preenchidos com as respostas.
	
2 - Service, Factory ou Filter capaz de traduzir as respostas em um objeto de domínio que poderá ser usado no controller.
	
3 - Uso da modularização e da separação de domínios da aplicação (além do já disponibilizado no git).

4 - Diretivas ngModel, ngController, ngRepeat, ngSwitch e aplicação de filtros nas telas do sistema.

### Pré configurado:
1 -  Já existe um serviço que efetua o parse das respostas em json do typeform.

2 - Utilize-o nos seus controllers para buscar as informações.
