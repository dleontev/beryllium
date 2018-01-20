defmodule Backend.Repo.Migrations.CreateMembership do
  use Ecto.Migration

  def change do
    create table(:membership) do

      timestamps()
    end

  end
end
