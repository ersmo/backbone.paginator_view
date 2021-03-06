this["JST"] = this["JST"] || {};

this["JST"]["paginator"] = function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),dictionary = locals_.dictionary,lang = locals_.lang,formatNumber = locals_.formatNumber,collection = locals_.collection;buf.push("<div class=\"pagination pagination-small\"><span>" + (jade.escape((jade.interp = dictionary.total[lang]) == null ? '' : jade.interp)) + " " + (jade.escape((jade.interp = formatNumber(collection.totalRecords)) == null ? '' : jade.interp)) + " " + (jade.escape((jade.interp = dictionary.records[lang]) == null ? '' : jade.interp)) + ", " + (jade.escape((jade.interp = collection.totalPages) == null ? '' : jade.interp)) + " " + (jade.escape((jade.interp = dictionary.pages[lang]) == null ? '' : jade.interp)) + " &nbsp;</span>");
if ( collection.totalPages > 1)
{
buf.push("<ul>");
if ( collection.currentPage == 1)
{
buf.push("<li class=\"disabled\"><a class=\"first\">" + (jade.escape(null == (jade.interp = dictionary.firstPage[lang]) ? "" : jade.interp)) + "</a></li><li class=\"disabled\"><a class=\"previous\">" + (jade.escape(null == (jade.interp = dictionary.previousPage[lang]) ? "" : jade.interp)) + "</a></li>");
}
else
{
buf.push("<li><a class=\"first\">" + (jade.escape(null == (jade.interp = dictionary.firstPage[lang]) ? "" : jade.interp)) + "</a></li><li><a class=\"previous\">" + (jade.escape(null == (jade.interp = dictionary.previousPage[lang]) ? "" : jade.interp)) + "</a></li>");
}
var startPage = collection.currentPage - collection.pagesInRange
var endPage = collection.currentPage + collection.pagesInRange
startPage = startPage > 0 ? startPage : 1
endPage = endPage <= collection.totalPages ? endPage : collection.totalPages
for(var num = startPage; num <= endPage; num++)
{
if ( collection.currentPage == num)
{
buf.push("<li class=\"active\"><a class=\"number\">" + (jade.escape(null == (jade.interp = num) ? "" : jade.interp)) + "</a></li>");
}
else
{
buf.push("<li><a class=\"number\">" + (jade.escape(null == (jade.interp = num) ? "" : jade.interp)) + "</a></li>");
}
}
if ( collection.currentPage == collection.totalPages)
{
buf.push("<li class=\"disabled\"><a class=\"next\">" + (jade.escape(null == (jade.interp = dictionary.nextPage[lang]) ? "" : jade.interp)) + "</a></li><li class=\"disabled\"><a class=\"last\">" + (jade.escape(null == (jade.interp = dictionary.lastPage[lang]) ? "" : jade.interp)) + "</a></li>");
}
else
{
buf.push("<li><a class=\"next\">" + (jade.escape(null == (jade.interp = dictionary.nextPage[lang]) ? "" : jade.interp)) + "</a></li><li><a class=\"last\">" + (jade.escape(null == (jade.interp = dictionary.lastPage[lang]) ? "" : jade.interp)) + "</a></li>");
}
buf.push("<li>&nbsp;<div class=\"input-append\"><input" + (jade.attrs({ 'type':('text'), 'placeholder':(dictionary.page[lang]), 'style':("width: 35px"), "class": [('page-target')] }, {"type":true,"placeholder":true,"style":true})) + "/><button class=\"btn go\">" + (jade.escape(null == (jade.interp = dictionary.go[lang]) ? "" : jade.interp)) + "</button></div></li></ul>");
}
buf.push("</div>");;return buf.join("");
};
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.PaginatorView = (function(_super) {
    __extends(PaginatorView, _super);

    function PaginatorView() {
      this.pressEnter = __bind(this.pressEnter, this);
      this.go = __bind(this.go, this);
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

    PaginatorView.prototype.template = JST.paginator;

    PaginatorView.prototype.events = {
      'click .pagination a.number': 'gotoNumber',
      'click .pagination a.first': 'gotoFirstPage',
      'click .pagination a.last': 'gotoLastPage',
      'click .pagination a.previous': 'gotoPreviousPage',
      'click .pagination a.next': 'gotoNextPage',
      'click .go': 'go',
      'keyup .page-target': 'pressEnter'
    };

    PaginatorView.prototype.defaults = {
      lang: 'en'
    };

    PaginatorView.prototype.dictionary = {
      total: {
        en: 'Total',
        tw: '共',
        cn: '共'
      },
      records: {
        en: 'records',
        tw: '條記錄',
        cn: '条记录'
      },
      pages: {
        en: 'pages',
        tw: '頁',
        cn: '页'
      },
      firstPage: {
        en: 'First',
        tw: '首頁',
        cn: '首页'
      },
      previousPage: {
        en: 'Prev',
        tw: '上頁',
        cn: '上页'
      },
      nextPage: {
        en: 'Next',
        tw: '下頁',
        cn: '下页'
      },
      lastPage: {
        en: 'Last',
        tw: '尾頁',
        cn: '尾页'
      },
      page: {
        en: 'Page',
        tw: '頁碼',
        cn: '页码'
      },
      go: {
        en: 'go',
        tw: '轉到',
        cn: '转到'
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
        lang: this.options.lang,
        formatNumber: function(number) {
          return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + ',');
        }
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
        return this.collection.goTo(page, {
          reset: true
        });
      }
    };

    PaginatorView.prototype.go = function() {
      var page;
      page = this.$('.page-target').val();
      if (!page) {
        return;
      }
      this.collection.currentPage = page;
      return this.collection.goTo(page, {
        reset: true
      });
    };

    PaginatorView.prototype.pressEnter = function(e) {
      if (e.which !== 13) {
        return;
      }
      return this.go();
    };

    return PaginatorView;

  })(Backbone.View);

}).call(this);
