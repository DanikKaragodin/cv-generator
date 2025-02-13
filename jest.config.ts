export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "^.+\\.svg$": "jest-transformer-svg",
      "^@/(.*)$": "<rootDir>/src/$1",
      "^@assets/(.*)$": "<rootDir>/src/assets/$1",
      "^@common/(.*)$": "<rootDir>/src/common/$1",
      "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    },
  
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  };