import React from 'react';

class App extends React.Component {
    constructor(props){
        super(props);
        //gravity
        this.g = 1.0;
        //lengths of each line
        this.len1 = 150;
        this.len2 = 150;
        //coordinates
        this.x0 = 400;
        this.y0 = 400;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        //mass
        this.m1 = 10;
        this.m2 = 10;
        //acceleration
        this.a1 = Math.PI /2;
        this.a2 = Math.PI /2;
        this.a1_v= 0;
        this.a2_v = 0;
        this.px2 = -1;
        this.py2 = -1;
        //speed
        this.draw = this.draw.bind(this);
    }

    draw(){


        let num1 = -this.g * (2 * this.m1 + this.m2) * Math.sin(this.a1);
        let num2 = -this.m2 * this.g * Math.sin(this.a1 - 2 * this.a2);
        let num3 = -2 * Math.sin(this.a1 - this.a2) * this.m2;
        let num4 = this.a2_v * this.a2_v * this.len2 + this.a1_v * this.a1_v * this.len1 * Math.cos(this.a1 - this.a2);
        let den = this.len1 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2));
        let a1_a = (num1 + num2 + num3 * num4) / den;

        num1 = 2 * Math.sin(this.a1 - this.a2);
        num2 = (this.a1_v * this.a1_v * this.len1 * (this.m1 + this.m2));
        num3 = this.g * (this.m1 + this.m2) * Math.cos(this.a1);
        num4 = this.a2_v * this.a2_v * this.len2 * this.m2 * Math.cos(this.a1 - this.a2);
        den = this.len2 * (2 * this.m1 + this.m2 - this.m2 * Math.cos(2 * this.a1 - 2 * this.a2));
        let a2_a = (num1 * (num2 + num3 + num4)) / den;

        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.x1 = this.len1*Math.sin(this.a1);
        this.y1 = this.len1*Math.cos(this.a1);
        
        this.x2 = this.x1 + this.len2*Math.sin(this.a2);
        this.y2 = this.y1 + this.len2*Math.cos(this.a2);

        this.a1_v += a1_a;
        this.a2_v += a2_a;
        this.a1 += this.a1_v;
        this.a2 += this.a2_v;
        
        this.px2 = this.x2;
        this.px2 = this.y2;

        // console.log(this.x1, this.y1, this.x2, this.y2);
        
        ctx.beginPath();
        ctx.moveTo(this.x0,this.y0);
        ctx.lineTo(this.x0 + this.x1,this.y0 + this.y1);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x0 + this.x1,this.y0 + this.y1, this.m1, 0, Math.PI*2, true);
        ctx.fill();
        ctx.moveTo(this.x0 + this.x1,this.y0 + this.y1);
        ctx.lineTo(this.x0+this.x2,this.y0+this.y2);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x0 + this.x2,this.y0+this.y2 , this.m2, 0, Math.PI*2, true);
        ctx.fill();
        requestAnimationFrame(this.draw);
    }

    componentDidMount() {
        this.draw();
    }

    render(){
        return (
            <div>
                <canvas ref="canvas" width="800" height="800"></canvas>
            </div>
        );
    }
}

export default App;