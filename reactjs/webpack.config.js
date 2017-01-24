module.exports={
	entry:'./main.js',
	output:{
		filename:'bundle.js',
		path:'./dist'
	},
	module:{
		rules:[
			{test:/\.(js|jsx)$/,use:'babel-loader'}
		]
	}

}
