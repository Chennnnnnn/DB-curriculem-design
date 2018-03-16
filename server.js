require('babel-register');
var http = require('http');

http.createServer(function (req,res){
	res.setHeader("Cache-Control","max-age=6000");
	res.setHeader("Expires","24 Jul 2018 02:43:26 GMT")
	res.writeHead(200,{'Content-Type':'text/html'});
    res.end('Hellow Worooold\n');
    console.log('asdas')

}).listen(80,'127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');		

// const promise1 = new Promise(function(resolve, reject){
// 	// if(dsdsfsd){
// 	// 	resolve("promise");
// 	// } else {
// 	// 	reject(error);
// 	// }
// })

// async function f() {
// 	await Promise.reject('error');
// }

// f()
// .then(v=>console.log(v))
// .catch(e => console.log(e));

// const query = () => {
// 	return new Promise((resolve, reject) => {
// 		if(0) {
// 			reject('error------');
// 		} else {
// 			resolve('result-------');
// 		}
// 	})
// }

// (async() => {
// 	var a = await query().then(function(e){
// 		console.log(e,'e')
// 	})
// 	console.log(a);
// })().catch((err) => {
// 	console.log(err)
// })


// function a(num, callback) {
// 	callback([{...num},2]);
// } 

// const query = (sql) => {
//     return new Promise((resolve, reject) => {
//         a(sql, (results) => {
//             resolve(results);
//         })
//     })
// }

// (async () => {
// 	let result1 = await query(1)
// 	let result2;
// 	let result3;
//     if (result1.length) {
// 	  result2 = await query(result1)
// 	}  
// 	if (result2 && result2.length) {
// 		result3 = await query(result2)
// 	}  
// 	console.log(result3); 
// })().catch((err) => {
//     console.log('err',err)
// }) 


// (async () => {
// 	let a = await query(2).then(function(resolve){
// 		console.log('-----');
// 	});
// 	let b = await query(1);
// 	console.log(a,b);
// })()


// query(2)
// .then(function(result){	
//     if (result) {
//       return query(result)
//     } 
// })
// .then(function(result){
// 	if (result) {
// 	  return query(result)
// 	} 
// })
// .then(function(reslut){
// 	console.log(reslut)
// })



var genCssSelector = function (eTarget) {
	

	return arr.reverse().join();
}

document.addEventListener('click',function(e){
	console.log(genCssSelector(e.target))
})















