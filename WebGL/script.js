const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("webgl2");

let vertShaderText;
let fragShaderText;

let vertexShader;
let fragmentShader;
let shaderProgram;

let modelUniformLocation;
let projectionUniformLocation;
let posAttrLocation;
let colorAttrLocation;

ctx.viewport(0, 0, canvas.width, canvas.height);
ctx.clearColor(0.8, 0.8, 0.8, 1);

setup();

async function setup() {
    vertShaderText = await getShaderText("vert");
    fragShaderText = await getShaderText("frag");

    vertexShader = buildShader(ctx, ctx.VERTEX_SHADER, vertShaderText);
    fragmentShader = buildShader(ctx, ctx.FRAGMENT_SHADER, fragShaderText);
    shaderProgram = buildProgram(ctx, vertexShader, fragmentShader);

    modelUniformLocation = ctx.getUniformLocation(shaderProgram, "u_model");
    projectionUniformLocation = ctx.getUniformLocation(shaderProgram, "u_projection");

    posAttrLocation = ctx.getAttribLocation(shaderProgram, "a_position");
    colorAttrLocation = ctx.getAttribLocation(shaderProgram, "a_color");
    
    ctx.useProgram(shaderProgram);
    ctx.enable(ctx.DEPTH_TEST);
    
    requestAnimationFrame(update);
}

function update(now) {

    render(now);

    requestAnimationFrame(update);
}

const positions = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
];

const elements = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
];

const colorsOfFaces = [
    [0.3,  1.0,  1.0,  1.0],    // Front face: cyan
    [1.0,  0.3,  0.3,  1.0],    // Back face: red
    [0.3,  1.0,  0.3,  1.0],    // Top face: green
    [0.3,  0.3,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.3,  1.0],    // Right face: yellow
    [1.0,  0.3,  1.0,  1.0]     // Left face: purple
];

let colors = [];

for (var j=0; j<6; j++) {
    var polygonColor = colorsOfFaces[j];

    for (var i=0; i<4; i++) {
    colors = colors.concat( polygonColor );
    }
}

function render(now) {
    //Clear with Clear color
    ctx.clear(ctx.COLOR_BUFFER_BIT);

    const model = getModelMatrix(now);
    ctx.uniformMatrix4fv(modelUniformLocation, false, new Float32Array(model));

    const projection = getProjectionMatrix(now);
    ctx.uniformMatrix4fv(projectionUniformLocation, false, new Float32Array(projection));

    const posBuffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, posBuffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(positions), ctx.STATIC_DRAW);
    ctx.vertexAttribPointer(posAttrLocation, 3, ctx.FLOAT, false, 0, 0);
    ctx.enableVertexAttribArray(posAttrLocation);

    const colorBuffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ARRAY_BUFFER, colorBuffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(colors), ctx.STATIC_DRAW);
    ctx.vertexAttribPointer(colorAttrLocation, 4, ctx.FLOAT, false, 0, 0);
    ctx.enableVertexAttribArray(colorAttrLocation);
    
    const elementBuffer = ctx.createBuffer();
    ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, elementBuffer);
    ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(elements), ctx.STATIC_DRAW);

    //Actual Draw Call
    ctx.drawElements(ctx.TRIANGLES, 36, ctx.UNSIGNED_SHORT, 0);
}

const MDN = {};

MDN.translateMatrix = function (x, y, z) {
    return [
        1,    0,    0,   0,
        0,    1,    0,   0,
        0,    0,    1,   0,
        x,    y,    z,   1
    ];
}

MDN.rotateXMatrix = function (a) {
    var cos = Math.cos;
    var sin = Math.sin;
  
    return [
         1,       0,        0,     0,
         0,  cos(a),  -sin(a),     0,
         0,  sin(a),   cos(a),     0,
         0,       0,        0,     1
    ];
}

MDN.rotateYMatrix = function (a) {
    var cos = Math.cos;
    var sin = Math.sin;
  
    return [
       cos(a),   0, sin(a),   0,
            0,   1,      0,   0,
      -sin(a),   0, cos(a),   0,
            0,   0,      0,   1
    ];
}

MDN.multiplyMatrices = function (a, b) {
    var result = [];
  
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    result[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    result[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    result[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    result[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    result[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    result[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    result[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    return result;
}

MDN.multiplyArrayOfMatrices = function (matrices) {
    var inputMatrix = matrices[0];
  
    for(var i=1; i < matrices.length; i++) {
      inputMatrix = MDN.multiplyMatrices(inputMatrix, matrices[i]);
    }
  
    return inputMatrix;
}

MDN.scaleMatrix = function (w, h, d) {
    return [
        w,    0,    0,   0,
        0,    h,    0,   0,
        0,    0,    d,   0,
        0,    0,    0,   1
    ];
}

function getModelMatrix(now) {
    const scale = MDN.scaleMatrix(5, 5, 5);

    const rotateX = MDN.rotateXMatrix(now * 0.0003);

    const rotateY = MDN.rotateYMatrix(now * 0.0005);

    const translate = MDN.translateMatrix(0, 0, -15);

    return MDN.multiplyArrayOfMatrices([
        translate,
        rotateY,  // step 3
        rotateX,  // step 2
        scale   
    ]);
}

function getProjectionMatrix() {

    const fieldOfViewInRadians = Math.PI * 0.5;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 50;

    const f = 1.0 / Math.tan(fieldOfViewInRadians / 2);
    const rangeInv = 1 / (near - far);
 
    return [
      f / aspectRatio, 0,                          0,   0,
      0,               f,                          0,   0,
      0,               0,    (near + far) * rangeInv,  -1,
      0,               0,  near * far * rangeInv * 2,   0
    ];
}

function buildProgram(ctx, vertShader, fragShader) {
    const program = ctx.createProgram();

    ctx.attachShader(program, vertShader);
    ctx.attachShader(program, fragShader);
    ctx.linkProgram(program);

    const status = ctx.getProgramParameter(program, ctx.LINK_STATUS);
    
    if (status) {
        return program;
    }
 
    console.error(ctx.getProgramInfoLog(program));
    ctx.deleteProgram(program);
}

function buildShader(ctx, type, source) {
    const shader = ctx.createShader(type);
    
    ctx.shaderSource(shader, source);
    ctx.compileShader(shader);

    const status = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS);
    
    if (status) {
        return shader;
    }

    console.error(ctx.getShaderInfoLog(shader));
    ctx.deleteShader(shader);
}

async function getShaderText(shaderName) {
    const text = 
    fetch(`${window.location.origin}/shaders/${shaderName}.${shaderName}`)
    .then(res => res.text());

    return text;
}