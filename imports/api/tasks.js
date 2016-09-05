import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');


if (Meteor.isServer) {
    Meteor.publish('tasks', function () {
        return Tasks.find({
            $or: [{
                private: {
                    $ne: true
                }
            }, {
                owner: this.userId
            }]
        });
    });
}


Meteor.methods({
    'tasks.insert'(text){
        check(text, String);
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-autorized');
        }
        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId,
            username: Meteor.user().username,
            private: false
        });
    },
    'tasks.remove'(taskId){
        check(taskId, String);
        const task = Tasks.findOne(taskId);
        console.dir(task);
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-autorized');
        }

        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked){
        check(taskId, String);
        check(setChecked, Boolean);

        const task = Tasks.findOne(taskId);
        if (task.owner !== this.userId) {
            throw new Meteor.Error('not-autorized');
        }

        Tasks.update(taskId, {
            $set: {
                checked: setChecked
            }
        });
    },
    'tasks.setPrivate'(taskId, setToPrivate){
        check(taskId, String);
        check(setToPrivate, Boolean);

        const task = Tasks.findOne(taskId);

        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-autorized');
        }

        Tasks.update(taskId, {
            $set: {
                private: setToPrivate
            }
        });
    }
});
