$(function(){
    // ==================================================  裁剪区
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    
    // 1.3 创建裁剪区域
    $image.cropper(options)
      
 //========================================== 点击上传   模拟点击文件域
    
  $('#chooseBtn').on('click',function(){
         //   console.log('....');
          $('#file').click()
      })

      //===================================== 文件与的change事件

     $('#file').on('change',function(){
        // 获取用户选择的图片
        let file=this.files[0]
        // console.log(file);
        // 如果用户没有选择图片  后面不执行
       if (!file) {
         return 
       }
        // 给裁剪区域赋值
       let newImgURL = URL.createObjectURL(file)
       
       $image
       .cropper('destroy')      // 销毁旧的裁剪区域
       .attr('src', newImgURL)  // 重新设置图片路径
       .cropper(options)        // 重新初始化裁剪区域
       
  })
 // 点击确定  实现上传头像
 $('#sureBtn').on('click',function(){
  let dataURL = $image
  .cropper("getCroppedCanvas", {
    // 创建一个 Canvas 画布
    width: 100,
    height: 100,
  })
  .toDataURL("image/png");


  axios.post('/my/update/avatar','avatar='+encodeURIComponent(dataURL)).then(res=>{
   console.log(res);
   if (res.data.status!==0) {
     return layer.msg("更新头像失败");
     
   }

   layer.msg("更新头像成功");
   // 页面中的头像发生变化（更新）
   window.parent.getUserInfo();

  })
  
 })

})