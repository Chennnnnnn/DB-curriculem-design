// 读者
// 注册

```
{
    url:'/register',
    type:'post',
    data: {
        Rname:'读者名',
        password:'123456'
    }
}

{
    result: true,
    message: {
        Rid: 1,
        Rname:'读者名',
        password:'123456'
    }
}

{
    result: false,
    message: '读者号不能为空'
}
```
// 登录

```
{
    url: '/login',
    type: 'post',
    data: {
        Rname: 'dd'
        password: '123456'
    }
}

{
    result: true,
    message: '登录成功'
}

```
// 登出
```
{
    url: '/logout',
    type:'get',
}

{
    result: true,
    message: '注销成功'
}
```
// 借书

```
{
    url: '/borrow',
    type: 'post',
    data:{
        Bno:1        
    }
}

{
    result: true,
    message: '借阅成功'
}
```
// 查看借阅情况
```
{
    url: '/getBorrowList',
    type: 'get'
}
{
    result:true,
    message:[{
        Bno:'dd',
        Bono:2,
        Rno: 2,
        Bdate:'2017-10-18'
    }]
}
```