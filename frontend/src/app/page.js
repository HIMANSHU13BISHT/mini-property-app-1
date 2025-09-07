"use client";
import React, {useState,useEffect} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


const Page =  () => {
  const router  = useRouter();
  const [properties, setProperties] = useState([]);

  useEffect(()=>{
    const fetchProperties = async()=>{
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/`);
        const data = await res.json();
        if(res.ok){
          setProperties(data);
        }else{
          console.log("Failed to fetch properties: " + data.message);
        }
      } catch (error) {
        console.log("Error fetching properties:", error);
      }
    }
    fetchProperties();
  },[])

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Available Properties</h1>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-48 group">
              <Image
              src={property.image}
              alt={property.title}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              fill
              className="object-cover border-gray-300"
            />
            <button onClick={()=> router.push(`/property/${property._id}`)}
            className=" absolute cursor-pointer bottom-1 right-1 bg-blue-500 text-white px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">
              View Details
            </button>
            </div>

            {/* Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
              <p className="text-gray-600 mb-1">{property.location}</p>
              <p className="text-blue-600 font-bold">
                ₹ {property.price.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;