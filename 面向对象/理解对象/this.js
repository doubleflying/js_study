//在绝大多数情况下，函数的调用方式决定了this的值。this不能在执行期间被赋值，在每次函数被调用时this的值也可能会不同。ES5引入了bind方法来设置函数的this值，而不用考虑函数如何被调用的

//全局上下文的this

console.log(this.document === document); // true

// 在浏览器中，全局对象为 window 对象：
console.log(this === window); // true

this.a = 37;
console.log(window.a); // 37

//函数上下文的this

//直接调用
function f1(){
  return this;
}

f1() === window; // true
//在上面的例子中，this的值不是由函数调用设定。因为代码不是在严格模式下执行，this 的值总是一个对象且默认为全局对象。

function f2(){
  "use strict"; // 这里是严格模式
  return this;
}
//在严格模式下，this 是在进入运行环境时设置的。若没有定义，this的值将维持undefined状态。同时它也能设置成任意值，比如 null 或者42 或者“I am not this”。
f2() === undefined; // true

//对象方法中的this
//当以对象里的方法的方式调用函数时，它们的 this 是调用该函数的对象.
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f()); // logs 37

//注意，在何处或者如何定义调用函数完全不会影响到this的行为
var o = {prop: 37};

function independent() {
  return this.prop;
}

o.f = independent;

console.log(o.f()); // logs 37

//类似的，this 的绑定只受最靠近的成员引用的影响。在下面的这个例子中，我们把一个方法g当作对象o.b的函数调用。在这次执行期间，函数中的this将指向o.b。事实上，这与对象本身的成员没有多大关系，最靠近的引用才是最重要的
o.b = {
  g: independent,
  prop: 42
};
console.log(o.b.g()); // logs 42

//原型链中的this
//如果该方法存在于一个对象的原型链上，那么this指向的是调用这个方法的对象，表现得好像是这个方法就存在于这个对象上一样

var o = {
  f : function(){ 
    return this.a + this.b; 
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5

//在这个例子中，对象p没有属于它自己的f属性，它的f属性继承自它的原型。但是这对于最终在o中找到f属性的查找过程来说没有关系；查找过程首先从p.f的引用开始，所以函数中的this指向p。也就是说，因为f是作为p的方法调用的，所以它的this指向了p。这是JavaScript的原型继承中的一个有趣的特性


//getter 与 setter 中的 this
//再次，相同的概念也适用时的函数作为一个 getter 或者 一个setter调用。作为getter或setter函数都会绑定 this 到从设置属性或得到属性的那个对象

function modulus(){
  return Math.sqrt(this.re * this.re + this.im * this.im);
}

var o = {
  re: 1,
  im: -1,
  get phase(){
    return Math.atan2(this.im, this.re);
  }
};

Object.defineProperty(o, 'modulus', {
  get: modulus, enumerable:true, configurable:true});

console.log(o.phase, o.modulus); // logs -0.78 1.4142


//构造函数中的 this
//当一个函数被作为一个构造函数来使用（使用new关键字），它的this与即将被创建的新对象绑定
//注意：当构造器返回的默认值是一个this引用的对象时，可以手动设置返回其他的对象，如果返回值不是一个对象，返回this

function C(){
  this.a = 37;
}

var o = new C();
console.log(o.a); // logs 37


function C2(){
  this.a = 37;
  return {a:38};
}

o = new C2();
console.log(o.a); // logs 38

//在最后的例子中（C2），因为在调用构造函数的过程中，手动的设置了返回对象，与this绑定的默认对象被取消（本质上这使得语句“this.a = 37;”成了“僵尸”代码，实际上并不是真正的“僵尸”，这条语句执行了但是对于外部没有任何影响，因此完全可以忽略它）


//call 和 apply
//当一个函数的函数体中使用了this关键字时，通过所有函数都从Function对象的原型中继承的call()方法和apply()方法调用时，它的值可以绑定到一个指定的对象上

function add(c, d){
  return this.a + this.b + c + d;
}

var o = {a:1, b:3};

// The first parameter is the object to use as 'this', subsequent parameters are passed as 
// arguments in the function call
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16

// The first parameter is the object to use as 'this', the second is an array whose
// members are used as the arguments in the function call
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34

//使用 call 和 apply 函数的时候要注意，如果传递的 this 值不是一个对象，JavaScript 将会尝试使用内部 ToObject 操作将其转换为对象。因此，如果传递的值是一个原始值比如 7 或 'foo' ，那么就会使用相关构造函数将它转换为对象，所以原始值 7 通过new Number(7)被转换为对象，而字符串'foo'使用 new String('foo') 转化为对象，例如
function bar() {
  console.log(Object.prototype.toString.call(this));
}

bar.call(7); // [object Number]


//bind方法中的this
//ECMAScript 5 引入了 Function.prototype.bind。调用f.bind(someObject)会创建一个与f具有相同函数体和作用域的函数，但是在这个新函数中，this将永久地被绑定到了bind的第一个参数，无论这个函数是如何被调用的

function f(){
  return this.a;
}

var g = f.bind({a:"azerty"});
console.log(g()); // azerty

var o = {a:37, f:f, g:g};
console.log(o.f(), o.g()); // 37, azerty

//DOM事件处理函数中的 this

//当函数被用作事件处理函数时，它的this指向触发事件的元素（一些浏览器在动态添加监听器时不遵守这个约定，除非使用addEventListener 这句不太确定翻译的是否正确）

// 被调用时，将关联的元素变成蓝色
function bluify(e){
  console.log(this === e.currentTarget); // 总是 true

  // 当 currentTarget 和 target 是同一个对象是为 true
  console.log(this === e.target);        
  this.style.backgroundColor = '#A5D9F3';
}

// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName('*');

// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for(var i=0 ; i<elements.length ; i++){
  elements[i].addEventListener('click', bluify, false);
}


//内联事件处理函数中的 this

//当代码被内联处理函数调用时，它的this指向监听器所在的DOM元素

<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>

//上面的alert会显示button。注意只有外层代码中的this是这样设置的
<button onclick="alert((function(){return this})());">
  Show inner this
</button>
//在这种情况下，没有设置内部函数的 this，所以它指向 global/window 对象（即非严格模式下调用的函数未设置 this 时指向的默认对象）

