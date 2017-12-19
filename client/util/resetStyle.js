const resetStyle = ( talknIndex ) => {

	let talknCssId = "#talkn" + talknIndex;

	return talknCssId + " div," + 
			talknCssId + " span, " + 
			talknCssId + " object, " + 
			talknCssId + " iframe, " + 
			talknCssId + " h1, " + 
			talknCssId + " h2, " + 
			talknCssId + " h3, " + 
			talknCssId + " h4, " + 
			talknCssId + " h5, " + 
			talknCssId + " h6, " + 
			talknCssId + " p, " + 
			talknCssId + " blockquote, " + 
			talknCssId + " pre, " + 
			talknCssId + " abbr, " + 
			talknCssId + " address, " + 
			talknCssId + " cite, " + 
			talknCssId + " code, " + 
			talknCssId + " del, " + 
			talknCssId + " dfn, " + 
			talknCssId + " em, " + 
			talknCssId + " img, " + 
			talknCssId + " ins, " + 
			talknCssId + " kbd, " + 
			talknCssId + " q, " + 
			talknCssId + " samp, " + 
			talknCssId + " small, " + 
			talknCssId + " strong, " + 
			talknCssId + " sub, " + 
			talknCssId + " sup, " + 
			talknCssId + " var, " + 
			talknCssId + " b, " + 
			talknCssId + " i, " + 
			talknCssId + " dl, " + 
			talknCssId + " dt, " + 
			talknCssId + " dd, " + 
			talknCssId + " ol, " + 
			talknCssId + " ul, " + 
			talknCssId + " li, " + 
			talknCssId + " fieldset, " + 
			talknCssId + " form, " + 
			talknCssId + " label, " + 
			talknCssId + " legend, " + 
			talknCssId + " table, " + 
			talknCssId + " caption, " + 
			talknCssId + " tbody, " + 
			talknCssId + " tfoot, " + 
			talknCssId + " thead, " + 
			talknCssId + " tr, " + 
			talknCssId + " th, " + 
			talknCssId + " td, " + 
			talknCssId + " article, " + 
			talknCssId + " aside, " + 
			talknCssId + " dialog, " + 
			talknCssId + " figure, " + 
			talknCssId + " footer, " + 
			talknCssId + " header, " + 
			talknCssId + " hgroup, " + 
			talknCssId + " menu, " + 
			talknCssId + " nav, " + 
			talknCssId + " section, " + 
			talknCssId + " time, " + 
			talknCssId + " mark, " + 
			talknCssId + " audio, " + 
			talknCssId + " video { " +
				"margin: 0;" +
				"padding: 0;" +
				"border: 0;" +
				"outline: 0;" +
				"font-size: 100%;" +
				"vertical-align: baseline;" +
				"background: transparent;" +
			"}" +
			talknCssId + " article, " +
			talknCssId + " aside, " +
			talknCssId + " dialog, " +
			talknCssId + " figure, " +
			talknCssId + " footer, " +
			talknCssId + " header, " +
			talknCssId + " hgroup, " +
			talknCssId + " nav, " +
			talknCssId + " section { " +
				"display:block;" +
			"}" +
			talknCssId + " nav ul { " +
				"list-style: none;" +
			"}" +
			talknCssId + " blockquote:before, blockquote:after, q:before, q:after { " +
				"content: '';" +
				"content: none;" +
			"}" +
			talknCssId + " *:before, *:after{ " + 
				"content: none;" +
			"}" +
			talknCssId + " a { " +
				"margin: 0;" +
				"padding: 0;" +
				"border: 0;" +
				"font-size: 100%;" +
				"vertical-align: baseline;" +
				"background: transparent;" +
			"}" +
			talknCssId + " ins { " +
				"background-color:#ff9;" +
				"color:#000;" +
				"text-decoration:none;" +
			"}" +
			talknCssId + " mark {" +
				"background-color:#ff9;" +
				"color:#000;" +
				"font-style:italic;" +
				"font-weight:bold;" +
			"}" +
			talknCssId + " del {" +
				"text-decoration: line-through;" +
			"}" +
			talknCssId + " abbr[title], dfn[title] {" +
				"border-bottom:1px dotted #000;" +
				"cursor:help;" +
			"}" +
			talknCssId + " table {" +
				"border-collapse:collapse;" +
				"border-spacing:0;" +
			"}" +
			talknCssId + " hr {" +
				"display:block;" +
				"height:1px;" +
				"border:0;" +
				"border-top:1px solid #cccccc;" +
				"margin:1em 0;" +
				"padding:0;" +
			"}" +
			talknCssId + " input, select { " +
				"vertical-align:middle;" +
			"}";
};

export default resetStyle;
