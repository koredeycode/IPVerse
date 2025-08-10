"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { buttonPrimary, input } from "./styles";

// Zod schema for validation
const formSchema = z.object({
  title: z.string().optional(),
  bio: z.string().optional(),
  twitter: z
    .string()
    .min(3, "Twitter handle is required")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
});

type FormData = z.infer<typeof formSchema>;

const SignUpForm = ({ wallet }: { wallet: string }) => {
  const [twitterHandle, setTwitterHandle] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form Data:", data);
    try {
      const { title, bio, twitter } = data;
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, bio, twitter, wallet }),
      });
      const user = await response.json();

      localStorage.setItem("IPVERSE_USER", JSON.stringify(user));

      toast.success("Account created successfully");
      router.push("/explore");
    } catch (error) {
      toast.error("An error occurred", { description: String(error) });
    }
  };

  if (!wallet) {
    return (
      <div className="min-h-screen  flex flex-col items-center justify-center">
        <p className="text-xl mb-4">You are not logged in</p>
        <Link
          href="/signin"
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

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
            <h2 className="text-xs font-bold mb-2">{wallet}</h2>
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

            {/* <div className="w-full flex flex-col">
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
            </div> */}

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
