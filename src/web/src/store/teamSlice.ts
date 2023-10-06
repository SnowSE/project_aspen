import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import registrationService from "../services/registrationService";
import Registration from "../models/registration";
import Team from "../models/team";
import teamService from "../services/teamService";
import { alertActions } from "./alertSlice";

export const getAllTeams = createAsyncThunk(
    "team/getAllTeams",
    async (eventID: number, ThunkAPI) => {
        const teams = await teamService.getAllTeams(eventID);
        return teams;
    }
);

export const getTeamsByEvent = createAsyncThunk(
    "team/getTeamsByEventId", async (id: number, ThunkAPI) => {
        const teams = await teamService.getTeamsByEventId(id)
        return teams;
    }
)

export const getTeamById = createAsyncThunk(
    "team/getTeamById",
    async (teamId: number, ThunkAPI) => {
        const team = await teamService.getTeamById(teamId);
        return team;
    }
)

export const createTeam = createAsyncThunk(
    "team/createTeam",
    async (args: any, ThunkAPI) => {
        const team = await teamService.createTeam(args.team);
        ThunkAPI.dispatch(alertActions.displayAlert({ title: "Success!", message: "Team has been successfully created", danger: false }))
        args.registration.teamID = team.id
        await registrationService.createRegistration(args.registration)
        return team
    }
)
export const createRegistration = createAsyncThunk(
    "team/createRegistration",
    async (registration: Registration, ThunkAPI) => {
        await registrationService.createRegistration(registration)
    }
)

export const getDonationsByTeamId = createAsyncThunk(
    "team/getDonationsByTeamId",
    async (args: {eventId: number, teamId: number}, ThunkAPI) => {
        const res = await teamService.getDonationsByTeamId(args.eventId, args.teamId);
        return res
    }
)

interface TeamState {
    currentTeam?: Team;
    currentTeamDonations?: number;
    teamList: Team[];
}
const initialTeamState: TeamState = {
    currentTeam: undefined,
    currentTeamDonations: undefined,
    teamList: []
}

const teamSlice = createSlice({
    name: "team",
    initialState: initialTeamState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTeams.fulfilled, (state, action) => {
                state.teamList = action.payload;
            })
            .addCase(getAllTeams.rejected, (state, action) => {
            })
            .addCase(getTeamById.fulfilled, (state, action: PayloadAction<Team>) => {
                state.currentTeam = action.payload
            })
            .addCase(getTeamsByEvent.fulfilled, (state, action) => {
                state.teamList = action.payload;
            })
            .addCase(getTeamsByEvent.rejected, (state, action) => {
            })
            .addCase(createTeam.fulfilled, (state, action: PayloadAction<Team>) => {
                state.currentTeam = action.payload
            })
            .addCase(createTeam.rejected, (state, action) => {
            })
            .addCase(createRegistration.fulfilled, (state, action) => {
            })
            .addCase(createRegistration.rejected, (state, action) => {
            })
            .addCase(getDonationsByTeamId.fulfilled, (state, action: PayloadAction<number>) => {
                state.currentTeamDonations = action.payload;
            })
    }
});

export default teamSlice;
export const teamActions = teamSlice.actions;