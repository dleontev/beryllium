defmodule Backend.Repo.Migrations.CreateAssignmentsToGroups do
  use Ecto.Migration

  def change do
    create table(:assignments_to_groups) do

      timestamps()
    end

  end
end
