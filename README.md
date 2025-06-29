# Traffic Congestion Analysis

## Project Overview

This project analyzes traffic congestion patterns using a web-based dashboard built with modern web technologies. The system collects, processes, and visualizes traffic data to help urban planners and commuters understand congestion trends.

## Tech Stack

- **Frontend:** HTML, TailwindCSS, JavaScript, JavaReact (React with Java backend integration)  
- **Backend:** Java (Spring Boot)  
- **Database:** SQLite  
- **Data Visualization:** Chart.js (or similar library)

## Features Implemented So Far

### Real-time Traffic Data Display
- Live congestion maps
- Color-coded traffic severity indicators

### Historical Data Analysis
- Time-based congestion trends
- Day-of-week patterns
- Seasonal variations

### Predictive Models
- Short-term congestion forecasting
- Event-based impact predictions

### User Interface
- Responsive dashboard
- Interactive charts and maps
- Customizable data views

## Database Schema (SQLite)

```sql
CREATE TABLE traffic_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME NOT NULL,
    location_id INTEGER NOT NULL,
    congestion_level REAL NOT NULL,  -- 0-1 scale
    vehicle_count INTEGER,
    average_speed REAL,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    road_type TEXT  -- highway, arterial, local, etc.
);

CREATE TABLE congestion_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    location_id INTEGER NOT NULL,
    severity TEXT,  -- low, medium, high
    cause TEXT,     -- accident, construction, weather, etc.
    FOREIGN KEY (location_id) REFERENCES locations(id)
);
