class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('resize', () => this.init());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        this.init();
        this.animate();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        this.connectParticles();
        requestAnimationFrame(() => this.animate());
    }

    connectParticles() {
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a; b < this.particles.length; b++) {
                let dx = this.particles[a].x - this.particles[b].x;
                let dy = this.particles[a].y - this.particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    let opacity = 1 - (distance / 150);
                    this.ctx.strokeStyle = `rgba(0, 242, 255, ${opacity * 0.2})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                    this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    constructor(parent) {
        this.parent = parent;
        this.x = Math.random() * parent.canvas.width;
        this.y = Math.random() * parent.canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = '#00f2ff';
    }

    draw() {
        this.parent.ctx.fillStyle = this.color;
        this.parent.ctx.beginPath();
        this.parent.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.parent.ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.parent.canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > this.parent.canvas.height || this.y < 0) this.speedY *= -1;

        // Interaction with mouse
        let dx = this.parent.mouse.x - this.x;
        let dy = this.parent.mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.parent.mouse.radius) {
            if (this.parent.mouse.x < this.x && this.x < this.parent.canvas.width - this.size * 10) this.x += 2;
            if (this.parent.mouse.x > this.x && this.x > this.size * 10) this.x -= 2;
            if (this.parent.mouse.y < this.y && this.y < this.parent.canvas.height - this.size * 10) this.y += 2;
            if (this.parent.mouse.y > this.y && this.y > this.size * 10) this.y -= 2;
        }
    }
}

// Start particles when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground('bg-canvas');
});
