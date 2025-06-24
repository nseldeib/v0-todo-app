import { ImageResponse } from "next/og"

// Clean geometric squares
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function IconOption2() {
  return new ImageResponse(
    <div
      style={{
        background: "#1f2937",
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
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <div style={{ display: "flex", gap: "2px" }}>
          <div style={{ width: "6px", height: "6px", background: "#10b981", borderRadius: "1px" }} />
          <div style={{ width: "6px", height: "6px", background: "#3b82f6", borderRadius: "1px" }} />
        </div>
        <div style={{ display: "flex", gap: "2px" }}>
          <div style={{ width: "6px", height: "6px", background: "#f59e0b", borderRadius: "1px" }} />
          <div style={{ width: "6px", height: "6px", background: "#ef4444", borderRadius: "1px" }} />
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
