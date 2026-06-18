import { auth } from "@clerk/nextjs/server";
import React from "react";
import prisma from "@/utils/connect";
import UserStats from "@/components/UserStats";

export const dynamic = "force-dynamic";

async function page() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg font-semibold text-gray-500">
          You need to be logged in to view this page.
        </p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      categoryStats: {
        include: {
          category: true,
        },
      },
    },
  });

  return (
    <div>
      <UserStats userStats={user} />
    </div>
  );
}

export default page;
