import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Registration from "../models/registration";
import Team from "../models/team";
import teamService from "../services/teamService";

export const getAllTeams = createAsyncThunk (
    "team/getAllTeams",
    async(_arg, ThunkAPI) =>{
        const teams = await teamService.getAllTeams();
        return teams;
    }
);

export const getTeamsByEvent = createAsyncThunk (
    "team/getTeamsByEventId", async (id: number, ThunkAPI) => {
        const teams = await teamService.getTeamsByEventId(id)
        return teams;
    }
)
export const createTeam = createAsyncThunk(
    "team/createTeam",
    async(args:any, ThunkAPI) =>{
        console.log(args.team)

    
        const team = await teamService.createTeam(args.team);
        args.registration.teamID = team.id
        await teamService.createRegistration(args.registration)
        return team
    }
)
export const createRegistration = createAsyncThunk(
    "team/createRegistration",
    async(registration: Registration, ThunkAPI) => {
        await teamService.createRegistration(registration)   
    }
)

interface TeamState {
    currentTeam?: Team;
    teamList: Team[];
}
const initialTeamState: TeamState ={
    currentTeam: undefined,
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
            .addCase(getTeamsByEvent.fulfilled, (state, action)=>{
                state.teamList = action.payload;
            })
            .addCase(getTeamsByEvent.rejected, (state, action)=>{
                console.log('teams by event id error', action.payload)
            })
            .addCase(createTeam.fulfilled, (state, action) => {
                state.currentTeam = action.payload;
            })
            .addCase(createTeam.rejected, (state, action) => {
                console.log('error', action.payload);
            })
            .addCase(createRegistration.fulfilled, (state, action) => {
                console.log('success')
            })
            .addCase(createRegistration.rejected, (state, action) => {
                console.log('error', action.payload)
            })
    }
});

export default teamSlice;
export const teamActions = teamSlice.actions;