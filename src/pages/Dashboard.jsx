// import Layout from "../components/Layout";
// import { useEffect, useState } from "react";
// import { getUserData } from "../services/userService";

// function Dashboard() {

//   const [userData, setUserData] =
//   useState(null);

//   const stats = [
//     {
//       title: "Today's Words",
//       value: 5
//     },
//     {
//       title: "Reviews Due",
//       value: 3
//     },
//     {
//       title: "Current Streak",
//       value: 7
//     },
//     {
//       title: "Words Learned",
//       value: 120
//     }
//   ];

//   return (
//     <Layout>

//       <h1>Dashboard</h1>

//       <div className="stats-grid">
//         {stats.map((stat) => (
//           <div className="stat-card" key={stat.title}>
//             <h3>{stat.title}</h3>
//             <p>{stat.value}</p>
//           </div>
//         ))}
//       </div>

//     </Layout>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../services/firebase";
import { getUserData } from "../services/userService";
import { getUserStats } from "../services/wordService";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user) return;

        const userData = await getUserData(
          user.uid
        );

        const statsData =
          await getUserStats(user.uid);

        setUserData(userData);
        setStats(statsData);
      } catch (error) {
        console.error(
          "Error fetching dashboard data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Dashboard</h1>

      <h3>Welcome back 👋</h3>

      <p>{userData?.email}</p>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>🔥 Current Streak</h3>
          <p>{userData?.streak || 0}</p>
        </div>

        <div className="stat-card">
          <h3>📚 Words Learned</h3>
          <p>{stats?.known || 0}</p>
        </div>

        <div className="stat-card">
          <h3>📊 Total Reviews</h3>
          <p>{stats?.total || 0}</p>
        </div>

        <div className="stat-card">
          <h3>🎯 Accuracy</h3>
          <p>{stats?.accuracy || 0}%</p>
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;