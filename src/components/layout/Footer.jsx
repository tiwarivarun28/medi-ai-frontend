export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} MediAssist — Not medical advice.</p>
      </div>
    </footer>
  );
}
