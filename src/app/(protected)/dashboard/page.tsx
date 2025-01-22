'use client'
import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const { user } = useUser();

  if (!user) {
    return <p>Loading...</p>; // Handle the loading state
  }

  return <p className="text-wrap">{user.firstName}</p>;
};

export default DashboardPage;
