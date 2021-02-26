App({
	globalData: {
		_openid: -1,
		account: [], //用户数据
		configVersion: -1, //配置文件版本
		times: [], //课表时间
		user: [], //用户信息
		wlist: [], // 课表色块数组
		results: [], //成绩数组
		xfNum: 0, //目前已修学分,
		cardInform: [] //卡务信息
	},
	onLaunch() {
		var that = this;

		//云开发初始化
		wx.cloud.init({
			env: "wlzs-2gtlu9u2a909b08e"
		})
		const accountDb = wx.cloud.database().collection("account");

		//获取用户openid
		wx.cloud.callFunction({ //调用云函数获取openid
			name: "getopenid",
			complete: res => {
				that.globalData._openid = res.result.openid;
				accountDb.where({
					_openid: res.result.openid //进行筛选
				}).get({
					success(res) {
						// console.log(res)
						if (res.data.length == 0) { //如果account没有数据，则转到登陆界面让用户登陆
							//通过判断data数组长度是否为0来进行下一步的逻辑处理
							wx.navigateTo({
								url: "/pages/loginL/loginL?home=index",
							})
						} else { //如果account有数据，则继续获取本地课表
							wx.getStorage({ //获取本地课表
								key: "wlist",
								success(res) { //本地课表有数据，则显示课表
									// console.log('[查询]本地课表获取结果：', res.data)
									that.globalData.wlist = [].concat(JSON.parse(res.data))
								},
								fail(res) { //本地课表没数据，则跳转到登陆界面
									console.log('[查询]本地没有课表数据')
									wx.navigateTo({
										url: "/pages/loginL/loginL?home=index",
									})
								}
							})
							wx.getStorage({ //获取本地账号数据
								key: 'user',
								success(res) {
									// console.log(res)
									that.globalData.user = [].concat(JSON.parse(res.data))
								},
								fail(res) {
									console.log(res)
								}
							})
							wx.getStorage({ //获取本地成绩数据
								key: 'results',
								success(res) {
									that.globalData.results = [].concat(JSON.parse(res.data))
								},
								fail(res) {
									console.log(res)
								}
							})
							wx.getStorage({ //获取本地教务系统信息
								key: "cardInform",
								success(res) { //本地课表有数据，则显示课表
									that.globalData.cardInform = [].concat(JSON.parse(res.data))
								},
								fail(res) {
									console.log(res)
								}
							})
						}
					},
					fail(res) {
						console.log(res);
					}
				})
			}
		});
	}
})