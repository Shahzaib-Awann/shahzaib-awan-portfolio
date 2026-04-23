import { db } from "@/lib/db";
import { technologies } from "@/lib/db/schema";
import { count, desc } from "drizzle-orm";

type Technology = {
    id: number;
    name: string;
  };
  
  type TechResponse = {
    data: Technology[];
    meta: {
      totalRows: number;
      totalPages: number;
      page: number;
      pageSize: number;
    };
  };
export const getAllTechnologies = async (page: number,
    pageSize: number): Promise<TechResponse> => {
  try {
    const offset = (page - 1) * pageSize;

    const result = await db
      .select()
      .from(technologies)
      .limit(pageSize)
      .offset(offset)
      .orderBy(desc(technologies.id));

    const totalResult = await db
      .select({ total: count() })
      .from(technologies);

      const total = totalResult[0].total;

      const totalPages = Math.ceil(total / pageSize);

      return {
        data: result,
        meta: {
          totalRows: total,
          totalPages,
          page,
          pageSize,
        },
      };
  } catch (error) {
    console.error("[getAllTechnologies] Error:", error);

    return {
        data: [],
        meta: {
          totalRows: 0,
          totalPages: 0,
          page,
          pageSize,
        },
      };
  }
};