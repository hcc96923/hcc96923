### 关于框架和包
    * 第三方的东西不要纠结 
    * 先以解决问题为主
### Node.js是什么
    * Node.js不是一门语言
    * Node.js不是库，不是框架
    * Node.js是一个JavaScript运行时环境
    * Node.js可以解析和执行JavaScript代码
    * 以前只有浏览器解析执行JavaScript代码
    * 现在可以脱离浏览器解析执行JavaScript代码，一切都归功于node.js
### 浏览器中的JavaScript
    * ECMAScript
        *基本的语法
        *if
        *var
        *function
        *Object
        *Array
    * BOM
    * DOM
### Node.js中的JavaScript
    * 没有BOM, DOM
    * ECMAScript
    * 在Node这个JavaScript执行环境中为JavaScript提供了一些服务器级别的操作API
        * 例如文件的读写
        * 网络服务的构建
        * http服务器
        * 网络通信
### 构建Chrome的V8引擎之上
    * 代码只是具有特定格式的字符串而已
    * 引擎可以认识它，引擎可以帮你去解析和执行
    * Google的Chrome的V8引擎是目前公认的解析执行JavaScript代码最快的
    * Node.js的作者把Google的Chrome中的V8引擎移植了出来开发了一个独立的
    JavaScript运行时环境
### Node.js特有的功能
    * event.driven 事件驱动
    * non-blocking I/O model非阻塞IO模型（异步）
    * 轻量和高效的
### Node的生态环境
    * npm是世界上最大开源生态系统
    * 绝大多数JavaScript相关的包都存放在npm上
### Node的用途
    * 主要用于web服务器
    * 命令行工具的构建
### B/S编程模型
    * Browse-Server
    * back-end
    * 任何服务端技术这种BS编程模型都是一样，和语言无关
    * Node只是作为学习BS编程模型的一个工具而已
### 文件读写
    * 浏览器中的JavaScript是没有文件操作能力
    * Node中的JavaScript具有文件操作能力（Node.js的API）
### IP地址和端口号
    * IP地址用来定位计算机
    * 端口号用来定位计算机上的应用程序
### modul和module.exports
    * 每个模块都默认有一个module对象，module对象中有一个exports对象
    * 我们可以把需要导出的成员都挂载到module.exports接口对象中
    * 也就是module.exports.xxx = xxx  很麻烦  点的太多了
    * 所以node为了方便，同时在每一个模块中提供了一个成员exports === module.exports
    * 直接给exports赋值无效 因为每个模块最后return的是module.exports
    * 而exports只是module.exports的一个引用
    * 即使重新为exports = xx赋值也不会影响module.exports    
### module查找顺序
    * 优先从缓存中加载
    * 核心模块
    * 路径形式的文件模块
    * 第三方模块
### package.json文件生成
    * npm init -y
    * npm install 
    * npm uninstall
### Express框架
    * 原生的http在某些方面表现不足以应对我们的开发需求，所以我们就需要使用框架来加快我们的开发效率，框架的目的就是提高效率，让我们的代码更高度统一。
    * npm install --global nodemon 在任何目录都可以使用
### 路由
    * 路由其实就是一张表，表里有具体的映射关系
    * xxx 学院
        * xxx专业
            * xxx学生
    * 代码中就是  请求不同的路由  映射到不同的处理函数中
### GET请求
    * Express内置了一个API直接通过req.query来获取
### POST请求
    * Express没有内置的解析POST请求体的API
    * 使用第三方包body-parser
### __dirname和__filename
    * 文件操作要使用动态的路径
    * __dirname获取文件所处目录的绝对路径
    * __filename获取文件的绝对路径
    * 在node中使用相对路径是不可靠的。所以要把相对路径（动态的）变为绝对路径
### 表单提交
    * 表单有默认的提交行为，默认是同步的，同步表单提交，浏览器会锁死（转圈）等待服务器的响应
    * 表单的同步提交之后，无论服务端响应的是什么，都会直接把响应的结果覆盖掉当前页面
### Cookie和Session
    * HTTP是无状态的，你自己记住你自己
    * Cookie可以用来保存一些不太敏感的数据，但是不能用来保存用户的登录状态
    * 用户名  购物车
    * Session 相当于超市里面的储物柜。每个储物柜都有一把钥匙（服务器给你的）
### 中间件
    * 中间件就是 一个复杂的流程分割成几个具有独立功能的模块
### Nginx
    * 反向代理
        * 正向代理：用户访问Google通过配置浏览器（abc.com）。通过浏览器简介的访问Google
        * 反向代理：用户访问——>[nginx服务器的端口为8001——>服务器端口为9001]
        * 反向代理实际上是隐去了（真是的服务器）用户访问的是nginx服务器  转发到目标服务器
    * 负载均衡
        * 单个服务器解决不了的问题。增加服务器。将请求分发到各个服务器上面。
    * 动静分离
        * 把动态的资源（aspx,jsp）静态资源（图片，文本）分布在不同的服务器上面 
    * 高并发
### 传统的Token
    * 用户登陆成功，服务器返回客户端一个token，并将这个token存在数据库。
    * 用户再次访问的需要携带token，服务端会再次验证用户携带的token。与数据库比对。
### JsonWebToken(JWT)
    * 相较于传统的token，服务端不保存token。
    * 用户再次登录只需要验证token。
    * 优势：相比传统的token。jwt模式下服务端无需保存token。
    * JWT的实现原理
    * 用户提交用户名和密码登陆成功以后服务端使用JWT生成一个token并返回给浏览器。
    * JWT生成的Token是由三段字符串组成并且用.连接起来。
    * AQAjUOd7u5xW6FjyRDeypztvm96frrGTPnYqdY149RZ4Dgzqwy78ePrQB.cdtoIG4Q5A3dao3y5xwVASyu-63JijkL7XZq6a3knZyora7CF8pQ3l5b8d5967VVOq.Gfc0EHkMBMbEOkLrzCT6oYFEr1OxS_UBiaq-NK4yoQu8-u06ZwMrJmiE
        * 第一段字符串HEADER,内部包含算法（alg）/token类型。
        * json转化成字符串，然后做base64url编码（可以解码不是加密）
        * {
        *   "alg": "HS256",
        *   "typ": "JWT"
        * }
        * 第二段字符串payload，自定义值然后做base64url编码
        * {
        *   "id": "174804186",
        *   "pwd": "114477",
        *   "exp": "15515169815" #过期时间
        * }
        * 第三段字符串：
        * 第一步：第1，,部分字符换用"."拼接起来。
        * 第二部：对前两部分的编码的字符串加密（hash256）还可以在此加盐（添加自定义秘钥）
        * 第三部：对加密后的密文再做base64url编码。
    * 以后用户在访问的时候，需要携带token，后端需要对token进行校验
        * 获取token 
        * 第一步：对token进行切割
        * AQAjUOd7u5xW6FjyRDeypztvm96frrGTPnYqdY149RZ4Dgzqwy78ePrQB.cdtoIG4Q5A3dao3y5xwVASyu-63JijkL7XZq6a3knZyora7CF8pQ3l5b8d5967VVOq.Gfc0EHkMBMbEOkLrzCT6oYFEr1OxS_UBiaq-NK4yoQu8-u06ZwMrJmiE
        * 第二部：对第二段进行base64url解密，并获取payload信息，检测token是否已经过期？
        * {
        *   "id": "174804186",
        *   "pwd": "114477",
        *   "exp": "15515169815" #过期时间
        * }
        * 第二部：对前两部分编码的字符串进行HS256加密+加盐
        * 密文 = base64url解码(Gfc0EHkMBMbEOkLrzCT6oYFEr1OxS_UBiaq-NK4yoQu8-u06ZwMrJmiE)
        * 如果相等表示token没有被修改过则认证通过。
        * 密码修改会清除本地的token