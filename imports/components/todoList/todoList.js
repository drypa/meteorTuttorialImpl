import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './todoList.html';
import {Tasks} from '../../api/tasks.js';
import { Meteor } from 'meteor/meteor'

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
            },
            currentUser(){
                return Meteor.user();
            }
        });
    }

    addTask() {
        var task = this.newTask;
        Meteor.call('tasks.insert', task);
        this.newTask = '';
    }

    removeTask(task) {
        Meteor.call('tasks.remove', task._id);
    }

    setChecked(task) {
        Meteor.call('tasks.setChecked', task._id, !task.checked);
    }
}


export default angular.module('todoList',[angularMeteor])
    .component('todoList', {
        templateUrl: template,
        controller: ['$scope', TodoListCtrl]
    });