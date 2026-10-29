import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/files/juliet-gobran-cv.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="JulietGobran-CV.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
