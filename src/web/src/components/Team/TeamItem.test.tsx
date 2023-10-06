import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect'
import TeamItem from "./TeamItem";
import Team from '../../models/team'

const testTeam = new Team('TestTeam','Test Description','Image URL',2,1,10)
const testTeam2 = new Team('TestTeam',`Test Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium nisi ultrices facilisis imperdiet. Integer cursus, sapien eu placerat suscipit, erat lectus varius tellus, sit amet aliquet orci magna non ex. Cras volutpat pretium justo, vel vestibulum dolor. Duis pharetra fermentum mauris, ut posuere risus sollicitudin eget. Sed velit tortor, convallis non sem quis, interdum commodo lorem. Sed elementum rutrum enim vehicula aliquam. Aliquam tempor odio nec magna vehicula, non consequat massa luctus. 
Curabitur quis dapibus magna. Mauris vel dui sit amet tellus eleifend vehicula. Nam consectetur, tellus eget vestibulum volutpat, sem nisi accumsan quam, ac vehicula sapien neque eu mauris. Etiam non dignissim sapien. Phasellus risus nunc, iaculis at pharetra tempor, dictum at dui. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae sem eleifend, condimentum risus sit amet, pellentesque sem.
Nam accumsan erat in quam hendrerit, nec aliquam ex auctor. Phasellus feugiat lacinia massa id venenatis. Vestibulum ut risus sit amet ligula lacinia fermentum. Maecenas nisl nisi, rhoncus ut nisi non, facilisis auctor nisl. Curabitur imperdiet nisi nec eleifend viverra. Sed vel magna eu tellus tincidunt consequat quis quis sem. Morbi tincidunt egestas orci. Mauris luctus scelerisque turpis, eu pellentesque est vestibulum vitae. Donec at ligula dapibus elit gravida eleifend. Morbi interdum mi iaculis, consectetur ligula vestibulum, pretium ligula. Etiam a egestas urna. Proin dictum augue eu nunc egestas laoreet.
Nunc semper ex ut turpis tempus, cursus pretium erat bibendum. Nulla vel luctus ipsum, ut iaculis mi. Aliquam ut nibh ipsum. Nam enim leo, viverra in leo vel, auctor iaculis erat.`,'Image URL',2,1,10)

describe("Team Form tests", () => {

    test("Checks", () => {
        render(
        <Router>
        <TeamItem team={testTeam} ownerId={1} onJoinTeam={() => {}} />
        </Router>
        );

        const itemElement = screen.getByText(/TestTeam/);
        expect(itemElement).toBeInTheDocument();
        expect(itemElement).toContainHTML('<a class="fs-4 bold text-decoration-none" href="/team/10">TestTeam</a>')
    });
    test('TeamItem renders a description that ends in an empty string', () => {
        render(
            <Router>
            <TeamItem team={testTeam} ownerId={1} onJoinTeam={() => {}} />
            </Router>
            );
    
            const itemElement = screen.getByText(/Description/);
            expect(itemElement).toBeInTheDocument();
            expect(itemElement).toContainHTML('<p>Test Description</p>')
    })
    test('TeamItem renders a description that ends with ...', () => {
        render(
            <Router>
            <TeamItem team={testTeam2} ownerId={1} onJoinTeam={() => {}} />
            </Router>
            );
    
            const itemElement = screen.getByText(/Description/);
            expect(itemElement).toBeInTheDocument();
            expect(itemElement).toContainHTML(`<p>Test Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pretium nisi ultrices facilisis imperdiet. Integer cursus, sapien eu placerat suscipit, erat lectus varius tellus, sit amet aliquet orci magna non ex. Cras volutpat pretium j...</p>`)
    })
    
});
