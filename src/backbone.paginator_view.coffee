
class Backbone.PaginatorView extends Backbone.View

  template: JST.paginator

  events:
    'click .pagination a.number': 'gotoNumber'
    'click .pagination a.first': 'gotoFirstPage'
    'click .pagination a.last': 'gotoLastPage'
    'click .pagination a.previous': 'gotoPreviousPage'
    'click .pagination a.next': 'gotoNextPage'
    'click .go': 'go'
    'keyup .page-target': 'pressEnter'

  defaults:
    lang: 'en'

  dictionary:
    total:
      en: 'Total'
      tw: '共'
      cn: '共'
    records:
      en: 'records'
      tw: '條記錄'
      cn: '条记录'
    pages:
      en: 'pages'
      tw: '頁'
      cn: '页'
    firstPage:
      en: 'First'
      tw: '首頁'
      cn: '首页'
    previousPage:
      en: 'Prev'
      tw: '上頁'
      cn: '上页'
    nextPage:
      en: 'Next'
      tw: '下頁'
      cn: '下页'
    lastPage:
      en: 'Last'
      tw: '尾頁'
      cn: '尾页'
    page:
      en: 'Page'
      tw: '頁碼'
      cn: '页码'
    go:
      en: 'go'
      tw: '轉到'
      cn: '转到'

  initialize: =>
    @options = _.defaults @options, @defaults
    @listenTo @collection, 'reset sync', @render

  render: =>
    @$el.html @template
      collection: @collection
      dictionary: @dictionary
      lang: @options.lang
      formatNumber: (number) ->
        number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1'+',')
    this

  gotoNumber: (e) =>
    page = parseInt $(e.currentTarget).text()
    @gotoPage e, page

  gotoFirstPage: (e) =>
    page = @collection.firstPage
    @gotoPage e, page

  gotoLastPage: (e) =>
    page = @collection.totalPages
    @gotoPage e, page

  gotoPreviousPage: (e) =>
    if @collection.currentPage > 1
      page = @collection.currentPage - 1
    else
      page = 1
    @gotoPage e, page

  gotoNextPage: (e) =>
    if @collection.currentPage < @collection.totalPages
      page = @collection.currentPage + 1
    else
      page = @collection.totalPages
    @gotoPage e, page

  gotoPage: (e, page) =>
    e.preventDefault()
    if $(e.currentTarget).parent().attr('class') != 'disabled'
      @collection.currentPage = page
      @collection.goTo page,
        reset: true

  go: =>
    page = @$('.page-target').val()
    return unless page
    @collection.currentPage = page
    @collection.goTo page,
      reset: true

  pressEnter: (e) =>
    return unless e.which is 13
    @go()
