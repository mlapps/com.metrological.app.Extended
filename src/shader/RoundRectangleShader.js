import {Lightning} from "wpe-lightning-sdk";

export default class RoundedRectangle extends Lightning.shaders.WebGLDefaultShader {
    constructor(context) {
        super(context);
        this._radius = 1;
    }

    set radius(v) {
        if(v < 1) {
            v = 1;
        }
        this._radius = v;
        this.redraw();
    }

    setupUniforms(operation) {
        super.setupUniforms(operation);

        const owner = operation.shaderOwner;
        const renderPrecision = this.ctx.stage.getRenderPrecision();
        this._setUniform('radius',  (this._radius + .5) * renderPrecision, this.gl.uniform1f);
        this._setUniform('resolution', new Float32Array([owner._w * renderPrecision, owner._h * renderPrecision]), this.gl.uniform2fv);
    }
}

RoundedRectangle.fragmentShaderSource = `
    #ifdef GL_ES
    precision lowp float;
    #endif

    #define PI 3.14159265359

    varying vec2 vTextureCoord;
    varying vec4 vColor;

    uniform sampler2D uSampler;
    uniform vec2 resolution;
    uniform float radius;
    
    float boxDist(vec2 p, vec2 size, float radius){
        size -= vec2(radius);
        vec2 d = abs(p) - size;
        return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - radius;
    }
    
    float fillMask(float dist){
        return clamp(-dist, 0.0, 1.0);
    }

    void main() {
        vec4 color = texture2D(uSampler, vTextureCoord) * vColor;

        vec2 halfRes = 0.5 * resolution.xy;

        float b = boxDist(vTextureCoord.xy * resolution - halfRes, halfRes - 0.005, radius);

        gl_FragColor = mix(vec4(0.0), color, fillMask(b));
    }
`;