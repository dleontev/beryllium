defmodule Backend.Repo.Migrations.CreateGroupsets do
  use Ecto.Migration

  def change do
    create table(:groupsets) do

      timestamps()
    end

  end
end
