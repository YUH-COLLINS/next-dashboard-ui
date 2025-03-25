"use client";

import MessageModal from "./MessageModal";

const Dashboard = ({ currentUserId }: { currentUserId: string }) => {
  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your dashboard! Manage your tasks, view updates, and communicate with others.
        </p>
      </header>

      {/* Dashboard Content */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-gray-700">You currently have no tasks assigned. Check back later!</p>
        </div>
      </section>

      {/* Messaging Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Messaging</h2>
        <MessageModal currentUserId={currentUserId} />
      </section>
    </div>
  );
};

export default Dashboard;