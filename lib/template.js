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
buf.push("</ul>");
}
buf.push("</div>");;return buf.join("");
};