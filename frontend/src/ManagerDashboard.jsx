import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddUserForm from "./AddUserForm";
import UpdateUserForm from "./UpdateUserForm";
import DeleteUserForm from "./DeleteUserForm";
import ChangeUserRoleForm from "./ChangeUserRoleForm";
import ManagerHorizonatalBar from "./ManagerHorizonatalBar";
import UserTable from "./UserTable";
import Sidebar from "./components/Sidebar";

const ManagerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Keep initial state true

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/allUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/addUser",
        formData
      );
      fetchUsers();
      toast.success("User added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  const handleUpdateUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/updateUser",
        formData
      );
      fetchUsers();
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleDeleteUser = async (deleteId) => {
    console.log("deleteId: ", deleteId);
    try {
      const response = await axios.delete(
        `http://localhost:5000/deleteUser/${deleteId}`
      );
      fetchUsers();
      toast.success("User Deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleChangeUserRole = async (formData) => {
    const { id, role } = formData;

    try {
      const response = await axios.post(
        `http://localhost:5000/changeUserRole/${id}`,
        { role }
      );
      fetchUsers();
      toast.success("User updated Successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [selectedAction, setSelectedAction] = useState("Add User");

  const renderForm = () => {
    switch (selectedAction) {
      case "Add User":
        return <AddUserForm onAddUser={handleAddUser} />;
      case "Update User":
        // Return the UpdateUserForm component
        return <UpdateUserForm onUpdateUser={handleUpdateUser} />;
      case "Delete User":
        // Return the DeleteUserForm component
        return <DeleteUserForm onUpdateUser={handleDeleteUser} />;
      default:
        return <AddUserForm onAddUser={handleAddUser} />;
    }
  };
  return (
    <>
      <div className="min-h-screen flex">
        {/* Conditionally render sidebar based on its state */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content with responsive styles */}
        <div className={`flex-1 ml-4 relative ${sidebarOpen ? "pl-48" : ""}`}>
          <ManagerHorizonatalBar className="container mx-auto" />

          <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 ml-14">
            {" "}
            <div
              className="form-container"
              style={{ width: "100%", overflow: "hidden" }}
            >
              <div
                className="form-container"
                style={{ width: "100%", overflow: "hidden" }}
              >
                <div className="grid mb-20 w-full grid-cols-[260px_1fr]">
                  <div className="flex flex-col gap-4 border-r bg-background p-4">
                    {["Add User", "Update User", "Delete User"].map(
                      (action, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <button
                            className={`inline-flex items-center whitespace-nowrap rounded-md text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-12 py-3 justify-start w-full gap-2 px-2 text-left ${
                              selectedAction === action
                                ? "bg-accent text-accent-foreground"
                                : ""
                            }`}
                            onClick={() => setSelectedAction(action)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5"
                            >
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                              <circle cx="9" cy="7" r="4"></circle>
                              {action === "Update User" && (
                                <polyline points="16 11 18 13 22 9"></polyline>
                              )}
                              {action === "Delete User" && (
                                <line x1="17" x2="22" y1="8" y2="13"></line>
                              )}
                              {action === "Delete User" && (
                                <line x1="22" x2="17" y1="8" y2="13"></line>
                              )}
                              {action === "Add User" && (
                                <>
                                  <line x1="19" x2="19" y1="8" y2="14"></line>
                                  <line x1="22" x2="16" y1="11" y2="11"></line>
                                </>
                              )}
                            </svg>
                            <span>{action}</span>
                          </button>
                        </div>
                      )
                    )}
                  </div>

                  <div className="flex-1 ml-4">{renderForm()}</div>
                </div>

                <UserTable users={users} onDelete={handleDeleteUser} />
              </div>
            </div>
          </main>

          {/* Media query to adjust content padding on larger screens */}
          <style jsx>{`
            @media (min-width: 768px) {
              .container.mx-auto.p-4 {
                padding-left: calc(64px + 1rem);
              }
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
