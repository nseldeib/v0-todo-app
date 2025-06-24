import { ImageResponse } from "next/og"

// Modern circular progress/productivity icon
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function IconOption5() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          border: "3px solid rgba(255,255,255,0.3)",
          borderTop: "3px solid white",
          borderRadius: "50%",
        }}
      />
    </div>,
    {
      ...size,
    },
  )
}
