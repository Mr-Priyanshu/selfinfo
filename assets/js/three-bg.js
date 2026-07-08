/* -------------------------------------------------------------
 * Priyanshu Garg Developer Portfolio - Three.js Engine v2.0
 * ------------------------------------------------------------- */

export const ThreeEngine = {
  scene: null,
  camera: null,
  renderer: null,
  nodes: [],
  connections: [],
  packets: [],
  mouse: new THREE.Vector2(),
  targetMouse: new THREE.Vector2(),
  raycaster: new THREE.Raycaster(),
  animationFrameId: null,
  container: null,
  isPaused: false,
  hoveredNode: null,

  init(canvasElement) {
    if (!canvasElement) return;
    this.container = canvasElement;

    // 1. Setup Scene & Renderer
    this.scene = new THREE.Scene();
    
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
      alpha: true, // Transparent bg to show custom body background
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Setup Camera (Centered Perspective)
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 8);

    // 3. Setup Lights
    const ambientLight = new THREE.AmbientLight(0x0c101f, 1.5);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f0ff, 2.0);
    keyLight.position.set(5, 5, 5);
    this.scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x7c3aed, 3.0, 15);
    fillLight.position.set(-5, -3, 2);
    this.scene.add(fillLight);

    // 4. Create API Synaptic Node Network
    this.createNetwork();

    // 5. Setup Observers & Listeners
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));

    // Setup Performance Scroll Observer
    this.setupScrollObserver();

    // Start Loop
    this.isPaused = false;
    this.animate();
  },

  createNetwork() {
    // Definitive Node Positions [X, Y, Z, Label/Tech]
    const nodeData = [
      { pos: [0, 1.8, 0], tech: "Database Hub (SQL/NoSQL)" },
      { pos: [-1.8, 0.6, 0.5], tech: "MERN Framework" },
      { pos: [-2.8, -1.0, 1.0], tech: "Meta Lead API" },
      { pos: [-1.2, -1.8, -0.5], tech: "Google Ads Integration" },
      { pos: [1.2, -1.8, 0.5], tech: "LinkedIn Ad Campaigns" },
      { pos: [2.8, -1.0, 1.0], tech: "WhatsApp Automated Messaging" },
      { pos: [1.8, 0.6, -0.5], tech: "n8n Workflow Automation" },
      { pos: [0, -0.6, -1.5], tech: "WordPress & Shopify APIs" }
    ];

    const nodeGeometry = new THREE.IcosahedronGeometry(0.24, 0); // Low-poly look
    const nodeWireframeGeom = new THREE.IcosahedronGeometry(0.26, 0);

    nodeData.forEach((data, index) => {
      const group = new THREE.Group();
      group.position.set(data.pos[0], data.pos[1], data.pos[2]);

      // Core solid material
      const material = new THREE.MeshPhongMaterial({
        color: 0x7c3aed, // Hyper Purple default
        emissive: 0x2e1065,
        shininess: 30,
        flatShading: true
      });
      const mesh = new THREE.Mesh(nodeGeometry, material);
      group.add(mesh);

      // Outer glowing wireframe
      const wireframeMat = new THREE.MeshBasicMaterial({
        color: 0x9333ea,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const wireframeMesh = new THREE.Mesh(nodeWireframeGeom, wireframeMat);
      group.add(wireframeMesh);

      // Label properties for selection
      group.userData = { 
        index: index, 
        tech: data.tech, 
        originalColor: 0x7c3aed,
        wireColor: 0x9333ea
      };

      this.scene.add(group);
      this.nodes.push(group);
    });

    // Defining Connected Pipes
    const edgeConnections = [
      [0, 1], [0, 6], [0, 7],
      [1, 2], [1, 3],
      [6, 4], [6, 5],
      [7, 3], [7, 5]
    ];

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.15
    });

    edgeConnections.forEach(([startIdx, endIdx]) => {
      const startNode = this.nodes[startIdx];
      const endNode = this.nodes[endIdx];

      const points = [
        startNode.position.clone(),
        endNode.position.clone()
      ];

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeometry, lineMaterial);
      this.scene.add(line);
      this.connections.push({ line, startIdx, endIdx });

      // Spawn Data Packets traveling along connection pipelines
      this.spawnPacket(startIdx, endIdx);
      this.spawnPacket(endIdx, startIdx); // Bidirectional flows
    });
  },

  spawnPacket(startIdx, endIdx) {
    const packetGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const packetMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, // Cyber Cyan glowing packet
      transparent: true,
      opacity: 0.8
    });

    const mesh = new THREE.Mesh(packetGeometry, packetMaterial);
    this.scene.add(mesh);

    this.packets.push({
      mesh: mesh,
      startIdx: startIdx,
      endIdx: endIdx,
      progress: Math.random(), // Stagger starts
      speed: 0.003 + Math.random() * 0.004
    });
  },

  onMouseMove(event) {
    // Translate client mouse coordinates to Normalized Device Coordinates (-1 to +1)
    this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  },

  resize() {
    if (!this.renderer || !this.camera) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  },

  setupScrollObserver() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    // Use IntersectionObserver to pause Three.js renderer when hero is scrolled out of view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isPaused = !entry.isIntersecting;
        if (!this.isPaused) {
          this.animate();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(heroSection);
  },

  animate() {
    if (this.isPaused) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      return;
    }

    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));

    // 1. Camera inertia tracking
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    this.camera.position.x = this.mouse.x * 1.5;
    this.camera.position.y = this.mouse.y * 1.5;
    this.camera.lookAt(0, 0, 0);

    // 2. Animate Mesh Nodes (Idle Floating Rotations)
    const time = Date.now() * 0.001;
    this.nodes.forEach((node) => {
      node.rotation.y = time * 0.2 + node.userData.index * 0.1;
      node.rotation.x = time * 0.1 + node.userData.index * 0.05;
      
      // Floating translation drift
      node.position.y += Math.sin(time + node.userData.index) * 0.001;
    });

    // 3. Animate Data Packets along connection curves
    this.packets.forEach((packet) => {
      packet.progress += packet.speed;
      if (packet.progress >= 1.0) {
        packet.progress = 0;
      }

      const startPos = this.nodes[packet.startIdx].position;
      const endPos = this.nodes[packet.endIdx].position;

      // Linear interpolation between nodes
      packet.mesh.position.lerpVectors(startPos, endPos, packet.progress);
    });

    // 4. Raycaster Hover Check
    this.raycaster.setFromCamera(this.targetMouse, this.camera);
    
    // Check intersections on core nodes
    const intersects = this.raycaster.intersectObjects(
      this.nodes.map(n => n.children[0])
    );

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const hitGroup = hitMesh.parent;

      if (this.hoveredNode !== hitGroup) {
        // Reset previous hovered node
        this.resetHoveredNode();

        // Highlight new node
        this.hoveredNode = hitGroup;
        
        // Easing scale and color via GSAP
        gsap.to(hitGroup.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.3, ease: "power2.out" });
        gsap.to(hitMesh.material.color, { r: 0, g: 0.94, b: 1.0, duration: 0.3 }); // Cyan glow
        gsap.to(hitMesh.material.emissive, { r: 0, g: 0.2, b: 0.3, duration: 0.3 });
        
        // Glow the outer wireframe mesh
        const outerWire = hitGroup.children[1];
        if (outerWire) {
          gsap.to(outerWire.material.color, { r: 0, g: 0.94, b: 1.0, duration: 0.3 });
          gsap.to(outerWire.material, { opacity: 0.8, duration: 0.3 });
        }
      }
    } else {
      this.resetHoveredNode();
    }

    this.renderer.render(this.scene, this.camera);
  },

  resetHoveredNode() {
    if (!this.hoveredNode) return;
    
    const group = this.hoveredNode;
    const mesh = group.children[0];
    const outerWire = group.children[1];

    gsap.to(group.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 0.4, ease: "power2.out" });
    
    // Easing colors back to original Hyper Purple
    gsap.to(mesh.material.color, { r: 0.48, g: 0.13, b: 0.93, duration: 0.4 });
    gsap.to(mesh.material.emissive, { r: 0.18, g: 0.06, b: 0.4, duration: 0.4 });

    if (outerWire) {
      gsap.to(outerWire.material.color, { r: 0.57, g: 0.2, b: 0.92, duration: 0.4 });
      gsap.to(outerWire.material, { opacity: 0.4, duration: 0.4 });
    }

    this.hoveredNode = null;
  },

  destroy() {
    this.isPaused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener('resize', this.resize.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));

    // Dispose Geometries and Materials to prevent memory leaks
    this.nodes.forEach((node) => {
      node.children.forEach(mesh => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      this.scene.remove(node);
    });

    this.packets.forEach((packet) => {
      packet.mesh.geometry.dispose();
      packet.mesh.material.dispose();
      this.scene.remove(packet.mesh);
    });

    this.nodes = [];
    this.packets = [];
    this.renderer.dispose();
  }
};
