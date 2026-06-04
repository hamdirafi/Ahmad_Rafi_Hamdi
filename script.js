// ===== BACKGROUND INTERAKTIF (Index Page) =====
var bgCanvas = document.getElementById('bgCanvas');

if (bgCanvas) {
    var ctx = bgCanvas.getContext('2d');
    var particles = [];
    var mouse = { x: null, y: null };
    
    // Set canvas size
    function resizeCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    
    // Mouse move
    window.addEventListener('mousemove', function(e) {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    // Mouse leave window
    window.addEventListener('mouseout', function() {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * bgCanvas.width;
            this.y = Math.random() * bgCanvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = 'rgba(255, 255, 255, ' + (Math.random() * 0.3 + 0.1) + ')';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Reaksi mouse
            if (mouse.x != null && mouse.y != null) {
                var dx = mouse.x - this.x;
                var dy = mouse.y - this.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    var force = (120 - distance) / 120;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }
            }
            
            // Boundary
            if (this.x < 0) this.x = bgCanvas.width;
            if (this.x > bgCanvas.width) this.x = 0;
            if (this.y < 0) this.y = bgCanvas.height;
            if (this.y > bgCanvas.height) this.y = 0;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Buat partikel
    function initParticles() {
        particles = [];
        var jumlah = Math.floor((bgCanvas.width * bgCanvas.height) / 8000);
        for (var i = 0; i < jumlah; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();
    
    // Hubungkan partikel
    function connectParticles() {
        for (var a = 0; a < particles.length; a++) {
            for (var b = a + 1; b < particles.length; b++) {
                var dx = particles[a].x - particles[b].x;
                var dy = particles[a].y - particles[b].y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    var opacity = 0.15 - (distance / 700);
                    ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation
    function animate() {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
    
    // Resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        initParticles();
    });
}


// ===== FACE SCAN (Login Page) =====
if (document.getElementById('video')) {
    var video = document.getElementById('video');
    var startBtn = document.getElementById('startBtn');
    var statusText = document.getElementById('statusText');
    var scannerOverlay = document.getElementById('scannerOverlay');
    var cameraWrapper = document.getElementById('cameraWrapper');
    
    function startCamera() {
        statusText.textContent = "Mengakses kamera...";
        
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
                .then(function(stream) {
                    video.srcObject = stream;
                    statusText.textContent = "Kamera siap ✓";
                    statusText.classList.add('success');
                    startBtn.disabled = false;
                })
                .catch(function(err) {
                    statusText.textContent = "Gagal: " + err.message;
                    statusText.classList.add('error');
                });
        } else {
            statusText.textContent = "Browser tidak support!";
            statusText.classList.add('error');
        }
    }
    
    startCamera();
    
    startBtn.addEventListener('click', function() {
        if (!video.srcObject) {
            statusText.textContent = "Kamera belum aktif!";
            return;
        }
        
        startBtn.disabled = true;
        statusText.textContent = "Memindai wajah...";
        statusText.className = "status-text";
        scannerOverlay.classList.add('active');
        
        setTimeout(function() {
            statusText.textContent = "Wajah terdeteksi! ✓";
            statusText.classList.add('success');
            cameraWrapper.classList.add('success');
            
            setTimeout(function() {
                window.location.href = "index.html";
            }, 1000);
        }, 2000);
    });
}


// ===== PRELOADER (Index Page) =====
if (document.getElementById('preloader')) {
    var preloader = document.getElementById('preloader');
    var progress = document.getElementById('progress');
    var runner = document.getElementById('runner');
    var width = 0;
    
    var timer = setInterval(function() {
        width += 2;
        
        progress.style.width = width + "%";
        runner.style.left = width + "%";
        
        if (width >= 100) {
            clearInterval(timer);
            
            setTimeout(function() {
                preloader.style.opacity = 0;
                preloader.style.transition = "opacity 0.5s";
                
                setTimeout(function() {
                    preloader.style.display = "none";
                }, 500);
            }, 200);
        }
    }, 30);
}