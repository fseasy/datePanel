(function(window,undefined){
	var datePanel = function() {
			this.height = 100 ;
			this.width = 120 ;
			this.mainFrame = document.createElement('div') ;
			this.top = document.createElement('div') ;
	} ;
	datePanel.prototype = {
		init : function(){
			this.mainFrame.setAttribute('id','dateMainFrame') ;
			this.top.setAttribute('id','dateTop') ;
			this.mainFrame.appendChild(this.top) ;
			document.body.appendChild(this.mainFrame) ;

		} ,
		clsFn : function(){
			this.mainFrame.display = 'none' ;
		} ,
		disFn : function(obj){
			this.mainFrame.style.position = 'absolute' ;
			var pos = obj.getBoundingClientRect() ;
			this.mainFrame.style.top = pos.bottom+10+'px'; 
			this.mainFrame.style.left = pos.left + 'px';
			this.mainFrame.style.display = 'block' ;
		}

	} ;
	window.datePanel = datePanel ;

})(window,undefined) ;