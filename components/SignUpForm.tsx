"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonPrimary, buttonSecondary, input } from "./styles";
import { useRouter } from "next/navigation";

// Zod schema for validation
const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  title: z.string().optional(),
  bio: z.string().optional(),
  twitter: z
    .string()
    .min(1, "Twitter handle is required")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
});

type FormData = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const [twitterHandle, setTwitterHandle] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    router.push("/explore");
  };

  return (
    <motion.div
      layout
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{
        layout: { duration: 0.5, type: "spring" },
        scale: { type: "spring", stiffness: 200, damping: 20 },
        opacity: { duration: 0.3 },
      }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-md mx-auto bg-cardBg rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">First time on IPVerse?</h2>
            <p className="text-textSecondary">
              Let's set up your profile. This information will be visible to
              others.
            </p>
          </div>

          {/* Avatar preview */}
          {twitterHandle && (
            <div className="flex justify-center mb-6">
              <img
                alt="User avatar"
                className="h-24 w-24 rounded-full object-cover"
                src={`https://unavatar.io/twitter/${twitterHandle}`}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/96?text=?")
                }
              />
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="w-full flex flex-col">
              <label
                className="block text-sm font-medium text-textSecondary mb-2"
                htmlFor="twitter"
              >
                Twitter Handle
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-textSecondary">
                  @
                </span>
                <input
                  className={`${input} pl-8 w-full`}
                  id="twitter"
                  placeholder="your_handle"
                  {...register("twitter")}
                  onChange={(e) => {
                    setTwitterHandle(e.target.value.trim());
                  }}
                />
              </div>
              {errors.twitter && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.twitter.message}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col">
              <label
                className="block text-sm font-medium text-textSecondary mb-2"
                htmlFor="username"
              >
                IPVerse Username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-textSecondary">
                  @
                </span>
                <input
                  className={`${input} pl-8 w-full`}
                  id="username"
                  placeholder="satoshi"
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col">
              <label
                className="block text-sm font-medium text-textSecondary mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className={`${input}`}
                id="title"
                placeholder="e.g. Digital Artist, Blockchain Developer"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col">
              <label
                className="block text-sm font-medium text-textSecondary mb-2"
                htmlFor="bio"
              >
                Bio
              </label>
              <textarea
                className={`${input} min-h-[100px]`}
                id="bio"
                placeholder="Tell us a little about yourself..."
                {...register("bio")}
              ></textarea>
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div className="flex flex-col pt-4">
              <button
                className={`${buttonPrimary} w-full sm:w-auto`}
                type="submit"
              >
                Save and Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpForm;
