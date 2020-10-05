const obj = {};

Object.defineProperty(obj, 'name', {
    value: 'hcc',
    writable: true
});

obj.name = 'hwl';
console.log(obj.name);
