const FPS = 60;


const CAN_W = 256;
const CAN_H = 224;
const PX_RATIO = 0.6;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = CAN_W;
canvas.height = CAN_H;
canvas.style.background = "#adf";

canvas.style.width = CAN_W * PX_RATIO + "px";
canvas.style.height = CAN_H * PX_RATIO + "px";
canvas.style.imageRendering = "pixelated";


const CAM_SIZE_RATIO = 200;
const CAM_F_LEN = 1;


const G = 9.8;


class Bullet {
    constructor(x, y, z, muzzleV, width, length) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.az = 0;
        this.muzzleV = muzzleV;
        this.width = width;
        this.length = length;
    }

    move() {
        this.y += this.muzzleV / FPS;
        this.az += G / FPS;
        this.z -= this.az;
    }

    draw() {
        const dw = CAM_F_LEN * this.width / this.y * CAM_SIZE_RATIO;
        const dx = CAN_W / 2 - dw / 2;
        const dy = CAN_H / 2 + (-this.z * CAM_F_LEN / this.y) * CAM_SIZE_RATIO;
        const dy2 = CAN_H / 2 + (-this.z * CAM_F_LEN / Math.max(this.y - this.length, 0)) * CAM_SIZE_RATIO;

        ctx.fillStyle = "white";
        ctx.fillRect(dx, dy, dw, dy2 - dy);
    }
}

const BULLET = new Bullet(0, 0, -0.5, 100, 0.5, 5);


function mainLoop() {
    ctx.clearRect(0, 0, CAN_W, CAN_H);

    BULLET.move();
    BULLET.draw();
}

setInterval(mainLoop, 1000 / FPS);