import {
    ChartColumn
  } from "lucide-react";
  
  export type MenuItem =
    | {
        type: "link";
        label: string;
        icon: React.ElementType;
        path: string;
      }
    | {
        type: "group";
        label: string;
        icon: React.ElementType;
        children: MenuItem[];
      };
  
  export const menuItems: MenuItem[] = [
    {
      type: "link",
      label: "Thống kê giao dịch",
      icon: ChartColumn,
      path: "/",
    },
    {
      type: "link",
      label: "Bản đồ",
      icon: ChartColumn,
      path: "/map",
    },
   
  ];
  
  export const flattenMenuLinks = (items: MenuItem[]) => {
    return items.flatMap((item) => {
      if (item.type === "link") return [item];
  
      return item.children.filter((child) => child.type === "link");
    });
  };

  export function findParentGroupByPath(items: MenuItem[], path: string): string | null {
    for (const item of items) {
      if (item.type === "group") {
        const found = item.children.some(
          (child) => child.type === "link" && child.path === path,
        );
  
        if (found) return item.label;
      }
    }
  
    return null;
  }