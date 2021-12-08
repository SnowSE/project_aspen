import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import registrationService from "../services/registrationService";
import Registration from "../models/registration";
import Team from "../models/team";
import teamService from "../services/teamService";

export const getAllTeams = createAsyncThunk (
    "team/getAllTeams",
    async(eventID: number, ThunkAPI) =>{
        const teams = await teamService.getAllTeams(eventID);
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
        const team = await teamService.createTeam(args.team);
        args.registration.teamID = team.id
        await registrationService.createRegistration(args.registration)
        return team
    }
)
export const createRegistration = createAsyncThunk(
    "team/createRegistration",
    async(registration: Registration, ThunkAPI) => {
        await registrationService.createRegistration(registration)   
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
            })
            .addCase(getTeamsByEvent.fulfilled, (state, action)=>{
                state.teamList = action.payload;
            })
            .addCase(getTeamsByEvent.rejected, (state, action)=>{
            })
            .addCase(createTeam.fulfilled, (state, action) => {
            })
            .addCase(createTeam.rejected, (state, action) => {
            })
            .addCase(createRegistration.fulfilled, (state, action) => {
            })
            .addCase(createRegistration.rejected, (state, action) => {
            })
    }
});

export default teamSlice;
export const teamActions = teamSlice.actions;