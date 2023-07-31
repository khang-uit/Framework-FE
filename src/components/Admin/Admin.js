import React from "react";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin.js";
import Dashboard from "../AdminContent/Dashboard/Dashboard.js";
import ListReport from "../AdminContent/Report/ListReport.js";

const Admin = ({ route }) => {
    const body = (
        <>
            {route === "/admin/" && <Dashboard />}
            {route === "/admin/report" && <ListReport />}
        </>
    );
    return (
        <>
            <div className="wrapper">
                <nav className="main-header mt-3 navbar navbar-expand navbar-white navbar-light z-index-n1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-widget="pushmenu"
                                href="#"
                                role="button"
                            >
                                <i className="fas fa-bars"></i>
                            </a>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-widget="fullscreen"
                                href="#"
                                role="button"
                            >
                                <i className="fas fa-expand-arrows-alt"></i>
                            </a>
                        </li>
                    </ul>
                </nav>

                <SidebarAdmin />

                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-primary">
                                        {body}
                                    </div>
                                </div>
                                <div className="col-md-6"></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};
export default Admin;