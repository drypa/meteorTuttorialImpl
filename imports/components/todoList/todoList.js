import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todoList.html';
import {Tasks} from '../../api/tasks.js';

class TodoListCtrl{
    constructor($scope) {
        $scope.viewModel(this);
        this.helpers({
            tasks(){
                return Tasks.find({}, {
                    sort: {
                        createdAt: -1

                    }
                });
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

    static removeTask(task) {
        Tasks.remove(task._id);
    }

    static setChecked(task) {
        Tasks.update(task._id, {
            $set: {
                checked: !task.checked
            }
        })
    }
}


export default angular.module('todoList',[angularMeteor])
    .component('todoList', {
        templateUrl: template,
        controller: ['$scope', TodoListCtrl]
    });