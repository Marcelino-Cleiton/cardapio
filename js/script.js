$(document).ready(function(){
  $('.parallax').parallax();
  $('.sidenav').sidenav();
});
var app = angular.module('mesaApp', []);
app.controller('mesaController', function ($scope, mesaService) {
    $scope.mesa = {};    
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
        if(mesa.id) {
           return $http.put(api + '/' + mesa.id, mesa);
        } else {
           return $http.post(api, mesa);
        }
    };
    
    this.excluir = function(mesa) {
        return $http.delete(api + '/' + mesa.id);
    };

});