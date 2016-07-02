## Antes de Começar
![Estrutura de diretórios](https://github.com/Treinamento-Tools/material-treinamento/blob/master/estrutura-diretorios.png)
- Definir estrutura padrão da aplicação

### Diretório app
Diretório onde fica a aplicação
- **Components**: diretório onde ficam as partes específicas do projeto
- **Shared**: diretório onde ficam as partes em comum do projeto

### Diretório assets
Diretório separado por tecnologia, onde ficam as bibliotecas para construir o sistema:
js
  angular.min.js
  jquery.min.js
  bootstrap.min.js
css
  bootstrap.min.css

##Sugestões de inicialização da aplicação
### app.module.js
Script onde serão definidos os módulos da aplicação


### app.routes.js (próx aula)
Script de definição das rotas da aplicação

### index.html
Página inicial que importa todos os scripts acima.

Cabeçalho:

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Acompanhamento Semestral</title>
  <link rel="stylesheet" type="text/css" href="../assets/css/normalize.css" />
  <link rel="stylesheet" type="text/css" href="../assets/css/bootstrap.min.css" />
  
  <link rel="stylesheet" type="text/css" href="../assets/css/style.css" />
  <script type="text/javascript" src="../assets/js/jquery.min.js"></script>
  <script type="text/javascript" src="../assets/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="../assets/js/angular.min.js"></script>

  <script type="text/javascript" src="../app/app.module.js"></script>
</head>
```





## O que é
### Framework JavaScript que trabalha os seguintes padrões:
### MVVM - Model-View-View-Model (John Gossman / SilverLight)

![MVVM](https://raw.githubusercontent.com/Treinamento-Tools/material-treinamento/master/mvvm-pattern.png)
- O modelo não conhece a view
- O modelo expõe o seu acesso à viewModel
- A viewModel interage com a View através de data binding, eventos e comportamentos
- A view altera o estado do model através do acesso à viewModel

###Two Way Data Binding
- A alteração ocorre em todos os lados      

![Data Binding](https://raw.githubusercontent.com/Treinamento-Tools/material-treinamento/master/concepts-databinding1.png)

![Data Binding](https://raw.githubusercontent.com/Treinamento-Tools/material-treinamento/master/concepts-databinding2.png)

###Injeção de Dependência
 - Injeção de dependencia nos módulos, services, configuração ou inicialização da aplicação 
 - Usando: $inject, notação de array ou implicita

Depois que a pagina é iniciada, o Angular vai procurar pela diretiva ngApp que indica a raiz da nossa aplicação.

Quando uma diretiva ng-app for encontrada na página o angular vai criar o injetor da aplicação e usar 
a diretiva como a raiz da aplicação e compilar o html (com expressoes) dentro dela.

### Como definir uma aplicação:

```javascript
var app = angular.module("aplicacao", []);
```

```html
<html ng-app="aplicacao"></html>
```

####OU


Podemos iniciar a aplicação a partir do javascript (em casos de necessidade):
```javascript
angular.element(document).ready(function() {
      angular.bootstrap(document, ['aplicacao']);
});
```

### Definindo um controller:

```javascript
app.controller('MainController', function($scope){
    $scope.atributo = "atributo";
    $scope.metodo = function (){

    };
});

// ou

app.controller('MainController', ['$scope',function($scope){
    $scope.atributo = "atributo";
    $scope.metodo = function (){

    }; 
}]);

// ou

app.controller('MainController', MainController);
MainController.$inject = ['$scope'];
function MainController($scope) {
    $scope.atributo = "atributo";
    $scope.metodo = function (){

    };
}
```

####Usar controllers para:

 - Definir o estado inicial do objeto de $Scope
 - Adicionar comportamento ao objeto de $scope

####Não usar controllers para:
    
 - Manipular o DOM - Use diretivas.
 - Formatar entradas - Use diretivas e para validação os controles de formulários.
 - Filtros - User filtros customizados.
 - Compartilhar dados de um controller para outros (aninhados) - Usar services para isso.
 - Instanciar ou gerenciar o ciclo de vida de outros componentes.


###$scope

 - É o objeto que se refere ao modelo da aplicação (o ViewModel).
 - São o contexto de execução de expressões angular.
 - Disponibiliza a API de $watch para observer mutações do Model.
 - Disponibiliza a API de $apply para trazer para dentro do angular algo fora do seu contexto.

#####Exemplo:
```javascript
app.controller('MainController', MainController);
MainController.$inject = ['$scope'];
function MainController($scope) {
    $scope.titulo ="Sistema de RH";
}
```

Uso da Expressão:
```html
<html ng-app="aplicacao">
    <section ng-controller="MainController">
            <h1>{{titulo}}</h1>
    </section>
</html>
```


###Hierarquia de Escopo
 - RootScope - Cada aplicação angular tem um rootScope (usar isto não é boa prática).
 - Todos os novos scopes pertencem a este rootScope.
 - A ordem de criação de $scope é de acordo com a ordem que o controller é declarado no html.

###Ciclo de vida de um escopo.
![Ciclo de vida do escopo](https://raw.githubusercontent.com/Treinamento-Tools/material-treinamento/master/scope_lifecycle.png)

```js
  function addTextInterpolateDirective(directives, text) {
      var interpolateFn = $interpolate(text, true);
      if (interpolateFn) {
        directives.push({
          priority: 0,
          compile: function textInterpolateCompileFn(templateNode) {
            var templateNodeParent = templateNode.parent(),
                hasCompileParent = !!templateNodeParent.length;

            // When transcluding a template that has bindings in the root
            // we don't have a parent and thus need to add the class during linking fn.
            if (hasCompileParent) compile.$$addBindingClass(templateNodeParent);

            return function textInterpolateLinkFn(scope, node) {
              var parent = node.parent();
              if (!hasCompileParent) compile.$$addBindingClass(parent);
              compile.$$addBindingInfo(parent, interpolateFn.expressions);
              scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                node[0].nodeValue = value;
              });
            };
          }
        });
      }
    }
```

####$apply
 - Funções fora do contexto (realm) do angular, a view fica desincronizada.
 - Para o angular
saber que houve mudança de valores em determinado model é necessário que esta mudanca seja executada com $apply para
executar o processo de $digest.

```javascript
$scope.apply(function(){
    setInterval(function(){
        $scope.count++;
    },1000) ;
});
```

####$digest
Processa todos os $watchers (assinantes de um evento) e verifica se houve mudança.

###Principais diretivas Angular:
#### NgModel
 - Com esta diretiva podemos ativar o two way data binding
 - É a ligação entre a view e o model.

Uso da Expressão:
```html
<html ng-app="aplicacao">
    <section ng-controller="MainController">
            <h1>{{titulo}}</h1>
    </section>
    Título: <input type="text" ng-model="titulo">
</html>
```

#### NgRepeat 
 - loop em um atributo

Uso da Expressão:
```html
<html ng-app="aplicacao">
    <section ng-controller="MainController">
        <ul>
            <li ng-repeat="produto in produtos">
                {{produto.nome}}
            </li>
        </ul>
    </section>
</html>
```

### NgOptions
 - usa-se para construir selects sem a criação de vários escopos
 - o ng-model é ligado por **referencia** e não por valor
 - para selecionar um atributo especifico da collection usa-se track by
Uso da Expressão:
```html
<html ng-app="aplicacao">
<div ng-app="myapp">
    <fieldset ng-controller="FirstCtrl">
        <select ng-options="pessoa.id as pessoa.nome for pessoa in pessoas"
            ng-model="pessoaSelecionada"></select>
        {{ pessoaSelecionada }}
    </fieldset>
</div>
```
```javascript
 $scope.pessoas = 
     [
      {id: 11, nome: "fulano", label: "Pessoa 1"}, 
      {id: 22, nome: "pessoa", label: "Pessoa 2"}
     ];
    $scope.pessoaSelecionada = 11;
```


#### NgForm  
 - Alias para o formulário html
 - Entende formulários aninhados

Uso da Expressão:
```html
<html ng-app="aplicacao">
    <section ng-controller="MainController">
        <form name="formulario">
            <form name="produto_{{produto.codigo}}" ng-repeat="produto in produtos">
                Nome do produto<input type="text" ng-model="produto.nome">
            </form>                
        </form>
    </section>
</html>
```

#### NgShow  
 - Mostra um elemento de acordo com a expressão

Uso da Expressão:
```html
<div ng-controller="MainController">
  Mostrar: <input type="checkbox" ng-model="mostrar" value="true">
  <div ng-show="mostrar">
    <h3>Mostrar tela!</h3>
  </div>
</div>
```

#### NgHide  
 - Esconde um elemento de acordo com a expressão

Uso da Expressão:
```html
<div ng-controller="MainController">
  Mostrar: <input type="checkbox" ng-model="esconde" value="true">
  <div ng-hide="esconde">
    <h3>Esconder tela!</h3>
  </div>
</div>
```


#### NgIF  
 - Escode/Mostra um elemento e executa seu escopo de acordo com a expressão

Exemplo:
```javascript
app.controller('MainController', MainController);
MainController.$inject = ['$scope'];
function MainController($scope) {
    $scope.mostrar=false;
}

app.controller('InnerController', InnerController);
InnerController.$inject = ['$scope'];
function InnerController($scope) {
    alert("Ng if!");
}
```

Uso da Expressão:
```html
<div ng-controller="MainController">
  Mostrar: <input type="checkbox" ng-model="mostrar" value="true">
  <div ng-if="mostrar">
    <h3 ng-controller="InnerController">Mostrar tela!</h3>
  </div>
</div>
```

#### NgClick 
 - executa comportamentos do escopo
 - altera viewModel
Uso da Expressão:
```html
<div ng-click="metodo()">NgClick</div>
<!-- ou -->
<div ng-click="atributo='novoValor'">NgClick</div>
```

#### NgSrc   
 - Interpreta expressões na url de um src
```html
<img ng-src="http://localhost/{{hash}}" alt="Description" />
```

###NgSwitch
 - Constroi o DOM de acordo com uma expressão switch

```html
<select ng-model="selecao">
  <option value="home">Home</option>
  <option value="contato">Contato</option>
  <option>--Selecione--</option>
</select> 

<div ng-switch on="selecao">
  <div ng-switch-when="home">Home</div>
  <div ng-switch-when="contato">Contato</div>
  <div ng-switch-default>default</div>
</div>
```

###Filtros
 - currency
 - date
 - uppercase


### Exercícios em Aula
https://www.codecademy.com/pt/courses/learn-angularjs/lessons/your-first-app/exercises/your-first-app-hello-angularjs-i

### Exercícios para casa
Considerando as páginas construídas na última aula:

- Crie um módulo principal(aplicacao) chamado sistemaRH.
- Neste módulo construa um controller para cada página complentando cada informação da página.

  Sugestões:

  MainController:
    - Criar um controller principal para definir informações gerais da página como nome do titulo.

  Importação de arquivo:
    - Criar controller
    - Definir o título da página
    - Definir os nomes das ações
    - Atribuir informações no html

  Informações Gerais:
    - Criar uma lista de objetos que representam as informacoes do profissional

    Exemplo:

    ```javascript

      [{
            nome: "Yuri Kilian"
            cargo: "desenvolvedor",
            equipe: "Desenvolvimento"
        },
        {
            nome: "Fulano"
            cargo: "desenvolvedor",
            equipe: "Desenvolvimento"
      }]

    ```
    - Usar a lista acima para selecionar o profissional utilizan o campo select com a diretiva NgOptions


  Avaliação do Profissional
    - Criar título da página
    - Criar uma lista que tenham objetos que representam as competencias avaliadas, por exemplo:

    ```javascript
          lista = [
          {
            label:"Competencia 1", 
            respostaDoProfissional: 10,
            respostaDoGestor: 10
          },
          .....
          {
            label:"Competencia 1", 
            respostaDoProfissional: 10,
            respostaDoGestor: 10
          }
      ];

    ```

    - Ligar os atributos da avaliação do gestor desta lista nos inputs html com ng-model. 

    - Criar atributos para o restante dos componentes da tela - ligando os mesmos com ng-model. 

    Conclusão
    - Criar os radio buttons da avaliação geral ligando os registros com o escope do controller