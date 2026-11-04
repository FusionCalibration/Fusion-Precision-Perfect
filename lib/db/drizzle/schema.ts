import { pgTable, unique, serial, text, boolean, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const admins = pgTable("admins", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	name: text().notNull(),
	role: text().default('admin').notNull(),
	welcomeMessage: text("welcome_message"),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("admins_email_key").on(table.email),
]);

export const products = pgTable("products", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	category: text().notNull(),
	description: text().default(').notNull(),
	price: text(),
	imageUrl: text("image_url"),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const enquiries = pgTable("enquiries", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	subject: text(),
	message: text().notNull(),
	status: text().default('new').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});
