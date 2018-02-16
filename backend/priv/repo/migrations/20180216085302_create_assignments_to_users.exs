defmodule Backend.Repo.Migrations.CreateAssignmentsToUsers do
  use Ecto.Migration

  def change do
    create table(:assignments_to_users) do

      timestamps()
    end

  end
end
