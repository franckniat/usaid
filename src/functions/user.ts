"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/user";
import { ProfileUpdateSchema } from "@/schemas/user";
import { User } from "@prisma/client";
import { z } from "zod";

//get data functions

export async function getUserById(id: string): Promise<User | null> {
    return db.user.findUnique({
        where: { id },
    });
}

export async function getUserByEmail(email: string): Promise<User | null> {
    return db.user.findUnique({
        where: { email },
    });
}

export const getUsers = async (): Promise<User[]> => {
    return db.user.findMany();
}


export const updateUser = async (values: z.infer<typeof ProfileUpdateSchema>) => {
    const user = (await getCurrentUser() as User);
    if(user.id){
      await db.user.update({
        where:{
          id: user.id
        },
        data: {
          name: values.name,
          image: values.image
        }
      })
      return {
        success: "Profil mis à jour avec succès !"
      }
    } else{
      return{
        error:"Vous devez être connecté pour effectuer cette action !"
      }
    }
  };
