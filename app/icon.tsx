import { ImageResponse } from "next/og";

export const size = { width: 256, height: 256 };
export const contentType = "image/png";

// Brand tile — serves as the favicon and as the Organization logo (/icon).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#047857",
          color: "#fff",
          fontSize: 168,
          fontWeight: 800,
          fontFamily: "sans-serif",
          borderRadius: 44,
        }}
      >
        G
      </div>
    ),
    { ...size },
  );
}
