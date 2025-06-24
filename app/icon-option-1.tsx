import { ImageResponse } from "next/og"

// Modern minimalist checkmark
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function IconOption1() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 18,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "6px",
      }}
    >
      ✓
    </div>,
    {
      ...size,
    },
  )
}
