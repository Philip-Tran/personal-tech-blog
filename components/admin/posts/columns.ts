import { formatDate } from "~/lib/utils";
import type { Post } from "~/stores/admin/PostStore";

import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DropdownAction from "~/components/admin/posts/data-table-dropdown.vue";

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: () => h("div", { class: "text-left" }, "Title"),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;

      return h("div", { class: "text-left font-medium" }, title);
    },
  },
  {
    accessorKey: "createdAt",
    header: () => h("div", { class: "text-left" }, "Created At"),
    cell: ({ row }) => {
      const formattedDate = formatDate(row.getValue("createdAt"));

      return h("div", { class: "text-left font-medium" }, formattedDate);
    },
  },
  {
    accessorKey: "published",
    header: () => h("div", { class: "text-left" }, "Status"),
    cell: ({ row }) => {
      const isPublished = row.getValue("published") === true;
      const status = isPublished ? "Published" : "Draft";
      return h(
        "div",
        {
          class: `text-left font-medium inline-block px-2 py-1 rounded-full ${
            isPublished
              ? "bg-blue-200 text-blue-500"
              : "bg-gray-300 text-gray-700"
          }`,
        },
        status
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const post = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          post,
        })
      );
    },
  },
];
