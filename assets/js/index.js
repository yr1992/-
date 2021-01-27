//处理头像和昵称
function getUserInfo() {
  axios.get("/my/userinfo").then((res) => {
    // console.log(res);
    let name = res.data.data.nickname || res.data.data.username;
    
    $("#welcome").text("欢迎 " + name);
    if (res.data.data.user_pic) {
      $(".layui-nav-img").attr("src", res.data.data.user_pic);
      $(".layui-nav-img").show();
      $(".text_avatar").hide();
    } else {
      let w = name[0].toUpperCase();
      
      // console.log(w);s
      $(".layui-nav-img").hide();
      $(".text_avatar").text(w).show();
    }
  });
}
getUserInfo();
//退出
$("#logout").on("click", function () {
  layer.confirm("确认退出登录", { icon: 3, title: "提示" }, function (index) {
    //返回登录页面
    //将本地存储的token删除
    localStorage.removeItem("token");
    location.href = "/home/login.html";
    layer.close(index);
  });
});


