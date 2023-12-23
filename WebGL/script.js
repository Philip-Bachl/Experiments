const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("webgl2");

//SOLVE AWAIT PROBLEM
let vertShaderText;
let fragShaderText;

let vertexShader;
let fragmentShader;
let shaderProgram;

let posAttrLocation;
let timeUniLocation;
let resUniLocation;

setup();

const positionsStride = 2;
const positions = [
    -1.0, 1.0,
    1.0, 1.0,
    -1.0, -1.0,
    1.0, -1.0
];

const posBuffer = ctx.createBuffer();
ctx.bindBuffer(ctx.ARRAY_BUFFER, posBuffer);

ctx.clearColor(0.8, 0.8, 0.8, 1);

async function setup() {
    vertShaderText = await getShaderText("vert");
    fragShaderText = await getShaderText("frag");

    vertexShader = buildShader(ctx, ctx.VERTEX_SHADER, vertShaderText);
    fragmentShader = buildShader(ctx, ctx.FRAGMENT_SHADER, fragShaderText);
    shaderProgram = buildProgram(ctx, vertexShader, fragmentShader);

    //Attributes-/Uniforms-Init
    timeUniLocation = ctx.getUniformLocation(shaderProgram, "time");
    resUniLocation = ctx.getUniformLocation(shaderProgram, "iResolution");
    
    posAttrLocation =  ctx.getAttribLocation(shaderProgram, "a_position");
    ctx.vertexAttribPointer(posAttrLocation, 2, ctx.FLOAT, false, 0, 0);
    ctx.enableVertexAttribArray(posAttrLocation);
    
    //Init Viewport and set the shaderProgram up for use
    ctx.viewport(0, 0, canvas.width, canvas.height);
    ctx.useProgram(shaderProgram);
    
    requestAnimationFrame(update);
}

function update(now) {

    render(now);

    requestAnimationFrame(update);
}

function render(now) {
    //Clear with Clear color
    ctx.clear(ctx.COLOR_BUFFER_BIT);

    //put data into Attributes/Uniforms
    ctx.uniform1f(timeUniLocation, now / 1000);
    ctx.uniform2f(resUniLocation, canvas.height, canvas.height);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(positions), ctx.STATIC_DRAW);

    //Actual Draw Call
    ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, positions.length / positionsStride);
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