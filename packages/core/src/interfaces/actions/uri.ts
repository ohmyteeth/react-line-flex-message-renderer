export type UriAction = {
  type: "uri";
  label?: string;
  uri: string;
  altUrl?: {
    desktop: string;
  };
};
