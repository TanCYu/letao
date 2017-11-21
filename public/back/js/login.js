$(function(){
  // 表单验证功能
  /**
   * 1 用户名不为空
   * 2 密码6-12位
   * 
   */
  var $form = $('form');
  $form.bootstrapValidator({
    // 配置校验时图标
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          callback:{
            message:'用户名不正确'
          }
        }
      },
      password:{
        validators:{
          stringLength: {
            min: 6,
            max: 12,
            message: '用户名长度必须在6到12之间'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  })
  // 验证成功是阻止默认提交  success.form.bv
  $form.on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$form.serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          location.href='index.html';
        }
        if(info.error===1001){
          // 密码错误
          $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
        if(info.error===1000){
          //用户名错误
          $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
      }
    })
  })

  // 重置
  $("[type='reset']").on('click',function(){
    $form.data('bootstrapValidator').resetForm();
  })

})