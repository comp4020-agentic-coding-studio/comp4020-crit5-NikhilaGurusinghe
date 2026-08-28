import type { NextConfig } from "next";
import { basePath } from "./lib/base-path";

const nextConfig: NextConfig = {
  /* config options here */
  // see https://nextjs.org/docs/pages/guides/static-exports
  output: "export",

  // Change the output directory `out` -> `dist`
  distDir: "dist",

  // fixes links
  trailingSlash: true,

  // this is so links use the correct github pages url rather than the base
  basePath,

  // exposes basePath to client code so hardcoded asset src attributes
  // (next/image doesn't auto-prepend basePath when images.unoptimized is set)
  // can be prefixed manually
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  images: { unoptimized: true },

  // cause of react strict mode the p5 stuff i have renders twice
  // (im assuming cuz it uses a useEffect to do the p5 stuff and useEffect's are
  // triggered twice in strict mode) so uncomment this if you don't want to deal with
  // that but also its really dumb that next just makes this a global toggle cause
  // react can enable strictmode on a component-by-component basis
  // but this is the best i got -_-
  reactStrictMode: false,
};

export default nextConfig;
