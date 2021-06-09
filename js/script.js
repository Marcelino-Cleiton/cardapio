$(document).ready(function() {
    $('.parallax').parallax();
    $('.sidenav').sidenav();
});
var app = angular.module('mesaApp', []);
app.controller('mesaController', function($scope, mesaService) {
    $scope.mesa = {};
    $scope.reserva = function(mesa) {
        var retorno = "";
        if (mesa.reservado) {
            retorno = 'Reservado';
        } else {
            retorno = 'Disponível';
        }
        return retorno;
    };
    listar();

    function listar() {
        mesaService.listar().then(function(resposta) {
            $scope.mesas = resposta.data;
        });
    }

    $scope.salvar = function(mesa) {
        mesaService.salvar(mesa).then(listar);
        $scope.mesa = {};
    };

    $scope.editar = function(mesa) {
        $scope.mesa = angular.copy(mesa);
    };

    $scope.excluir = function(mesa) {
        mesaService.excluir(mesa).then(listar);
    };

    $scope.cancelar = function() {
        $scope.mesa = {};
    };
});

app.service('mesaService', function($http) {

    var api = 'http://localhost:3000/mesas';

    this.listar = function() {
        return $http.get(api);
    };

    this.salvar = function(mesa) {
        if (mesa.id) {
            return $http.put(api + '/' + mesa.id, mesa);
        } else {
            return $http.post(api, mesa);
        }
    };

    this.excluir = function(mesa) {
        return $http.delete(api + '/' + mesa.id);
    };

});

var app = angular.module('cadastrosApp', []);

app.controller('cadastrosController', function($scope, cadastrosService) {
    $scope.cadastros = cadastrosService.listar();
    $scope.cadastro = {};



    $scope.cadastros = produtoservice.listar();

    $scope.salvar = function(cadastro) {
        cadastrosService.salvar(cadastro);
        $scope.cadastro = {};
    };

    $scope.editar = function(cadastro) {
        $scope.cadastro = angular.copy(cadastro);
    };


    $scope.excluir = function(cadastro) {
        produtosService.excluir(cadastro);
    };
    $scope.cancelar = function() {
        $scope.cadastro = {};
    }

});




app.service('cadastrosService', function() {
    var cadastros = [{
        codigo: 1,
        nome: 'jõao',
        telefone: 123456,
        endereco: 'pinheiros'
    }, {
        codigo: 2,
        nome: 'kaio',
        telefone: 987654,
        endereco: 'lagoa azul'
    }, {
        codigo: 3,
        nome: 'ramon',
        telefone: 48569823,
        endereco: 'quebrada'
    }];
})

this.listar = function() {
    return cadastros;
};


this.salvar = function(cadastro) {
    var cadastroEncontrado = false;
    for (var i = 0, length = cadastros.length; i < length; i++) {
        if (cadastros[i].codigo == cadastro.codigo) {
            cadastros[i].nome = cadastro.nome;
            cadastros[i].telefone = cadastro.telefone;
            cadastros[i].endereco = cadastro.endereco;
            cadastroEncontrado = true;
            break;

        }

    }
    if (!cadastroEncontrado) {
        cadastros.push(cadastro);
    }
    $scope.cadastro = {};
};
this.excluir = function(cadastro) {
    for (var i = 0, length = cadastros.length; i < length; i++) {
        if (cadastros[i].codigo == cadastro.codigo) {
            cadastros.splice(i, 1);
            break;
        }
    }
}