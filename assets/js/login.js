$(function(){
   // -------------------------------------登录界面
       // 去注册注册事件
   $('.loginBox a').on('click',function(){
   
       $('.loginBox').hide()
       $('.regiBox').show()
   })
   
   // 去登录注册事件
   $('.regiBox a').on('click',function(){
       $('.loginBox').show()
       $('.regiBox').hide()
   })
   
   //---------------------------------------------- 输入框校验
   

  let form=layui.form

  form.verify({
  // 登录的表单项添加自定义校验规则
    pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格' ] ,


  // 注册的表单添加自定义校验规则
    repass: function (value, item) {
        // console.log(value, item); value 就是确认密码框内容   item 确认密码框是DOM元素
    
        // 注意细节：获取的密码框一定是注册form表单中的密码框
        let pwd = $(".regiBox [name=password]").val();
    
        // console.log(value, pwd);
    
        if (value !== pwd) {
          // 说明两次密码不一致
          return "两次密码不一致";
        }
    
        // return "提示框的内容";
    },
         
  })
  /* ----------------调用接口--------------发送注册用户的ajax请求 */
   $('.regiBox form').on('submit',function(e){
      e.preventDefault()
      
      let data=$(this).serialize()
     //   console.log(data);
      axios.post('/api/reguser',data).then(function(res){
        // console.log(res);
        if (res.data.status!==0) {
            layer.msg(res.data.msg)
        }
       

        layer.msg('注册成功,请登录')
        $('.regiBox a').click()

       })
     })
     /* ----------------调用接口--------------发送登录用户的ajax请求 */
   
     $('.loginBox form').on('submit',function(e){
       e.preventDefault()
       let data=$(this).serialize()
   
      axios.post('/api/login',data).then(function(res){
       console.log(res);
      if (res.data.status!==0) {
        //   登录失败
        return layer.msg(res.data.message)
      }
       //登录成功

       localStorage.setItem('token',res.data.token)

       layer.msg('登录成功,即将跳转至首页', {
        icon: 1,
        time: 2000 //2秒关闭（如果不配置，默认是3秒）
         }, function(){
     
              location.href='/home/index.html'

          })
        
        })
    })





})