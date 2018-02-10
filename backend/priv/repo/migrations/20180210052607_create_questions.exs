defmodule Backend.Repo.Migrations.CreateQuestions do
  use Ecto.Migration

  def change do
    create table(:questions) do

      timestamps()
    end

  end
end
