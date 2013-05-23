(function($) {
  var books = [
    { coverImage: 'placeHolder.png', title: 'title 1', author: 'John Doe', releaseDate: 'today', keywords: 'none' },
    { coverImage: 'placeHolder.png', title: 'title 2', author: 'John Doe', releaseDate: 'today', keywords: 'none' },
    { coverImage: 'placeHolder.png', title: 'title 3', author: 'John Doe', releaseDate: 'today', keywords: 'none' },
    { coverImage: 'placeHolder.png', title: 'title 4', author: 'John Doe', releaseDate: 'today', keywords: 'none' },
    { coverImage: 'placeHolder.png', title: 'title 5', author: 'John Doe', releaseDate: 'today', keywords: 'none' }
  ];

  var Book = Backbone.Model.extend({
    defaults: {
      coverImage: 'placeHolder.png',
      title: 'Some title',
      author: 'John Doe',
      releaseDate: '2012',
      keywords: 'Javascript programming'
    }
  });

  var BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'book-container',
    template: $('#book-tmpl').html(),

    render: function() {
      var tmpl = _.template(this.template);

      this.$el.html(tmpl(this.model.toJSON()));

      return this;
    }
  });

  var Library = Backbone.Collection.extend({
    model: Book
  });

  var LibraryView = Backbone.View.extend({
    el: $('#books'),

    initialize: function() {
      this.collection = new Library(books);
      // this.render();
    },

    render: function() {
      var self = this;
      _.each(this.collection.models, function(item) {
        self.renderBook(item);
      }, this);
    },

    renderBook: function(book) {
      var bookView = new BookView({ model: book });
      this.$el.append(bookView.render().el);
    }
  });

  var library = new LibraryView();
  library.render();

})(jQuery);
