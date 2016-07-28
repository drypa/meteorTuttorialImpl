import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todoList from '../imports/components/todoList/todoList'


angular.module('simple-todos',[
  angularMeteor,
  todoList.name
]);