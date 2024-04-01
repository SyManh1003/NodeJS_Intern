function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let arr = [];
for (let i = 0; i < 5; i++) {
    arr.push(getRandomInt(0, 10));
}

// Print Arr
console.log("Random array:", arr);

var min = arr[0];
var max = arr[0];
var totalInt = arr[0];

for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i];
    }
    if (arr[i] < min) {
        min = arr[i];
    }
    // Find total of integers
    totalInt+=arr[i];

}

var minimum = totalInt - max;
var maximum = totalInt - min;

console.log("Minimum is: " + minimum);
console.log("Maximum is: " + maximum);
