$(function(){

// ============================表单校验
let form = layui.form

form.verify({
     // 登录的表单项添加自定义校验规则
     pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格' ] ,

    newPwd: function(value){ //value：表单的值、item：表单的DOM对象
      {
        let oldPwd=$('[name="oldPwd"]').val()
        if (oldPwd===value) {
            // console.log(value);
            return '新旧密码不能一致'
        }

      }
    },
    reNewPwd: function(value){ //value：表单的值、item：表单的DOM对象
      {
        let newPwd=$('[name=newPwd]').val()
        if (newPwd!==value) {
            // console.log(value);
            return '两次密码输入不一致'
        }

      }
    }

}); 
//==============================发送ajax请求
$('form').on('submit',function(e){
       e.preventDefault()
    let data=$('form').serialize()
    axios.post('/my/updatepwd',data).then((res)=>{
      console.log(res);
    if (res.data.status!==0) {
        return res.data.mes
    }
    
    layer.msg("更新密码成功");

    $('form')[0].reset()

 })
})

})
 