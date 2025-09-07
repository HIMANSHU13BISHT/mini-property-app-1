"use client"
import React, { useEffect } from 'react'
import {useState} from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router =  useRouter();
    const [form, setForm] = useState({
        title:"",
        price:"",
        location:"",
        image:"",
        description:""
    });

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            router.push("/login");
        }
    },[router])

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit =async (e)=>{
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // <-- get JWT from localStorage
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/add-property`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}` 
                },
                body:JSON.stringify({
                    ...form,
                    price: Number(form.price),   // convert price to number
                }),
            });
            const data = await res.json();
            console.log(data);
            if(res.ok){
                alert("Property added successfully");
                console.log("Saved Property:", data);
                setForm({ title: "", price: "", location: "", image: "", description: "" });
                router.push("/");
            }else{
                alert("Failed to add property : " + data.message);
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred while adding the property.");
        }
    }

  return (
    <div className='max-w-2xl mx-auto px-6 py-10 bg-white shadow-md rounded-xl'>
        <h1 className='text-2xl font-bold mb-6'>Add new properties</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name='title' placeholder='Property Title'  value={form.title} onChange={handleChange} className='w-full border rounded-lg p-3'  required/>
            <input type='text' name='price' placeholder='Property Price' value={form.price} onChange={handleChange} className='w-full border rounded-lg p-3' required/>
            <input type='text' name='location' placeholder='Property Location' value={form.location} onChange={handleChange} className='w-full border rounded-lg p-3' required/>
            <input type='text' name='image' placeholder='Image URL' value={form.image} onChange={handleChange} className='w-full border rounded-lg p-3' required/>
            <textarea name='description' placeholder='Property Description' rows="4" value={form.description} onChange={handleChange} className='w-full border rounded-lg p-3 required'>
            </textarea> 
            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                Add Property
            </button>
        </form>
    </div>
  )
}

export default Page