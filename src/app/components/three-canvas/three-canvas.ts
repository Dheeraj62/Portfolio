import { Component, ElementRef, OnInit, OnDestroy, ViewChild, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const THREE: any;

@Component({
  selector: 'app-three-canvas',
  standalone: true,
  template: `
    <div class="three-container" #container (mousemove)="onMouseMove($event)" (touchmove)="onTouchMove($event)">
      <canvas #canvas class="webgl-canvas"></canvas>
      <div class="glow-overlay"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: auto;
      overflow: hidden;
      z-index: 0;
    }
    .three-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .webgl-canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }
    .glow-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 75% 35%, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.08) 40%, transparent 70%);
      pointer-events: none;
    }
  `]
})
export class ThreeCanvasComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  private scene: any;
  private camera: any;
  private renderer: any;
  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  private mainMesh: any;
  private innerMesh: any;
  private ringMesh: any;
  private ringMesh2: any;
  private particleSystem: any;

  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      this.initScene();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initScene(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = this.containerRef.nativeElement;

    if (typeof THREE === 'undefined') {
      // Fallback particle canvas if Three.js CDN has delay
      this.initFallback2DCanvas(canvas, container);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 18;

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 4, 50);
    pointLight1.position.set(10, 10, 10);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 4, 50);
    pointLight2.position.set(-10, -10, 10);
    this.scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x10b981, 3, 50);
    pointLight3.position.set(0, 15, -5);
    this.scene.add(pointLight3);

    // 5. 3D Geometric Objects (Creative Cyber Polyhedron Core)
    const geom = new THREE.IcosahedronGeometry(4.5, 1);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x4338ca,
      emissiveIntensity: 0.35,
    });
    this.mainMesh = new THREE.Mesh(geom, wireMat);
    this.mainMesh.position.set(4, 0, 0); // Position slightly to the right for hero layout
    this.scene.add(this.mainMesh);

    // Inner glowing sphere
    const innerGeom = new THREE.IcosahedronGeometry(2.6, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
    });
    this.innerMesh = new THREE.Mesh(innerGeom, innerMat);
    this.innerMesh.position.copy(this.mainMesh.position);
    this.scene.add(this.innerMesh);

    // Orbital Ring 1
    const ringGeom = new THREE.TorusGeometry(6.2, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });
    this.ringMesh = new THREE.Mesh(ringGeom, ringMat);
    this.ringMesh.position.copy(this.mainMesh.position);
    this.ringMesh.rotation.x = Math.PI / 3;
    this.scene.add(this.ringMesh);

    // Orbital Ring 2
    const ringGeom2 = new THREE.TorusGeometry(7.0, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.5,
    });
    this.ringMesh2 = new THREE.Mesh(ringGeom2, ringMat2);
    this.ringMesh2.position.copy(this.mainMesh.position);
    this.ringMesh2.rotation.y = Math.PI / 4;
    this.ringMesh2.rotation.x = -Math.PI / 5;
    this.scene.add(this.ringMesh2);

    // 6. Starfield / Particle Cloud
    const particleCount = 700;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x818cf8);
    const color2 = new THREE.Color(0x38bdf8);
    const color3 = new THREE.Color(0x34d399);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 45;
      positions[i3 + 1] = (Math.random() - 0.5) * 35;
      positions[i3 + 2] = (Math.random() - 0.5) * 30;

      const choice = Math.random();
      const c = choice < 0.4 ? color1 : choice < 0.8 ? color2 : color3;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    this.particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    this.scene.add(this.particleSystem);

    // 7. Responsive handling
    this.resizeObserver = new ResizeObserver(() => {
      this.onResize();
    });
    this.resizeObserver.observe(container);

    // 8. Animation Loop
    this.animate();
  }

  private onResize(): void {
    if (!this.renderer || !this.camera || !this.containerRef) return;
    const container = this.containerRef.nativeElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // Adjust position on mobile vs desktop
    if (width < 860) {
      if (this.mainMesh) this.mainMesh.position.set(0, 2.5, 0);
      if (this.innerMesh) this.innerMesh.position.set(0, 2.5, 0);
      if (this.ringMesh) this.ringMesh.position.set(0, 2.5, 0);
      if (this.ringMesh2) this.ringMesh2.position.set(0, 2.5, 0);
      this.camera.position.z = 24;
    } else {
      if (this.mainMesh) this.mainMesh.position.set(4.5, 0, 0);
      if (this.innerMesh) this.innerMesh.position.set(4.5, 0, 0);
      if (this.ringMesh) this.ringMesh.position.set(4.5, 0, 0);
      if (this.ringMesh2) this.ringMesh2.position.set(4.5, 0, 0);
      this.camera.position.z = 18;
    }

    this.renderer.setSize(width, height);
  }

  onMouseMove(event: MouseEvent): void {
    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

    this.targetX = x * 1.5;
    this.targetY = y * 1.5;
  }

  onTouchMove(event: TouchEvent): void {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const rect = this.containerRef.nativeElement.getBoundingClientRect();
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);

      this.targetX = x * 1.2;
      this.targetY = y * 1.2;
    }
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Smooth mouse lerp
    this.mouseX += (this.targetX - this.mouseX) * 0.05;
    this.mouseY += (this.targetY - this.mouseY) * 0.05;

    // Rotate geometric mesh
    if (this.mainMesh) {
      this.mainMesh.rotation.x += 0.003;
      this.mainMesh.rotation.y += 0.005;
      this.mainMesh.rotation.z = this.mouseY * 0.3;
    }

    if (this.innerMesh) {
      this.innerMesh.rotation.x -= 0.004;
      this.innerMesh.rotation.y -= 0.006;
    }

    if (this.ringMesh) {
      this.ringMesh.rotation.z += 0.004;
      this.ringMesh.rotation.x = Math.PI / 3 + this.mouseY * 0.2;
      this.ringMesh.rotation.y = this.mouseX * 0.2;
    }

    if (this.ringMesh2) {
      this.ringMesh2.rotation.z -= 0.003;
      this.ringMesh2.rotation.y = Math.PI / 4 + this.mouseX * 0.25;
    }

    if (this.particleSystem) {
      this.particleSystem.rotation.y += 0.0008 + this.mouseX * 0.001;
      this.particleSystem.rotation.x = this.mouseY * 0.05;
    }

    if (this.camera) {
      this.camera.position.x += (this.mouseX * 2 - this.camera.position.x) * 0.05;
      this.camera.position.y += (this.mouseY * 2 - this.camera.position.y) * 0.05;
      this.camera.lookAt(0, 0, 0);
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  };

  private initFallback2DCanvas(canvas: HTMLCanvasElement, container: HTMLDivElement): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth || window.innerWidth);
    let height = (canvas.height = container.clientHeight || 500);

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];
    const colors = ['#818cf8', '#38bdf8', '#34d399', '#c084fc'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${1 - dist / 110})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    draw();
  }
}
