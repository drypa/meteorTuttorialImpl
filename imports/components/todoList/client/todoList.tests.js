import 'angular-mocks'
import {Meteor} from 'meteor/meteor'

import todoList from '../todoList'
import {assert} from 'meteor/practicalmeteor:chai'

import {sinon} from 'meteor/practicalmeteor:sinon'


describe('todoList', ()=> {
    var element;

    beforeEach(()=> {

        window.module(todoList.name);

        inject((_$compile_, _$rootScope_)=> {
            element = _$compile_('<todo-list></todo-list>')(_$rootScope_.$new(true));
            _$rootScope_.$digest();
        });

    });


    describe('component', ()=> {
        it('should show incomplete tasks', ()=> {
            assert.include(element[0].querySelector('h1').innerHTML, '0')
        })
    });

    describe('controller', ()=> {
        describe('addTask', ()=> {
            let controller,
                newTask = 'task to add';
            beforeEach(()=> {
                sinon.stub(Meteor, 'call');
                controller = element.controller('todoList');
                controller.newTask = newTask;
                controller.addTask();
            });
            afterEach(()=>{
                Meteor.call.restore();
            });

            it('should call tasks.insert method',()=>{
                sinon.assert.calledOnce(Meteor.call);
                sinon.assert.calledWith(Meteor.call, 'tasks.insert', newTask);
            });

            it('should reset new task',()=>{
                assert.equal(controller.newTask,'');
            });
        });
    });
});