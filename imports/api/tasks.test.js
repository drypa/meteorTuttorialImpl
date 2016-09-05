import  {Meteor} from 'meteor/meteor'
import  {Random} from 'meteor/random'

import {Tasks} from './tasks'
import {assert} from 'meteor/practicalmeteor:chai'

if (Meteor.isServer) {
    describe('Tasks', ()=> {
        describe('Methods', ()=> {
            let taskId;
            const userId = Random.id();
            beforeEach(()=> {
                Tasks.remove({});
                taskId = Tasks.insert({
                    text: 'test task',
                    createdAt: new Date(),
                    owner: userId,
                    username: 'user Name'
                });
            });

            it('can delete owned task', ()=> {
                const deleteTask = Meteor.server.method_handlers['tasks.remove'];
                const invocation = {
                    userId
                };

                deleteTask.apply(invocation, [taskId]);

                assert.equal(Tasks.find().count(), 0);

            })
        });
    });
}
