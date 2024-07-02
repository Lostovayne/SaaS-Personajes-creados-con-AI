"use client";

import { Category, Companion } from "@prisma/client";

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

export const CompanionForm = ({
  initialData,
  categories,
}: CompanionFormProps) => {
  return <div>CompanionForm</div>;
};
