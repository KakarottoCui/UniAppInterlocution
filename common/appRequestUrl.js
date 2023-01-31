const baseUrl = "http://192.168.1.3:9091/MyQuestion";

const urlMap = {
	login: baseUrl + "/login",
	logout: baseUrl + "/logout",
	
	loginCheck: baseUrl +"/getUserInfo",//获取微信账号信息
	getLocationName: baseUrl + "/getLocationInfo?location=",//获取定位地点名
	sendMessage: baseUrl + "/sendMessage?text=",//获取聊天信息
	
	findQuChatList: baseUrl + "/quChat/queryList",
	findQuChat: baseUrl + "/quChat/queryObject",
	addQuChat: baseUrl + "/quChat/addQuChat",
	editQuChat: baseUrl + "/quChat/editQuChat",
	addQuChatList: baseUrl + "/quChat/addQuChatList",
	
	findQuCollectList: baseUrl + "/quCollect/queryList",
	findQuCollect: baseUrl + "/quCollect/queryObject",
	addQuCollect: baseUrl + "/quCollect/addQuCollect",
	editQuCollect: baseUrl + "/quCollect/editQuCollect",
	addQuCollectList: baseUrl + "/quCollect/addQuCollectList",
	
	findQuCommentList: baseUrl + "/quComment/queryList",
	findQuComment: baseUrl + "/quComment/queryObject",
	addQuComment: baseUrl + "/quComment/addQuComment",
	editQuComment: baseUrl + "/quComment/editQuComment",
	addQuCommentList: baseUrl + "/quComment/addQuCommentList",
	
	findQuMessageList: baseUrl + "/quMessage/queryList",
	findQuMessage: baseUrl + "/quMessage/queryObject",
	addQuMessage: baseUrl + "/quMessage/addQuMessage",
	editQuMessage: baseUrl + "/quMessage/editQuMessage",
	addQuMessageList: baseUrl + "/quMessage/addQuMessageList",
	
	findQuQuestionList: baseUrl + "/quQuestion/queryList",
	findQuQuestion: baseUrl + "/quQuestion/queryObject",
	addQuQuestion: baseUrl + "/quQuestion/addQuQuestion",
	editQuQuestion: baseUrl + "/quQuestion/editQuQuestion",
	addQuQuestionList: baseUrl + "/quQuestion/addQuQuestionList",
	queryObjectForIndex: baseUrl +"/quQuestion/queryObjectForIndex",
	
	findQuUserList: baseUrl + "/quUser/queryList",
	findQuUser: baseUrl + "/quUser/queryObject",
	addQuUser: baseUrl + "/quUser/addQuUser",
	editQuUser: baseUrl + "/quUser/editQuUser",
	addQuUserList: baseUrl + "/quUser/addQuUserList",
	
	findQuUserLoginList: baseUrl + "/quUserLogin/queryList",
	findQuUserLogin: baseUrl + "/quUserLogin/queryObject",
	addQuUserLogin: baseUrl + "/quUserLogin/addQuUserLogin",
	editQuUserLogin: baseUrl + "/quUserLogin/editQuUserLogin",
	addQuUserLoginList: baseUrl + "/quUserLogin/addQuUserLoginList"
}

const getUserInfo = function(){
	var _this = this;
	try {
		const value = uni.getStorageSync('userInfo');
		console.log("1"+JSON.stringify(value));
		return value ? value : false;
	} catch (e) {
		return false;
	}
}

const login = function(){
	var _this = this;
	
	
}

const request = function(requestOpt) {
	try {
		requestOpt = requestOpt || {};
		if (!requestOpt.url) {
			requestFail();
			return;
		}
		var token = "";
		try {
			const value = uni.getStorageSync('userInfo');
			if (value) {
				token = value.token;
			}
		} catch (e) {
			token = "";
		}
		requestOpt.data = requestOpt.data || {};
		requestOpt.data['token'] = token;
		requestOpt.method = requestOpt.method || 'POST';
		requestOpt.header = requestOpt.header || {
			// 'content-type': 'application/x-www-form-urlencoded',
			'token': token
		};
		requestOpt.timeout = requestOpt.timeout || 30000;
		requestOpt.responseType = requestOpt.responseType || 'text';
		requestOpt.dataType = requestOpt.dataType || "json";
		requestOpt.sslVerify = requestOpt.sslVerify || true;
		requestOpt.success = requestOpt.success || function(res) {};
		requestOpt.fail = requestOpt.fail || function(res) {};
		requestOpt.complete = requestOpt.complete || function(res) {};
		uni.showLoading({
			title: "加载中"
		});

		uni.request({
			url: requestOpt.url,
			data: requestOpt.data,
			method: requestOpt.method,
			responseType: requestOpt.responseType,
			sslVerify: requestOpt.sslVerify,
			timeout: requestOpt.timeout,
			dataType: requestOpt.dataType,
			header: requestOpt.header,
			success: function(res) {
				requestOpt.success(res);
				if(res.data.code == 401){
					uni.showToast({
						title:"未登录",
						icon:'none'
					})
					uni.removeStorageSync('user');
				}
			},
			fail: function(res) {
				requestOpt.fail(res);
			},
			complete: function(res) {
				uni.hideLoading();
			}
		});
	} catch (e) {
		//TODO handle the exception
		uni.hideLoading();
		uni.showToast({
			icon: "none",
			title: "请求异常"
		})
	}
}

export default {
	getUserInfo,
	baseUrl,
	request,
	urlMap,
	login
}
