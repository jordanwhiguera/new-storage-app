"use client";
import React from "react";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = React.useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={` flex  items-center justify-center gap-2 py-3 pr-3   hover:text-white transition cursor-pointer
    ${selected ? "border-b-4 " : "border-transparent "}
    ${selected ? "text-white " : "text-slate-300 "}

    
    `}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
