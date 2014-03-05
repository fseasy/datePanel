(function(window,undefined){
	var year , month , day ;
	var datePanel = function() {
			this.height = 100 ;
			this.width = 120 ;
			this.mainFrame = document.createElement('div') ;
			this.top = document.createElement('div') ;
			this.yearPanel = document.createElement('div') ;
			this.monthPanel = document.createElement('div') ;
			this.dayPanel = document.createElement('div') ;
	} ;
	datePanel.prototype = {
		init : function(){
			this.mainFrame.setAttribute('id','dateMainFrame') ;
			this.top.setAttribute('id','dateTop') ;
			this.mainFrame.appendChild(this.top) ;
			this.initYearPanel() ;
			this.initMonthPanel() ;
			this.mainFrame.appendChild(this.yearPanel) ;
			document.body.appendChild(this.mainFrame) ;
			this.bind() ;

		} ,
		capitalize : function (str){
			var firstChar = str.charAt(0) ;
			return firstChar.toUpperCase() + str.slice(1) ;
		}
		,
		createPanelItem : function(type,value){
			var item = document.createElement('span') ;
			item.className = 'datePanelItem'+ this.capitalize(type);
			switch(type){
				case 'year' :
					value += '年' ;
					break ;
				case 'month' :
					value += '月' ;
					break ;
				default :
					break ;
			}
			item.innerHTML = value ;
			return item ;
		},
		initYearPanel :  function(){
			var now = new Date() ,
				curYear = now.getFullYear() ,
				YEARSNUM = 9 ;
			this.yearPanel.appendChild(this.createPanelItem('year',curYear)) ;
			for(var i = 1 ; i < 5 ; i++){
				this.yearPanel.insertBefore(this.createPanelItem('year',curYear-i),this.yearPanel.firstChild) ;
				this.yearPanel.appendChild(this.createPanelItem('year',curYear+i)) ;
			}
		} ,
		initMonthPanel : function(){
			for(var i = 1 ; i <= 12 ; i++){
				var monthItem = this.createPanelItem('month',i) ;
				this.monthPanel.appendChild(monthItem) ;
			}
		},
		clsFn : function(){
			this.mainFrame.display = 'none' ;
		} ,
		disFn : function(obj){
			this.mainFrame.style.position = 'absolute' ;
			var pos = obj.getBoundingClientRect() ;
			this.mainFrame.style.top = pos.bottom+10+'px'; 
			this.mainFrame.style.left = pos.left + 'px';
			this.mainFrame.style.display = 'block' ;
		},
		bind : function(){
			var obj = this ;
			this.yearPanel.onclick = function(e){
				var event = fixEvent(e) ;
				if(typeof event !== undefined){
					year = e.target.innerHTML.slice(0,4) ;
					//console.log(year) ;
					obj.mainFrame.removeChild(obj.mainFrame.lastChild) ;
					obj.mainFrame.appendChild(obj.monthPanel) ;
				}
			} ,
			this.monthPanel.onclick = function(){
				var event = fixEvent(e) ;
				if(event){
					month = e.target.innerHTML.slice(0,4) ;
					
				}
			}
		}
		,

	} ;
	function fixEvent(e){
		var e = e||window.event ,
		event ;
		if(e.target) return e ;
		event = {} ; 
		for(var index in e){
			event[index] = e[index] ;
		}
		event.target = e.srcElement ; 
		event.stopPropagation = function(){
			event.cancelBubble = false ;
		}
		event.preventEvent = function(){
			event.returnValue = false ;
		}
		return event ;
	}
	window.datePanel = datePanel ;

})(window,undefined) ;