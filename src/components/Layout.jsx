import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div>

      <Navbar />

      <div className="app-layout">

        <Sidebar />

        <main className="content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default Layout;