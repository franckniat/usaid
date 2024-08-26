"use server";

import { db } from "@/lib/db";

export async function getAgencyById(agencyId: string) {
  return await db.agency.findUnique({
    where: { id: agencyId },
  });
}

export async function getAgencies() {
  return await db.agency.findMany();
}