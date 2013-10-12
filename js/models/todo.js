/**
 * Created by david on 10/11/13.
 */

Todos.Todo = DS.Model.extend({
    title: DS.attr('string'),
    isCompleted: DS.attr('boolean')
});
