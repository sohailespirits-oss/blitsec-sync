import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb { label: string; href?: string; }
interface BreadcrumbProps { items: Crumb[]; }

export default function Breadcrumb({ items }: BreadcrumbProps) {
  console.log("items:",items);
  
  return (
    // ensure no wrapping and allow overflow if necessary
    <div className="flex items-center gap-1 flex-nowrap whitespace-nowrap overflow-visible">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {item.href ? (
            <Link
              href={item.href}
              className="font-inter font-semibold text-[14px] leading-[20px] text-[#026AA2] capitalize hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-inter font-semibold text-[14px] leading-[20px] text-[#717680] capitalize">
              {item.label}
            </span>
          )}

          {index < items.length - 1 && (
            <ChevronRight className="w-[16px] h-[16px] text-[#A4A7AE]" />
          )}
        </div>
      ))}
    </div>
  );
}
