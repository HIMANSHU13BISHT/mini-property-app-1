import mongoose from "mongoose";
import Property from "./models/property.js";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedData = [
  {
    title: "Grand Palace Hotel",
    price: 2500000,
    location: "Connaught Place, New Delhi",
    image: "/images/property1.jpg",
    description:
      "A 5-star luxury stay with rooftop infinity pool, fine dining, and spa in the heart of the city.",
  },
  {
    title: "Ocean View Resort",
    price: 7500000,
    location: "Baga Beach, Goa",
    image: "/images/property2.jpg",
    description:
      "Beachfront property offering sea-view rooms, water sports, and a beachside café.",
  },
  {
    title: "1BHK Flat in Delhi",
    price: 1500000,
    location: "Lajpat Nagar, Delhi",
    image: "/images/property3.jpg",
    description:
      "Boutique lodge with wooden cabins, mountain views, outdoor bonfires, and adventure treks.",
  },
  {
    title: "City Comfort Inn",
    price: 15000000,
    location: "Andheri East, Mumbai",
    image: "/images/property4.jpg",
    description:
      "Budget-friendly hotel with cozy rooms, free breakfast, WiFi, and metro connectivity.",
  },
  {
    title: "Royal Heritage Haveli",
    price: 15000000,
    location: "Pink City, Jaipur",
    image: "/images/property4.jpg",
    description:
      "Heritage haveli with royal-style rooms, cultural shows, and authentic Rajasthani cuisine.",
  },
  {
    title: "Green Leaf Retreat",
    price: 15000000,
    location: "Wayanad, Kerala",
    image: "/images/property4.jpg",
    description:
      "Eco-friendly resort with organic dining, yoga sessions, and lush nature trails.",
  },
  {
    title: "Lakeview Serenity Resort",
    price: 15000000,
    location: "Nainital, Uttarakhand",
    image: "/images/property4.jpg",
    description:
      "Peaceful lakeside cottages with private decks, boating, and candlelight dinners.",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    await Property.deleteMany({}); // clear old data
    await Property.insertMany(seedData); // insert new
    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedDatabase();
