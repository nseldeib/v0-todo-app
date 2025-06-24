import { ImageResponse } from "next/og"

// Clean list/tasks icon
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function IconOption4() {
  return new ImageResponse(
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "6px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <div style={{ width: "4px", height: "4px", background: "#10b981", borderRadius: "50%" }} />
          <div style={{ width: "12px", height: "2px", background: "#6b7280", borderRadius: "1px" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <div style={{ width: "4px", height: "4px", background: "#3b82f6", borderRadius: "50%" }} />
          <div style={{ width: "10px", height: "2px", background: "#6b7280", borderRadius: "1px" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <div style={{ width: "4px", height: "4px", background: "#f59e0b", borderRadius: "50%" }} />
          <div style={{ width: "8px", height: "2px", background: "#6b7280", borderRadius: "1px" }} />
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
