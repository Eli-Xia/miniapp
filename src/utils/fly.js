/**
 * Created by zhengyi.fu on 2018/8/31.
 */
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
const host = "https://test.keendo.com.cn"
//添加请求拦截器
fly.interceptors.request.use((request) => {
  // wx.showLoading({
  //   title: "加载中",
  //   mask: true
  // });
 
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  const token = wx.getStorageSync('token') || false
  
  request.headers = {
    "X-Tag": "flyio",
    'content-type': 'application/json'
  };
  if (token) {
    request.headers["token"] = token
  }



  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === "") {
      delete request.body[val]
    };
  });
  request.body = {
    ...request.body
  }
  console.log("请求->")
  console.log("{")
  console.log('  api_url:',request.url)
  console.log('  token:',request.headers["token"])
  console.log('  body:',request.body)
  console.log("}")

  return request;
});

//添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    
    console.log('响应->')
    console.log(response.data)
    return response.data; //请求成功之后将返回值返回
  },
  (err) => {
    //请求出错，根据返回状态码判断出错原因
    console.log(err);
    wx.hideLoading();
    if (err) {
      return "请求失败";
    };
  }
);

fly.config.baseURL = host;

export default fly;