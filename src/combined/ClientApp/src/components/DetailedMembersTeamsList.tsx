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
    return { memberName, donationAmount, sharedLinksAmount };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
];

export function DetailedMembersTeamsList(props: { teamId: number; loggedInUserId?: number; }) {

    const { teamId, loggedInUserId } = props;
    const [teamOwner, setTeamOwner] = useState(false);
    const [memebersOfTeam, setMemebersOfTeam] = useState<Person[]>([]);

    const [isAdmin, setIsAdmin] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const BaseUrl = process.env.PUBLIC_URL

    const api = process.env.PUBLIC_URL + `/api/teams/${teamId}`;

    useEffect(() => {
        const BaseUrl = process.env.PUBLIC_URL
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
        };

        const getAllMembersOfTeam = async () => {
            try {
                var api = process.env.PUBLIC_URL + `/api/PersonTeamAssociation/team/${teamId}`;
                const response = await axios.get(api);
                const parsedMembers: Person[] = response.data.map((member: Person) => ({
                    id: member.id,
                    nickName: member.nickName
                }));

                setMemebersOfTeam(parsedMembers);
                console.log(memebersOfTeam);
            }
            catch (e) {
                console.log(e);
            }
        }

        const isTeamOwnerLoggedIn = async () => {
            try {
                var teamAPI = process.env.PUBLIC_URL + `/api/team/${teamId}`;
                const team = await axios.get(teamAPI);
                if (team.data.ownerId === loggedInUserId) {
                    setTeamOwner(true)
                }
            } catch (e) {
                console.log(e);
            }
        }

        const callServise = async () => {
            await getAllMembersOfTeam();
            if (loggedInUserId === null) {

                setIsAdmin(false);
            }
            else {
                var currentUser = async () => {
                    try {
                        //get user from token
                        //check if they are admin
                        //if admin set admin flag
                    } catch (e) {
                        console.log(e);
                    }
                }
                await currentUser();
            }
            await isTeamOwnerLoggedIn();
        };

        callServise();
    }, [api]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper >
            <TableContainer >
                <Table sx={{ maxWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Member Name</TableCell>
                            <TableCell align="right">Donation Amount</TableCell>
                            <TableCell align="right">Shared Links Donation Amount</TableCell>
                            {(() => {
                                if (teamOwner || isAdmin) {
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
                                    if (teamOwner || isAdmin) {
                                        return (

                                            <TableCell align="center"><ClearRoundedIcon sx={{ color: red }} /></TableCell>

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