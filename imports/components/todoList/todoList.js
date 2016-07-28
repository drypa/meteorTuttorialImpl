import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todoList.html';

class TodoListCtrl{
    constructor(){
        this.tasks = [
            {text:'task 1'},
            {text:'task 2'},
            {text:'task 3'}
        ];
    }
}

export default angular.module('todoList',[angularMeteor])
    .component('todoList', {
        templateUrl: template,
        controller: TodoListCtrl
    });