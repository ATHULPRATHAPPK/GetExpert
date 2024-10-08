# GetExpert
/frontend
get-expert/
├── public/                  # Static files
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── application/         # Application layer
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   └── ...
│   │   ├── types/
│   │   │   ├── authTypes.ts
│   │   │   └── ...
│   │   ├── utils/
│   │   │   ├── helpers.ts
│   │   │   └── ...
│   │   └── ...
│   ├── domain/              # Domain layer
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   │   └── ...
│   │   ├── repositories/
│   │   │   ├── userRepo.ts
│   │   │   └── ...
│   │   └── ...
│   ├── infrastructure/      # Infrastructure layer
│   │   ├── api/
│   │   │   ├── api.ts
│   │   │   └── ...
│   │   ├── config/
│   │   │   ├── axiosConfig.ts
│   │   │   └── ...
│   │   └── ...
│   ├── interface/           # Interface adapters layer
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Booking.tsx
│   │   │   ├── PaymentHistory.tsx
│   │   │   └── ...
│   │   └── styles/
│   │       ├── index.css
│   │       └── ...
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── ...
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts




/backend

backend/
├── src/
│   ├── application/         # Application layer
│   │   ├── services/
│   │   │   ├── userService.ts
│   │   │   └── ...
│   │   └── ...
│   ├── domain/              # Domain layer
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   │   └── ...
│   │   ├── repositories/
│   │   │   ├── userRepo.ts
│   │   │   └── ...
│   │   └── ...
│   ├── infrastructure/      # Infrastructure layer
│   │   ├── database/
│   │   │   ├── dbConfig.ts
│   │   │   └── 
│   │   ├── http/
│   │   │   ├── middlewares/
│   │   │   │   ├── authMiddleware.ts
│   │   │   │   └── ...
│   │   │   ├── routes/
│   │   │   │   ├── userRoutes.ts
│   │   │   │   └── ...
│   │   │   ├── server.ts
│   │   │   └── otp
|   |   |   └── redis
|   |   |   └── security
|   |   |
│   │   └── ...
│   ├── interface/           # Interface adapters layer
│   │   ├── controllers/
│   │   │   ├── userController.ts
│   │   │   └── ...
│   │   └── ...
│   ├── config/
│   │   ├── envConfig.ts
│   │   └── ...
│   └── ...
├── .gitignore
├── package.json
├── tsconfig.json
└── ...
