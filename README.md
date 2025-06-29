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

## Installation Instructions

### Prerequisites
- Node.js (v16+)
- SQLite3

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

### Database Initialization

```bash
sqlite3 traffic.db < schema.sql
```

### Configuration

Create a `.env` file in the root directory with:

```ini
DATABASE_URL=jdbc:sqlite:traffic.db
API_KEY=your_traffic_data_api_key
FRONTEND_PORT=3000
BACKEND_PORT=8080
```

## API Endpoints

```http
GET /api/traffic/current        # Get current congestion data
GET /api/traffic/history?days=7 # Get historical data
POST /api/traffic/report        # Submit new congestion report
GET /api/locations              # Get all monitored locations
```

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
```


## Future Roadmap

```text
- Implement machine learning for improved predictions
- Add user reporting functionality
- Integrate with navigation APIs
- Develop mobile companion app
```

## Troubleshooting

```text
- Database connection issues: Verify SQLite file permissions
- CORS errors: Ensure frontend and backend ports are properly configured
- Missing data: Check API key validity for traffic data sources
```

## License

```text
MIT License  
*Include full license text if available*
```
