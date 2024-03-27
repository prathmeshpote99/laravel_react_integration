import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Dashboard({ auth }) {
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
                            <table class="table table-hover">
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
                                <tbody>
                                    <tr>
                                        <td>Mark</td>
                                        <td>mark@gmail.com</td>
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
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
