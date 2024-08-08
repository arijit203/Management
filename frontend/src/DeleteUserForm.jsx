import React, { useState } from 'react';

const DeleteUserForm = ({ onDeleteUser }) => {
    const [deleteId, setDeleteId] = useState('');

    const handleDeleteUser = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        onDeleteUser(deleteId);
        // Optionally, reset form fields after submission (not necessary for delete operation)
        setDeleteId('');
    };

    
    return (
        

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white w-1/2" data-v0-t="card">
       <div className="flex items-center p-6">
    <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">Delete User</h3>
    
    </div>
        
        <div className="p-6">
          <form className="grid gap-4"onSubmit={handleDeleteUser} >
            <div className="grid gap-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="user-id"
              >
                User ID
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="deleteId"
                placeholder="Enter user ID"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                required
              />
            </div>
            <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary bg-black text-white hover:bg-primary/90 h-10 px-4 py-2 w-full"
            type="submit"
            >
            Delete User
            </button>
          </form>
        </div>
        
      </div>
    );
};

export default DeleteUserForm;
