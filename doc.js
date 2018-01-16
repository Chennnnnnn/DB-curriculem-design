// 读者
// 注册
```
{
    url:'/reader/register',
    type:'post',
    data: {
        Rname:'读者名',
        password:'123456'
    }
}

{
    result: true,
    message: {
        Rno: 1,
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
    url: '/reader/login',
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
    url: '/reader/logout',
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
    url: '/reader/borrow',
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
    url: '/reader/getBorrowList',
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



//管理员
//管理员登录
```
{
    url: '/admin/login',
    type: 'post',
    data: {
        account: 'dd'
        password: '123456'
    }
}

{
    result: true,
    message: '登录成功'
}

```
//管理员登出
```
{
    url: '/admin/logout',
    type: 'get',
}

    result: true,
    message: '注销成功'
}

```
//添加图书,zhuangt 可借出
```
{
    url: '/admin/addBook',
    type: 'post',
    data:{
        Bname:'网络安全',
        Baddress:' 2排4架',
        Pno:'4'  //先获取press
    }
}
{
    result:true,
    message:[{
        Bno:'4'
    }]
}

```
//修改图书信息
```
{
    url: '/admin/updateBook',
    type: 'post',
    data:{
        Bno:'3',
        Baddress:' 2排4架',
        Pno:'4'  //先获取press
    }
}
{
    result:true,
    message:'修改成功'
}
```

//添加出版社
```
{
    url: '/admin/addPress',
    type: 'post',
    data:{
        Pname:'高等教育出版社',
        Phone:'10000001',
        Paddress:'广州'
    }
}
{
    result:true,
    message:[{
        Pno:'4'
    }]
}

```
//修改出版社
```
{
    url: '/admin/updatePresses',
    type: 'post',
    data:{
        Phone:'10000001',
        Paddress:'广州'
    }
}
{
    result:true,
    message:'修改成功'
}

```
//出版社信息
```
{
    url: '/admin/getPresses',
    type: 'get',
}
{
    result:true,
    message:{[
        Pno: '5'
        Pname:'高等教育出版社',
        Phone:'10000001',
        Paddress:'广州'
    ]}
}
```
//查看借阅记录
```
{
    url: '/admin/getBorrows',
    type: 'get',
}
{
    result:true,
    message:{[
        Bono: '5',
        Bname:'书名',
        Rname:'借阅者名称',
        Bdate:'2018-79-45'
    ]}
}
```
//修改图书状态，删除借阅记录，帮读者还书

```
{
    url: '/admin/returnBook',
    type: 'post',
    data:{
        Bono:'2'
    }
}
{
    result:true,
    message:'还书成功'
}
```


//公共接口
//查看图书
```
{
    url: '/admin/getAllBooks',
    type: 'get'
}
{
    result:true,
    message:[{
        Bno:'2',
        Bname:'计算机网络',
        Pname:'出版社名',
        Baddress:'3排6架',
        Bstate:'可借出'
    }]
}
```


