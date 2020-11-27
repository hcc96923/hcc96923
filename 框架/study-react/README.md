# React
### 核心概念
- JSX语法就是 JavaScript+XML。遇到<按照HTML解析遇到{按照JavaScript解析
- JSX用className代替class，用htmlFor代替for表单获取焦点
- 自定义的组件首字母必须大写
- 如果存在标签结构而且标签结构需要换行需要用()包起来
- react事件绑定采用驼峰命名法
- 组件后缀可以使jsx也可以是js
- Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用将JSX创建为一个对象
  ```
    <!-- react元素 -->
    const element = (
        <h1 className="greetings">
            Hello World
        </h1>
    )
    ------------------------React.createElement()--------------------------------
    const element = {
        type: 'h1',
        props: {
            className: 'greetings',
            children: 'Hello World
        }
    }
  ```
- props符合数据的单项流动使用者不能修改
- 读state只能通过this.state
- 状态是私有的，props是父组件传来的
- 每次组件更新时 render 方法都会被调用
- 构造函数是唯一可以给 this.state 赋值的地方
- 绑定this的方法：constructor中bind(this) | class fields | () => this.handle()
- 在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。
- 如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。
- react生命周期函数 
- 属性传递：父传子——属性传递，字传父——onRef绑定要传递的事件子组件通过调用onRef从而调用父组件的事件
- 事件传递：父传子——事件名传递，字传父——事件回传
- key的作用：减少重复渲染减少渲染页面的时间
- 受控组件（依赖于手动编写事件处理逻辑改变value）和非受控组件(通过ref操作DOM)
- 动态的给子组件传递内容：this.props.children
- react是单项数据流子组件不能修改只能使用
- 这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。
- setState是同步的还是异步的？
- setState只在合成事件（react在组件中注册绑定的事件）和钩子函数中是异步的，在原生事件和setTimeout中都是同步的
- 元素的 key 只有放在就近的数组上下文中才有意义。
- 渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。
- SyntheticEvent 是对浏览器原生事件的跨浏览器包装。它的 API 与浏览器的原生事件相同，包括 stopPropagation() 和 preventDefault()，除了事件在所有浏览器中的工作方式相同。
- React Fiber 的主要目标是什么?React Fiber 的目标是提高其在动画、布局和手势等领域的适用性。它的主要特性是 incremental rendering: 将渲染任务拆分为小的任务块并将任务分配到多个帧上的能力。
### React-Router-DOM
- Link和NavLink的区别。Link会被渲染为一个a标签，NavLink是Link的特定版本相比Link来说NavLink多了一些属性activeClassName，activeStyle
- HashRouter：锚点链接  BorwserRouter：history模式需要后台支持
- Route：path，component
- Link：to
- 严格匹配path——exact，strict
- Switch只会渲染第一个匹配到的路径而不加Switch的话会渲染所有匹配到的路径
- exact属性  一般根路径会加精确匹配否则 / 会匹配所有的 /xxx这样就会只渲染  路径对应的Route
### Redux
- redux三个原则：store必须是唯一的，多个store是不允许的。只有store能改变自己的内容。reducer必须是纯函数
- Redux工作流程
- createStore()实例化仓储，传入reducer管理员去管理store的数据，reducer只是管理store里面的数据
- store派发（dispatch）action从而触发reducer里面的逻辑返回新的state从而store自己改变state
- reducer只是返回了更改的数据，但是并没有更改store中的数据，store拿到了reducer返回的数据，自己对自己进行了更新
- reducer里面的action.type和派发的action.type保持一致因此可以把这个常量写在一的单独的文件中
- store派发的action也可以考虑复用写在一个文件中
- redux-thunk异步获取后台数据
### ReactHooks
- hook只能在函数最外层调用，不能在循环判断子函数中调用不能在类组件中调用

- useEffect实现了componentDidMount/componentDidUpdate/componentWillUnmount三个周期函数
- useEffect会在页面初次渲染时执行一次回调函数实现了componentDidMount。
- useEffect会在监视的值更新时执行回调函数实现了componentDidUpdate。
- useEffect会在页面离开时组件卸载时执行一次回调函数实现了componentWillUnmount.
- useEffect的第二个参数是一个数组，数组里面的变量变化时将会解绑对应的副作用。空数组时只用组件销毁时才能解绑对应的副作用。
- useEffect时异步的生命周期函数时同步的

- useContext用于接收上下文变量（由createContext创建通过Provider提供给子组件）
- reducer是什么？reducer其实就是一个函数这个函数有两个参数，一个是状态，一个是用来控制业务逻辑的判断参数
- useMemo代替shouldComponentUpdate
### Next