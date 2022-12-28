import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 8686

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USER = process.env.DB_USER || 'postgres'
export const DB_PASSWORD = process.env.DB_PASSWORD || process.env.PASSWORD
export const DB_NAME = process.env.DB_NAME || process.env.DATABASE
export const DB_PORT = process.env.DB_PORT || 5432
