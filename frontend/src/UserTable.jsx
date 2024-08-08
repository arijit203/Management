import React, { useState } from 'react';
import { format } from 'date-fns';

const UserTable = ({ users, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const filteredUsers = users?.filter((user) => {
    // Ensure fields are not null or undefined before processing
    const id = user.id?.toString() || '';
    const firstName = user.firstName ? user.firstName.toLowerCase() : '';
    const lastName = user.lastName ? user.lastName.toLowerCase() : '';
    const email = user.email ? user.email.toLowerCase() : '';
  
    const searchLower = searchQuery.toLowerCase();
  
    return (
      id.includes(searchLower) ||
      firstName.includes(searchLower) ||
      lastName.includes(searchLower) ||
      email.includes(searchLower)
    );
  });

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prevVisiblePasswords) => ({
      ...prevVisiblePasswords,
      [id]: !prevVisiblePasswords[id],
    }));
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white" data-v0-t="card">
      
        {/* <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Users<5/h3> */}
        <div className="flex items-center justify-between space-y-4 mb-5 mr-10 ml-10 mt-5">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Users</h3>
          
          {/* Search Input */}
          <div className="relative w-full max-w-sm">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by ID, Name, or Email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
          
        </div>
      </div>
      <div className="p-6">
        
        

        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Device ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">First Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Last Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Password</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Address</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created At</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Updated At</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Phone No.</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">{user.id}</td>
                  <td className="p-4 align-middle">{user.deviceId}</td>
                  <td className="p-4 align-middle">{user.firstName}</td>
                  <td className="p-4 align-middle">{user.lastName}</td>
                  <td className="p-4 align-middle">{user.email}</td>
                  <td className="p-4 align-middle relative">
                    <input
                      type={visiblePasswords[user.id] ? 'text' : 'password'}
                      value={user.password}
                      readOnly
                      className="border-0 bg-transparent w-24 p-1"
                    />
                    <img
                      src={
                        visiblePasswords[user.id]
                          ? 'https://media.geeksforgeeks.org/wp-content/uploads/20210917150049/eyeslash.png'
                          : 'https://media.geeksforgeeks.org/wp-content/uploads/20210917145551/eye.png'
                      }
                      alt="Toggle Password Visibility"
                      className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                      width="16px"
                      height="16px"
                      onClick={() => togglePasswordVisibility(user.id)}
                    />
                  </td>
                  <td className="p-4 align-middle">{user.address}</td>
                  <td className="p-4 align-middle">{user.role}</td>
                  <td className="p-4 align-middle">
                    {format(new Date(user.created_at), 'yyyy-MM-dd HH:mm:ss')}
                  </td>
                  <td className="p-4 align-middle">
                    {format(new Date(user.updated_at), 'yyyy-MM-dd HH:mm:ss')}
                  </td>
                  <td className="p-4 align-middle">{user.phone_no}</td>
                  <td className="p-4 align-middle">
                    <div className="flex gap-2">
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3"
                        onClick={() => onDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
