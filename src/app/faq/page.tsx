export default function FaqPage() {
  return (
    <div style={{ padding: "80px 20px", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>FAQ</h1>
      <ul style={{ fontSize: "18px", lineHeight: 1.8, color: "#555" }}>
        <li>Q. 서비스는 무료인가요?</li>
        <li>A. 네, 기본 기능은 무료로 제공됩니다.</li>
        <li style={{ marginTop: "20px" }}>Q. 고객센터는 어떻게 문의하나요?</li>
        <li>이메일을 보내주세요.</li>
      </ul>
    </div>
  );
}
