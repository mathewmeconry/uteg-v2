import { ReactElement } from "react";

export type RouteHandleLayout = {
  title?: string;
  returnable?: boolean;
  icons?: ReactElement[];
  hasDrawer?: boolean
  hideAccount?: boolean
  skipTokenCheck?: boolean
  hideAppbar?: boolean
};
