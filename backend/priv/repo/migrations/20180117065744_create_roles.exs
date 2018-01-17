defmodule Backend.Repo.Migrations.CreateRoles do
  use Ecto.Migration

  def change do
    create table(:roles) do

      timestamps()
    end

  end
end
