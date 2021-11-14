import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Team from "../models/team";
import teamService from "../services/teamService";

export const getAllTeams = createAsyncThunk (
    "team/getAllTeams",
    async(_arg, ThunkAPI) =>{
        const teams = await teamService.getAllTeams();
        return teams;
    }
);
export const createTeam = createAsyncThunk(
    "team/createTeam",
    async(team: Team, ThunkAPI) =>{
        await teamService.createTeam(team);
        const teams = teamService.getAllTeams();
        return teams;
    }
)

interface TeamState {
    teamList: Team[]
}
const initialTeamState: TeamState ={
    teamList: []
}

const teamSlice = createSlice({
    name: "team",
    initialState: initialTeamState,
    reducers: {
        
    },
    extraReducers: (builder) =>{
        builder
            .addCase(getAllTeams.fulfilled, (state, action)=>{
                state.teamList= action.payload;
            })
            .addCase(getAllTeams.rejected, (state, action) => {
                console.log('error', action.payload);
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.teamList = action.payload;
            })
            .addCase(createTeam.rejected, (satate, aciton) => {
                console.log('error', aciton.payload);
            })
    }
});