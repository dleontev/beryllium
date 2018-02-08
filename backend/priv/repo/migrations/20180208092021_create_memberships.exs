defmodule Backend.Repo.Migrations.CreateMemberships do
  use Ecto.Migration

  def change do
    create table(:memberships) do

      timestamps()
    end

  end
end
