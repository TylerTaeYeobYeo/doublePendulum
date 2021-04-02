import React from 'react';

class App extends React.Component {
    constructor(props){
        super(props);
        //gravity
        this.g = 1.0;
        //lengths of each line
        this.len1 = 125;
        this.len2 = 125;
        //coordinates
        this.x0 = 400;
        this.y0 = 200;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        //mass
        this.m1 = 20;
        this.m2 = 20;
        //acceleration
        this.a1 = Math.PI /2;
        this.a2 = Math.PI /2;
        this.a1_v= 0;
        this.a2_v = 0;
        this.px = -1;
        this.py = -1;
        this.ctx = null;
        //speed
        this.draw = this.draw.bind(this);
        this.R = 0;
        this.G = 0;
        this.B = 0;
        this.cnt = 0;
    }

    draw(crx){
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

        
        this.x1 = this.len1*Math.sin(this.a1);
        this.y1 = this.len1*Math.cos(this.a1);
        
        this.x2 = this.x1 + this.len2*Math.sin(this.a2);
        this.y2 = this.y1 + this.len2*Math.cos(this.a2);

        this.a1_v += a1_a;
        this.a2_v += a2_a;
        this.a1 += this.a1_v;
        this.a2 += this.a2_v;
            
        this.ctx.lineTo(this.x0+this.x2,this.y0+this.y2);
        this.ctx.stroke();
        if(this.px!=-1){
            let w = Math.abs((this.x0+this.x2) - this.px) + Math.abs((this.y0+this.y2) - this.py);
            this.ctx.lineWidth = w/10 + 1;
        }
        this.cnt++;
        if(this.cnt>1){
            this.ctx.closePath();
            this.ctx.strokeStyle = 'rgb(' + Math.floor(255 - 12.75*this.R) + ', ' + Math.floor(255 - 12.75*this.G) + ', ' + Math.floor(255 - 12.75*this.G) + ')';
            this.R +=1;
            if(this.R>10){
                this.R-=10;
                this.G +=2;
            }
            if(this.G>10){
                this.G-=10;
                this.B+=3;
            }
            if(this.B>10)this.B -=10;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x0+this.x2,this.y0+this.y2);
            this.cnt = 0;
        }
        
        this.px = this.x0+this.x2;
        this.py = this.y0+this.y2;
        requestAnimationFrame(this.draw);
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.fillStyle = 'black';
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 1;
        this.ctx.fillRect(0,0,canvas.width,canvas.height);
        this.ctx.beginPath();
        this.draw();
    }

    render(){
        return (
            <div style={{width: "100%", height: "100%", display: "grid", placeItems: "center"}}>
                <canvas ref="canvas" width="800" height="500"></canvas>
            </div>
        );
    }
}

export default App;