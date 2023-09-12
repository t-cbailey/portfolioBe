import { seedDatabase } from "./seed";

if (process.env.NODE_ENV !== "production") {
  seedDatabase();
} else {
  console.log("NODE_ENV === production - seed cancelled to avoid loss of data");
}

// seedDatabase();
