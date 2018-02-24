defmodule Backend.Repo.Migrations.CreateSubmissions do
  use Ecto.Migration

  def change do
    create table(:submissions) do

      timestamps()
    end

  end
end
