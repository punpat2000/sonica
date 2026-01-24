import { Component, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';

// Ink splash blob configuration
interface InkSplash {
  baseCenter: THREE.Vector2; // Starting position (UV 0-1)
  baseRadius: number; // Starting radius
  spreadSpeed: number; // How fast it spreads
  viscosity: number; // How thick/sticky (affects spread slowdown)
  wobbleStrength: number; // How much edge wobble
  color: THREE.Vector3; // RGB color (vibrant)
  birthTime: number; // When it was created (seconds)
  noiseOffset: THREE.Vector2; // Unique noise seed
}

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.OrthographicCamera;
  private inkPlane!: THREE.Mesh;
  private frameId!: number;
  private startTime!: number;
  private lastSplashTime!: number;
  private splashIntervalId?: number;
  
  // Ink splash data
  private splashes: InkSplash[] = [];
  
  // Animation parameters - easily tweakable
  private readonly MAX_SPLASHES = 20; // Maximum number of splashes to keep (WebGL array limit)
  private readonly SPLASH_INTERVAL = 3000; // Milliseconds between new splashes (3000 = 3 seconds)
  private readonly MIN_RADIUS = 0.05; // Minimum splash radius
  private readonly MAX_RADIUS = 0.25; // Maximum splash radius
  private readonly MIN_VISCOSITY = 0.3; // Minimum viscosity (higher = thicker)
  private readonly MAX_VISCOSITY = 1.5; // Maximum viscosity
  private readonly MIN_WOBBLE = 0.05; // Minimum wobble strength
  private readonly MAX_WOBBLE = 0.2; // Maximum wobble strength
  private readonly MIN_SPREAD_SPEED = 0.02; // Minimum spread speed
  private readonly MAX_SPREAD_SPEED = 0.08; // Maximum spread speed
  private readonly GRAVITY_STRENGTH = 0.15; // How strong gravity pulls downward
  private readonly REFLECTION_INTENSITY = 0.4; // How strong the glossy reflection is
  private readonly NOISE_SCALE = 0.15; // How much noise distorts edges

  private host = inject(ElementRef<HTMLElement>);
  private document = inject(DOCUMENT);

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private get window() {
    return this.document.defaultView;
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.initThree();
    this.startSplashSpawning();
    this.loop();
    this.window!.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.window) {
      if (this.frameId) {
        this.window.cancelAnimationFrame(this.frameId);
      }
      if (this.splashIntervalId) {
        this.window.clearInterval(this.splashIntervalId);
      }
      this.window.removeEventListener('resize', this.onResize);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThree(): void {
    const el = this.host.nativeElement;
    const width = el.clientWidth;
    const height = el.clientHeight || this.window!.innerHeight;

    // Scene - no background needed, shader handles it
    this.scene = new THREE.Scene();

    // Orthographic camera for 2D full-screen effect
    // This creates a flat, full-screen view with no perspective
    const aspect = width / height;
    this.camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0, 1);
    this.camera.position.z = 0;

    // Renderer - full screen with antialiasing
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(this.window!.devicePixelRatio, 2));
    
    // Make canvas fill the entire element
    const canvas = this.renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';

    // Attach canvas to host element
    el.appendChild(canvas);

    // Create the full-screen ink quad with custom shader
    const initialAspect = width / height;
    this.createInkPlane(initialAspect);

    // Store start time for animation
    this.startTime = Date.now();
    this.lastSplashTime = this.startTime;
    
    // Spawn initial splash
    this.spawnSplash();
  }

  /**
   * Start the automatic splash spawning system
   * Creates a new splash every SPLASH_INTERVAL milliseconds
   */
  private startSplashSpawning(): void {
    this.splashIntervalId = this.window!.setInterval(() => {
      this.spawnSplash();
    }, this.SPLASH_INTERVAL);
  }

  /**
   * Spawn a new ink splash with random properties
   * Adjust the random ranges to change splash characteristics
   */
  private spawnSplash(): void {
    // Remove old splashes if we've reached the limit
    if (this.splashes.length >= this.MAX_SPLASHES) {
      // Remove the oldest splash
      this.splashes.shift();
    }

    // Generate random vibrant color
    const colorOptions = [
      new THREE.Vector3(1.0, 0.0, 0.3), // Bright red
      new THREE.Vector3(0.0, 0.7, 1.0), // Cyan
      new THREE.Vector3(1.0, 0.0, 0.8), // Magenta
      new THREE.Vector3(1.0, 0.85, 0.0), // Yellow
      new THREE.Vector3(0.2, 0.8, 0.2), // Green
      new THREE.Vector3(0.5, 0.2, 1.0), // Purple
      new THREE.Vector3(1.0, 0.4, 0.0), // Orange
      new THREE.Vector3(0.0, 0.5, 1.0), // Blue
    ];
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];

    const splash: InkSplash = {
      baseCenter: new THREE.Vector2(
        Math.random() * 0.8 + 0.1, // Random X (0.1 to 0.9)
        Math.random() * 0.3 + 0.7  // Random Y (0.7 to 1.0) - start near top
      ),
      baseRadius: this.MIN_RADIUS + Math.random() * (this.MAX_RADIUS - this.MIN_RADIUS),
      spreadSpeed: this.MIN_SPREAD_SPEED + Math.random() * (this.MAX_SPREAD_SPEED - this.MIN_SPREAD_SPEED),
      viscosity: this.MIN_VISCOSITY + Math.random() * (this.MAX_VISCOSITY - this.MIN_VISCOSITY),
      wobbleStrength: this.MIN_WOBBLE + Math.random() * (this.MAX_WOBBLE - this.MIN_WOBBLE),
      color: randomColor,
      birthTime: (Date.now() - this.startTime) / 1000.0, // Age in seconds
      noiseOffset: new THREE.Vector2(Math.random() * 1000.0, Math.random() * 1000.0)
    };

    this.splashes.push(splash);
  }

  /**
   * Create a full-screen quad with custom shader for thick ink splash rendering
   * Implements: gravity, viscosity, specular reflections, metaball blending, organic edges
   */
  private createInkPlane(aspect: number): void {
    // Full-screen quad in NDC space (-1 to 1)
    const geometry = new THREE.PlaneGeometry(2, 2, 1, 1);

    // Vertex shader - simple pass-through to NDC
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Fragment shader for thick, opaque ink puddles with SDF-based rendering
    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uSplashBaseCenters[${this.MAX_SPLASHES}];
      uniform float uSplashBaseRadii[${this.MAX_SPLASHES}];
      uniform float uSplashSpreadSpeeds[${this.MAX_SPLASHES}];
      uniform float uSplashViscosities[${this.MAX_SPLASHES}];
      uniform float uSplashWobbleStrengths[${this.MAX_SPLASHES}];
      uniform vec3 uSplashColors[${this.MAX_SPLASHES}];
      uniform float uSplashBirthTimes[${this.MAX_SPLASHES}];
      uniform vec2 uSplashNoiseOffsets[${this.MAX_SPLASHES}];
      uniform int uSplashCount;
      uniform float uAspect;
      uniform float uGravityStrength;
      uniform float uReflectionIntensity;
      uniform float uNoiseScale;
      
      varying vec2 vUv;
      
      // Simple 2D noise function
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      // Smooth noise by interpolating between grid points
      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      // Multi-octave noise for organic patterns
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 3; i++) {
          value += amplitude * smoothNoise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      // Calculate signed distance to a splash blob
      // Returns negative inside blob, positive outside
      float sdfSplash(vec2 p, int index, float time) {
        // Calculate age
        float age = time - uSplashBirthTimes[index];
        if (age < 0.0) return 1000.0; // Not born yet
        
        // Apply gravity: splash drifts downward
        vec2 gravityDir = vec2(0.0, -1.0);
        vec2 gravityOffset = gravityDir * uGravityStrength * age;
        
        // Add subtle noise-based horizontal drift
        vec2 noiseDrift = vec2(
          fbm(uSplashNoiseOffsets[index] + vec2(age * 0.1, 0.0)) - 0.5,
          0.0
        ) * 0.1;
        
        // Current splash center (with gravity and drift)
        vec2 splashCenter = uSplashBaseCenters[index] + gravityOffset + noiseDrift;
        
        // Convert to screen space (-1 to 1)
        vec2 splashScreenPos = (splashCenter - 0.5) * 2.0;
        splashScreenPos.x *= uAspect;
        
        // Calculate current radius with viscosity slowdown
        float radiusGrowth = uSplashSpreadSpeeds[index] * (1.0 - exp(-age * uSplashViscosities[index]));
        float currentRadius = uSplashBaseRadii[index] + radiusGrowth;
        
        // Calculate base distance
        vec2 toCenter = p - splashScreenPos;
        float baseDist = length(toCenter);
        
        // Add subtle noise-based edge wobble (only near edge)
        float edgeFactor = smoothstep(currentRadius * 0.8, currentRadius * 1.2, baseDist);
        if (edgeFactor > 0.0) {
          // Use position-based noise instead of angle-based to avoid radial artifacts
          vec2 noiseCoord = toCenter * 8.0 + vec2(age * 0.3, age * 0.2) + uSplashNoiseOffsets[index];
          float wobble = fbm(noiseCoord) - 0.5;
          baseDist += wobble * uSplashWobbleStrengths[index] * currentRadius * edgeFactor * 0.3;
        }
        
        // Signed distance: negative inside, positive outside
        return baseDist - currentRadius;
      }
      
      // Smooth minimum function for metaball blending
      float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
      }
      
      // Find the minimum SDF and blend colors from all nearby splashes
      void findClosestSplash(vec2 p, float time, out float minSdf, out vec3 splashColor) {
        minSdf = 1000.0;
        splashColor = vec3(0.0);
        float totalWeight = 0.0;
        float k = 0.12; // Smoothing factor for metaball blending
        
        int count = min(uSplashCount, ${this.MAX_SPLASHES});
        for (int i = 0; i < ${this.MAX_SPLASHES}; i++) {
          if (i >= count) break;
          
          float sdf = sdfSplash(p, i, time);
          
          // Use smooth minimum for metaball blending
          minSdf = smin(minSdf, sdf, k);
          
          // Blend colors from all splashes within influence range
          if (sdf < 0.3) { // Only blend if close to splash
            float weight = 1.0 / (abs(sdf) + 0.01);
            splashColor += uSplashColors[i] * weight;
            totalWeight += weight;
          }
        }
        
        // Normalize color
        if (totalWeight > 0.0) {
          splashColor /= totalWeight;
        }
      }
      
      void main() {
        // Convert UV to screen space (-1 to 1)
        vec2 screenPos = (vUv - 0.5) * 2.0;
        screenPos.x *= uAspect;
        
        // Background color (neutral off-white)
        vec3 bgColor = vec3(0.96, 0.95, 0.93);
        vec3 finalColor = bgColor;
        
        // Find closest splash using SDF
        float minSdf;
        vec3 splashColor;
        findClosestSplash(screenPos, uTime, minSdf, splashColor);
        
        // Create ink mask: solid opaque center + short soft edge
        float edgeWidth = 0.02; // Small edge fade
        float mask = 1.0 - smoothstep(0.0, edgeWidth, minSdf);
        mask = clamp(mask, 0.0, 1.0);
        
        // If no ink, return background
        if (mask < 0.001) {
          gl_FragColor = vec4(bgColor, 1.0);
          return;
        }
        
        // Compute SDF gradient for normal calculation (using finite differences)
        // Need to compute gradient of the combined SDF field
        float eps = 0.002;
        float minSdfX, minSdfY, minSdfCenter;
        vec3 dummyColor;
        findClosestSplash(screenPos + vec2(eps, 0.0), uTime, minSdfX, dummyColor);
        findClosestSplash(screenPos + vec2(0.0, eps), uTime, minSdfY, dummyColor);
        minSdfCenter = minSdf;
        
        // Approximate gradient
        float dX = (minSdfX - minSdfCenter) / eps;
        float dY = (minSdfY - minSdfCenter) / eps;
        
        // Surface normal from SDF gradient
        vec3 normal = normalize(vec3(dX, dY, 1.0));
        
        // Fixed light direction (no radial effects)
        vec3 lightDir = normalize(vec3(-0.3, 0.7, 1.0));
        
        // View direction
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        
        // Diffuse lighting
        float diffuse = clamp(dot(normal, lightDir), 0.0, 1.0);
        
        // Specular reflection (Blinn-Phong)
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normal, halfDir), 0.0), 50.0);
        
        // Base color with subtle shading (flat per blob, no radial gradient)
        vec3 base = splashColor * (0.8 + 0.2 * diffuse);
        
        // Add glossy highlight
        vec3 highlightColor = vec3(1.0); // White specular
        vec3 finalInk = base + highlightColor * spec * 0.5;
        
        // Apply mask so ink only appears where it exists
        finalInk *= mask;
        
        // Mix with background
        finalColor = mix(bgColor, finalInk, mask);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Create shader material with all splash uniforms
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSplashBaseCenters: { value: new Array(this.MAX_SPLASHES).fill(null).map(() => new THREE.Vector2()) },
        uSplashBaseRadii: { value: new Array(this.MAX_SPLASHES).fill(0) },
        uSplashSpreadSpeeds: { value: new Array(this.MAX_SPLASHES).fill(0) },
        uSplashViscosities: { value: new Array(this.MAX_SPLASHES).fill(0) },
        uSplashWobbleStrengths: { value: new Array(this.MAX_SPLASHES).fill(0) },
        uSplashColors: { value: new Array(this.MAX_SPLASHES).fill(null).map(() => new THREE.Vector3()) },
        uSplashBirthTimes: { value: new Array(this.MAX_SPLASHES).fill(0) },
        uSplashNoiseOffsets: { value: new Array(this.MAX_SPLASHES).fill(null).map(() => new THREE.Vector2()) },
        uSplashCount: { value: 0 },
        uAspect: { value: aspect },
        uGravityStrength: { value: this.GRAVITY_STRENGTH },
        uReflectionIntensity: { value: this.REFLECTION_INTENSITY },
        uNoiseScale: { value: this.NOISE_SCALE }
      }
    });

    // Create full-screen mesh
    this.inkPlane = new THREE.Mesh(geometry, material);
    this.scene.add(this.inkPlane);
  }

  private loop = () => {
    this.frameId = this.window!.requestAnimationFrame(this.loop);

    // Calculate elapsed time for animation
    const elapsed = (Date.now() - this.startTime) / 1000.0; // Convert to seconds

    // Update splashes (cleanup old ones)
    this.updateSplashes(elapsed);

    // Update shader uniforms with current splash data
    this.updateShaderUniforms();

    this.renderer.render(this.scene, this.camera);
  };

  /**
   * Remove old splashes that are too old (optional cleanup)
   * Most animation is handled in shader, but we clean up old splashes
   */
  private updateSplashes(elapsed: number): void {
    // Remove splashes older than 30 seconds (optional - keeps array manageable)
    const maxAge = 30.0;
    this.splashes = this.splashes.filter(splash => {
      const age = elapsed - splash.birthTime;
      return age < maxAge;
    });
  }

  /**
   * Update shader uniforms with current splash data
   */
  private updateShaderUniforms(): void {
    const material = this.inkPlane.material as THREE.ShaderMaterial;
    const uniforms = material.uniforms;

    uniforms['uTime'].value = (Date.now() - this.startTime) / 1000.0;

    // Update splash data arrays
    const baseCenters = uniforms['uSplashBaseCenters'].value as THREE.Vector2[];
    const baseRadii = uniforms['uSplashBaseRadii'].value as number[];
    const spreadSpeeds = uniforms['uSplashSpreadSpeeds'].value as number[];
    const viscosities = uniforms['uSplashViscosities'].value as number[];
    const wobbleStrengths = uniforms['uSplashWobbleStrengths'].value as number[];
    const colors = uniforms['uSplashColors'].value as THREE.Vector3[];
    const birthTimes = uniforms['uSplashBirthTimes'].value as number[];
    const noiseOffsets = uniforms['uSplashNoiseOffsets'].value as THREE.Vector2[];

    for (let i = 0; i < this.splashes.length && i < this.MAX_SPLASHES; i++) {
      const splash = this.splashes[i];
      baseCenters[i].set(splash.baseCenter.x, splash.baseCenter.y);
      baseRadii[i] = splash.baseRadius;
      spreadSpeeds[i] = splash.spreadSpeed;
      viscosities[i] = splash.viscosity;
      wobbleStrengths[i] = splash.wobbleStrength;
      colors[i].set(splash.color.x, splash.color.y, splash.color.z);
      birthTimes[i] = splash.birthTime;
      noiseOffsets[i].set(splash.noiseOffset.x, splash.noiseOffset.y);
    }

    uniforms['uSplashCount'].value = this.splashes.length;
  }

  private onResize = () => {
    if (!this.renderer || !this.camera) return;

    const el = this.host.nativeElement;
    const width = el.clientWidth;
    const height = el.clientHeight || this.window!.innerHeight;

    // Update orthographic camera for new aspect ratio
    const aspect = width / height;
    this.camera.left = -aspect;
    this.camera.right = aspect;
    this.camera.updateProjectionMatrix();

    // Update aspect ratio in shader
    if (this.inkPlane) {
      const material = this.inkPlane.material as THREE.ShaderMaterial;
      material.uniforms['uAspect'].value = aspect;
    }

    // Update renderer size
    this.renderer.setSize(width, height);
  };
}
