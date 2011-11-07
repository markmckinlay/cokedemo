/**
 * Represents a Chart for rendering on a HTML5 <canvas> object
 */
function MyPieChart(chartName) {
	this.name = chartName;
	this.data = []; // Array of Datum
	this.draw = drawPieChart;
}

/**
 * Represents a single data item.
 */
function Datum() {
	this.name = "";
	this.value = 0;
	this.label = "";
	this.color = "#C0C0C0"; // default gray
}

/**
 * Draws a pie chart for a MyChart object on a HTML5 canvas
 */
function drawPieChart(canvas) {
	// HACK TO INSERT COLOR - FIND A BETTER WAY
	var hack_color = ["#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#FF9900", "#C0C0C0"];
	for (var i=0; i<this.data.length; i++) {
		this.data[i].color = hack_color[i];
	}
	// END HACK TO INSERT COLOR
	var ctx = canvas.getContext("2d");
    var lastend = 0;
	var total = 0;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < this.data.length; i++) {
		total += this.data[i].value;
	}
	if (total == 0) {
		return;
	}
	
	for (var i = 0; i < this.data.length; i++) {
		ctx.fillStyle = this.data[i].color;
		ctx.beginPath();
		ctx.moveTo(canvas.width/2, canvas.height/2);
		ctx.arc(canvas.width/2, canvas.height/2, canvas.height/2, lastend,lastend+
	  		(Math.PI*2*(this.data[i].value / total)),false);
		ctx.lineTo(canvas.width/2, canvas.height/2);
		ctx.fill();
		lastend += Math.PI*2*(this.data[i].value / total);
	}
	
}

/**
 * Represents objects used to load Radian6 data from an XML DOM object result from REST API call
 */


/**
 * TopicList contains a list of Topic Profiles.
 * The loadFromXml loads the object from the Xml message response from any of the following Radian6 API REST calls
 * /topics
 * /topics/{topicId}
 */
function TopicList() {
	this.topics = []; // Array of Topic
	this.loadFromXml = loadTopicList;
}
function Topic() {
	// At the moment i'm only looking for the name and id because we generally only use the
	// topic id to pass back to another Radian6 API call.
	this.name = "";
	this.id = 0;
}
function loadTopicList(xmlDoc) {
	var topicFilters = xmlDoc.getElementsByTagName("topicFilter");
	for (var i=0; i<topicFilters.length; i++) {
		var topic = new Topic();
		var children = topicFilters[i].childNodes;
		for (var j=0; j<children.length; j++) {
			if (children[j].nodeType == 1) {
				loadTopic(children[j], topic)
			}
		}
		this.topics.push(topic);
	}
}
function loadTopic(node, topic) {
	if (node.nodeName == "name") {
		topic.name = node.firstChild.nodeValue;
	} else if (node.nodeName == "topicFilterId") {
		topic.id = node.firstChild.nodeValue;
	}
	
}

/**
 * TopicTrend contains data used for rendering a Radian6 Topic Trends widget.
 * The loadFromXml loads the object from the Xml message response from any of the following Radian6 API REST calls
 * /widget/{widgetId} where the widgetId represents a Topic Trend widget
 */
function TopicTrends() {
	this.loadFromXml = loadTopicTrends;
	this.data = []; // Array of Datum
}

function loadTopicTrends(xmlDoc) {
	var datapoints = xmlDoc.getElementsByTagName("dataPoint");
	for (var i=0; i<datapoints.length; i++) {
		var plots = datapoints[i].getElementsByTagName("plot");
		for (var j=0; j<plots.length; j++) {
			var datum = new Datum();
			datum.label = datapoints[i].attributes.getNamedItem("timestamp").nodeValue;
			datum.name = plots[j].attributes.getNamedItem("word").nodeValue;
			datum.value = plots[j].firstChild.nodeValue;
			this.data.push(datum);
		}
	}
	
}
/**
 * TopicAnalysis contains data used for rendering a Radian6 Topic Analysis widget.
 * The loadFromXml loads the object from the Xml message response from any of the following Radian6 API REST calls
 * /widget/{widgetId} where the widgetId represents a Topic Analysis widget
 */

function TopicAnalysis() {
	this.loadFromXml = loadTopicAnalysis;
	this.data = []; // Array of Datum
}

function loadTopicAnalysis(xmlDoc) {
	var dataitems = xmlDoc.getElementsByTagName("dataitem");
	for (var i=0; i<dataitems.length; i++) {
		var datum = new Datum();
		this.data.push(datum);
		datum.color = dataitems[i].attributes.getNamedItem("colour").nodeValue;
		var children = dataitems[i].childNodes;
		for (var j=0; j<children.length; j++) {
			if (children[j].nodeType == 1) {
				loadTopicAnalysisDatum(children[j], datum);
			}
		}
	}
}
function loadTopicAnalysisDatum(node, datum) {
	if (node.nodeName == "value") {
		var  value_children = node.childNodes;
		for (var k=0; k<value_children.length; k++) {
			var vc = value_children[k];
			if (vc.nodeType == 1) {
				if (vc.nodeName == "count") {
					datum.value = parseInt(vc.firstChild.nodeValue);
				} else if (vc.nodeName == "label") {
					datum.label = vc.firstChild.nodeValue;
				}
			}
		}
	} else if (node.nodeName == "name") {
		datum.name = node.firstChild.nodeValue;
	}				
}

/**
 * ArticleList contains a list of Articles
 */
function ArticleList() {
	this.loadFromXml = loadArticleList;
	this.articles = [];
}

function Article() {
	this.id = 0;
	this.headline = "";
	this.author = "";
	this.recipient = "";
	this.content = "";
	this.source = "";
	this.host = "";
	this.url = "";
	this.media_provider = "";
	this.media_type_id = 0;
	this.publish_date = 0;
	this.harvest_date = 0;
	
}

function loadArticleList(xmlDoc) {
	var articles = xmlDoc.getElementsByTagName("article");
	for (var i=0; i<articles.length; i++) {
		var article = new Article();
		var id = articles[i].attributes.getNamedItem("ID").nodeValue;
		article.id = id;
		var children = articles[i].childNodes;
		for (var j=0; j<children.length; j++) {
			if (children[j].nodeType == 1) {
				loadArticle(children[j], article);
			}
		}
		this.articles.push(article);
	}
}

function loadArticle(node, article) {
	if (node.nodeName == "source") {
		article.source = node.firstChild.nodeValue;
	} else if (node.nodeName == "host") {
		article.host = node.firstChild.nodeValue;
	} else if (node.nodeName == "article_url") {
		article.url = node.firstChild.nodeValue;
	} else if (node.nodeName == "media_provider") {
		article.media_provider = node.firstChild.nodeValue;
	} else if (node.nodeName == "media_type_id") {
		article.media_type_id = node.firstChild.nodeValue;
	} else if (node.nodeName == "publish_date") {
		article.publish_date = node.attributes.getNamedItem("epoch").nodeValue;
	} else if (node.nodeName == "harvest_date") {
		article.harvest_date = node.attributes.getNamedItem("epoch").nodeValue;
	} else if (node.nodeName == "headline") {
		article.headline = node.firstChild.nodeValue;
	} else if (node.nodeName == "author") {
		article.author = node.firstChild.nodeValue;
	} else if (node.nodeName == "recipient") {
		article.recipient = node.firstChild.nodeValue;
	} else if (node.nodeName == "content") {
		article.content = node.firstChild.nodeValue;
	} else if (node.nodeName == "description") {
		var children = node.childNodes;
		for (var j=0; j<children.length; j++) {
			if (children[j].nodeType == 1) {
				loadArticle(children[j], article);
			}
		}
	}
}