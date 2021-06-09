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
        if (garcom.codigo) {
            return $http.put(api + '/' + garcom.codigo, garcom);
        } else {
            return $http.post(api, garcom);
        }
    };

    this.excluir = function(garcom) {
        return $http.delete(api + '/' + garcom.codigo);
    };

});