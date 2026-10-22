import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Xplainify was replaced by Design Shelf in Selected Work.
      { source: "/work/xplainify", destination: "/work/design-shelf", permanent: true },
    ];
  },
};

export default nextConfig;
