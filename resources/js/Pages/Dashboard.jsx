import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";
import axios from "axios";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Modal, Button } from "react-bootstrap";

export default function Dashboard({ auth }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showView, setShowView] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    const handleDeleteShow = (user) => {
        setShowDelete(true);
    };

    const handleDeleteClose = () => setShowDelete(false);

    const handleDeleteConfirm = async (id) => {
        axios
            .delete(`/delete/${id}`)
            .then((res) => {
                console.log(res.data.message);
                handleDeleteClose();
                fetchUsers();
            })
            .catch((err) => console.error(err));
    };

    const handleClose = () => setShowView(false);

    const handleShow = (user) => {
        setCurrentUser(user);
        setShowView(true);
    };

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
                                    <div className="opacity-50 animate-bounce">
                                        <ApplicationLogo className="block h-10 fill-current text-gray-800" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <table className="table table-hover table-bordered mt-3">
                                        <thead>
                                            <tr>
                                                <th className="col-1 text-center">
                                                    No
                                                </th>
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
                                                <>
                                                    <tbody>
                                                        <tr>
                                                            <td className="text-center">
                                                                {user.id}
                                                            </td>
                                                            <td>{user.name}</td>
                                                            <td>
                                                                {user.email}
                                                            </td>
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
                                                                    onClick={() =>
                                                                        handleShow(
                                                                            user
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                            <td className="text-center">
                                                                <DeleteIcon
                                                                    color="error"
                                                                    fontSize="small"
                                                                    cursor="pointer"
                                                                    onClick={() =>
                                                                        handleDeleteShow(
                                                                            user
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    <Modal
                                                        show={showDelete}
                                                        centered
                                                        onHide={
                                                            handleDeleteClose
                                                        }
                                                    >
                                                        <Modal.Header
                                                            closeButton
                                                        >
                                                            <Modal.Title>
                                                                Confirm Delete
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <div className="d-flex justify-content-center align-items-center text-center">
                                                                Are you sure you
                                                                want to delete
                                                                this user?
                                                            </div>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <div className="w-100">
                                                                <div className="d-flex justify-content-center align-items-center text-center">
                                                                    <Button
                                                                        variant="secondary"
                                                                        onClick={
                                                                            handleDeleteClose
                                                                        }
                                                                    >
                                                                        Close
                                                                    </Button>
                                                                    <Button
                                                                        className="ml-5"
                                                                        variant="danger"
                                                                        onClick={() => {
                                                                            handleDeleteConfirm(
                                                                                user.id
                                                                            );
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </>
                                            );
                                        })}
                                    </table>
                                    <Modal
                                        show={showView}
                                        centered
                                        onHide={handleClose}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                User Details
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container">
                                                {currentUser && (
                                                    <>
                                                        <div className="row">
                                                            <p className="col-2 d-flex justify-content-center align-items-center">
                                                                <strong>
                                                                    ID:
                                                                </strong>{" "}
                                                            </p>
                                                            <p className="col-10">
                                                                <input
                                                                    className="form-control"
                                                                    value={
                                                                        currentUser.id
                                                                    }
                                                                    disabled
                                                                />
                                                            </p>
                                                        </div>
                                                        <div className="row">
                                                            <p className="col-2 d-flex justify-content-center align-items-center">
                                                                <strong>
                                                                    Name:
                                                                </strong>{" "}
                                                            </p>
                                                            <p className="col-10">
                                                                <input
                                                                    className="form-control"
                                                                    value={
                                                                        currentUser.name
                                                                    }
                                                                    disabled
                                                                />
                                                            </p>
                                                        </div>
                                                        <div className="row">
                                                            <p className="col-2 d-flex justify-content-center align-items-center">
                                                                <strong>
                                                                    Email:
                                                                </strong>{" "}
                                                            </p>
                                                            <p className="col-10">
                                                                <input
                                                                    className="form-control"
                                                                    value={
                                                                        currentUser.email
                                                                    }
                                                                    disabled
                                                                />
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <div className="w-100">
                                                <div className="d-flex justify-content-center align-items-center text-center">
                                                    <Button
                                                        variant="dark"
                                                        onClick={handleClose}
                                                    >
                                                        Close
                                                    </Button>
                                                </div>
                                            </div>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
