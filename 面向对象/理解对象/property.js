//"use strict";



var person1 = new Object();
person1.name = "Tony";
person1.age = 88;
person1.job = "SE";

person1.sayHello = function () {
    console.log(this.name);
}

var person2 = {
    name: 'Pony',
    age: '99',
    job: "Boss",
    sayHello: function () {
        console.log(this.name);
    }
}

//数据属性的4个描述行为特性：[Configurable],[Enumerable],[Writable],[Value]
//Configurable:表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，默认true
//Enumerable:表示能否通过for-in循环返回属性，默认true
//Writable:表示能否修改属性的值，默认true
//Value:对应这个属性的数据值，读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置，默认值是undefined

var person3 = {};
Object.defineProperty(person3, "name", {
    writable: true,//不允许修改对应的属性值
    value: "Nick"//设定属性值
});

console.log("修改name前的值：" + person3.name);
person3.name = "TestName";
console.log("尝试修改name之后的值：" + person3.name);


var person4 = {};
Object.defineProperty(person4, "name", {
    configurable: false,//一旦定义了不可配置，就不能再将它还原为可配置了，具有不可逆性。
    value: "Jack"
});

console.log("属性可配置默认true的值：" + person4.name);
delete person4.name;
console.log("属性可配置改为false后并尝试删除该属性失败：" + person4.name);

// Object.defineProperty(person4, "name", {
//     configurable: true,//报Cannt redefine property错误
//     value: "Jack"
// });

var person5 = {
    name: "Lily",
    age: 18
};

Object.defineProperty(person5, "Age", {
    get: function () {
        return age;
    },
    set: function (number) {
        if (number > this.age) {
            this.age = number + this.age;
        }
    }
})

person5.Age = 22;
console.log(person5.age);

person5.age = 88;
console.log(person5.age);


var fetch = require('node-fetch');

function* gen() {
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}


var g = gen();
var result = g.next();

result.value.then(function (data) {
    return data.json();
}).then(function (data) {
    g.next(data);
});

