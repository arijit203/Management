import React, { useState } from 'react';

const ChangeUserRoleForm = ({ onChangeUserRole }) => {
    const [formData, setFormData] = useState({
        id: '',
        role: ''
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleChangeUserRole = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        onChangeUserRole(formData);
        // Optionally, reset form fields after submission
        setFormData({
            id: '',
            role: ''
        });
    };

    return (
        <form onSubmit={handleChangeUserRole} className="space-y-4">
            <h2 className='text-lg font-semibold mt-5'>Change User Role</h2>
            <input
                type="text"
                id="id"
                placeholder="User ID"
                className="border p-2 mr-1"
                value={formData.id}
                onChange={handleInputChange}
                required
            />
            <select
                id="role"
                className="border p-2 m-2 mr-2"
                value={formData.role}
                onChange={handleInputChange}
                required
            >
                <option value="" className="text-gray-500">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Field Staff">Field Staff</option>
            </select>
            <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Change User Role
            </button>
        </form>
    );
};

export default ChangeUserRoleForm;
