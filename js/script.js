$(document).ready(function() {
    $('.parallax').parallax();
    $('.sidenav').sidenav();
    $('select').formSelect();
});  
var app = angular.module('mesaApp', []);
app.controller('mesaController', function($scope, mesaService,$timeout) {
    $scope.mesa = {};
    $scope.garcons = {};
    $scope.reserva = function(mesa) {
        var retorno = "";
        if (mesa.reservado) {
            retorno = 'Reservado';
        } else {
            retorno = 'Disponível';
        }
        return retorno;
    };
    $scope.garcom = function(mesa) {
        var garcom = $scope.garcons.filter(function(garcom) {return garcom.id == mesa.garcom;});
        if (garcom[0].nome != '') { var nome = garcom[0].nome;}

        return nome;
    };
    listar();

    function listar() {
        mesaService.listar().then(function(resposta) {
            $scope.mesas = resposta.data;
        });
        mesaService.listarGarcons().then(function(resposta) {
            $scope.garcons = resposta.data;
            
        });
    }

    $scope.salvar = function(mesa) {
        if (mesa.nome  != '' && mesa.nome != 'Preencha o Nome' && typeof(mesa.nome) != "undefined"  ){
            mesaService.salvar(mesa).then(listar);
            $scope.mesa = {};
        } else {
            $scope.mesa['nome'] = 'Preencha o Nome';
        }
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
    var apiGarcons = 'http://localhost:3000/garcons';

    this.listar = function() {
        return $http.get(api);
    };

    this.listarGarcons = function() {
        return $http.get(apiGarcons);
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

var app = angular.module('garcomApp', []);
app.controller('garcomController', function($scope, garcomService) {
    $scope.garcom = {};
    listar();

    function listar() {
        garcomService.listar().then(function(resposta) {
            $scope.garcons = resposta.data;
        });
    }

    $scope.salvar = function(garcom) {
        garcomService.salvar(garcom).then(listar);
        $scope.garcom = {};
    };

    $scope.editar = function(garcom) {
        $scope.garcom = angular.copy(garcom);
    };

    $scope.excluir = function(garcom) {
        garcomService.excluir(garcom).then(listar);
    };

    $scope.cancelar = function() {
        $scope.garcom = {};
    };
});

app.service('garcomService', function($http) {

    var api = 'http://localhost:3000/garcons';

    this.listar = function() {
        return $http.get(api);
    };

    this.salvar = function(garcom) {
        if (garcom.id) {
            return $http.put(api + '/' + garcom.id, garcom);
        } else {
            return $http.post(api, garcom);
        }
    };

    this.excluir = function(garcom) {
        return $http.delete(api + '/' + garcom.id);
    };

});