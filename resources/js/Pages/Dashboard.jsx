import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Dashboard({ auth }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    //Fetch all users
    async function fetchUsers() {
        await axios
            .get("/findall")
            .then((res) => {
                console.log(res);
                setData(res.data.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Error");
            });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {loading ? (
                                <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
                                    <CircularProgress color="inherit" />
                                </div>
                            ) : (
                                <>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th className="col-1">No</th>
                                                <th className="col-4">Name</th>
                                                <th className="col-4">Email</th>
                                                <th className="col-1 text-center">
                                                    Edit
                                                </th>
                                                <th className="col-1 text-center">
                                                    View
                                                </th>
                                                <th className="col-1 text-center">
                                                    Delete
                                                </th>
                                            </tr>
                                        </thead>
                                        {data.map((user) => {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td>{user.id}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td className="text-center">
                                                            <EditIcon
                                                                fontSize="small"
                                                                cursor="pointer"
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <VisibilityIcon
                                                                fontSize="small"
                                                                cursor="pointer"
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <DeleteIcon
                                                                color="error"
                                                                fontSize="small"
                                                                cursor="pointer"
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            );
                                        })}
                                    </table>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
