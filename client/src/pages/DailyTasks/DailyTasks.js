import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Modal from 'react-bootstrap/Modal';
import { useLocation, useParams } from 'react-router-dom';


import { visuallyHidden } from "@mui/utils";
import { Link } from "react-router-dom";



// import { Dropdown, ButtonGroup, Button } from "@themesberg/react-bootstrap";

// import { Card } from "@themesberg/react-bootstrap";

import { useEffect, useState } from "react";

import axios from "axios";
import { Container } from "react-bootstrap";
import originURL from "../../url";
import { Button } from "@mui/material";

const DailyTasks = () => {
    const [requestedProperties, setRequestedProperties] = useState([]);


    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("name");

    const [filteredRequestedProperties, setFilteredRequestedProperties] = useState("");

    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const [userName, setUserName] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const item = useLocation();


    console.log("testvalue", item)

    const propDetail = item.state || {}

    useEffect(() => {
        axios.get(`${originURL}/properties/requestproperty`).then((res) => {
            setRequestedProperties(res.data.getQuerries);
        });


    }, []);


    console.log("reqprop", requestedProperties)

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {

        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);


            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });

        console.log(
            "stabilizedThis",
            stabilizedThis.map((el) => el[0])
        );

        return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
        {
            id: "Date",
            numeric: false,
            disablePadding: false,
            label: "Date",
        },

        {
            id: "Tasks",
            numeric: false,
            disablePadding: false,
            label: "Tasks",
            extended: true,
        },
        {
            id: "Projects",
            numeric: false,
            disablePadding: false,
            label: "Project(s)",

        },


        {
            id: "Details",
            numeric: true,
            disablePadding: false,
            label: "Details",
        },
    ];

    function EnhancedTableHead(props) {
        const {
            onSelectAllClick,
            order,
            orderBy,
            numSelected,
            rowCount,
            onRequestSort,
        } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>

                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? "right" : "left"}
                            padding={headCell.disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === headCell.id ? order : false}
                            width={headCell.extended === true ? "20%" : "5%"}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                                style={{ fontWeight: "600" }}
                            >
                                {headCell.label}
                                {"orderBy" === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };


    // Avoid a layout jump when reaching the last page with empty rows.

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - requestedProperties.length) : 0;

    const TableRowCustom = (props) => {
        const { _id, Title, DetailLocation, updatedAt, Type } = props;

        const labelId = props.labelId;
        const index = props.index

        const rowsPerPage = props.rowsPerPage;
        const page = props.page;

        const status = "Paid";
        const statusVariant =
            status === "Paid"
                ? "white"
                : status === "Due"
                    ? "warning"
                    : status === "Canceled"
                        ? "danger"
                        : "primary";

        const isItemSelected = false;

        return (
            <TableRow
                hover
                // onClick={(event) => handleClick(event, row.name)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={_id}
                selected={isItemSelected}
            >

                <TableCell align="left">{rowsPerPage * page + index + 1}</TableCell>

                <TableCell align="left">{Title}</TableCell>
                {/* <TableCell align="right">{ShortDescription}</TableCell> */}
                <TableCell align="left">{DetailLocation}</TableCell>
                <TableCell align="right">{updatedAt.slice(0, 25)}</TableCell>
                <TableCell align="right">

                    {Type}

                </TableCell>

                <TableCell align="right">
                    <Link
                        to="/propertylisting/propertyDetail"
                        state={{
                            item: props
                        }}
                    >
                        <Button variant="success">Details</Button>
                    </Link>
                </TableCell>
            </TableRow>
        );
    };

    return (
        <>

            <div className='content-wrapper' style={{ backgroundColor: '#f7f7f7', paddingTop: "50px" }}>

                <Container style={{ marginTop: "20px", marginBottom: "50px" }}>

                    <Box sx={{ width: "95%" }}>
                        <Paper className="p-4" sx={{ width: "100%", mb: 2 }}>
                            <TableContainer >
                                <div className="d-flex ml-3 mt-3 mb-1">
                                    <h3
                                        className="mr-5"
                                        style={{ marginTop: "0px", marginBottom: "0px" }}
                                    >
                                        Daily Tasks
                                    </h3>
                                    <div
                                        style={{
                                            marginLeft: "auto",
                                            display: "flex",
                                            paddingRight: "10px",
                                        }}
                                    >
                                        <input
                                            id="tableSearch"
                                            onChange={(e) => {
                                                setFilteredRequestedProperties(e.target.value);
                                            }}
                                            className="form-control "
                                            placeholder="Search"
                                            style={{
                                                width: "500px",
                                                border: "none",
                                                backgroundColor: "#f0f0f0",
                                                marginRight: "30px",
                                                marginTop: "2px",
                                            }}
                                        ></input>
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center ps-3 pe-3'>

                                        <label>{propDetail.propertyType} Add User</label>      <Button style={{ marginLeft: "auto" }} variant="success" onClick={handleShow}>Add Today's Task</Button>{' '}
                                    </div>
                                    <br />
                                    <Modal style={{ marginTop: "30vh" }} show={show} onHide={handleClose} animation={false}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add Task</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <label for="birthday">Date:</label>

                                            <input type="date" id="birthday" name="birthday" />
                                            <br /><br />
                                            <input placeholder="Task title" style={{ width: "80%" }} onChange={(e) => setUserName(e.target.value)}></input>
                                            <br /><br />
                                            <input placeholder="Task Description" style={{ width: "80%" }} onChange={(e) => setUserName(e.target.value)}></input>
                                            <br /><br />
                                            <select name="cars" id="cars">
                                                <option value="volvo">Project 1</option>
                                                <option value="saab">Project 2</option>
                                                <option value="mercedes">Project 3</option>
                                                <option value="audi">Project 4</option>
                                            </select>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={() => {
                                                try {
                                                    axios.post(`${originURL}/addproperty/propertysubtype`, {
                                                        propertysubtype: userName,
                                                        addedIn: propDetail._id
                                                    })



                                                    handleClose()
                                                } catch (err) {
                                                    console.log(err)
                                                }
                                            }}>

                                                Add Task
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <Table
                                    sx={{ minWidth: 750 }}
                                    aria-labelledby="tableTitle"
                                    size={false ? "small" : "medium"}
                                >
                                    {" "}

                                    <EnhancedTableHead
                                        // numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        // onSelectAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={5}
                                    />
                                    <TableBody>
                                        {stableSort(requestedProperties, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((b, index) => {
                                                const labelId = `enhanced-table-checkbox-${index}`;




                                                return (
                                                    (b.Title
                                                        .toLowerCase()
                                                        .includes(filteredRequestedProperties.toLowerCase()) ||
                                                        b.fullname.toLowerCase().includes(
                                                            filteredRequestedProperties.toLowerCase()
                                                        ) ||
                                                        b.DetailLocation
                                                            .toLowerCase()
                                                            .includes(filteredRequestedProperties.toLowerCase())) && (
                                                        <TableRowCustom
                                                            key={`transaction-${b._id}`}
                                                            {...b}
                                                            labelId={labelId}
                                                            index={index}
                                                            rowsPerPage={rowsPerPage}
                                                            page={page}
                                                        />
                                                    )
                                                );
                                            })}

                                        {emptyRows > 0 && (

                                            <TableRow
                                                style={{
                                                    height: (dense ? 33 : 53) * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>

                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>{" "}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={requestedProperties.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                        </Paper>
                    </Box>
                </Container>
            </div>
        </>
    );
};

export default DailyTasks