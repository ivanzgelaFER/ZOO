import "./Competition.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ICompetition } from "../../models/competitions";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { deleteCompetition } from "../../api/competition";
import { useAuth0 } from "@auth0/auth0-react";

const cols = [
    { field: "name", header: "Name", sortable: true },
    { field: "vrsta", header: "Competition type", sortable: true },
];

interface Props {
    competitionsData: ICompetition[];
    fetchCompetition: () => Promise<void>;
}

export const CompetitionTable = ({ competitionsData, fetchCompetition }: Props) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();

    const handleDeleteCompetiton = async (competition: ICompetition) => {
        try {
            await deleteCompetition(competition.id!, competition.name!);
            fetchCompetition();
        } catch (err) {
            console.log(err);
        }
    };

    const actionColumnDelete = (rowData: ICompetition) => {
        return (
            <Button
                className="button-delete-competition"
                icon="fa fa-trash"
                //tooltip={"Obriši"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                onClick={() => {
                    handleDeleteCompetiton(rowData);
                }}
            />
        );
    };

    return (
        <div className="competitions-table">
            <h3>For more details about specific competition click on table row!</h3>

            <DataTable
                value={competitionsData}
                showGridlines
                emptyMessage={"No results yet"}
                onRowClick={row => {
                    if (isAuthenticated) {
                        navigate(`/competition-details-protected`, {
                            state: {
                                competition: competitionsData.find(x => x.id === row.data.id),
                            },
                        });
                    } else {
                        navigate(`/competition-details`, {
                            state: {
                                competition: competitionsData.find(x => x.id === row.data.id),
                            },
                        });
                    }
                }}
            >
                {cols.map(col => {
                    return (
                        <Column
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            sortable={col.sortable}
                        />
                    );
                })}
                {isAuthenticated && (
                    <Column
                        className="button-delete-competition-column"
                        key={"delete"}
                        header={"Obriši"}
                        body={actionColumnDelete}
                    />
                )}
            </DataTable>
        </div>
    );
};
