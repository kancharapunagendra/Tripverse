// Initialize all charts for the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Congestion Trend Chart
    const congestionCtx = document.getElementById('congestionChart').getContext('2d');
    const congestionChart = new Chart(congestionCtx, {
        type: 'line',
        data: {
            labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
            datasets: [{
                label: 'Congestion Level',
                data: [30, 75, 45, 60, 85, 40],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#10B981',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1F2937',
                    titleFont: {
                        family: 'Inter',
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value === 0) return 'Clear';
                            if (value === 25) return 'Light';
                            if (value === 50) return 'Moderate';
                            if (value === 75) return 'Heavy';
                            if (value === 100) return 'Severe';
                            return '';
                        },
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    });

    // Weather Impact Chart
    const weatherCtx = document.getElementById('weatherChart').getContext('2d');
    const weatherChart = new Chart(weatherCtx, {
        type: 'bar',
        data: {
            labels: ['Clear', 'Rain', 'Fog', 'Extreme Heat'],
            datasets: [{
                label: 'Congestion Increase',
                data: [0, 35, 20, 15],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(156, 163, 175, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(156, 163, 175, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1F2937',
                    titleFont: {
                        family: 'Inter',
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    });

    // System Status Chart
    const systemCtx = document.getElementById('systemChart').getContext('2d');
    const systemChart = new Chart(systemCtx, {
        type: 'doughnut',
        data: {
            labels: ['Processing', 'Idle', 'Maintenance'],
            datasets: [{
                data: [85, 10, 5],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(156, 163, 175, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Inter'
                        },
                        boxWidth: 12,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: '#1F2937',
                    titleFont: {
                        family: 'Inter',
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            cutout: '70%'
        }
    });

    // Hourly Congestion Forecast Chart
    const hourlyCtx = document.getElementById('hourlyChart').getContext('2d');
    const hourlyChart = new Chart(hourlyCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 12}, (_, i) => {
                const hour = new Date().getHours() + i;
                return `${hour % 24}:00`;
            }),
            datasets: [
                {
                    label: 'Predicted Congestion',
                    data: [45, 60, 75, 85, 80, 70, 65, 60, 55, 50, 45, 40],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10B981',
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Historical Average',
                    data: [40, 55, 65, 70, 65, 60, 55, 50, 45, 40, 35, 30],
                    borderColor: '#3B82F6',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointBackgroundColor: '#3B82F6',
                    pointRadius: 3,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Inter'
                        },
                        boxWidth: 12,
                        padding: 20
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#1F2937',
                    titleFont: {
                        family: 'Inter',
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Inter',
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    });

    // Update charts with simulated real-time data
    function updateCharts() {
        // Update congestion chart
        congestionChart.data.datasets[0].data = congestionChart.data.datasets[0].data.map(value => {
            const change = Math.random() * 10 - 5;
            return Math.min(100, Math.max(0, value + change));
        });
        congestionChart.update();
        
        // Update hourly prediction chart
        hourlyChart.data.datasets[0].data = hourlyChart.data.datasets[0].data.map(value => {
            const change = Math.random() * 8 - 4;
            return Math.min(100, Math.max(0, value + change));
        });
        hourlyChart.update();
        
        // Update last updated time
        document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
    }

    // Update charts every 5 seconds
    setInterval(updateCharts, 5000);
});