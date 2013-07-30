(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.PaginatorView = (function(_super) {
    __extends(PaginatorView, _super);

    function PaginatorView() {
      this.gotoPage = __bind(this.gotoPage, this);
      this.gotoNextPage = __bind(this.gotoNextPage, this);
      this.gotoPreviousPage = __bind(this.gotoPreviousPage, this);
      this.gotoLastPage = __bind(this.gotoLastPage, this);
      this.gotoFirstPage = __bind(this.gotoFirstPage, this);
      this.gotoNumber = __bind(this.gotoNumber, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      _ref = PaginatorView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PaginatorView.prototype.template = window.JST.paginator;

    PaginatorView.prototype.events = {
      'click .pagination a.number': 'gotoNumber',
      'click .pagination a.first': 'gotoFirstPage',
      'click .pagination a.last': 'gotoLastPage',
      'click .pagination a.previous': 'gotoPreviousPage',
      'click .pagination a.next': 'gotoNextPage'
    };

    PaginatorView.prototype.defaults = {
      lang: 'en'
    };

    PaginatorView.prototype.dictionary = {
      total: {
        en: 'Total',
        cn: '共'
      },
      records: {
        en: 'records',
        cn: '條記錄'
      },
      pages: {
        en: 'pages',
        cn: '頁'
      },
      firstPage: {
        en: 'First',
        cn: '首頁'
      },
      previousPage: {
        en: 'Prev',
        cn: '上頁'
      },
      nextPage: {
        en: 'Next',
        cn: '下頁'
      },
      lastPage: {
        en: 'Last',
        cn: '尾頁'
      }
    };

    PaginatorView.prototype.initialize = function() {
      this.options = _.defaults(this.options, this.defaults);
      return this.listenTo(this.collection, 'reset sync', this.render);
    };

    PaginatorView.prototype.render = function() {
      this.$el.html(this.template({
        collection: this.collection,
        dictionary: this.dictionary,
        lang: this.options.lang
      }));
      return this;
    };

    PaginatorView.prototype.gotoNumber = function(e) {
      var page;
      page = parseInt($(e.currentTarget).text());
      return this.gotoPage(e, page);
    };

    PaginatorView.prototype.gotoFirstPage = function(e) {
      var page;
      page = this.collection.firstPage;
      return this.gotoPage(e, page);
    };

    PaginatorView.prototype.gotoLastPage = function(e) {
      var page;
      page = this.collection.totalPages;
      return this.gotoPage(e, page);
    };

    PaginatorView.prototype.gotoPreviousPage = function(e) {
      var page;
      if (this.collection.currentPage > 1) {
        page = this.collection.currentPage - 1;
      } else {
        page = 1;
      }
      return this.gotoPage(e, page);
    };

    PaginatorView.prototype.gotoNextPage = function(e) {
      var page;
      if (this.collection.currentPage < this.collection.totalPages) {
        page = this.collection.currentPage + 1;
      } else {
        page = this.collection.totalPages;
      }
      return this.gotoPage(e, page);
    };

    PaginatorView.prototype.gotoPage = function(e, page) {
      e.preventDefault();
      if ($(e.currentTarget).parent().attr('class') !== 'disabled') {
        this.collection.currentPage = page;
        return this.collection.goTo(page);
      }
    };

    return PaginatorView;

  })(Backbone.View);

}).call(this);
