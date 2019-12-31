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




