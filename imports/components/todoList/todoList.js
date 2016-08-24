import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todoList.html';
import {Tasks} from '../../api/tasks.js';

class TodoListCtrl{
    constructor($scope) {
        $scope.viewModel(this);
        this.helpers({
            tasks(){
                return Tasks.find();
            }
        });
    }

    addTask() {
        var task = this.newTask;
        Tasks.insert({
            text: task,
            createdAt: new Date
        });

        this.newTask = '';
    }
}


export default angular.module('todoList',[angularMeteor])
    .component('todoList', {
        templateUrl: template,
        controller: ['$scope', TodoListCtrl]
    });