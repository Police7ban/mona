// تهيئة الخريطة
const map = L.map('map', {
    zoomControl: false,
    preferCanvas: true
}).setView([24.7136, 46.6753], 13);

// إضافة طبقة الخريطة
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// تحميل بيانات المسار
fetch('data/path.json')
    .then(response => response.json())
    .then(data => {
        const path = L.polyline(data.coordinates, {
            color: '#8b5cf6',
            weight: 5,
            className: 'animated-path'
        }).addTo(map);

        // تأثير رسم المسار
        gsap.fromTo(path._path, 
            { strokeDashoffset: 1000 },
            { strokeDashoffset: 0, duration: 3 }
        );
    });

// تحديث الطقس
async function updateWeather() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=24.7136&lon=46.6753&appid=YOUR_API_KEY&lang=ar');
    const data = await response.json();
    document.getElementById('weather').innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
        <span>${Math.round(data.main.temp - 273.15)}°C</span>
    `;
}
updateWeather();