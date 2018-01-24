require('babel-register');
// var http = require('http');

// http.createServer(function (req,res){
// 	res.setHeader("Cache-Control","max-age=6000");
// 	res.setHeader("Expires","24 Jul 2018 02:43:26 GMT")
// 	res.writeHead(200,{'Content-Type':'text/html'});
// 	res.end('Hellow Worooold\n');

// }).listen(1337,'127.0.0.1');

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

const query = () => {
	return new Promise((resolve, reject) => {
		if(0) {
			reject('error------');
		} else {
			resolve('result-------');
		}
	})
}

(async() => {
	var a = await query().then(function(e){
		console.log(e,'e')
	})
	console.log(a);
})().catch((err) => {
	console.log(err)
})



