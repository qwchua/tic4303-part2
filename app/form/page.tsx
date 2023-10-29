"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Callout, Text } from "@radix-ui/themes";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "../validatationSchema";
import { z } from "zod";

// interface Form {
//   name: string;
//   email: string;
//   phoneNumber: string;
//   country: string;
//   gender: string;
//   qualification: string;
// }

type Form = z.infer<typeof createUserSchema>;

const FormPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(createUserSchema),
  });
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      await axios.post("/api/user", data);
      router.push("/success");
    } catch (error) {
      setError("An unexpected error occured.");
    }
  };

  return (
    <div>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          {/* Name Input Field */}
          <div className="pb-4">
            <label className="block text-sm pb-2" htmlFor="name">
              Name
            </label>
            <input
              className="border2 border-gray-500 p-2 rounded-md w-1/6 focus:border-teal-500 focus:ring-teal-500"
              type="text"
              placeholder="Enter name"
              {...register("name")}
            ></input>
          </div>
        </div>
        {errors.name && <Text color="red">{errors.name.message}</Text>}
        <div className="mt-6">
          {/* Email Input Field */}
          <div className="pb-4">
            <label className="block text-sm pb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border2 border-gray-500 p-2 rounded-md w-1/6 focus:border-teal-500 focus:ring-teal-500"
              type="text"
              {...register("email")}
              placeholder="Enter email"
            ></input>
          </div>
        </div>
        {errors.email && <Text color="red">{errors.email.message}</Text>}
        <div className="mt-6">
          {/* PhoneNumber Input Field */}
          <div className="pb-4">
            <label className="block text-sm pb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="border2 border-gray-500 p-2 rounded-md w-1/6 focus:border-teal-500 focus:ring-teal-500"
              type="text"
              {...register("phoneNumber")}
              placeholder="Enter phone number"
            ></input>
          </div>
        </div>
        {errors.phoneNumber && (
          <Text color="red">{errors.phoneNumber.message}</Text>
        )}
        <div className="mt-6">
          {/* Country Input Field */}
          <div className="pb-4">
            <label className="block text-sm pb-2" htmlFor="country">
              Country
            </label>
            <select
              {...register("country")}
              className="border2 border-gray-500 p-2 rounded-md w-1/6 focus:border-teal-500 focus:ring-teal-500"
            >
              <option>Singapore</option>
              <option>United States</option>
              <option>United Kingdom</option>
            </select>
          </div>
        </div>
        {errors.country && <Text color="red">{errors.country.message}</Text>}
        <div className="mt-6">
          {/* Gender Input Field */}
          <div className="pb-4">
            <label className="block text-sm pb-2" htmlFor="gender">
              Gender
            </label>
            <select
              {...register("gender")}
              className="border2 border-gray-500 p-2 rounded-md w-1/6 focus:border-teal-500 focus:ring-teal-500"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
        </div>
        {errors.country && <Text color="red">{errors.country.message}</Text>}
        <div className="mt-6">
          {/* Qualifications Input Field */}
          <div className="pb-4">
            <label className="block text-sm pb-2" htmlFor="qualification">
              Highest Qualification
            </label>
            <select
              {...register("qualification")}
              className="border2 border-gray-500 p-2 rounded-md w-1/6 focus:border-teal-500 focus:ring-teal-500"
            >
              <option>Tertiary</option>
              <option>Diploma</option>
              <option>Secondary</option>
              <option>Primary</option>
            </select>
          </div>
        </div>
        {errors.qualification && (
          <Text color="red">{errors.qualification.message}</Text>
        )}
        <button
          type="submit"
          className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-20"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
