defmodule Backend.Repo.Migrations.CreateSections do
  use Ecto.Migration

  def change do
    create table(:sections) do

      timestamps()
    end

  end
end
