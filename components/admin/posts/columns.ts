import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import dayjs from "dayjs";
import type { Post } from "~/stores/client/PostStore";
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
      const formattedDate = dayjs(row.getValue("createdAt")).format(
        "DD/MM/YYYY"
      );

      return h("div", { class: "text-left font-medium" }, formattedDate);
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => h("div", { class: "text-left" }, "Updated At"),
    cell: ({ row }) => {
      const id = row.getValue("updatedAt") as string;

      return h("div", { class: "text-left font-medium" }, id);
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
