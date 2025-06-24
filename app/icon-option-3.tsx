import { ImageResponse } from "next/og"

// Modern "T" for TaskFlow
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function IconOption3() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 20,
        background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        borderRadius: "6px",
        fontFamily: "system-ui",
      }}
    >
      T
    </div>,
    {
      ...size,
    },
  )
}
