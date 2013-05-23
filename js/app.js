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
      title: 'No title',
      author: 'Unknown',
      releaseDate: 'Unknown',
      keywords: 'None'
    }
  });

  var BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'book-container',
    template: $('#book-tmpl').html(),
    events: {
      'click .delete': 'deleteBook'
    },

    render: function() {
      var tmpl = _.template(this.template);

      this.$el.html(tmpl(this.model.toJSON()));

      return this;
    },

    deleteBook: function() {
      this.model.destroy();
      this.remove();
    }
  });

  var Library = Backbone.Collection.extend({
    model: Book
  });

  var LibraryView = Backbone.View.extend({
    el: $('#books'),
    events: {
      'click #add': 'addBook'
    },

    initialize: function() {
      this.collection = new Library(books);
      // this.render();

      this.collection.on('add', this.renderBook, this);
      this.collection.on('remove', this.removeBook, this);
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
    },

    addBook: function(event) {
      event.preventDefault();

      var formData = {};
      $('#add-book').children('input').each(function(i, el) {
        // Blank fields will not be in formData, so model will keep default values
        if ($(el).val() !== '') {
          formData[el.id] = $(el).val();
        }
      });

      books.push(formData);
      this.collection.add(new Book(formData));
    },

    removeBook: function(book) {
      // book is a model, so has attributes propery
      var bookData = book.attributes;
      _.each(bookData, function(value, key) {
        if (bookData[key] === book.defaults[key]) {
          alert(bookData[key] + " " + book.defaults[key]);
          delete bookData[key];
        }
      });
      _.each(books, function(item) {
        if (_.isEqual(item, bookData)) {
          books.splice(_.indexOf(books, item), 1);
        }
      });
    }
  });

  var library = new LibraryView();
  library.render();

})(jQuery);
