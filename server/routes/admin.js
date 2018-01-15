import express from 'express';
import {query} from '../lib/mysqlconnect';

import bookModel from '../models/book';
import borrowModel from '../models/borrow';
import pressModel from '../models/press';

/*还书，删除借阅记录
1. 是否存在该记录
2. 存在则删除
*/



//添加图书
/*添加出版社
1. 是否存在该出版社
2. 无则添加
*/

/*修改图书信息
1. 查找是否存在该书
2. 若存在则，修改
*/


/*修改出版社信息
1. 查找是否有该出版社
2. 有则修改
*/



/*删除出版社信息
1.查找是否有该出版社的书
2. 有则不予删除
*/



/*删除图书信息
1. 判断该书是否已经借
2. 确定是否删除，连同该借阅记录
*/
