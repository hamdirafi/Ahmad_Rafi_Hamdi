// =====================================================
// script.js : latar bintang interaktif kursor
// =====================================================

(function () {
    var c = document.getElementById('bg');
    if (!c || !c.getContext) return;
    var ctx = c.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var diam = window.matchMedia('(prefers-reduced-motion: reduce)').matches; // true = tanpa animasi
    var w = 0, h = 0, titik = [], JARAK = 130;

    // Posisi kursor & radius interaksi
    var mouse = { x: -1000, y: -1000, radius: 180 };

    // Lacak pergerakan kursor
    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Reset posisi saat kursor keluar layar
    window.addEventListener('mouseleave', function () {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    function atur() {
        var lebarBaru = window.innerWidth;
        h = window.innerHeight;
        c.width = lebarBaru * dpr; c.height = h * dpr;
        c.style.width = lebarBaru + 'px'; c.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (lebarBaru !== w) {
            w = lebarBaru;
            var n = Math.min(90, Math.round(w * h / 16000));
            titik = [];
            for (var i = 0; i < n; i++) {
                titik.push({
                    x: Math.random() * w, y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
                    ox: 0, oy: 0 // offset dorongan dari kursor
                });
            }
        }
        gambar(false);
    }

    function gambar(jalan) {
        ctx.clearRect(0, 0, w, h);
        var i, j, p, q, d, dx, dy, dist, force;

        for (i = 0; i < titik.length; i++) {
            p = titik[i];

            if (jalan) {
                // Gerakan alami
                p.x += p.vx; p.y += p.vy;

                // Pantulan di tepi layar
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;

                // Hitung jarak titik ke kursor
                dx = p.x - mouse.x;
                dy = p.y - mouse.y;
                dist = Math.hypot(dx, dy);

                // Efek terdorong halus saat mendekati kursor
                if (dist < mouse.radius) {
                    force = (1 - dist / mouse.radius) * 2;
                    p.x += (dx / dist) * force;
                    p.y += (dy / dist) * force;
                }
            }

            // Gambar garis penghubung antar titik
            for (j = i + 1; j < titik.length; j++) {
                q = titik[j];
                d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < JARAK) {
                    ctx.strokeStyle = 'rgba(255,255,255,' + ((1 - d / JARAK) * 0.14) + ')';
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
                }
            }

            // Gambar titik
            ctx.fillStyle = 'rgba(255,255,255,0.4)';
            ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
        }

        if (jalan) requestAnimationFrame(function () { gambar(true); });
    }

    atur();
    window.addEventListener('resize', atur);
    if (!diam) requestAnimationFrame(function () { gambar(true); });
})();

// =====================================================
// Kalkulator Biaya Sewa – demo OutGear Station
// =====================================================
(function () {
    var hari = document.getElementById('hari');
    var harga = document.getElementById('harga');
    var hasil = document.getElementById('hasil');
    if (!hari || !harga || !hasil) return;

    function hitung() {
        var total = (parseInt(hari.value) || 0) * (parseInt(harga.value) || 0);
        hasil.textContent = 'Rp ' + total.toLocaleString('id-ID');
    }

    hari.addEventListener('input', hitung);
    harga.addEventListener('input', hitung);
})();