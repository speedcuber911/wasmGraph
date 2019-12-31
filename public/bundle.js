(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const upperBound = 10 ** 2;
const matrixOrder = Math.floor(upperBound * Math.random());

const floydWarshall = (flattenedMatrix) => {
    let n = Math.sqrt(flattenedMatrix.length);
    for (let k = 0; k < n; k++)
        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++)
                if (flattenedMatrix[i * n + k] + flattenedMatrix[n * k + j] < flattenedMatrix[i * n + j])
                    flattenedMatrix[i * n + j] = flattenedMatrix[i * n + k] + flattenedMatrix[k * n + j];
}


function arrayToPtr(testArray) {
    const nByte = testArray.length * testArray.BYTES_PER_ELEMENT;
    const ptr = Module._malloc(nByte);
    HEAP32.set(testArray, ptr / testArray.BYTES_PER_ELEMENT);
    return ptr;
}

const passedArrayOffset = () => {
    const graphMatrix = randomMatrix(matrixOrder);// Matrix of random size.        
    console.log(graphMatrix.length);
    const flattenedMatrix = new Int32Array(graphMatrix.flat());
    console.time("wasm")
    _arrS(arrayToPtr(flattenedMatrix), flattenedMatrix.length);
    console.timeEnd("wasm")
    console.time("Js")
    floydWarshall(flattenedMatrix);
    console.timeEnd("Js")
    console.log('cette', Module.getBytes());
}
const randomMatrix = (size) => ([...new Array(size)].map((_, row) => [...new Array(size)].map((_, col) => row === col ? 0 : (Math.floor(10 * Math.random(10 ** 1))))));

Module.onRuntimeInitialized = passedArrayOffset





},{}]},{},[1]);
