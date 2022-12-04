import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateTeamForm from './CreateTeamForm';
import userEvent from '@testing-library/user-event';



describe("CreateTeamForm", () => {
    beforeEach(() => {
        render(<CreateTeamForm/>)
    })

    it("Create Team Form has valid inputs and can be submitted", async () => {
        const teamNameInput = screen.getByTestId("teamNameInput") as HTMLInputElement
        await userEvent.type(teamNameInput, "Snow Team")

        const teamDescriptionInput = screen.getByTestId("teamDescriptionInput") as HTMLInputElement
        await userEvent.type(teamDescriptionInput, "This is our Snow team")

        const teamDonationGoalInput = screen.getByTestId("teamDonationGoalInput") as HTMLInputElement
        await userEvent.type(teamDonationGoalInput, "100")

        const submitButton = screen.getByRole("button")

        expect(submitButton).not.toBeDisabled()
    })

    it("Create Team Form does not have valid inputs and cannot be submitted", async () => {
        const teamNameInput = screen.getByTestId("teamNameInput") as HTMLInputElement
        await userEvent.type(teamNameInput, "SnowTeam")

        const teamDescriptionInput = screen.getByTestId("teamDescriptionInput") as HTMLInputElement
        await userEvent.type(teamDescriptionInput, "This is our Snow team")

        

        const submitButton = screen.getByRole("button")

        expect(submitButton).toBeDisabled()
    })
})



