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
			this.dayHeader = document.createElement('div') ;
	} ;
	datePanel.prototype = {
		init : function(){
			this.mainFrame.setAttribute('id','dateMainFrame') ;
			this.top.setAttribute('id','dateTop') ;
			this.mainFrame.appendChild(this.top) ;
			this.initYearPanel() ;
			this.initMonthPanel() ;
			this.initDayPanel() ;
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
			this.yearPanel.setAttribute('id','datepanel_yearpanel') ;
		} ,
		initMonthPanel : function(){
			for(var i = 1 ; i <= 12 ; i++){
				var monthItem = this.createPanelItem('month',i) ;
				this.monthPanel.appendChild(monthItem) ;
			}
			this.monthPanel.setAttribute('id','datepanel_monthpanel') ;
		},
		initDayPanel : function(){
			var DayParseList = ["日","一","二","三","四","五","六"] ;
			for(var i = 0 ; i< 7 ; i++){
				var dayHeaderItem = this.createPanelItem('dayHeaderItem',DayParseList[i]) ;
				this.dayHeader.appendChild(dayHeaderItem) ;
			}
			this.dayPanel.appendChild(this.dayHeader) ;
			this.dayPanel.setAttribute('id','datepanel_daypanel') ;
		},
		createDayPanel :  function(){
			console.log([month]) ;
			var date = new Date([year,month,"1"].join('/')) ;
				firstDayOfMonth = date.getDay() ,
				daysOfMonth = getDaysOfMonth(year,month) ; 
				dayRow = document.createElement('div') ,
				rows = 1 ,
				cols = 0 ;
			console.log([firstDayOfMonth,daysOfMonth]) ;
			if(firstDayOfMonth != 0){
				var whiteSpace = this.createPanelItem('day','') ;
				for(var i = 0 ; i < firstDayOfMonth ; i++){
					dayRow.appendChild(whiteSpace) ;
					cols++ ;
				}
			}
			for(var i = 1 ; i <= daysOfMonth ; i++){
				var dayItem = this.createPanelItem('day',i) ;
				if(cols === 7){
					//one row has full
					this.dayPanel.appendChild(dayRow) ;
					cols = 0 ;
					rows++ ;
					dayRow = document.createElement('div') ;
				}
				dayRow.appendChild(dayItem) ;
				cols++ ;
			}
			this.dayPanel.appendChild(dayRow) ;
			rows++ ;
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
			this.monthPanel.onclick = function(e){
				var event = fixEvent(e) ;
				if(event){
					month = e.target.innerHTML.slice(0,-1) ;
					console.log(month) ;
					obj.mainFrame.removeChild(obj.mainFrame.lastChild) ;
					obj.createDayPanel() ;
					obj.mainFrame.appendChild(obj.dayPanel) ;
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
	function getDaysOfMonth(year,month){
		var date = new Date([year,month,'1'].join('/')) ;
		year = parseInt(year) ;
		month = parseInt(month) ;
		date.setDate(31) ;
		if(date.getMonth()+1 !== month){
			if(date.getDate() === 1) return 30 ;
			else if(date.getDate() === 3) return 28 ;
			else return 29 ;
		}
		return 31 ; //31 days
	}
	window.datePanel = datePanel ;

})(window,undefined) ;