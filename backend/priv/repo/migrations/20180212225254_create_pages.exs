defmodule Backend.Repo.Migrations.CreatePages do
  use Ecto.Migration

  def change do
    create table(:pages) do

      timestamps()
    end

  end
end
