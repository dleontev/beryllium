defmodule Backend.Repo.Migrations.CreateAssignments do
  use Ecto.Migration

  def change do
    create table(:assignments) do

      timestamps()
    end

  end
end
