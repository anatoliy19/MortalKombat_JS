const date = new Date();
console.dir(date);

logTime =  date.getFullYear() +":"+(date.getMonth()+1)+":"+date.getDate()+":"+
    date.getHours() +":"+date.getMinutes()+":"+date.getSeconds();

console.log(logTime);