document.addEventListener('DOMContentLoaded', function() {
    // Intro Animation
    const introOverlay = document.getElementById('introOverlay');
    if (introOverlay) {
        // After animation completes (3.5 seconds), fade out and remove
        setTimeout(() => {
            introOverlay.style.opacity = '0';
            introOverlay.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(() => {
                introOverlay.remove();
                // Start other animations
                document.querySelectorAll('[data-scroll]').forEach(el => {
                    el.classList.add('is-visible');
                });
                
                // Initialize the rest of the app after intro completes
                initializeApp();
            }, 500);
        }, 3500);
    } else {
        // If no intro overlay, initialize immediately
        initializeApp();
    }

    function initializeApp() {
        // Initialize Particles.js
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#d1d5db"
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000"
                        }
                    },
                    opacity: {
                        value: 0.3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 2,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#9ca3af",
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }

        // Mobile Menu Toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Smooth Scrolling for Navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Explore Button Animation
        const exploreBtn = document.getElementById('explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                this.innerHTML = 'Loading Dashboard <i class="fas fa-spinner fa-spin"></i>';
                
                const dashboard = document.getElementById('dashboard');
                if (dashboard) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: dashboard.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        this.innerHTML = 'Explore Dashboard <i class="fas fa-arrow-right"></i>';
                    }, 800);
                }
            });
        }

        // Initialize Traffic Map if element exists
        const trafficMapEl = document.getElementById('traffic-map');
        if (trafficMapEl && typeof L !== 'undefined') {
            const map = L.map('traffic-map').setView([12.9716, 77.5946], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Traffic simulation functions
            const trafficLayer = L.layerGroup().addTo(map);
            const trafficData = [
                { lat: 12.9716, lng: 77.5946, level: 'moderate' },
                { lat: 12.9756, lng: 77.5996, level: 'heavy' },
                { lat: 12.9686, lng: 77.5896, level: 'severe' },
                { lat: 12.9736, lng: 77.5796, level: 'moderate' },
                { lat: 12.9786, lng: 77.5696, level: 'light' }
            ];

            function getTrafficColor(level) {
                switch(level) {
                    case 'light': return '#10B981';
                    case 'moderate': return '#F59E0B';
                    case 'heavy': return '#F97316';
                    case 'severe': return '#EF4444';
                    default: return '#3B82F6';
                }
            }

            function updateTraffic() {
                trafficLayer.clearLayers();
                
                trafficData.forEach(point => {
                    const levels = ['light', 'moderate', 'heavy', 'severe'];
                    const randomChange = Math.random() > 0.7;
                    if (randomChange) {
                        point.level = levels[Math.floor(Math.random() * levels.length)];
                    }
                    
                    L.circleMarker([point.lat, point.lng], {
                        radius: 15,
                        fillColor: getTrafficColor(point.level),
                        color: '#fff',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0.8
                    }).addTo(trafficLayer).bindPopup(`<b>Traffic:</b> ${point.level.toUpperCase()}<br>Updated: ${new Date().toLocaleTimeString()}`);
                });
                
                // Add moving vehicles
                for (let i = 0; i < 5; i++) {
                    const lat = 12.9716 + (Math.random() * 0.02 - 0.01);
                    const lng = 77.5946 + (Math.random() * 0.02 - 0.01);
                    L.marker([lat, lng], {
                        icon: L.divIcon({
                            className: 'vehicle-marker',
                            html: `<i class="fas fa-car" style="color: ${getTrafficColor('moderate')}"></i>`,
                            iconSize: [20, 20]
                        })
                    }).addTo(trafficLayer);
                }
                
                // Update timestamp
                const lastUpdated = document.getElementById('last-updated');
                if (lastUpdated) {
                    lastUpdated.textContent = new Date().toLocaleTimeString();
                }
            }

            // Add map legend
            const legend = L.control({ position: 'bottomright' });
            legend.onAdd = function() {
                const div = L.DomUtil.create('div', 'map-legend bg-white p-4 rounded-lg shadow-md');
                div.innerHTML = `
                    <h4 class="font-bold mb-2 text-gray-800">Traffic Levels</h4>
                    <div class="legend-item flex items-center mb-1">
                        <div class="legend-color w-3 h-3 rounded-full mr-2" style="background-color: #10B981"></div>
                        <span class="text-sm text-gray-700">Light</span>
                    </div>
                    <div class="legend-item flex items-center mb-1">
                        <div class="legend-color w-3 h-3 rounded-full mr-2" style="background-color: #F59E0B"></div>
                        <span class="text-sm text-gray-700">Moderate</span>
                    </div>
                    <div class="legend-item flex items-center mb-1">
                        <div class="legend-color w-3 h-3 rounded-full mr-2" style="background-color: #F97316"></div>
                        <span class="text-sm text-gray-700">Heavy</span>
                    </div>
                    <div class="legend-item flex items-center">
                        <div class="legend-color w-3 h-3 rounded-full mr-2" style="background-color: #EF4444"></div>
                        <span class="text-sm text-gray-700">Severe</span>
                    </div>
                `;
                return div;
            };
            legend.addTo(map);

            // Initial update and interval
            updateTraffic();
            setInterval(updateTraffic, 5000);
        }

        // Scroll Reveal Animation
        if (typeof ScrollReveal !== 'undefined') {
            const scrollReveal = ScrollReveal({
                origin: 'bottom',
                distance: '40px',
                duration: 1000,
                delay: 200,
                reset: true
            });

            scrollReveal.reveal('[data-scroll]', {
                interval: 200
            });
        }

        // Card hover animations
        document.querySelectorAll('.status-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });

        // Insight card hover effects
        document.querySelectorAll('.insight-card').forEach(card => {
            const icon = card.querySelector('.icon-container');
            const pulseRing = card.querySelector('.pulse-ring');
            
            card.addEventListener('mouseenter', function() {
                if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
                if (pulseRing) pulseRing.style.animation = 'pulse 1.5s infinite';
            });
            
            card.addEventListener('mouseleave', function() {
                if (icon) icon.style.transform = '';
                if (pulseRing) pulseRing.style.animation = '';
            });
        });

        // Weather icon animation
        const weatherIcon = document.querySelector('.weather-icon-container i');
        if (weatherIcon) {
            setInterval(() => {
                weatherIcon.style.transform = 'translateY(-3px)';
                setTimeout(() => {
                    weatherIcon.style.transform = 'translateY(0)';
                }, 500);
            }, 3000);
        }

        // Update time every minute
        function updateClock() {
            const now = new Date();
            document.querySelectorAll('.event-time').forEach(el => {
                if (el.textContent.includes('Today')) {
                    const hours = now.getHours().toString().padStart(2, '0');
                    const minutes = now.getMinutes().toString().padStart(2, '0');
                    el.textContent = el.textContent.replace(/\d{2}:\d{2}/, `${hours}:${minutes}`);
                }
            });
        }

        updateClock();
        setInterval(updateClock, 60000);

        // Chart updates (simulated)
        function updateCharts() {
            const lastUpdated = document.getElementById('last-updated');
            if (lastUpdated) {
                lastUpdated.textContent = new Date().toLocaleTimeString();
            }
        }

        setInterval(updateCharts, 5000);
    }
});