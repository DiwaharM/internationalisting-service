var mongoose = require('mongoose');

const MainCategorySchema = new mongoose.Schema({
    mainCategoryName: String,
    mainCategoryDescription: String,
    mainCategoryImageName : String
});
module.exports = MainCategorySchema;
