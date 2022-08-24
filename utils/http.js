// let base_url = "http://192.168.0.142:9091";
let base_url = "https://shuzihuinong.huiyunbh.com";

let token = "";

function service(
  options = {
    method: "get",
  }
) {
  options.url = `${base_url}${options.url}`;
  options.header = {
    "content-type": "application/json",
    Authorization: `${uni.getStorageSync("token") || null}`,
  };

  return new Promise((resolved, rejected) => {
    options.success = (res) => {
      if (Number(res.data.code) == 200) {
        resolved(res.data.data);
      } else {
        if (res.data.code === 100001) {
          uni.removeStorageSync('user')
          uni.removeStorageSync('token')
          uni.navigateTo({
            url: "/pages/login/login",
          });
        }
        uni.showToast({
          icon: "none",
          duration: 3000,
          title: `${res.data.errMsg}`,
        });
        rejected(res.data.errMsg);
      }
    };
    options.fail = (err) => {
      rejected(err);
    };
    uni.request(options);
  });
}
export default service;
