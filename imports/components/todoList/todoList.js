import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todoList.html';
import {Tasks} from '../../api/tasks.js';

class TodoListCtrl{
    constructor($scope) {
        this.hideCompleted = false;
        var ctrl = this;
        $scope.viewModel(this);
        this.helpers({
            tasks(){
                const selector = {};
                if (ctrl.getReactively('hideCompleted')) {
                    selector.checked = {$ne: true}
                }
                return Tasks.find(selector, {
                    sort: {
                        createdAt: -1

                    }
                });
            },
            incompleteCount(){
                return Tasks.find({checked: {$ne: true}}).count();
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

    removeTask(task) {
        Tasks.remove(task._id);
    }

    setChecked(task) {
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