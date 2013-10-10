
class Backbone.PaginatorView extends Backbone.View

  template: JST.paginator

  events:
    'click .pagination a.number': 'gotoNumber'
    'click .pagination a.first': 'gotoFirstPage'
    'click .pagination a.last': 'gotoLastPage'
    'click .pagination a.previous': 'gotoPreviousPage'
    'click .pagination a.next': 'gotoNextPage'

  defaults:
    lang: 'en'

  dictionary:
    total:
      en: 'Total'
      cn: '共'
    records:
      en: 'records'
      cn: '條記錄'
    pages:
      en: 'pages'
      cn: '頁'
    firstPage:
      en: 'First'
      cn: '首頁'
    previousPage:
      en: 'Prev'
      cn: '上頁'
    nextPage:
      en: 'Next'
      cn: '下頁'
    lastPage:
      en: 'Last'
      cn: '尾頁'

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
