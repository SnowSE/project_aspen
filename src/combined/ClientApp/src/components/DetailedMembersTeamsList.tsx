import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Person from "../JsModels/person";
import { authService } from "../services/authService";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { red } from "@mui/material/colors";


function createData(
    memberName: string,
    donationAmount: number,
    sharedLinksAmount: number,
) {
    return { memberName, donationAmount, sharedLinksAmount};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
];

export function DetailedMembersTeamsList() {
    const [teamOwner, setTeamOwner] = useState<Person>();
    const [loggedInUserId, setLoggedInUserId] = useState<number>();
    const [isAdmin, setIsAdmin] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const list: string[] = []
    var tId = parseInt(list[0]);
    if (list[0] !== null) {
        tId = parseInt(list[0]);   // parse the string back to a number.
    } 
    var ownerId = parseInt(list[1]);
    if (list[1] !== null) {
        ownerId = parseInt(list[1]);   // parse the string back to a number.
    }

    const api = process.env.PUBLIC_URL + `/api/teams/${tId}`;

    async function currentUser() {
        var user = await authService.getUser()
        console.log("user roles:", user?.profile.roles)
        user?.profile.roles.forEach((role: string) => {
            console.log(role)
            if (role.includes("admin")) {
                setIsAdmin(true)
            }
        });
    }
    useEffect(() => {
        const BaseUrl = process.env.PUBLIC_URL
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };
    const getUser = async () => {
        await axios.get(BaseUrl + '/api/user', config).then((response) => {
            setLoggedInUserId(response?.data?.id)
        }).catch((error) => {
            console.log("There was an error retrieving user", error)
        })
    }

    const fetchTeamOwner = async () => {
        try {
            var personApi = process.env.PUBLIC_URL + `/api/Person/${ownerId}`;
            const person = await fetch(personApi)
            const teamOwner = await person.json()
            console.log("Team owner object is: ", teamOwner)
            setTeamOwner(teamOwner)

        } catch (e) {
            console.log(e);
        }

        }
        const callServise = async () => {
            await getUser();
            await fetchTeamOwner();
            await currentUser();
        };

        callServise();
    }, [api, ownerId]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper>
            <TableContainer >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Member Name</TableCell>
                            <TableCell align="right">Donation Amount</TableCell>
                            <TableCell align="right">Shared Links Donation Amount</TableCell>
                            {(() => {
                                if (loggedInUserId === teamOwner?.id || isAdmin) {
                                    return (

                                        <TableCell align="right">Delete User</TableCell>

                                    )
                                }
                            })()
                            }
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.memberName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.memberName}
                                </TableCell>
                                <TableCell align="center">{row.donationAmount}</TableCell>
                                <TableCell align="center">{row.sharedLinksAmount}</TableCell>
                                {(() => {
                                    if (loggedInUserId === teamOwner?.id || isAdmin) {
                                        return (

                                            <TableCell align="center"><ClearRoundedIcon sx={{color: red } } /></TableCell>

                                        )
                                    }
                                })()
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 30, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}