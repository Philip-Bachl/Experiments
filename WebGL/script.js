const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("webgl2");

//SOLVE AWAIT PROBLEM
const vertShaderText = await getShaderText("vert");
const fragShaderText = await getShaderText("frag");

const vertexShader = buildShader(ctx, ctx.VERTEX_SHADER, vertShaderText);
const fragmentShader = buildShader(ctx, ctx.FRAGMENT_SHADER, fragShaderText);
const shaderProgram = buildProgram(ctx, vertexShader, fragmentShader);

const posAttrLocation = ctx.getAttribLocation(shaderProgram, "a_position");
const posBuffer = ctx.createBuffer();

ctx.bindBuffer(ctx.ARRAY_BUFFER, posBuffer);

const positions = [
    0, 0,
    0.2, 0.5,
    0.6, 0
];

ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(positions), ctx.STATIC_DRAW);

requestAnimationFrame(update);

function update(now) {
    ctx.viewport(0, 0, canvas.width, canvas.height);

    ctx.clearColor(0, 0, 0, 0);
    ctx.clear(ctx.COLOR_BUFFER_BIT);

    ctx.useProgram(shaderProgram);
    ctx.enableVertexAttribArray(posAttrLocation);
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