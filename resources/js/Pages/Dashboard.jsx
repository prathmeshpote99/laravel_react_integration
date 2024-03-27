import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function Dashboard({ auth }) {
    const [data, setData] = useState([]);

    //Fetch all users
    async function fetchUsers() {
        let res = await axios
            .get("/findall")
            .then((res) => {
                console.log(res);
                setData(res.data.data);
            })
            .catch(() => {
                console.log("Error");
            });
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th className="col-5">Name</th>
                                        <th className="col-5">Email</th>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
