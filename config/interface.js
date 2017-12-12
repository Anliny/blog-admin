/**
 * 
	返回值：code 	
		1:表示请求成功
		2:表示失败（参数传递错误）


 	登录接口
		用户注册：api/api/user/register  参数：userName,password	post
		用户登录：api/api/user/login     参数：userName,password	post
		用户退出：api/api/user/logout    get
	
	用户接口
		查询所有用户：api/admin/users		get
		删除单个用户：api/admin/delete?id=Uid     参数：当前的用户ID		get

	栏目接口
		查询所有栏目：api/admin/blogs		get
		添加一个栏目：api/admin/addBlog	post	参数：courseName(栏目名称),courseDescribe（栏目描述）
		删除一个栏目：api/admin/removeBlog?id=Bid	get		参数：当前的栏目ID
		修改一个栏目：api/admin/update?id=Bid		get		参数：当前的栏目ID

	文章接口
		添加一篇文章：api/article/add_article		post 	参数：articleName,articleAuthor,articleDescribe,articleContent
		删除一篇文章：api/article/remove?id=Aid	get		参数：当前文章的ID
		修改一篇文章：api/article/update?id=Aid	post	参数：当前文章的ID
		查询所有文章：api/article					get
 * 
 * 
 */

