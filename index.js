var a;
console.log(a);
let b;
console.log(b);
console.log([] == ![]);
// == 中，左右两边都需要转换为数字然后进行比较。
// []转换为数字为0。
// ![] 首先是转换为布尔值，由于[]作为一个引用类型转换为布尔值为true,
// 因此![]为false，进而在转换成数字，变为0。
console.log(Boolean('false'));
