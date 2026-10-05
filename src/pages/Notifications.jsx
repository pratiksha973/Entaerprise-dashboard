import { useState , useEffect } from "react";

function Notifications() {
const [notifications, setNotifications] = useState(() => {
  const savedNotifications = localStorage.getItem(
    "projectflow_notifications"
  );

  if (savedNotifications) {
    return JSON.parse(savedNotifications);
  }
  return [
    {
      id: 1,
      title: "New task assigned",
      message: "You have been assigned a new task: Design Homepage.",
      time: "5 minutes ago",
      type: "task",
      read: false,
    },
    {
      id: 2,
      title: "Project deadline approaching",
      message: "Website Redesign deadline is approaching.",
      time: "1 hour ago",
      type: "deadline",
      read: false,
    },
    {
      id: 3,
      title: "Task completed",
      message: "Rahul completed the Create Login API task.",
      time: "3 hours ago",
      type: "success",
      read: true,
    },
    {
      id: 4,
      title: "New team member",
      message: "Sakshi has joined the Analytics team.",
      time: "Yesterday",
      type: "team",
      read: true,
    },
  ];
});
 useEffect(() => {
    localStorage.setItem(
      "projectflow_notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);


  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
  const updatedNotifications = notifications.map(
    (notification) => ({
      ...notification,
      read: true,
    })
  );

  saveNotifications(updatedNotifications);
};
  
const deleteNotification = (id) => {
  const updatedNotifications = notifications.filter(
    (notification) => notification.id !== id
  );

  saveNotifications(updatedNotifications);
};
  return (
    <div className="notifications-page">

      {/* HEADER */}

      <div className="page-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with your project activities.</p>
        </div>

        {unreadCount > 0 && (
          <button
            className="primary-btn"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* NOTIFICATION SUMMARY */}

      <div className="notification-summary">
        <div>
          <span>Unread Notifications</span>
          <h2>{unreadCount}</h2>
        </div>

        <div>
          <span>Total Notifications</span>
          <h2>{notifications.length}</h2>
        </div>
      </div>

      {/* NOTIFICATIONS */}

      <div className="notification-list">

        {notifications.length === 0 ? (
          <div className="notification-empty">
            <h3>No notifications</h3>
            <p>You are all caught up!</p>
          </div>
        ) : (
          notifications.map((notification) => (

            <div
              className={`notification-card ${
                notification.read ? "read" : "unread"
              }`}
              key={notification.id}
            >

              <div className="notification-icon">
                {notification.type === "task" && "✓"}

                {notification.type === "deadline" && "!"}

                {notification.type === "success" && "✓"}

                {notification.type === "team" && "+"}
              </div>

              <div className="notification-content">

                <div className="notification-title-row">
                  <h3>{notification.title}</h3>

                  {!notification.read && (
                    <span className="unread-dot"></span>
                  )}
                </div>

                <p>{notification.message}</p>

                <span className="notification-time">
                  {notification.time}
                </span>

              </div>

              <div className="notification-actions">

                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark read
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteNotification(notification.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default Notifications;