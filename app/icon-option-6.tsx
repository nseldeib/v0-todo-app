import { ImageResponse } from "next/og"

// Clean diamond/gem shape
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function IconOption6() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "white",
          transform: "rotate(45deg)",
          borderRadius: "2px",
        }}
      />
    </div>,
    {
      ...size,
    },
  )
}
