defmodule Backend.Repo.Migrations.CreateSchools do
  use Ecto.Migration

  def change do
    create table(:schools) do

      timestamps()
    end

  end
end
