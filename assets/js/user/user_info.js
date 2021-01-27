$(function(){
    let form = layui.form
//====================================发送  ajax  获取客户信息 
function gerUserInfo(){
    axios.get('/my/userinfo').then((res)=> {
        console.log(res);
        form.val("form", res.data.data)  
    })
  
    
}
gerUserInfo()


// --------------------------------表单的校验   昵称/邮箱

form.verify({

    nickname: function(value){ //value：表单的值、item：表单的DOM对象
    
    if (value.length>6) {

        return '昵称的长度需要在1到6个字符'
    }
    }

})



//================================ 实现修改用户的基本信息

$('form').on('submit',function(e){
    e.preventDefault()
    let data=$(this).serialize()
    // console.log(data);
    axios.post('/my/userinfo',data).then((res)=>{
    // console.log(res);
    if (res.data.status!==0) {
        return layer.msg('更新信息失败')
    }
    // 更新成功
    layer.msg('修改用户信息成功！')

    //子页面无法直接获取到父页面的信息
    window.parent.getUserInfo()

     
    layer.confirm('是否关闭页面?', {icon: 3, title:'提示'}, function(index){
        layer.close(index);
      });    
    })

})
//===============================实现重置功能
$('#resetBtn').on('click',function(e){
e.preventDefault()

// 重现渲染页面 获取未修改之前的数据
gerUserInfo()
})

})
