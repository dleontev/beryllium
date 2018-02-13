defmodule Backend.Repo.Migrations.CreateAssignmentsToGroupsets do
  use Ecto.Migration

  def change do
    create table(:assignments_to_groupsets) do

      timestamps()
    end

  end
end
