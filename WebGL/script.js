const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("webgl2");

//SOLVE AWAIT PROBLEM
let vertShaderText;
let fragShaderText;

let vertexShader;
let fragmentShader;
let shaderProgram;

let posAttrLocation;

setup();

const positionsStride = 2;
const positions = [
    0, 0,
    0.2, 0.5,
    0.6, 0
];

const posBuffer = ctx.createBuffer();
ctx.bindBuffer(ctx.ARRAY_BUFFER, posBuffer);

ctx.clearColor(0, 0, 0, 0);

async function setup() {
    vertShaderText = await getShaderText("vert");
    fragShaderText = await getShaderText("frag");

    vertexShader = buildShader(ctx, ctx.VERTEX_SHADER, vertShaderText);
    fragmentShader = buildShader(ctx, ctx.FRAGMENT_SHADER, fragShaderText);
    shaderProgram = buildProgram(ctx, vertexShader, fragmentShader);

    posAttrLocation =  ctx.getAttribLocation(shaderProgram, "a_position");
    ctx.vertexAttribPointer(posAttrLocation, 2, ctx.FLOAT, false, 0, 0);

    requestAnimationFrame(update);
}

function update(now) {
    ctx.viewport(0, 0, canvas.width, canvas.height);
    ctx.clear(ctx.COLOR_BUFFER_BIT);

    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(positions), ctx.STATIC_DRAW);

    ctx.useProgram(shaderProgram);
    ctx.enableVertexAttribArray(posAttrLocation);

    ctx.drawArrays(ctx.TRIANGLES, 0, positions.length / positionsStride);
    requestAnimationFrame(update);
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