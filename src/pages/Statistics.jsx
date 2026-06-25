import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { getUserStats } from "../services/wordService";

function Statistics() {
  const { user } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!user) return;

        const data = await getUserStats(
          user.uid
        );

        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>📊 Statistics</h1>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Reviews</h3>
          <p>{stats?.total || 0}</p>
        </div>

        <div className="stat-card">
          <h3>✅ Known Words</h3>
          <p>{stats?.known || 0}</p>
        </div>

        <div className="stat-card">
          <h3>❌ Unknown Words</h3>
          <p>{stats?.unknown || 0}</p>
        </div>

        <div className="stat-card">
          <h3>🎯 Accuracy</h3>
          <p>{stats?.accuracy || 0}%</p>
          <div className="accuracy-bar">
          <div
            className="accuracy-fill"
            style={{
              width: `${stats?.accuracy || 0}%`,
            }}
          ></div>
        </div>
        </div>

      </div>
    </Layout>
  );
}

export default Statistics;