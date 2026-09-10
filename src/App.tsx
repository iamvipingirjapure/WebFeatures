import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Search from "./search/Search";
import SearchWithAbortController from "./search/SearchWithAbortController";

const navItems = [
  { to: "/search", label: "Standard Search" },
  { to: "/search-abort", label: "Search with AbortController" },
];

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 40,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "260px",
          backgroundColor: "#1f2937",
          color: "#f9fafb",
          padding: "20px 0",
          zIndex: 50,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
          boxShadow: isOpen ? "4px 0 16px rgba(0,0,0,0.2)" : "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px 20px",
            borderBottom: "1px solid #374151",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
            Web Features
          </h2>
          <button
            onClick={onClose}
            aria-label="Close drawer"
            style={{
              background: "none",
              border: "none",
              color: "#9ca3af",
              fontSize: "22px",
              cursor: "pointer",
              padding: "4px",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "16px 12px",
            flex: 1,
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                style={{
                  textDecoration: "none",
                  color: isActive ? "#fff" : "#d1d5db",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  display: "block",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  backgroundColor: isActive ? "#374151" : "transparent",
                  transition: "background-color 0.15s ease, color 0.15s ease",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 20px",
            backgroundColor: "#1f2937",
            color: "#f9fafb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            style={{
              background: "none",
              border: "none",
              color: "#f9fafb",
              fontSize: "22px",
              cursor: "pointer",
              padding: "4px 6px",
              lineHeight: 1,
              borderRadius: "4px",
            }}
          >
            ☰
          </button>
          <span style={{ fontSize: "16px", fontWeight: 600 }}>
            Web Features
          </span>
        </header>

        <Sidebar isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <main
          style={{
            padding: "20px",
            minHeight: "calc(100vh - 50px)",
            boxSizing: "border-box",
          }}
        >
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/search-abort" element={<SearchWithAbortController />} />
            <Route
              path="*"
              element={
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "50px",
                    color: "#6b7280",
                  }}
                >
                  Select a search demo from the menu.
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
