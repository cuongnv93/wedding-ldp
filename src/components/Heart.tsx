"use client";

import { useEffect } from "react";

export default function Heart() {
  useEffect(() => {
    const settings = {
      particles: {
        length: 500, // maximum amount of particles
        duration: 2, // particle duration in sec
        velocity: 100, // particle velocity in pixels/sec
        effect: -0.75, // play with this for a nice effect
        size: 30, // particle size in pixels
      },
    };

    /*
     * RequestAnimationFrame polyfill by Erik Möller
     */
    (function () {
      let lastTime = 0;
      const vendors = ["ms", "moz", "webkit", "o"];
      for (
        let x = 0;
        x < vendors.length && !window.requestAnimationFrame;
        ++x
      ) {
        window.requestAnimationFrame =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any)[`${vendors[x]}RequestAnimationFrame`];
        window.cancelAnimationFrame =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any)[`${vendors[x]}CancelAnimationFrame`] ||
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any)[`${vendors[x]}CancelRequestAnimationFrame`];
      }

      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
          const currTime = new Date().getTime();
          const timeToCall = Math.max(0, 16 - (currTime - lastTime));
          const id = window.setTimeout(
            () => callback(currTime + timeToCall),
            timeToCall
          );
          lastTime = currTime + timeToCall;
          return id;
        };
      }

      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
          clearTimeout(id);
        };
      }
    })();

    /*
     * Point class
     */
    class Point {
      constructor(public x = 0, public y = 0) {}

      clone() {
        return new Point(this.x, this.y);
      }

      length(length?: number) {
        if (length === undefined) {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
      }

      normalize() {
        const length = this.length();
        if (typeof length === "number" && length > 0) {
          this.x /= length;
          this.y /= length;
        }
        return this;
      }
    }

    /*
     * Particle class
     */
    class Particle {
      position = new Point();
      velocity = new Point();
      acceleration = new Point();
      age = 0;

      initialize(x: number, y: number, dx: number, dy: number) {
        this.position.x = x;
        this.position.y = y;
        this.velocity.x = dx;
        this.velocity.y = dy;
        this.acceleration.x = dx * settings.particles.effect;
        this.acceleration.y = dy * settings.particles.effect;
        this.age = 0;
      }

      update(deltaTime: number) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.age += deltaTime;
      }

      draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
        const ease = (t: number) => --t * t * t + 1;
        const size = image.width * ease(this.age / settings.particles.duration);
        context.globalAlpha = 1 - this.age / settings.particles.duration;
        context.drawImage(
          image,
          this.position.x - size / 2,
          this.position.y - size / 2,
          size,
          size
        );
      }
    }

    /*
     * ParticlePool class
     */
    class ParticlePool {
      particles: Particle[] = [];
      firstActive = 0;
      firstFree = 0;
      duration = settings.particles.duration;

      constructor(length: number) {
        for (let i = 0; i < length; i++) {
          this.particles.push(new Particle());
        }
      }

      add(x: number, y: number, dx: number, dy: number) {
        this.particles[this.firstFree].initialize(x, y, dx, dy);

        this.firstFree++;
        if (this.firstFree === this.particles.length) this.firstFree = 0;
        if (this.firstActive === this.firstFree) this.firstActive++;
        if (this.firstActive === this.particles.length) this.firstActive = 0;
      }

      update(deltaTime: number) {
        if (this.firstActive < this.firstFree) {
          for (let i = this.firstActive; i < this.firstFree; i++) {
            this.particles[i].update(deltaTime);
          }
        } else {
          for (let i = this.firstActive; i < this.particles.length; i++) {
            this.particles[i].update(deltaTime);
          }
          for (let i = 0; i < this.firstFree; i++) {
            this.particles[i].update(deltaTime);
          }
        }

        while (
          this.particles[this.firstActive].age >= this.duration &&
          this.firstActive !== this.firstFree
        ) {
          this.firstActive++;
          if (this.firstActive === this.particles.length) this.firstActive = 0;
        }
      }

      draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
        if (this.firstActive < this.firstFree) {
          for (let i = this.firstActive; i < this.firstFree; i++) {
            this.particles[i].draw(context, image);
          }
        } else {
          for (let i = this.firstActive; i < this.particles.length; i++) {
            this.particles[i].draw(context, image);
          }
          for (let i = 0; i < this.firstFree; i++) {
            this.particles[i].draw(context, image);
          }
        }
      }
    }

    /*
     * Putting it all together
     */
    (function (canvas: HTMLCanvasElement | null) {
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      const particles = new ParticlePool(settings.particles.length);
      const particleRate =
        settings.particles.length / settings.particles.duration;
      let time: number;

      const pointOnHeart = (t: number) =>
        new Point(
          160 * Math.pow(Math.sin(t), 3),
          130 * Math.cos(t) -
            50 * Math.cos(2 * t) -
            20 * Math.cos(3 * t) -
            10 * Math.cos(4 * t) +
            25
        );

      const image = (() => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d")!;
        canvas.width = settings.particles.size;
        canvas.height = settings.particles.size;

        const to = (t: number) => {
          const point = pointOnHeart(t);
          point.x =
            settings.particles.size / 2 +
            (point.x * settings.particles.size) / 350;
          point.y =
            settings.particles.size / 2 -
            (point.y * settings.particles.size) / 350;
          return point;
        };

        context.beginPath();
        let t = -Math.PI;
        let point = to(t);
        context.moveTo(point.x, point.y);
        while (t < Math.PI) {
          t += 0.01;
          point = to(t);
          context.lineTo(point.x, point.y);
        }
        context.closePath();
        context.fillStyle = "#ea80b0";
        context.fill();

        const img = new Image();
        img.src = canvas.toDataURL();
        return img;
      })();

      const render = () => {
        requestAnimationFrame(render);

        const newTime = new Date().getTime() / 1000;
        const deltaTime = newTime - (time || newTime);
        time = newTime;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const amount = particleRate * deltaTime;
        for (let i = 0; i < amount; i++) {
          const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
          const dir = pos.clone().length(settings.particles.velocity) as Point;
          particles.add(
            canvas.width / 2 + pos.x,
            canvas.height / 2 - pos.y,
            dir.x,
            -dir.y
          );
        }

        particles.update(deltaTime);
        particles.draw(context, image);
      };

      const onResize = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      };

      window.addEventListener("resize", onResize);

      setTimeout(() => {
        onResize();
        render();
      }, 10);
    })(document.getElementById("pinkboard") as HTMLCanvasElement);
  }, []);

  return (
    <canvas id="pinkboard" className="absolute inset-0 w-full h-full"></canvas>
  );
}
