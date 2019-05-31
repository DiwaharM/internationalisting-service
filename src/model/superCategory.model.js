var mongoose = require('mongoose');
var MainCategory = require('./mainCategory.model');
var keyWordDetail = require('./keyword.model');

const SuperCategorySchema = new mongoose.Schema({
    
    categoryName: String,
    categoryDescription: String,
    categoryImageName: String,
    keyWord: [keyWordDetail],
    mainCategory:[MainCategory]
});

const Category = mongoose.model('category', SuperCategorySchema);
module.exports = Category;
