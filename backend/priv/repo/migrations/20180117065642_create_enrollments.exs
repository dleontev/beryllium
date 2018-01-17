defmodule Backend.Repo.Migrations.CreateEnrollments do
  use Ecto.Migration

  def change do
    create table(:enrollments) do

      timestamps()
    end

  end
end
