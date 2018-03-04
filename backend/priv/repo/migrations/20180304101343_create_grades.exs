defmodule Backend.Repo.Migrations.CreateGrades do
  use Ecto.Migration

  def change do
    create table(:grades) do

      timestamps()
    end

  end
end
