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
- React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件。
- Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。
- Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差。
- 注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。
- Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。对于大多数应用中的组件来说，这通常不是必需的。但其对某些组件，尤其是可重用的组件库是很有用的。
- DOM组件使用React.forwardRef获取传递给它的ref将ref转发给它的子组件。ref.current将指向 <button> DOM 节点。第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。
- React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。key 是唯一可以传递给 Fragment 的属性。未来我们可能会添加对其他属性的支持，例如事件。
- mixin就是将其它可复用的方法引入到当前组件，但是随着业务的复杂当前组件会引入越来越的的其他函数。
- 高阶组件是参数为组件，返回值为新组件的函数。
- 由于 JSX 会编译为 React.createElement 调用形式，所以 React 库也必须包含在 JSX 代码作用域内。
- 如果你没给 prop 赋值，它的默认值是 true。
- JSX 中的 JavaScript 表达式将会被计算为字符串、React 元素或者是列表
- false, null, undefined, and true 是合法的子元素。但它们并不会被渲染。
- 在大部分情况下，你可以继承 React.PureComponent 以代替手写 shouldComponentUpdate()。它用当前与之前 props 和 state 的浅比较覆写了 shouldComponentUpdate() 的实现。
- Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。ReactDOM.createPortal(child, container)对话框
- 通常来讲，当你从组件的 render 方法返回一个元素时，该元素将被挂载到 DOM 节点中离其最近的父节点
- Profiler 测量渲染一个 React 应用多久渲染一次以及渲染一次的“代价”。
- mixins: [SetIntervalMixin], // 使用 mixin是一个对象，mixins会造成命名冲突，滚雪球式代码很难维护高耦合
- 术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术。很明显HOC最大的特点就是：接受一个组件作为参数，返回一个新的组件。
- 当有多个HOC一同使用时，无法直接判断子组件的props是哪个HOC负责传递的。
- 重复命名的问题：若父子组件有同样名称的props，或使用的多个HOC中存在相同名称的props，则存在覆盖问题，而且react并不会报错。当然可以通过规范命名空间的方式避免。
- Render Props 的核心思想是，通过一个函数将class组件的state作为props传递给纯函数组件
- 在react开发者工具中观察HOC返回的结构，可以发现HOC产生了许多无用的组件，加深了组件层级。
- 同时，HOC使用了静态构建，即当AppWithMouse被创建时，调用了一次withMouse中的静态构建。而在render中调用构建方法才是react所倡导的动态构建。与此同时，在render中构建可以更好的利用react的生命周期。
- React.lazy() 允许你定义一个动态加载的组件。这有助于缩减 bundle 的体积，并延迟加载在初次渲染时未用到的组件。
- 最重要的一点，render props 其实和高阶组件HOC一样，是为了给纯函数组件加上state，响应react的生命周期。
- HOC和render props都是为了解决复用组件中的状态逻辑
- hook是一种更好的复用组件状态逻辑的方式/自定义hooke就是利用react提供的基础的hook组合出在项目中更有用的hook
- Hook 在 class 内部是不起作用的。但你可以使用它们来取代 class 。Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。hook/class
- 当用户点击按钮后，我们传递一个新的值给 setCount。React 会重新渲染 Example 组件，并把最新的 count 传给它。
- 在 React 的 class 组件中，render 函数是不应该有任何副作用的。一般来说，在这里执行操作太早了，我们基本上都希望在 React 更新 DOM 之后才执行我们的操作。
- react生命周期函数 
- 属性传递：父传子——属性传递，字传父——onRef绑定要传递的事件子组件通过调用onRef从而调用父组件的事件
- 事件传递：父传子——事件名传递，字传父——事件回传
- key的作用：减少重复渲染减少渲染页面的时间
- 受控组件（依赖于手动编写事件处理逻辑改变value）和非受控组件(通过ref操作DOM)
- 动态的给子组件传递内容：this.props.children
- react是单项数据流子组件不能修改只能使用
- 这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。
- 你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。hooks动机，componentDidMount，componentWillMount中充斥着大量与组件无关的逻辑例如我们需要观察某个数据的最新值，需要分别在componentDidMount和componentDidUpdate中写同样的逻辑
- 每次我们重新渲染，都会生成新的 effect，替换掉之前的。某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染
- 大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 useLayoutEffect Hook 供你使用，其 API 与 useEffect 相同。
-  React 会在组件卸载的时候执行清除操作。正如之前学到的，effect 在每次渲染的时候都会执行。这就是为什么 React 会在执行当前 effect 之前对上一个 effect 进行清除/不清除的话每次渲染完成之后都要订阅一次造成内存泄漏
-  有些effect不必清除如网络请求/但是定时器，事件监听必须清除
-  Hook 允许我们按照代码的用途分离他们， 而不是像生命周期函数那样。React 将按照 effect 声明的顺序依次调用组件中的每一个 effect。
- 通过调用hook可以把组件内相关的副作用组织起来，（例如监听滚动，取消监听滚动）而不需要将他们拆分到不同的生命周期函数里
- effect。避免了在 class 组件中因为没有处理更新逻辑而导致常见的 bug。
- useEffect === componentDidMount/componentWillUnmount/componentDidUpdate/shouldComponentUpdate
- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 调用useFriendStatus hook从react的角度来看只是调用了useState()和useEffect()
- useCallback(fn, deps) 相当于 useMemo(() => fn, deps)---deps不会作为参数传递到回调函数，但是deps中的值都应该在回调函数中---记住，传入 useMemo 的函数会在渲染期间执行。如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。
- 当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。
- 在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。尽可能使用标准的 useEffect 以避免阻塞视觉更新。
- ref = useRef(null) === ref.current === null
- constructor：函数组件不需要构造函数。你可以通过调用 useState 来初始化 state。如果计算的代价比较昂贵，你可以传一个函数给 useState。
- getSnapshotBeforeUpdate，componentDidCatch 以及 getDerivedStateFromError：目前还没有这些方法的 Hook 等价写法，但很快会被添加。
- 你可以用 React.memo 包裹一个组件来对它的 props 进行浅比较shouldComponentUpdate
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）
- 在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。
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
- shouldComponentUpdate如果当前组件的state或者props变化了则重新渲染即使子组件的props没有改变
- shouldComponentUpdate方法接收两个参数nextProps和nextState，可以将this.props与nextProps以及this.state与nextState进行比较，并返回 false 以告知 React 可以跳过更新。
### Next