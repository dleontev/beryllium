defmodule Backend.Repo.Migrations.CreateCourses do
  use Ecto.Migration

  def change do
    create table(:courses) do

      timestamps()
    end

  end
end
