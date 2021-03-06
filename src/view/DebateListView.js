// namespace:
this.argunet = this.argunet||{};

argunet.DebateListView = function(htmlElement, browserId){
	// mix-ins:
	// EventDispatcher methods:
	var p= argunet.DebateListView.prototype;
	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	createjs.EventDispatcher.initialize(p); // inject EventDispatcher methods.
	
	this.zTreeId = "argunetBrowser"+browserId+"-ztree";
	
	htmlElement.append("<div class='debateList'><div id='"+this.zTreeId+"' class='tree ztree'></div></div>");
	this.htmlElement = $(htmlElement).children(".debateList").get(0);
	
	var that = this;
	$(this.htmlElement).hide();
};
argunet.DebateListView.prototype.initialize = function(title,subtitle,zNodes){
	if(subtitle)$(this.htmlElement).prepend("<h4>"+subtitle+"</h4>");
	$(this.htmlElement).prepend("<h3>"+title+"</h3>");
	$(this.htmlElement).hide();
	  // zTree configuration information
	var that = this;
		var zTreeOnClick = function(event, treeId, treeNode){
			if(treeNode.nodeId != undefined)that.dispatchEvent({type:"nodeSelection", nodeId: treeNode.nodeId},that);
		};
		var zTreeOnCheck = function(event, treeId, treeNode) {
		    if(treeNode.checked){
		    	that.dispatchEvent({type:"openGroup", id:treeNode.id}, this);
		    }else{
		    	that.dispatchEvent({type:"closeGroup", id:treeNode.id}, this);		    	
		    }
		};
	   var zSettings = {
			   callback: {
				   onClick: zTreeOnClick,
				   onCheck: zTreeOnCheck
			   },
			   check: {enable: false, chkboxType : { "Y" : "ps", "N" : "ps" }}
	   };
	   //var zTreeElement = $(this.htmlElement).children("#ztree");
	this.zTree = $.fn.zTree.init($(this.htmlElement).children("#"+this.zTreeId), zSettings, zNodes);
//	var treeObj = $.fn.zTree.getZTreeObj(this.zTreeId);
//	treeObj.checkAllNodes(true);
//
//	$(this.htmlElement).children(".buttons").buttonset();
//	$(this.htmlElement).find(".checkAll").button().click(function() {
//		treeObj.checkAllNodes(true);
//		that.dispatchEvent({type:"openAllGroups"}, that);
//	});
//	$(this.htmlElement).find(".uncheckAll").button().click(function() {
//		treeObj.checkAllNodes(false);
//		that.dispatchEvent({type:"closeAllGroups"}, that);
//	});	
};
argunet.DebateListView.prototype.setHeight = function(height){
	this.height = height;
	$(this.htmlElement).height(this.height);
};
argunet.DebateListView.prototype.show = function(){
	$(this.htmlElement).show("slide", { direction: "left" }, 600);
	this.isOpen=true;
};
argunet.DebateListView.prototype.hide = function(){
	$(this.htmlElement).hide("slide", { direction: "left" }, 600);
	this.isOpen=false;
};


