# Doctor Appointment System — MediBook

A full-stack Doctor Appointment System built with Spring Boot 4 + React.

## Tech Stack

- **Backend**: Java 17, Spring Boot 4, Spring Security + JWT, Spring Data JPA, PostgreSQL, Lombok, SpringDoc OpenAPI
- **Frontend**: React (Vite), Axios, React Router DOM

## Key Features

- Browse specialties and filter doctors by mode (Online/Offline)
- **Strict rule**: Online and Offline appointments use different doctors
- Book appointments with time slot selection
- View and manage appointments (cancel, complete, no-show)
- Daily summary dashboard with revenue by mode and specialty
- JWT-based authentication
- Swagger UI for API testing

## Project Structure

```
backend/springboot-app/
  src/main/java/com/hackathon/app/
    config/        - SecurityConfig, CorsConfig
    controller/    - AuthController, SpecialtyController, DoctorController, AppointmentController, SummaryController
    service/       - AuthService, SpecialtyService, DoctorService, AppointmentService, SummaryService
    repository/    - JPA repositories
    entity/        - User, Doctor, Specialty, Appointment + enums
    dto/           - request/ and response/ DTOs
    security/      - JwtUtil, JwtAuthenticationFilter
    exception/     - ResourceNotFoundException, BadRequestException
    exceptions/    - GlobalExceptionHandler
    util/          - DataInitializer (seed data)

frontend/react-app/
  src/
    pages/         - LoginPage, RegisterPage, SpecialtiesPage, DoctorsPage, BookAppointmentPage, MyAppointmentsPage, SummaryPage
    components/    - Navbar
    services/      - api.js (Axios with JWT interceptor)
    util/          - auth.js
```

## Prerequisites

- Java 17
- Maven
- Node.js 18+
- PostgreSQL

## Database Setup

```sql
CREATE DATABASE hackathon_db;
```

Update credentials in `backend/springboot-app/src/main/resources/application.yaml` if needed:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/hackathon_db
    username: postgres
    password: 231429
```

## Run Backend

```bash
cd backend/springboot-app
./mvnw spring-boot:run
```

Backend starts on **http://localhost:8081**

Swagger UI: **http://localhost:8081/swagger-ui.html**

## Run Frontend

```bash
cd frontend/react-app
npm install
npm run dev
```

Frontend starts on **http://localhost:5173**

## Demo Credentials

| Role    | Email                 | Password    |
|---------|-----------------------|-------------|
| Admin   | admin@clinic.com      | admin123    |
| Patient | patient@clinic.com    | patient123  |

## API Endpoints

| Method | Endpoint                          | Description                    |
|--------|-----------------------------------|--------------------------------|
| POST   | /api/auth/register                | Register patient               |
| POST   | /api/auth/login                   | Login (returns JWT)            |
| GET    | /api/specialties                  | List all specialties           |
| GET    | /api/doctors                      | List doctors (filter by mode)  |
| GET    | /api/doctors/specialty/{id}       | Doctors by specialty + mode    |
| POST   | /api/doctors                      | Add doctor (admin)             |
| PUT    | /api/doctors/{id}/availability    | Toggle availability            |
| POST   | /api/appointments                 | Book appointment               |
| GET    | /api/appointments/my              | My appointments                |
| GET    | /api/appointments                 | All appointments (admin)       |
| PUT    | /api/appointments/{id}/status     | Update status                  |
| GET    | /api/summary/daily?date=YYYY-MM-DD| Daily summary                  |

## Appointment Modes

- **ONLINE**: Teleconsultation — includes a video link on confirmation
- **OFFLINE**: In-clinic visit
- Doctors are assigned to exactly one mode (enforced at doctor creation)

## Appointment Statuses

`CONFIRMED` → `COMPLETED` / `CANCELLED` / `NO_SHOW`
