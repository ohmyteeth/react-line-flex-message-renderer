import type { UriAction } from "../actions/uri.js";

export type VideoComponent = {
  type: "video";
  url: string;
  previewUrl: string;
  altContent: string;
  aspectRatio?: `${number}:${number}`;
  action?: UriAction;
};
