/// <reference types="node" />
import { defineConfig } from "drizzle-kit";
import path from "path";
import { loadEnvFile } from "node:process";

loadEnvFile(path.resolve(__dirname, "../../.env"));

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  out: "./drizzle",
  dialect: "postgresql",
  schemaFilter: ["public"],
  tablesFilter: ["admins", "products", "enquiries", "admin_sessions"],
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});