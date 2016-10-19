var V = new Vue({
	el: "#app",
	data: {
		todeMess: "",
		list: [],
		search: "all"
	},
	methods: {

		/*添加*/
		addTodo: function() {
			if(this.todeMess != '') {
				this.list.push({
					mess: this.todeMess,
					status: 0
				});
				this.todeMess = ""
			}

		},

		/*完成任务*/
		check: function(item) {
			if(item.status) {
				item.status = 0;
			} else {
				item.status = 1;
			}
			this.setLocal();
		},

		/*删除任务*/
		remove: function(item) {
			this.list.$remove(item);
		},
		
		clear:function(){
			this.list = [];
			this.search = "all"
		},

		/*获取存储本地的数据*/
		getLocal: function() {
			this.list = JSON.parse(localStorage.getItem("list")) || [];
		},

		/*存储数据到本地*/
		setLocal: function() {
			localStorage.setItem("list", JSON.stringify(this.list));
		}
	},
	watch: {
		'list': function() {
			this.setLocal();
		}
	},
	ready: function() {
		this.getLocal();
	},
	filters: {

		query: function(list) {
			var items = [];
			if(this.search == "yes") {
				for(item in list) {
					if(list[item].status == 1) {
						items.push(list[item]);
					}
				}
			} else if(this.search == "no") {
				for(item in list) {
					if(list[item].status == 0) {
						items.push(list[item]);
					}
				}
			} else {
				items = list;
			}
			return items;
		}
	}
})