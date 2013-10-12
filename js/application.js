/**
 * Created by david on 10/11/13.
 */

var App = Ember.Application.create();
/*
    {
       LOG_TRANSITIONS: true,
       LOG_BINDINGS: true,
       LOG_VIEW_LOOKUPS: true,
       LOG_STACKTRACE_ON_DEPRECATION: true,
       LOG_VERSION: true,
       debugMode: true
});
*/

App.Router.map(function() {
  "use strict";
  this.resource('about');
  this.resource('posts', function(){
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    "use strict";
    return $.getJSON('http://tomdale.net/api/get_recent_posts/?callback=?').then(function(data) {
      return data.posts.map(function(post) {
        post.body = post.content;
        return post;
      });
    });
    //return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    "use strict";
    return $.getJSON('http://tomdale.net/api/get__post/?id='+params.post_id+'&callback=?').then(function(data){
      data.post.body = data.post.content;
      return data.post;
    });
    //return posts.findBy('id', params.post_id);
  }
});

Ember.Handlebars.helper('format-date', function(date) {
  "use strict";
  return moment(date).fromNow();
});

var showdown = new Showdown.converter();
Ember.Handlebars.helper('format-markdown', function(input) {
  "use strict";
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,
  actions: {
    edit: function() {
      "use strict";
      this.set('isEditing', true);
    },
    doneEditing: function() {
      "use strict";
      this.set('isEditing', false);
    }
  }
});

var posts = [{
  id: '1',
  title: "Rails is Omakase",
  author: { name: "d2h" },
  date: new Date('12-27-2012'),
  excerpt: "There are lots of a la carte software environments in this world. Place where...",
  body: "I want this for my ORM..."
}, {
  id: '2',
  title: "The Parely Letter",
  author: { name: "d2h" },
  date: new Date('06-24-2012'),
  excerpt: "My [appearance on the podcast](http://google.com)",
  body: "A whole ton of stuff..."
}];