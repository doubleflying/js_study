// let promise = new Promise(function(resolve, reject) {
//   console.log('Promise');
//   resolve();
// });

// promise.then(function() {
//   console.log('Resolved.');
// });

// console.log('Hi!');






var p1 = new Promise(function (resolve, reject) {
    console.log('new promise p1');
    setTimeout(() => console.log('it is done'), 5000);
    resolve(' hello');

});

var p2 = new Promise(function (resolve, reject) {
    console.log('new promise p2');
    resolve(p1);
})

p1.then(function (json) {
    console.log('p1 resolved' + json);
}, function () {
    console.log('p1 rejected');
})






// var getJSON = function (url) {
//     var promise = new Promise(function (resolve, reject) {
//         var client = new XMLHttpRequest();
//         client.open("GET", url);
//         client.onreadystatechange = handler;
//         client.responseType = "json";
//         client.setRequestHeader("Accept", "application/json");
//         client.send();

//         function handler() {
//             if (this.readyState !== 4) {
//                 return;
//             }
//             if (this.status === 200) {
//                 resolve(this.response);
//             } else {
//                 reject(new Error(this.statusText));
//             }
//         };
//     });

//     return promise;
// };

// getJSON("/posts.json").then(function (json) {
//     console.log('Contents: ' + json);
// }, function (error) {
//     console.error('出错了', error);
// });

// getJSON("/post/1.json").then(function (post) {
//     return getJSON(post.commentURL);//一个promise回调继续返回promise实例
// }).then(function funcA(comments) {//这个then回调就得根据新的promise 实例的状态变化来选择执行分支
//     console.log("Resolved: ", comments);
// }, function funcB(err) {
//     console.log("Rejected: ", err);
// });

// getJSON("/post/1.json").then(
//     post => getJSON(post.commentURL)
// ).then(
//     comments => console.log("Resolved: ", comments),
//     err => console.log("Rejected: ", err)
//     );




// var p1 = new Promise(function (resolve, reject) {
//     setTimeout(() => reject(new Error('fail')), 3000)//3秒后p1调用reject方法
// })
// var p2 = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(p1), 1000)//1秒后p2调用resolve方法，p2的执行依赖p1的状态变化，当p1由pending到rejected状态之后，p2也会变成rejected状态
// })
// p2.then(result => console.log(result))
// p2.catch(error => console.log(error))