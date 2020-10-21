const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },() => {
    console.log('数据库连接成功');
});

const userSchema = new Schema({
    name: String,
    gender: String,
    age: Number
});

const userModel = mongoose.model('user', userSchema);
app.use('/create', (request, response) => {
    userModel.create({
        name: '蔡夫人',
        gender: '女',
        age: 53
    }, (error) => {
        if (!error) {
            response.send('插入成功');
        }
        console.log(error);
    });
});

app.use('/remove', (request, response) => {
    userModel.remove({
        name: '诸葛亮'
    }, (error) => {
        if (!error) {
            response.send('删除成功');
        }
        console.log(error);
    });
});
app.use('/update', (request, response) => {
    userModel.update({
        name: '诸葛亮'
    }, { $set: { age: 100 }},(error) => {
        if (!error) {
            response.send('修改成功');
        }
        console.log(error);
    });
});
app.use('/find', (request, response) => {
    userModel.find({
        gender: '女'
    }, (error, result) => {
        if (!error) {
            response.send(result);
        }
        console.log(error);
    });
});


app.listen(5000, () => {
    console.log('Server at port 5000');
});