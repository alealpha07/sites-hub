# Sites Hub
Sites Hub is a dynamic web-based hub where you can list sites, and if they are reachable, they are displayed and clickable within a circular interface.

## Features
- Lists and checks site availability
- Displays reachable sites in an interactive circular UI
- Customizable theme and appearance
- Runs efficiently with Docker Compose

## Installation

### 1. Clone the Repository
```bash
git clone TODO add repo url
cd sites-hub
```

### 2. Configure the Environment
Copy the example environment file and adjust settings as needed:
```bash
cp example.env .env
```
Modify `.env` with your desired settings

### 3. Add Background and Favicon
Place your background and favicon files in the `./public/` directory. Ensure the extensions match those specified in `.env`, the names must be `favicon` and `background` respectivly.

### 4. Configure the Sites List
Copy and edit the example sites file:
```bash
cp example.sites.json sites.json
```

## Running the Project with Docker Compose
Ensure Docker and Docker Compose is installed, then run:
```bash
docker-compose up --build -d  # or docker compose up --build -d
```
This will build and start the Sites Hub container.

## Authors
- Alessandro Prati

## License
This project is open-source. Feel free to modify and share!
