"use client";
import React, { useState, useEffect } from "react";
// import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

    const Page = () => {
    // const properties = [
    //     {
    //     _id: "1",
    //     title: "Grand Palace Hotel",
    //     price: 2500000,
    //     location: "Connaught Place, New Delhi",
    //     image: "/images/property1.jpg",
    //     description:
    //         "A 5-star luxury stay with rooftop infinity pool, fine dining, and spa in the heart of the city.",
    //     },
    //     {
    //     _id: "2",
    //     title: "Ocean View Resort",
    //     price: 7500000,
    //     location: "Baga Beach, Goa",
    //     image: "/images/property2.jpg",
    //     description:
    //         "Beachfront property offering sea-view rooms, water sports, and a beachside café.",
    //     },
    //     {
    //     _id: "3",
    //     title: "1BHK Flat in Delhi",
    //     price: 1500000,
    //     location: "Lajpat Nagar, Delhi",
    //     image: "/images/property3.jpg",
    //     description:
    //         "Boutique lodge with wooden cabins, mountain views, outdoor bonfires, and adventure treks.",
    //     },
    //     {
    //     _id: "4",
    //     title: "City Comfort Inn",
    //     price: 15000000,
    //     location: "Andheri East, Mumbai",
    //     image: "/images/property4.jpg",
    //     description:
    //         "Budget-friendly hotel with cozy rooms, free breakfast, WiFi, and metro connectivity.",
    //     },
    //     {
    //     _id: "5",
    //     title: "Royal Heritage Haveli",
    //     price: 15000000,
    //     location: "Pink City, Jaipur",
    //     image: "/images/property4.jpg",
    //     description:
    //         "Heritage haveli with royal-style rooms, cultural shows, and authentic Rajasthani cuisine.",
    //     },
    //     {
    //     _id: "6",
    //     title: "Green Leaf Retreat",
    //     price: 15000000,
    //     location: "Wayanad, Kerala",
    //     image: "/images/property4.jpg",
    //     description:
    //         "Eco-friendly resort with organic dining, yoga sessions, and lush nature trails.",
    //     },
    //     {
    //     _id: "7",
    //     title: "Lakeview Serenity Resort",
    //     price: 15000000,
    //     location: "Nainital, Uttarakhand",
    //     image: "/images/property4.jpg",
    //     description:
    //         "Peaceful lakeside cottages with private decks, boating, and candlelight dinners.",
    //     },
    // ];

    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`);
            if (!res.ok) throw new Error("Failed to fetch property");
            const data = await res.json();
            setProperty(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };
        if (id) fetchProperty();
    }, [id]);

    if (loading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    if (!property) {
        return (
        <div className="text-center py-10">
            <h1 className="text-2xl font-bold text-red-600">
            ❌ Property Not Found
            </h1>
            <Link
            href="/"
            className="mt-4 inline-block text-blue-600 underline hover:text-blue-800 cursor-pointer"
            >
            Go Back Home
            </Link>
        </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Image */}
        <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg">
            <img
            src={property.image}
            alt={property.title}
            className="object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-6">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <p className="text-sm text-gray-200">{property.location}</p>
            </div>
        </div>

        {/* Details */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">{property.title}</h2>
            <p className="text-blue-600 text-xl font-bold">
                ₹ {Number(property.price).toLocaleString("en-IN")}
            </p>
            </div>
            <p className="text-gray-600 mb-6">📍{property.location}</p>
            <p className="text-gray-700 leading-relaxed text-lg">
            {property.description}
            </p>

            {/* Call to action */}
            <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer">
                Book Now
            </button>
            <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg shadow hover:bg-blue-50 transition cursor-pointer">
                Contact
            </button>
            </div>
        </div>
        </div>
    );
    };

export default Page;
