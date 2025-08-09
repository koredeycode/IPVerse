import AuthLayout from "@/components/AuthLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}

// const { authenticated } = useAuthState();

// if (!authenticated) {
//   return (
//     <>
//       <p>You are not logged in</p>
//       <button onClick={redirect("/signin")}>Go home</button>
//     </>
//   );
// }
