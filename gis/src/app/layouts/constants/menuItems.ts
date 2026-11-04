import {
    
    Map,
    User,
Users,
UserKey
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
      label: "Bản đồ",
      icon: Map,
      path: "/map",
    },
    {
      type: "link",
      label: "Nhóm quyền",
      icon: Users,
      path: "/permission-group",
    },
    {
      type: "link",
      label: "Phân quyền",
      icon: UserKey,
      path: "/permission-user",
    },
     {
      type: "link",
      label: "Người dùng",
      icon: User,
      path: "/user",
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