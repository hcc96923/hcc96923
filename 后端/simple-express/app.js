
const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send('Hello World');
});
app.use('/post', (request, response) => {
    response.send({ name: 'Hello World' });
});

app.listen(5000, () => {
    console.log('Server at port 5000');
});