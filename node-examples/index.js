var rect = require('./rectangle')
function solveRect(l,b) {
    console.log("solving for rectangle with l = " + l + "and b = " + b);

    rect(l,b,(err, rectangle) => {
        if(err) console.log("error : ", err.message);
        else{
            console.log("area : " + rectangle.area());
        }
    });
    console.log("this statement is after the call to rect()");
}

solveRect(2,4);
solveRect(3,5);
solveRect(0,-5);